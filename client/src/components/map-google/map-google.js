import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class MapGoogle {
  constructor(ea) {
    this.ea = ea;
  }

  attached() {
    this.ea.publish('googleMaps:mapRendered');
  }
}
