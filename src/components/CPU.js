class CPU {
    static get CLOCK_SPEED() { return 4194304; }
    static get FLAG_ZERO() { return 0b10000000; }
    static get FLAG_SUB() { return 0b01000000; }
    static get FLAG_HALF_CARRY() { return 0b00100000; }
    static get FLAG_CARRY() { return 0b00010000; }
    
    constructor(memory) {
        this.memory = memory;
        this.reset();
    }

    reset() {
        this.reg_A = 0x01;
        this.reg_B = 0x00;
        this.reg_C = 0x13;
        this.reg_D = 0x00;
        this.reg_E = 0xD8;
        this.reg_F = 0xB0;
        this.reg_H = 0x01;
        this.reg_L = 0x4D;
        this.reg_SP = 0xFFFE;
        this.reg_PC = 0x100;
    }
}

export default CPU;