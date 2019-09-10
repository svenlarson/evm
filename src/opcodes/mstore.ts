import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';
import { LOCAL_VARIABLE } from './push';

export class MSTORE {
    readonly name: string;
    readonly type?: string;
    readonly wrapped: boolean;
    readonly location: any;
    readonly data: any;

    constructor(location: any, data: any) {
        this.name = 'MSTORE';
        this.wrapped = true;
        this.location = location;
        this.data = data;
    }

    toString() {
        return 'memory[' + stringify(this.location) + '] = ' + stringify(this.data) + ';';
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const storeLocation = state.stack.pop();
    const storeData = state.stack.pop();
    if (LOCAL_VARIABLE.isInstance(storeLocation)) {
        state.memory[storeLocation.toJSNumber()] = storeData;
    } else {
        state.instructions.push(new MSTORE(storeLocation, storeData));
    }
};
