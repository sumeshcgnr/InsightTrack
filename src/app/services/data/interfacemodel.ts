import { Timestamp } from "firebase/firestore";

export interface TopicCol {
  Id: string;
  Title: string;
  Abstract: string;
  ShortName: string;
  ShortDesc: string;
  Speaker: string;
  Moderator: string;
  Venue: string;
  Date: Timestamp;
  Active: boolean;
  Duration: number;
}

export interface TopicMessage {
  Created: Timestamp;
  UserName: string;
  UserEmail: string;
  Text: string;
  Type: string;
  Anonymous?: boolean;
}

export interface TopicMessages {
  Id: string;
  Messages: TopicMessage[];
}