import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { AuthService } from '../../services/auth/auth.service';
import { topic } from '../../../mock';
import { TopicCol } from '../../services/data/interfacemodel';

const adminEmails: string[] = ['sumeshcgnr@gmail.com','charanoshawa@gmail.com'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public adminUser: boolean = false;
  public searchInput: string = '';
  topicList: TopicCol[] = [];

  constructor(private zone: NgZone, private router: Router, public data: DataService, public auth: AuthService) {
    adminEmails.find(email => email == this.auth.GetLoggedInUser().email) ? this.adminUser = true : this.adminUser = false;
    this.data.loadTopicsFromDB().then(() => {
      this.topicList = this.data.getTopicList();
    });
  }

  ngOnInit() {
    console.log('DashboardComponent ngOnInit');
    this.data.loadTopicsFromDB().then(() => {
      this.topicList = this.data.getTopicList();
    });
  }

  showDiscussion(topicId: string) {

    console.log("showDiscussion", topicId);
    this.zone.run(() => {
      this.router.navigate(['/home/discussions/' + topicId]);
    });

  }

  updateSearchFilter() {
    console.log(this.searchInput);
  }

  onCreate() {
    this.data.createNewTopic();
    alert("New topic is created");
  }
}
