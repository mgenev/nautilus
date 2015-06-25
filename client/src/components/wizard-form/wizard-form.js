import {customElement, computedFrom, bindable} from 'aurelia-framework';

@customElement('wizard-form')
export class WizardForm {
  @bindable steps = [];
  @bindable model = null;
  activeStep = 0;

  @computedFrom('activeStep')
  get firstStep() {
    return this.activeStep === 0;
  }

  @computedFrom('activeStep', 'steps')
  get lastStep() {
    return this.activeStep === this.steps.length - 1;
  }

  nextStep() {
    ++this.activeStep;
  }

  prevStep() {
    --this.activeStep;
  }

  goToStep(step) {
    this.activeStep = step;
  }
}
