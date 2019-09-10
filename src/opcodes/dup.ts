import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import Stack from '../classes/stack.class';

export default (opcode: Opcode, state: EVM): void => {
    const duplicateLocation = parseInt(opcode.name.replace('DUP', ''), 10) - 1;

    // TODO
    state.stack.duplicate(duplicateLocation);
};
