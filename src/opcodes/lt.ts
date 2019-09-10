import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';
import { LOCAL_VARIABLE } from './push';

export class LT {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly left: any;
    readonly right: any;
    readonly equal: boolean;

    constructor(left: any, right: any, equal: boolean = false) {
        this.name = 'LT';
        this.wrapped = true;
        this.left = left;
        this.right = right;
        this.equal = equal;
    }

    toString() {
        if (this.equal) {
            return stringify(this.left) + ' <= ' + stringify(this.right);
        } else {
            return stringify(this.left) + ' < ' + stringify(this.right);
        }
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (LOCAL_VARIABLE.isInstance(left) && LOCAL_VARIABLE.isInstance(right)) {
        state.stack.push(new LOCAL_VARIABLE(opcode.pc, left.lesser(right) === true ? 1 : 0));
    } else {
        state.stack.push(new LT(left, right));
    }
};
