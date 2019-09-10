import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';
import { LOCAL_VARIABLE } from './push';

export class AND {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly left: any;
    readonly right: any;

    constructor(left: any, right: any) {
        this.name = 'AND';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }

    toString() {
        return stringify(this.left) + ' && ' + stringify(this.right);
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (LOCAL_VARIABLE.isInstance(left) && LOCAL_VARIABLE.isInstance(right)) {
        state.stack.push(left.and(right));
    } else if (LOCAL_VARIABLE.isInstance(left) && /^[f]+$/.test(left.toString(16))) {
        right.size = left.toString(16).length;
        state.stack.push(right);
    } else if (LOCAL_VARIABLE.isInstance(right) && /^[f]+$/.test(right.toString(16))) {
        left.size = right.toString(16).length;
        state.stack.push(left);
        /*} else if (
        LOCAL_VARIABLE.isInstance(left) &&
        left.equals('1461501637330902918203684832716283019655932542975')
    ) {*/
        /* 2 ** 160 */
        /*    state.stack.push(right);
    } else if (
        LOCAL_VARIABLE.isInstance(right) &&
        right.equals('1461501637330902918203684832716283019655932542975')
    ) {*/
        /* 2 ** 160 */
        /*    state.stack.push(left);*/
    } else if (
        LOCAL_VARIABLE.isInstance(left) &&
        right instanceof AND &&
        LOCAL_VARIABLE.isInstance(right.left) &&
        left.equals(right.left)
    ) {
        state.stack.push(right.right);
    } else {
        state.stack.push(new AND(left, right));
    }
};
