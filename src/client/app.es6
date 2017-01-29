// app.js

/**
  is array ?
*/
function isArray(o) {
  if (Array.isArray)
    return Array.isArray(o);
  else {
    return (o instanceof Array);
  }
}

/**
  is empty object ?
*/
function isEmptyObject(o) {
  return (Object.keys(o).length===0);
};

/**
  string.format
*/
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
};


/**
  for jQuery DOM remove event hooking
*/
(function($){
  $.event.special.destroyed = {
    remove: function(o) {
      if (o.handler) {
        o.handler()
      }
    }
  }
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
function library(fname,cname) {
  System.import(a+'.js').then(function(m) {
    console.log('library loaded ',fname,cname);
  }, console.error.bind(console));
};

//  React Aliasing
let React = {};
if (preact) {
  console.log("preact object EXIST!");
  React.createElement = preact.h;
  if (React) {
    //
    console.log("React object EXIST!");
    if (React.createElement) {
      console.log("React.createElement object EXIST!");
    };
  };
};
