import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { topic } from '../../../mock';
import { TopicCol } from '../../services/data/interfacemodel';

@Component({
  selector: 'app-abstract',
  templateUrl: './abstract.component.html',
  styleUrl: './abstract.component.css'
})
export class AbstractComponent {
  currentTopic: TopicCol | undefined;

  constructor(private data: DataService) {
    console.log('Abstract component created');
    console.log(this.data.getCurrentTopicId());
    this.currentTopic = this.data.getCurrentTopic();
    console.log("currentTopic is", this.currentTopic);
  }

}
