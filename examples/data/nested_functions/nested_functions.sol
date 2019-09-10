function _calculateTimeBonus(uint256 _arg0, uint256 _arg1) public view {
    return(((8 * _arg0) - (2 * _arg1)));
}

function _calculateTokens(uint256 _arg0) public view {
    return(((8 * _arg0) - (2 * (2 * ((3 * _arg0) + (5 * _arg0))))));
}

function _calculatePercent(uint256 _arg0, uint256 _arg1) public view {
    return(((3 * _arg0) + (5 * _arg1)));
}

