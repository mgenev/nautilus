import {customElement, bindable} from 'aurelia-framework';

@customElement('service-list')
export class SayHello {
  @bindable services = [];
}
