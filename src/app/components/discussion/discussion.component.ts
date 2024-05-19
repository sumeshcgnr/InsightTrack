import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { message } from '../../../mockchat';
import { MatDialog } from '@angular/material/dialog';
import { PostdialogComponent } from '../postdialog/postdialog.component';
import { AuthService } from '../../services/auth/auth.service';
import { userData } from '../../services/auth/userinteface';
import { TopicMessage } from '../../services/data/interfacemodel';
import { Timestamp } from 'firebase/firestore';
import { Time } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent implements OnInit {
  @ViewChild('msgcards', { static: false }) msgcards: any;


  private scrollContainer: any;
  subscription: Subscription;

  private topicId: string = "";
  messages: TopicMessage[] = [];
  user: userData = { displayName: '', email: '', photoURL: '', verified: false };

  // Icons
  thoughtIcon = "./../../../assets/images/thoughts.svg";
  questionIcon = "./../../../assets/images/question.png";
  insightIcon = "./../../../assets/images/insight.png";
  reciprocalIcon = "./../../../assets/images/reciprocal.png";

  constructor(private activeRoute: ActivatedRoute, private data: DataService, public dialog: MatDialog, authService: AuthService) {
    this.topicId = this.activeRoute.snapshot.params['topicId'];
    console.log("DiscussionComponent created", this.topicId);
    this.data.setTopicId(this.topicId);
    this.user = authService.GetLoggedInUser();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    console.log("DiscussionComponent initialized", this.topicId);
    this.loadTopicMessages(this.topicId);
    this.data.enableTrackerFromDB(this.topicId);
    this.data.subscribeMessageStateChange().subscribe(data => {
      console.log("subscribeMessageStateChange : ", data);
      this.loadTopicMessages(this.topicId);
    });
  }

  private scrollToLatestMsg() {
    this.msgcards.nativeElement.scrollTo({ top: this.msgcards.nativeElement.scrollHeight, behavior: 'smooth' });
  }

  loadTopicMessages(topicId: string) {
    let msgs: any;
    this.data.getMessagesFromDB(topicId).then((data) => {
      msgs = this.data.fetchLatestMessagesForTopic(topicId);
      if (msgs == undefined) {
        console.log("No messages found for topic", topicId);
        return;
      }
      this.messages = msgs.Messages;
      console.log("Messages loaded ", this.messages.length);
      setTimeout(() => { this.scrollToLatestMsg();  }, 2000);     
      
    });
  }

  openDialog(): void {

    let postMsg: TopicMessage = { UserName: this.user.displayName ?? '', UserEmail: this.user.email ?? '', Text: "", Type: "", Created: Timestamp.fromDate(new Date()) };
    const dialogRef = this.dialog.open(PostdialogComponent, { data: postMsg });

    dialogRef.afterClosed().subscribe(msg => {
      console.log('The dialog was closed', msg);
      if (msg != undefined && msg != null && msg != "") {
        msg.Created = Timestamp.fromDate(new Date());
        this.data.addNewMessageToTopic(this.topicId, msg).then(() => {
          console.log("Message added to topic successfully", msg);
        }).catch((error) => {
          console.error("Error adding message to topic", error);
        });
      }
    });
  }
}
