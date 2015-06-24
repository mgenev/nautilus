import {customElement, computedFrom, bindable} from 'aurelia-framework';

@customElement('wizard-form')
export class WizardForm {
  @bindable steps = [];
  @bindable model = null;
  activeStep = 0;
  attached() {
    this.addActiveClass();
    console.log('MODEL', this.model);
  }

  @computedFrom('activeStep')
  get firstStep() {
    return this.activeStep === 0;
  }

  @computedFrom('activeStep', 'steps')
  get lastStep() {
    return this.activeStep === this.steps.length - 1;
  }

  addActiveClass() {
    $('.wizard-active').removeClass('wizard-active');
    let selector = `.wizard-step:eq(${this.activeStep})`;
    $(selector).addClass('wizard-active');
  }

  nextStep() {
    ++this.activeStep;
    this.addActiveClass();
  }

  prevStep() {
    --this.activeStep;
    this.addActiveClass();
  }

  goToStep(step) {
    this.activeStep = step;
    this.addActiveClass();
  }
}
