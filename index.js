'use strict';

var $ = require('jquery');
var Widget = require('nd-widget');
var Template = require('nd-template');
var CSV = require('./vendor/csv');


CSV.prototype.deserialize.object = function() {
  return JSON.parse(o);
}

var CSVWidget = Widget.extend({
  Implements: [Template],
  attrs: {
    template: require('./src/element.handlebars')
  },
  
  events: {
    'change': '_handleData'
  },
  
  _handleData: function(e) {
    var source = this.get('source');
    var reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = function() {
      if(source.getAttribute('header')){
        source.value = JSON.stringify(new CSV(reader.result, {
          header: true
        }).parse());
      }else{
        source.value = reader.result;
      }
    };
  }
});

CSV.pluginEntry = {
  name: 'CSV',
  starter: function() {
    var plugin = this,
      host = plugin.host;

    var _widgets = plugin.exports = {};

    function addWidget(name, instance) {
      _widgets[name] = instance;

      plugin.trigger('export', instance, name);
    }

    plugin.execute = function() {
      host.$('[x-type="csv"]')
      .filter(':not([data-rendered])')
      .each(function(i, field) {
        field.type = 'hidden';
        field.setAttribute('data-rendered', 'true');
        addWidget(field.name, new CSVWidget($.extend(true, {
          parentNode: field.parentNode,
          source: field
        }, plugin.getOptions('config'))).render());
      });
    };

    host.after('render', plugin.execute);

    typeof host.addField === 'function' &&
      host.after('addField', plugin.execute);

    typeof host.removeField === 'function' &&
      host.before('removeField', function(name) {
        if (name in _widgets) {
          _widgets[name].destroy();
        }
      });

    host.before('destroy', function() {
      Object.keys(_widgets).forEach(function(key) {
        _widgets[key].destroy();
      });
    });

    plugin.getWidget = function(name) {
      return _widgets[name];
    };

    // 通知就绪
    this.ready();
  }
};

module.exports = CSV;