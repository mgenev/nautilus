import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {point} from '../utils/to-geo-json';

@inject(HttpClient)
class GeoGoogleService {

  constructor(http) {
    this.http = http;
  }

  markers = [];

  async getGeoposition() {
    return new Promise((resolve, reject) => {
      let success = pos => resolve(pos.coords);
      let error = err => console.warn(`ERROR(${err.code}): ${err.message}`);
      navigator.geolocation.getCurrentPosition(success, error);
    });
  }

  async geocoding(lookup, reverse) {
    let url = reverse ? `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lookup.latitude},${lookup.longitude}` : `https://maps.googleapis.com/maps/api/geocode/json?address=${lookup}`;
    return this.http.post(url);
  }

  async getCurrentAddress() {
    let geo = await this.getGeoposition();
    return await this.getAddressForLatLong(geo);
  }

  async getLatLongForAddress(address) {
    let location = await this.geocoding(address);
    return point(location.content.results[0].geometry.location);
  }

  async getAddressForLatLong(latlong) {
    let geo = await this.geocoding(latlong, true);
    return geo.content.results[0].formatted_address;
  }

  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }

  getNearbyPlaces(options) {

    let request = {
      location: this.getGoogleMapsGeoCoords(options.geo),
      radius: options.radius,
      query: options.query
    };

    var service = new google.maps.places.PlacesService(this.map);

    let createMarker = place => {
      let icon = {
        url: place.icon,
        scaledSize: new google.maps.Size(20, 20)
      };
      let marker = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        icon: icon
      });

      this.markers.push(marker);

      google.maps.event.addListener(marker, 'click', () => {
        this.infoWindow.setContent(place.name);
        this.infoWindow.open(this.map, marker);
      });
    }

    return new Promise((resolve) => {
      service.textSearch(request, (places, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && options.pinMarkers) {
          for (var i = 0; i < places.length; i++) {
            createMarker(places[i]);
          }
        }

        // let markerCluster = new MarkerClusterer(this.map, this.markers);
        resolve(places);
      });
    });
  }

  drawMap(options) {
    let center = this.getGoogleMapsGeoCoords(options.geo);
    let infoWindow = new google.maps.InfoWindow();
    let map = new google.maps.Map(document.getElementById(options.mapElementSelector), {
      center: center,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId[options.type]
    });

    this.infoWindow = infoWindow;
    this.map = map;
    let icon = {
      url: 'images/icons/ninja.svg',
      scaledSize: new google.maps.Size(65, 65)
    };

    if (options.pinCenter) {
      new google.maps.Marker({
        map: map,
        position: center,
        icon: icon
      });
    }
  }

  getGoogleMapsGeoCoords(geo) {
    return new google.maps.LatLng(geo.latitude, geo.longitude);
  }
}

export {
  GeoGoogleService
}
