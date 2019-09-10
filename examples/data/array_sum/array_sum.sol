function 3098b74b() public {
    if(0 >= msg.data[(4 + _arg0)]) {
        memory[(20 + (80 + (msg.data[(4 + _arg0)] * 20)))] = 0;
        return memory[(20 + (80 + (msg.data[(4 + _arg0)] * 20))):((20 + (80 + (msg.data[(4 + _arg0)] * 20)))+(20 + ((20 + (80 + (msg.data[(4 + _arg0)] * 20))) - (20 + (80 + (msg.data[(4 + _arg0)] * 20))))))];
    } else {
        require((0 < msg.data[(4 + _arg0)]));
        if(1 >= msg.data[(4 + _arg0)]) goto(d6);
        if(1 < msg.data[(4 + _arg0)]) goto(c0);
        revert("Invalid instruction (0xfe)");
    }
}

