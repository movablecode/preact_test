'use strict';

/**
  is array ?
*/
function isArray(o) {
  if (Array.isArray) return Array.isArray(o);else {
    return o instanceof Array;
  }
}

/**
  is empty object ?
*/
function isEmptyObject(o) {
  return Object.keys(o).length === 0;
};

/**
  string.format
*/
if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
};

/**
  for jQuery DOM remove event hooking
*/
(function ($) {
  $.event.special.destroyed = {
    remove: function remove(o) {
      if (o.handler) {
        o.handler();
      }
    }
  };
})(jQuery);

//  prepare System JS
//  let System = global.System;
//    System.js 를 위한 준비단계, 서버 컴포넌트의 기본 경로를 설정한다.
System.config({
  baseURL: '/comp'
});

/**
  원격 js 로드 함수.
*/
function library(fname, cname) {
  System.import(a + '.js').then(function (m) {
    console.log('library loaded ', fname, cname);
  }, console.error.bind(console));
};

/**
  replace dom with html
    remove all child nodes
*/
function replaceDomWith(dom) {
  var new_html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var tdom = $("#" + dom);
  tdom.empty();
  tdom[0].innerHTML = new_html;
  return tdom;
};

/**
  place Component.
    컴포넌트 배치 함수. 주요하게 사용될 것.
    컴포넌트명에 해당하는 partial_js 파일을 서버로부터 적재하고, 배치,실행한다.
*/
function placeComponent(dom, a, opt) {
  var fname = a;
  var comp_name = 'default';
  if (isArray(a)) {
    // console.log("it is ARRAY");
    fname = a[0];comp_name = a[1];
  };
  System.import(fname + '.js').then(function (m) {
    // console.log('loaded ',fname,comp_name,m[comp_name]);
    console.log('loaded ', fname, comp_name);
    if (dom) {
      var tdom = document.getElementById(dom);
      var comp = React.createElement(m[comp_name], opt);
      $('#' + dom).bind('destroyed', function () {
        ReactDOM.unmountComponentAtNode(document.getElementById(dom));
      });
      ReactDOM.render(comp, tdom);
    }
  }, console.error.bind(console));
};

/**
  Pop Over DOM
*/
function popOver(dom) {
  alert(dom);
};

/**
  Query Partial Contents
*/
function queryPartial(dom, sub_path) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var path = '/qry/' + sub_path;
  $.post(path, data, function (ret, textStatus, jqXHR) {
    console.log(ret);
    console.log(dom);
    if (dom) {
      if (opt.dom_pre) {
        opt.dom_pre(ret);
      }
      // var tdom = document.getElementById(dom);
      replaceDomWith(dom, ret.html);
      if (opt.dom_post) {
        opt.dom_post(ret);
      }
    };
    if (opt.on_success) {
      opt.on_success(ret);
    }
  });
}

/**
*/
function postPartial(dom, sub_path) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var path = sub_path;
  $.post(path, data, function (ret, textStatus, jqXHR) {
    console.log(ret);
    console.log(dom);
    if (dom) {
      if (opt.dom_pre) {
        opt.dom_pre(ret);
      }
      var tdom = document.getElementById(dom);
      tdom.innerHTML = ret.html;
      if (opt.dom_post) {
        opt.dom_post(ret);
      }
    };
    if (opt.on_success) {
      opt.on_success(ret);
    }
  });
}

/**
  {dom: DOMID, html: HTML STRINGS, data: JS DATA}
*/
function redrawDoms(doms, opt) {
  doms.forEach(function (a) {
    if (opt.dom_pre) {
      opt.dom_pre(a.data);
    }
    var tdom = document.getElementById(a.dom);
    tdom.innerHTML = a.html;
    if (opt.dom_post) {
      opt.dom_post(a.data);
    }
  });
};

/**
  fetch DOM re-draw
*/
function fetchDom(dom, method) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var path = '/fetchdom';
  var buffer = { doms: [] };
  buffer.doms.push([dom, method, data]);
  $.post(path, buffer, function (ret, textStatus, jqXHR) {
    console.log(ret);
    ret.doms = ret.doms || [];
    redrawDoms(ret.doms);
    if (opt.on_success) {
      opt.on_success(ret);
    }
  });
}

/**
  Asynchronous Queries & Redraw DOM
    method:     query method name
    opt:        query options
    widgets:    draw with result

    return:
      method:   response method name

*/
function Qry(method, opt, widgets) {
  var path = '/aquery';
  var data = [method, opt, widgets];
  $.post(path, data, function (ret, textStatus, jqXHR) {});
};

//  client side JS
var cli_ws = void 0;
var dom_logger = void 0;

// let apple = (a)=>{
//   console.log('APPLE');
// };

var logStr = function logStr(eventStr, msg) {
  var log = '<div>' + eventStr + ': ' + msg + '</div>';
  if (dom_logger) {
    dom_logger.innerHTML += log;
  }
};

var setDomLogger = function setDomLogger(id) {
  dom_logger = document.getElementById(id);
};

var newWS = function newWS(addr) {
  addr = addr || 'localhost:8080';
  addr2 = 'ws://' + addr + '/ws/';
  cli_ws = new WebSocket(addr2);
  ws.onmessage = function (e) {
    logStr('Recieved', e.data);
  };
  ws.onclose = function (e) {
    logStr('Disconnected', e.code + '-' + e.type);
  };
  ws.onerror = function (e) {
    logStr('Error', e.data);
  };
};

// let print = console.log;

// print('app loaded');

console.log('APP LOADED');