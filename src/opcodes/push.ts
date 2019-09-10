import EVM from '../classes/evm.class';
import Opcode from '../interfaces/opcode.interface';
import * as BigNumber from '../../node_modules/big-integer';

export class LOCAL_VARIABLE {
    static isInstance(a: any) {
        return a.isConstant && BigNumber.isInstance(a.data);
    }

    readonly name: string;
    readonly label: number;
    readonly data: any;
    isConstant: boolean;

    constructor(label: number, data: any) {
        this.name = 'Variable';
        this.label = label;
        this.data = data;
        this.isConstant = true;// (BigNumber.isInstance(data) && data.equals(0)) ? false: true;
    }

    add(left: any): any {
        if (BigNumber.isInstance(left) || typeof left === 'number') {
            return new LOCAL_VARIABLE(this.label*10, this.data.add(left));
        } else {
            return new LOCAL_VARIABLE(this.label*10, this.data.add(left.data))
        }
    }

    subtract(left: any): any {
        if (BigNumber.isInstance(left) || typeof left === 'number') {
            return new LOCAL_VARIABLE(this.label*10, this.data.subtract(left));
        } else {
            return new LOCAL_VARIABLE(this.label*10, this.data.subtract(left.data));
        }
    }

    divide(left: any): any {
        if (BigNumber.isInstance(left) || typeof left === 'number') {
            return new LOCAL_VARIABLE(this.label*10, this.data.divide(left));
        } else {
            return new LOCAL_VARIABLE(this.label*10, this.data.divide(left.data));
        }
    }

    multiply(left: any): any {
        if (BigNumber.isInstance(left) || typeof left === 'number') {
            return new LOCAL_VARIABLE(this.label*10, this.data.multiply(left));
        } else {
            return new LOCAL_VARIABLE(this.label*10, this.data.multiply(left.data));
        }
    }


    mod(left: any): any {
        if (BigNumber.isInstance(left) || typeof left === 'number') {
            return new LOCAL_VARIABLE(this.label*10, this.data.mod(left));
        } else {
            return new LOCAL_VARIABLE(this.label*10, this.data.mod(left.data));
        }
    }

    toJSNumber(): number {
        return this.data.toJSNumber();
    }

    isZero(): boolean {
        return this.data.isZero();
    }

    equals(a: any): number {
        return this.data.equals(a);
    }

    toString(a: any): string {
        return this.data.toString(a);
    }
}

export class LOCAL_VARIABLE_DECLARATION {
    readonly name: string;
    readonly variable: LOCAL_VARIABLE;

    constructor(variable: LOCAL_VARIABLE) {
        this.name = 'LOCAL_VARIABLE_DECLARATION';
        this.variable = variable;
    }

    toString() {
        return 'declare var_' + this.variable.label + '=' +this.variable.data;
    }
}

export default (opcode: Opcode, state: EVM): void => {
    // const pushDataLength = parseInt(opcode.name.replace('PUSH', ''), 10);
    const variable = new LOCAL_VARIABLE(opcode.pc, BigNumber(opcode.pushData!.toString('hex'), 16));
    state.stack.push(variable);
    // state.instructions.push(new LOCAL_VARIABLE_DECLARATION(variable));

    // const variable = BigNumber(opcode.pushData!.toString('hex'), 16);
    // state.stack.push(variable);
};
