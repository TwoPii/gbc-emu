import MemoryController from './MemoryController';

class Memory {
    constructor() {
        this.WRAM = new Array(0x2000);
        this.ZRAM = new Array(0x100);
        this.VRAM = new Array(0x2000);
        this.OAM = new Array(0x0100);

        this.P1 = new MemoryRegister(this.ZRAM[0x00]);
        this.DIV = new MemoryRegister(this.ZRAM[0x04]);
        this.TIMA = new MemoryRegister(this.ZRAM[0x05]);
        this.TMA = new MemoryRegister(this.ZRAM[0x06]);
        this.TAC = new MemoryRegister(this.ZRAM[0x07]);
        this.LCDC = new MemoryRegister(this.ZRAM[0x40]);
        this.STAT = new MemoryRegister(this.ZRAM[0x41]);
        this.SCY = new MemoryRegister(this.ZRAM[0x42]);
        this.SCX = new MemoryRegister(this.ZRAM[0x43]);
        this.LY = new MemoryRegister(this.ZRAM[0x44]);
        this.LYC = new MemoryRegister(this.ZRAM[0x45]);
        this.DMA = new MemoryRegister(this.ZRAM[0x46]);
        this.BGP = new MemoryRegister(this.ZRAM[0x47]);
        this.OBP0 = new MemoryRegister(this.ZRAM[0x48]);
        this.OBP1 = new MemoryRegister(this.ZRAM[0x49]);
        this.WY = new MemoryRegister(this.ZRAM[0x4A]);
        this.WX = new MemoryRegister(this.ZRAM[0x4B]);
        this.IF = new MemoryRegister(this.ZRAM[0x0F]);
        this.IE = new MemoryRegister(this.ZRAM[0xFF]);

        this.reset();
    }

    loadROM(arrayBuffer) {
        let rom = new Uint8Array(arrayBuffer);
        console.log(this.getTitle(rom));
        this.controller = new MemoryController(rom);
    }
    
    getTitle(rom) {
        let title = "";
        for (let i = 0x0134; i <= 0x142; i++) {
            let character = rom[i];
            if (character == 0) break;
            else title += String.fromCharCode(character);
        }
        return title;
    }

    reset() {
        this.fill(this.WRAM, 0, this.WRAM.length, 0);
        this.fill(this.ZRAM, 0, this.ZRAM.length, 0);
        this.fill(this.VRAM, 0, this.VRAM.length, 0);
        this.fill(this.OAM, 0, this.OAM.length, 0);

        this.P1.set(0x00);
        this.DIV.set(0x00);
        this.TIMA.set(0x00);
        this.TMA.set(0x00);
        this.TAC.set(0x00);
        this.LCDC.set(0x91);
        this.SCY.set(0x00);
        this.SCX.set(0x00);
        this.LYC.set(0x00);
        this.BGP.set(0xFC);
        this.OBP0.set(0xFF);
        this.OBP1.set(0xFF);
        this.WY.set(0x00);
        this.WX.set(0x00);
        this.IF.set(0x00);
        this.IE.set(0x00);

        this.joypad_buttons = 0xF;
        this.joypad_arrows = 0xF;
    }

    fill(array, start, end, value) {
        for (let i = start; i < end - 1; i++) {
            array[i] = value;
        }
    }

    read(pc) {
        console.log(pc);
    }
} export default Memory;

class MemoryRegister {
    constructor(data) {
        this.value = data;
    }

    get() {
        return this.value
    }

    set(data) {
        this.value = data;
    }

    clear() {
        this.value = 0x00;
    }

    setBit(bit) {
        this.value |= 1 << bit;
    }

    clearBit(bit) {
        this.value &= ~(1 << bit);
    }

    isBitSet(bit){
        return ((this.value >> bit) & 1) ? true : false;
    }
}
