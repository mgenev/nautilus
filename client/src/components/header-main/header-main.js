import $ from 'jquery';
import config from 'utils/layout/config';

export class HeaderMain {
  attached() {
    var o = $.AdminLTE.options;

    //Add slimscroll to navbar dropdown
    if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
      $(".navbar .menu").slimscroll({
        height: o.navbarMenuHeight,
        alwaysVisible: false,
        size: o.navbarMenuSlimscrollWidth
      }).css("width", "100%");
    }
  }
}
