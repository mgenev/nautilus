import {customElement, bindable, computedFrom, inject} from 'aurelia-framework';
import {GeoGoogleService} from 'services/geo-google';

@customElement('place-card')
@inject(GeoGoogleService)
export class PlaceCard {
  @bindable place = null;
  @bindable class = null;
  @bindable index = null;

  constructor(geo) {
    this.geo = geo;
  }

  @computedFrom('place')
  get photoUrl() {
    if (this.place && this.place.photos) {
      return this.place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100});
    } else if (this.place) {
      return this.place.icon;
    }
  }

  showMarkerInfoWindow(i) {
    this.geo.placeListingClick(window.markers[i]);
  }

}
