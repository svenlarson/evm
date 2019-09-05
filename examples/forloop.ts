import { EVM } from '../src/index';
const code =
    '608060405260043610603e5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416639b76cd3681146043575b600080fd5b348015604e57600080fd5b506058600435606a565b60408051918252519081900360200190f35b6000805b8281101560805790810190600101606e565b509190505600a165627a7a72305820a0ce823f1f2be26bf4e0c3ebc31d9eef7b03299f826eba4343454583bf00ba610029';
const evm = new EVM(code);
evm.logdirectory = 'log/';
console.log(evm.decompile());

/*
pragma solidity ^0.4.24;

contract SumArray {
    event HelloWorld(string);

    function _sumEther(uint256 _x)
        public 
        pure 
        returns (uint sum_) 
    {
        sum_ = 0;
        for (uint i = 0; i < _x; i++) {
            sum_ += i;
        }
        return sum_;
    }
}
*/
