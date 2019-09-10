import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import { MUL } from './mul';
import { MOD } from './mod';
import { LOCAL_VARIABLE } from './push';

export default (opcode: Opcode, state: EVM): void => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    const mod = state.stack.pop();
    if (
        LOCAL_VARIABLE.isInstance(left) &&
        LOCAL_VARIABLE.isInstance(right) &&
        LOCAL_VARIABLE.isInstance(mod)
    ) {
        state.stack.push(left.multiply(right).mod(mod));
    } else if (LOCAL_VARIABLE.isInstance(left) && LOCAL_VARIABLE.isInstance(right)) {
        state.stack.push(new MOD(left.multiply(right), mod));
    } else {
        state.stack.push(new MOD(new MUL(left, right), mod));
    }
};
