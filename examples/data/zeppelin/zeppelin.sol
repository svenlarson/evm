mapping (address => uint256) public balanceOf;

unknown public totalSupply;

function transfer(address _arg0, uint256 _arg1) public {
    require(_arg0);
    require((_arg1 <= balanceOf[msg.sender]));
    balanceOf[msg.sender] -= _arg1;
    balanceOf[_arg0] += _arg1;
    return 1;
}

