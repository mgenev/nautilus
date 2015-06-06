export class UppercaseValueConverter {
  toView(value){
    console.log('woo woo ');
    return value && value.toUpperCase();
  }
}
