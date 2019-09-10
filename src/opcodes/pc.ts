import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import { LOCAL_VARIABLE } from './push';

export default (opcode: Opcode, state: EVM): void => {
    state.stack.push(new LOCAL_VARIABLE(opcode.pc, opcode.pc));
};
