import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import { MLOAD } from './mload';

import stringify from '../utils/stringify';
import { LOCAL_VARIABLE } from './push';

export class REVERT {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly memoryStart?: any;
    readonly memoryLength?: any;
    readonly items: any;

    constructor(items: any, memoryStart?: any, memoryLength?: any) {
        this.name = 'REVERT';
        this.wrapped = true;
        if (memoryStart && memoryLength) {
            this.memoryStart = memoryStart;
            this.memoryLength = memoryLength;
        } else {
            this.items = items;
        }
    }

    toString() {
        if (this.items) {
            return 'revert(' + this.items.map((item: any) => stringify(item)).join(', ') + ');';
        } else {
            return (
                'revert(memory[' +
                stringify(this.memoryStart) +
                ':(' +
                stringify(this.memoryStart) +
                '+' +
                stringify(this.memoryLength) +
                ')]);'
            );
        }
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const memoryStart = state.stack.pop();
    const memoryLength = state.stack.pop();
    state.halted = true;
    if (LOCAL_VARIABLE.isInstance(memoryStart) && LOCAL_VARIABLE.isInstance(memoryLength)) {
        const items = [];
        for (
            let i = memoryStart.toJSNumber();
            i < memoryStart.add(memoryLength).toJSNumber();
            i += 32
        ) {
            if (i in state.memory) {
                items.push(state.memory[i]);
            } else {
                items.push(new MLOAD(i));
            }
        }
        state.instructions.push(new REVERT(items));
    } else {
        state.instructions.push(new REVERT([], memoryStart, memoryLength));
    }
};
