import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';
import { LOCAL_VARIABLE } from './push';

export class SIG {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly hash: string;

    constructor(hash: string) {
        this.name = 'SIG';
        this.wrapped = false;
        this.hash = hash;
    }

    toString() {
        return 'msg.sig == ' + this.hash;
    }
}

export class EQ {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly left: any;
    readonly right: any;

    constructor(left: any, right: any) {
        this.name = 'EQ';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }

    toString() {
        return stringify(this.left) + ' == ' + stringify(this.right);
    }
}

export default (opcode: Opcode, state: EVM): void => {
    let left = state.stack.pop();
    let right = state.stack.pop();
    if (LOCAL_VARIABLE.isInstance(left) && LOCAL_VARIABLE.isInstance(right)) {
        state.stack.push(new LOCAL_VARIABLE(opcode.pc, left.equals(right) === true ? 1 : 0));
    } else {
        if (
            LOCAL_VARIABLE.isInstance(left) &&
            right.name === 'DIV' &&
            LOCAL_VARIABLE.isInstance(right.right)
        ) {
            left = left.multiply(right.right);
            right = right.left;
        }
        if (
            LOCAL_VARIABLE.isInstance(right) &&
            left.name === 'DIV' &&
            LOCAL_VARIABLE.isInstance(left.right)
        ) {
            right = right.multiply(left.right);
            left = left.left;
        }
        if (
            LOCAL_VARIABLE.isInstance(left) &&
            /^[0]+$/.test(left.toString(16).substring(8)) &&
            right.name === 'CALLDATALOAD' &&
            right.location.equals(0)
        ) {
            state.stack.push(
                new SIG(
                    '0'.repeat(64 - left.toString(16).length) +
                        left.toString(16).substring(0, 8 - (64 - left.toString(16).length))
                )
            );
        } else if (
            // this should be true
            LOCAL_VARIABLE.isInstance(right) &&
            /^[0]+$/.test(right.toString(16).substring(8)) &&
            left.name === 'CALLDATALOAD' &&
            left.location.equals(0)
        ) {
            state.stack.push(
                new SIG(
                    '0'.repeat(64 - right.toString(16).length) +
                        right.toString(16).substring(0, 8 - (64 - right.toString(16).length))
                )
            );
        } else {
            state.stack.push(new EQ(left, right));
        }
    }
};
