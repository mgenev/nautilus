import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {point} from '../utils/to-geo-json';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
class GeoGoogleService {

  constructor(http, eventAggregator) {
    this.http = http;
    this.eventAggregator = eventAggregator;


  }

  placeListingClick(marker) {
    google.maps.event.trigger(marker, 'click');
  }

  async getGeoposition() {
    return new Promise((resolve, reject) => {
      let success = pos => {
        // TODO enable real geo eventually
        // resolve(pos.coords)
        resolve({latitude: 47.6268381,longitude: -122.3618504});
      };
      success();
      let error = err => console.warn(`ERROR(${err.code}): ${err.message}`);
      // navigator.geolocation.getCurrentPosition(success, error);
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
    for (var i = 0; i < window.markers.length; i++) {
      window.markers[i].setMap(null);
    }
  }

  getNearbyPlaces(options) {

    let request = {
      location: this.getGoogleMapsGeoCoords(options.geo),
      radius: options.radius,
      query: options.query
    };

    var service = new google.maps.places.PlacesService(window.map);

    let createMarker = (place, index) => {
      let icon = {
        url: place.icon,
        scaledSize: new google.maps.Size(20, 20)
      };
      let marker = new google.maps.Marker({
        map: window.map,
        position: place.geometry.location,
        icon: icon
      });

      window.markers.push(marker);

      google.maps.event.addListener(marker, 'click', () => {
        this.eventAggregator.publish('googleMaps:markerClick', index);

        window.infoWindow.setContent(place.name);
        window.infoWindow.open(window.map, marker);
      });
    }

    return new Promise((resolve) => {
      service.textSearch(request, (places, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && options.pinMarkers) {
          for (var i = 0; i < places.length; i++) {
            createMarker(places[i], i);
          }
        }

        // let markerCluster = new MarkerClusterer(window.map, window.markers);
        resolve(places);
      });
    });
  }

  drawMap(options) {
    let center = this.getGoogleMapsGeoCoords(options.geo);
    window.infoWindow = new google.maps.InfoWindow();
    window.map = new google.maps.Map(document.getElementById(options.mapElementSelector), {
      center: center,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId[options.type]
    });

    let icon = {
      url: 'images/icons/ninja.svg',
      scaledSize: new google.maps.Size(65, 65)
    };

    if (options.pinCenter) {
      new google.maps.Marker({
        map: window.map,
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
