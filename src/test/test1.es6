//  test1.es6
import chai from 'chai';
let assert = chai.assert;
let expect = chai.expect;
let should = chai.should;
should();

//  for preact
import { h, render, Component } from 'preact';

class Clock extends Component {
  render() {
    let time = new Date().toLocaleTimeString();
    return <span>{ time }</span>;
  }
}

describe('Basic - Let/Const', ()=>{
  it ('Let/Const', ()=>{
    let x = 10;
    let y = x+10;
    assert(x===10);
    assert(y===20);
  });
  it ('Preact Compilation', ()=>{
  });
});
