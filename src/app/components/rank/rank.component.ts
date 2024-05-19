import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { topic } from '../../../mock';
import { TopicCol } from '../../services/data/interfacemodel';



export interface contributor {
  name: string;
  count: number;
}

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.css'
})
export class RankComponent {

  contributorObj: contributor[] = [];
  columnsToDisplay = ['name', 'count'];

  private currentTopic: TopicCol | undefined;
  contributorsMap: Map<string, number> = new Map<string, number>();

  constructor(private data: DataService) {
    console.log('Rank component created');
    console.log(this.data.getCurrentTopicId());
    this.currentTopic = this.data.getCurrentTopic();
    if (this.currentTopic == undefined) {
      console.log("currentTopic is undefined");
    }
   // this.getTopContributors();
    setInterval(() => {
      this.getTopContributors();
    }, 3000);
  }

  ngOnInit() {

  }

  getTopContributors() {    
    this.contributorsMap = this.data.getEntryCountByUserName();
    let tmpcontributorObj: contributor[] = [];
    for (const [key, value] of this.contributorsMap.entries()) {
      tmpcontributorObj.push({ name: key, count: value });
    }
    tmpcontributorObj.sort((a, b) => b.count - a.count);
    this.contributorObj.length = 0;
    this.contributorObj = tmpcontributorObj.slice(0, 5);    
  }
}
