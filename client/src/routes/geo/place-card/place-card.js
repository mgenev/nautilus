import {customElement, bindable} from 'aurelia-framework';

@customElement('place-card')
export class PlaceCard {
  @bindable place = null;
}
