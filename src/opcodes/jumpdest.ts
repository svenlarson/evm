import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';


export class LABEL {
    readonly name: string;
    readonly location: string;

    constructor(location: any) {
        this.name = 'LABEL';
        this.location = location;
    }

    toString() {
        return "label_"+this.location;
    }
}


export default (opcode: Opcode, state: EVM): void => {
    state.instructions.push(new LABEL(opcode.pc.toString(16)));
};
