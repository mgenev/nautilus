import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {point} from '../utils/to-geo-json';

@inject(HttpClient)
class GeoGoogleService {

  constructor(http){
    this.http = http;
  }

  async getGeoposition() {
    return new Promise( (resolve, reject) => {
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

  getNearbyPlaces(geo, radius=1000, query, pinMarkers=false) {

    let request = {
      location: this.getGoogleMapsGeoCoords(geo),
      radius: radius,
      query: query
    };

    var service = new google.maps.places.PlacesService(this.map);
    let markers = [];
    let createMarker = place => {
      let marker = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        // icon: place.icon
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', () => {
        this.infoWindow.setContent(place.name);
        this.infoWindow.open(this.map, marker);
      });
    }


    return new Promise( (resolve) => {
      service.textSearch(request, (places, status) => {
       if (status === google.maps.places.PlacesServiceStatus.OK && pinMarkers) {
         for (var i = 0; i < places.length; i++) {
           createMarker(places[i]);
         }
       }

      //  let markerCluster = new MarkerClusterer(this.get('map'), markers);
       resolve(places);
      });
    });
  }

  drawMap(geo, mapElementSelector, pinCenter=true) {

    let center = this.getGoogleMapsGeoCoords(geo);
    let infoWindow = new google.maps.InfoWindow();
    let map = new google.maps.Map(document.getElementById(mapElementSelector), {
      center: center,
      zoom: 14
    });

    this.infoWindow = infoWindow;
    this.map = map;

    if (pinCenter) {
      new google.maps.Marker({
        map: map,
        position: center
        // icon: '/icons/ninja.svg'
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
