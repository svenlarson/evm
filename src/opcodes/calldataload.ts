import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import stringify from '../utils/stringify';
import { LOCAL_VARIABLE } from './push';

export class CALLDATALOAD {
    readonly name: string;
    readonly type?: string;
    readonly returntype?: string;
    readonly wrapped: boolean;
    readonly location: any;

    constructor(location: any) {
        this.name = 'CALLDATALOAD';
        this.wrapped = false;
        this.location = location;
    }

    toString() {
        if (LOCAL_VARIABLE.isInstance(this.location) && this.location.isZero()) {
            return 'msg.data';
        } else if (
            LOCAL_VARIABLE.isInstance(this.location) &&
            this.location
                .subtract(4)
                .mod(32)
                .isZero()
        ) {
            return (
                '_arg' +
                this.location
                    .subtract(4)
                    .divide(32)
                    .toString()
            );
        } else {
            return 'msg.data[' + stringify(this.location) + ']';
        }
    }
}

export default (opcode: Opcode, state: EVM): void => {
    const startLocation = state.stack.pop();
    state.stack.push(new CALLDATALOAD(startLocation));
};
