import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';

export class LOCAL_VARIABLE {
    readonly name: string;
    readonly label: number;
    readonly data: any;

    constructor(label: number, data: any) {
        this.name = 'Variable';
        this.label = label;
        this.data = data;
    }
}

export class LOCAL_VARIABLE_DECLARATION {
    readonly name: string;
    readonly variable: LOCAL_VARIABLE;

    constructor( variable: LOCAL_VARIABLE) {
        this.name = 'LOCAL_VARIABLE_DECLARATION';
        this.variable = variable;
    }

    toString() {
        return 'declare '+this.variable;
    }
}


export default (opcode: Opcode, state: EVM): void => {
    const pushDataLength = parseInt(opcode.name.replace('PUSH', ''), 10);
    const variable = new LOCAL_VARIABLE(opcode.pc, BigNumber(opcode.pushData!.toString('hex'), 16))
    state.stack.push(variable);
};
