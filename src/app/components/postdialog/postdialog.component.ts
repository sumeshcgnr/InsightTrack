import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { message } from '../../../mockchat';

@Component({
  selector: 'app-postdialog',
  templateUrl: './postdialog.component.html',
  styleUrl: './postdialog.component.css'
})
export class PostdialogComponent {

  thoughtIcon = "./../../../assets/images/thoughts.svg";
  questionIcon = "./../../../assets/images/question.png";
  insightIcon = "./../../../assets/images/insight.png";
  reciprocalIcon = "./../../../assets/images/reciprocal.png";

  messageType: string = "";
  anonymous: boolean = false;


  constructor(public dialogRef: MatDialogRef<PostdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: message) {   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPost( messageText:string): void {
    console.log("Message type: ", this.messageType)
    console.log("Message text: ", messageText)
    console.log("Anonymous: ", this.anonymous)
    if (this.messageType == "") {
      alert("Please select a message type")
      return
    }
    if (messageText.length == 0) {
      alert("Please type message or cancel")
      return
    }
    this.data.Type = this.messageType;
    this.data.Anonymous = this.anonymous;
    this.data.Text = messageText;
    this.data.Date = new Date().toISOString();

    this.dialogRef.close(this.data);
  } 
}
