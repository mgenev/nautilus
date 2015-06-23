export class HeaderMain {
  attached() {
    let o = $.AdminLTE.options;
    //Add slimscroll to navbar dropdown
    if (o.navbarMenuSlimscroll && typeof $.fn.slimScroll != 'undefined') {

      $(".navbar .menu").slimScroll({
        height: o.navbarMenuHeight,
        alwaysVisible: false,
        size: o.navbarMenuSlimscrollWidth
      }).css("width", "100%");
    }
  }
}
