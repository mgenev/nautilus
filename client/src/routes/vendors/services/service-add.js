import {customElement, bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'services/config';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('service-add')
@inject(HttpClient, Config, EventAggregator)
export class SayHello {
  constructor(http, config, ea) {
    this.http = http;
    this.config = config;
    this.ea = ea;
  }

  @bindable vendor = null;
  endPoint = 'services';
  service = {};
  serviceAddSteps = [{
      path: 'routes/vendors/services/service-add-basic-info',
      caption : 'Basic Info'
    },
    {
      path: 'routes/vendors/services/service-add-prices',
      caption : 'Prices and Capacity'
    },
    {
      path: 'routes/vendors/services/service-add-terms',
      caption : 'Terms of Agreement'
    }];
  showingAddService = false;
  closeModal() {
    this.showingAddService = false;
  }
  openModal() {
    this.showingAddService = true;
  }

  async createService() {
    try {
      this.service.vendor = this.vendor._id;
      let newService = await this.http.post(`${this.config.server.url}${this.endPoint}`, this.service);

      for (let prop in this.service) {
        this.service[prop] = '';
      }
      this.closeModal();
      this.ea.publish('vendors:serviceCreated', newService.content);
    } catch (err) {
      // TODO flash a global error message
      console.log('error creating service: ', err);
    }
  }
}
