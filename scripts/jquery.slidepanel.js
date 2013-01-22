;
(function ($, window, document, undefined) {
  /* Create the defaults once */
  var pluginName = "slidePanel",
    display = {
      width:$(window).width(),
      height:$(window).height()
    },
    defaults = {
      side: 'left',
      top: '60px',
      width: '260px',
      height: '50px',
      speed: 500
    };

  function Plugin(element, options) {
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.element = element;
    this.$ptr = $(element);
    this.width = this.$ptr.outerWidth();
    this.collapsedX = (-this.width) + 20;
    this.expandedX = 10;
    this.height = this.$ptr.height();
    /* we start in collapsed state*/
    this.isCollapsed = true;
    this.options.side = this.options.side.toLowerCase() === 'right' ? 'right' : 'left';
    this.init();
  }

  Plugin.prototype = {
    init:function () {
      var that = this;
      this.$ptr.css(this.options.side, this.collapsedX + 'px');
      this.$ptr.css('top', this.options.top);

      /* hook the click/tap event */
      this.$ptr.click(function (evt) {
        /* only activate if clicking on the panel not something on the panel */
        if (event.target.id === that.$ptr.attr('id')) {
          var endX = (that.isCollapsed? that.expandedX: that.collapsedX) + 'px',
            option = that.options.side === 'left'? {left: endX}: {right: endX};

          that.$ptr.animate(option, that.options.speed);
          that.isCollapsed = that.isCollapsed ? false : true;
        }
      });
    }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);