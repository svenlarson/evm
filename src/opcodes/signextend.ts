import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import { SHL } from './shl';
import { SAR } from './sar';
import { SUB } from './sub';
import { LOCAL_VARIABLE } from './push';

export default (opcode: Opcode, state: EVM): void => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (LOCAL_VARIABLE.isInstance(left) && LOCAL_VARIABLE.isInstance(right)) {
        state.stack.push(
            right
                .shiftLeft(new LOCAL_VARIABLE(opcode.pc, 32).subtract(left))
                .shiftRight(new LOCAL_VARIABLE(opcode.pc, 32).subtract(left))
        );
    } else if (LOCAL_VARIABLE.isInstance(left)) {
        state.stack.push(
            new SAR(
                new SHL(right, new LOCAL_VARIABLE(opcode.pc, 32).subtract(left)),
                new LOCAL_VARIABLE(opcode.pc, 32).subtract(left)
            )
        );
    } else {
        state.stack.push(
            new SAR(
                new SHL(right, new SUB(new LOCAL_VARIABLE(opcode.pc, 32), left)),
                new SUB(new LOCAL_VARIABLE(opcode.pc, 32), left)
            )
        );
    }
};
