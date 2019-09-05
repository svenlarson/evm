import { EVM } from '../src/index';
import * as functionData from './data/nested_functions.functions.json';

const code =
    '60806040526004361060525763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416637ce339b881146057578063d036bce2146081578063fb1c3461146096575b600080fd5b348015606257600080fd5b50606f60043560243560ae565b60408051918252519081900360200190f35b348015608c57600080fd5b50606f60043560bb565b34801560a157600080fd5b50606f60043560243560d5565b6002026008919091020390565b600060cf8260c8848560d5565b60020260ae565b92915050565b60050260039190910201905600a165627a7a72305820d97b7f70d68dc486c44d44e58813c6e420d01ffe02eef38f8451c49bfe7629be0029';
const evm = new EVM(code);

evm.functionInfo = functionData;
console.log(evm.decompile());

/*
pragma solidity ^0.4.24;

contract NestedFunctions {
  
  function _calculatePercent(uint256 a_,uint256 b_) public pure returns (uint256) {
    return 3*a_+5*b_;
  }

  function _calculateTimeBonus(uint256 a_,uint256 b_) public pure returns (uint256) {
    return 8*a_-2*b_;
  }

  function _calculateTokens(uint256 a_) public pure returns (uint256) {
    return _calculateTimeBonus(a_, 2*(_calculatePercent(a_, a_)));
  }
}
*/
