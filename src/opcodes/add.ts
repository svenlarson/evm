import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';
import { LOCAL_VARIABLE } from './push';

export class ADD {
    readonly name: string;
    readonly wrapped: boolean;
    readonly left: any;
    readonly right: any;

    constructor(left: any, right: any) {
        this.name = 'ADD';
        this.wrapped = true;
        this.left = left;
        this.right = right;
    }

    toString() {
        return stringify(this.left) + ' + ' + stringify(this.right);
    }

    get type() {
        if (this.left.type === this.right.type) {
            return this.left.type;
        } else if (!this.left.type && this.right.type) {
            return this.right.type;
        } else if (!this.right.type && this.left.type) {
            return this.left.type;
        } else {
            return false;
        }
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const left = state.stack.pop();
    const right = state.stack.pop();
    if (LOCAL_VARIABLE.isInstance(left) && LOCAL_VARIABLE.isInstance(right)) {
        state.stack.push(left.add(right));
    } else if (LOCAL_VARIABLE.isInstance(left) && left.isZero()) {
        state.stack.push(right);
    } else if (LOCAL_VARIABLE.isInstance(right) && right.isZero()) {
        state.stack.push(left);
    } else {
        state.stack.push(new ADD(left, right));
    }
};
