import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';
import { LOCAL_VARIABLE } from './push';

export class MUL {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly left: any;
    readonly right: any;

    constructor(left: any, right: any) {
        this.name = 'MUL';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }

    toString() {
        return stringify(this.left) + ' * ' + stringify(this.right);
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (LOCAL_VARIABLE.isInstance(left) && LOCAL_VARIABLE.isInstance(right)) {
        state.stack.push(left.multiply(right));
    } else if (
        (LOCAL_VARIABLE.isInstance(left) && left.isZero()) ||
        (LOCAL_VARIABLE.isInstance(right) && right.isZero())
    ) {
        state.stack.push(new LOCAL_VARIABLE(opcode.pc, 0));
    } else {
        state.stack.push(new MUL(left, right));
    }
};
