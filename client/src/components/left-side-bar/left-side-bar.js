import {bindable} from 'aurelia-framework';

export class LeftSideBar {
  @bindable router = null;

  attached() {

    /* Tree()
     * ======
     * Converts the sidebar into a multilevel
     * tree view menu.
     *
     * @type Function
     * @Usage: $.AdminLTE.tree('.sidebar')
     */
    var o = $.AdminLTE.options;
    //Enable sidebar tree view controls

    /*
     * INITIALIZE BUTTON TOGGLE
     * ------------------------
     */
    $('.btn-group[data-toggle="btn-toggle"]').each(function () {
      var group = $(this);
      $(this).find(".btn").on('click', function (e) {
        group.find(".btn.active").removeClass("active");
        $(this).addClass("active");
        e.preventDefault();
      });
    });

    /* PushMenu()
     * ==========
     * Adds the push menu functionality to the sidebar.
     *
     * @type Function
     * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
     */
    $.AdminLTE.pushMenu = {
      activate: function (toggleBtn) {
        //Get the screen sizes
        var screenSizes = $.AdminLTE.options.screenSizes;
        //Enable sidebar toggle
        console.log('toggleButton', toggleBtn);

        $(toggleBtn).on('click', function (e) {
          e.preventDefault();
          //Enable sidebar push menu
          if ($(window).width() > (screenSizes.sm - 1)) {
            $("body").toggleClass('sidebar-collapse');
          }
          //Handle sidebar push menu for small screens
          else {
            if ($("body").hasClass('sidebar-open')) {
              $("body").removeClass('sidebar-open');
              $("body").removeClass('sidebar-collapse')
            } else {
              $("body").addClass('sidebar-open');
            }
          }
        });

        $(".content-wrapper").click(function () {
          //Enable hide menu when clicking on the content-wrapper on small screens
          if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
            $("body").removeClass('sidebar-open');
          }
        });

        //Enable expand on hover for sidebar mini
        if ($.AdminLTE.options.sidebarExpandOnHover || ($('body').hasClass('fixed') && $('body').hasClass('sidebar-mini'))) {
          this.expandOnHover();
        }

      },
      expandOnHover: function () {
        var _this = this;
        var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
        //Expand sidebar on hover
        $('.main-sidebar').hover(function () {
          if ($('body').hasClass('sidebar-mini') && $("body").hasClass('sidebar-collapse') && $(window).width() > screenWidth) {
            _this.expand();
          }
        }, function () {
          if ($('body').hasClass('sidebar-mini') && $('body').hasClass('sidebar-expanded-on-hover') && $(window).width() > screenWidth) {
            _this.collapse();
          }
        });
      },
      expand: function () {
        $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
      },
      collapse: function () {
        if ($('body').hasClass('sidebar-expanded-on-hover')) {
          $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
        }
      }
    };

    $.AdminLTE.tree = function (menu) {
      var _this = this;

      $("li a", $(menu)).on('click', function (e) {
        //Get the clicked link and the next element
        var $this = $(this);
        var checkElement = $this.next();

        //Check if the next element is a menu and is visible
        if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
          //Close the menu
          checkElement.slideUp('normal', function () {
            checkElement.removeClass('menu-open');
            //Fix the layout in case the sidebar stretches over the height of the window
            //_this.layout.fix();
          });
          checkElement.parent("li").removeClass("active");
        }
        //If the menu is not visible
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
          //Get the parent menu
          var parent = $this.parents('ul').first();
          //Close all open menus within the parent
          var ul = parent.find('ul:visible').slideUp('normal');
          //Remove the menu-open class from the parent
          ul.removeClass('menu-open');
          //Get the parent li
          var parent_li = $this.parent("li");

          //Open the target menu and add the menu-open class
          checkElement.slideDown('normal', function () {
            //Add the class active to the parent li
            checkElement.addClass('menu-open');
            parent.find('li.active').removeClass('active');
            parent_li.addClass('active');
            //Fix the layout in case the sidebar stretches over the height of the window
            _this.layout.fix();
          });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
          e.preventDefault();
        }
      });
    };

    $.AdminLTE.tree('.sidebar');

    //Activate sidebar push menu
    if (o.sidebarPushMenu) {
      $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
    }
  }
}
