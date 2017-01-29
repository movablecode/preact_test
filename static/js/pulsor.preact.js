"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var PulsorPreactComponent = exports.PulsorPreactComponent = function (_preact$Component) {
  _inherits(PulsorPreactComponent, _preact$Component);

  function PulsorPreactComponent(props) {
    _classCallCheck(this, PulsorPreactComponent);

    var _this = _possibleConstructorReturn(this, (PulsorPreactComponent.__proto__ || Object.getPrototypeOf(PulsorPreactComponent)).call(this, props));

    var bindings = props.bindings;
    props.subscriptions = [];
    if (!isArray(bindings)) {
      bindings = [bindings];
    }
    var initial = {};
    bindings.forEach(function (binding) {
      var model = binding.model;delete binding.model;
      var id = binding.id;delete binding.id;
      Object.assign(initial, binding);
      Pulsor.upsert(model, id, binding);
      props.subscriptions.push([model, id, binding.keys()]);
    });
    _this.state = initial;
    return _this;
  }

  _createClass(PulsorPreactComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _get(PulsorPreactComponent.prototype.__proto__ || Object.getPrototypeOf(PulsorPreactComponent.prototype), "componentDidMount", this).call(this);
      this.props.forEach(function (subs) {
        Pulsor.mount([[subs[0], subs[1]], subs[2]], _this2);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(PulsorPreactComponent.prototype.__proto__ || Object.getPrototypeOf(PulsorPreactComponent.prototype), "componentWillUnmount", this).call(this);
      Pulsor.unmount(this);
    }


  }, {
    key: "emit",
    value: function emit(obj) {
      var data = {};
      var index = 0;
      while (index < obj.length) {
        data[obj[index]] = obj[index + 1];
        index += 2;
      }

      this.setState(data);
    }
  }]);

  return PulsorPreactComponent;
}(preact.Component);

;

(function () {
  Pulsor.Component = PulsorPreactComponent;
})();