import { Injectable } from '@angular/core';
//import { topic, topicMockList } from '../../../mock';
//import { topicMsgs, topicMessages, message } from '../../../mockchat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs, doc, getDoc, orderBy, addDoc, updateDoc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { TopicCol, TopicMessage, TopicMessages, } from './interfacemodel';
import { Subject, Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';


const DBPATH = {
  TOPICS: "/Topics/",
  MESSAGES: "/Messages/",
  TRACKER: "/Tracker/messages/",
  TRACKER_DOC: "/Tracker/",
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  //public topicList = topicMockList;
  public topicList: TopicCol[] = [];
  public topicMsgs: TopicMessages[] = []
  private currentTopicId: string = "";
  private messageChange = new Subject<any>();

  constructor(public fAuth: AngularFireAuth, public db: AngularFirestore) {
  }

  getTopicList() {
    console.log("getTopicList called");
    return this.topicList;
  }

  setTopicId(id: string) {
    this.currentTopicId = id;
  }

  getCurrentTopicId() {
    return this.currentTopicId;
  }

  broadcastMessageStateChange(data: any) {
    this.messageChange.next(data);
  }

  subscribeMessageStateChange(): Observable<any> {
    return this.messageChange.asObservable();
  }

  getCurrentTopic(): TopicCol | undefined {
    if (this.currentTopicId == "") {
      console.log("currentTopicId is 0");
      return undefined;
    }
    return this.topicList.find(topic => topic.Id == this.currentTopicId);
  }

  fetchLatestMessagesForTopic(topicId: string): TopicMessages | undefined {
    return this.topicMsgs.find(topicMsg => topicMsg.Id == topicId)
  }

  getEntryCountByUserName(): any {
    let msgs: TopicMessages | undefined = this.fetchLatestMessagesForTopic(this.currentTopicId);
    let userCntMap = new Map<string, number>();
    if (msgs != undefined) {
      for (const msg of msgs.Messages) {
        let cnt = userCntMap.get(msg.UserName);
        if (!msg.Anonymous && msg.UserName != "" && msg.UserName != "Admin") {
          if (cnt == undefined) {
            userCntMap.set(msg.UserName, 1);
          } else {
            userCntMap.set(msg.UserName, cnt + 1);
          }
        }
      }
    } else {
      console.log("No messages found for topic", this.currentTopicId, this.topicMsgs);
    }
    return userCntMap;
  }

  // Firestore functions
  async loadTopicsFromDB() {
    console.log("loadTopicsFromDB called");
    var user = this.fAuth.currentUser;
    if (user != null) {
      const q = query(collection(this.db.firestore, DBPATH.TOPICS), where("Active", "==", true));
      const topicSnapshot = await getDocs(q).then((topicSnapshot) => {
        this.topicList.length = 0;
        topicSnapshot.forEach((doc) => {
          console.log("loadTopicsFromDB", doc.id);
          var topic: TopicCol = doc.data() as TopicCol;
          topic.Id = doc.id;
          this.topicList.push(topic);
        });
      }).catch((error) => {
        console.error("Error getting documents: ", error);
      });
    }
  }

  async getTopicFromDB(topicId: string) {
    console.log("getTopicFromDB called", topicId);

    var user = this.fAuth.currentUser;
    if (user != null) {
      const topicDocRef = doc(this.db.firestore, DBPATH.TOPICS, topicId);
      await getDoc(topicDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.error("Error getting document: ", error);
      });
    }
  }

  async getMessagesFromDB(topicId: string) {
    console.log("getMessagesFromDB called", topicId);
    var user = this.fAuth.currentUser;
    if (user != null) {
      const msgColRef = DBPATH.TOPICS + topicId + DBPATH.MESSAGES;
      const q = query(collection(this.db.firestore, msgColRef), orderBy("Created", "asc"));
      await getDocs(q).then((messageSnapshot) => {
        this.topicMsgs.length = 0;
        this.topicMsgs.push({ Id: topicId, Messages: [] });
        messageSnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          this.topicMsgs[0].Messages.push(doc.data() as TopicMessage);
        });
      }).catch((error) => {
        console.error("Error getting documents: ", error);
      });
    }
  }

  async addNewMessageToTopic(topicId: string, msg: any) {
    const msgColRef = DBPATH.TOPICS + topicId + DBPATH.MESSAGES;
    // Add a new document with a generated id.
    await addDoc(collection(this.db.firestore, msgColRef), msg).then(async (docRef) => {
      // Update the tracker
      const trackerDocRef = doc(this.db.firestore, DBPATH.TOPICS + topicId, DBPATH.TRACKER);
      await updateDoc(trackerDocRef, {
        lastUpdated: serverTimestamp()
      });
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  // Tracker functions
  async enableTrackerFromDB(topicId: string) {
    console.log("enableTrackerFromDB called");
    var user = this.fAuth.currentUser;
    if (user != null) {
      onSnapshot(doc(this.db.firestore, DBPATH.TOPICS + topicId, DBPATH.TRACKER), (doc) => {
        console.log("Current data: ", doc.data());
        this.broadcastMessageStateChange(doc.data());
      });
    }
  }

  async createNewTopic() {
    const topicColRef = collection(this.db.firestore, DBPATH.TOPICS);
    const newTopic: TopicCol = {
      Id: "",
      Title: "New Topic",
      Abstract: "New Topic Description",
      Active: true,
      Date: Timestamp.fromDate(new Date()),
      ShortName: "Short name",
      ShortDesc: "",
      Speaker: "Mr. Speaker",
      Moderator: "Mr. Moderator",
      Venue: "Venue",
      Duration: 0,
    };
    // Add a new document with a generated id.
    await addDoc(topicColRef, newTopic).then(async (docRef) => {
      console.log("Document written with ID: ", docRef.id);
      const messageTopicRef = collection(this.db.firestore, DBPATH.TOPICS, docRef.id, DBPATH.MESSAGES);
      const message: TopicMessage = {
        Created: Timestamp.fromDate(new Date()),
        UserName: "",
        UserEmail: "",
        Text: "Welcome, post your messages on this topic here...",
        Type: "reciprocal",
      }
      await addDoc(messageTopicRef, message);

      const trackerMsgRef = doc(this.db.firestore, DBPATH.TOPICS, docRef.id, DBPATH.TRACKER);
      const trackerDoc = {
        lastUpdated: serverTimestamp(),
      }
      await setDoc(trackerMsgRef, trackerDoc);

    }).catch((error) => {
      console.error("Error adding document: ", error);
    });

  }
}
