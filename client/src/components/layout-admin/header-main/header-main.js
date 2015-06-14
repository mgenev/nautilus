import $ from 'jquery';
import config from 'utils/layout/config';
import slimscroll from 'utils/layout/slimscroll';

export class HeaderMain {
  attached() {
    var o = $.AdminLTE.options;
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
