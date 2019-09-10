import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';
import { LOCAL_VARIABLE } from './push';

export class BYTE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly position: any;
    readonly data: any;

    constructor(position: any, data: any) {
        this.name = 'BYTE';
        this.wrapped = true;
        this.position = position;
        this.data = data;
    }

    toString() {
        return '(' + stringify(this.data) + ' >> ' + stringify(this.position) + ') & 1';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const position = state.stack.pop();
    const data = state.stack.pop();
    if (LOCAL_VARIABLE.isInstance(data) && LOCAL_VARIABLE.isInstance(position)) {
        state.stack.push(data.shiftRight(position).and(1));
    } else {
        state.stack.push(new BYTE(position, data));
    }
};
