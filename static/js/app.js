'use strict';


function isArray(o) {
  if (Array.isArray) return Array.isArray(o);else {
    return o instanceof Array;
  }
}

function isEmptyObject(o) {
  return Object.keys(o).length === 0;
};

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
};

(function ($) {
  $.event.special.destroyed = {
    remove: function remove(o) {
      if (o.handler) {
        o.handler();
      }
    }
  };
})(jQuery);

System.config({
  baseURL: '/comp'
});

function library(fname, cname) {
  System.import(a + '.js').then(function (m) {
    console.log('library loaded ', fname, cname);
  }, console.error.bind(console));
};

var React = {};
if (preact) {
  console.log("preact object EXIST!");
  React.createElement = preact.h;
  if (React) {
    console.log("React object EXIST!");
    if (React.createElement) {
      console.log("React.createElement object EXIST!");
    };
  };
};