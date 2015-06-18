export class newLineToBreakValueConverter {
  toView(value){
    return value.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }
}
