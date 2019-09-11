import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Stack from '../classes/stack.class';
import { LOCAL_VARIABLE, LOCAL_VARIABLE_DECLARATION } from './push';

export default (opcode: Opcode, state: EVM): void => {
    const duplicateLocation = parseInt(opcode.name.replace('DUP', ''), 10) - 1;

// TODO
    state.stack.duplicate(duplicateLocation);

    const variable = new LOCAL_VARIABLE(opcode.pc, state.stack.pop());
    state.stack.push(variable);
    state.instructions.push(new LOCAL_VARIABLE_DECLARATION(variable));


};
