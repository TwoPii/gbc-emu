import MemoryController from './MemoryController';

class Memory {
    constructor() {
        this.WRAM = new Array(0x2000);
        this.ZRAM = new Array(0x100);
        this.VRAM = new Array(0x2000);
        this.OAM = new Array(0x0100);

        this.ZRAMRegs = {
            P1 : 0x00, DIV: 0x04, TIMA: 0x05, TMA: 0x06,
            TAC: 0x07, LCDC: 0x40, STAT: 0x41, SCY: 0x42,
            SCX: 0x43, LY: 0x44, LYC: 0x45, DMA: 0x46,
            BGP: 0x47, OBP0: 0x48, OBP1: 0x49, WY: 0x4A,
            WX: 0x4B, IF: 0x0F, IE: 0xFF
        }

        this.reset();
    }

    setReg(reg, value) {
        this.ZRAM[this.ZRAMRegs[reg]] = value;
    }

    getReg(reg) {
        return this.ZRAM[this.ZRAMRegs[reg]];
    }

    clearReg(reg) {
        this.ZRAM[this.ZRAMRegs[reg]] = 0x00;
    }

    setBit(reg, bit) {
        this.ZRAM[this.ZRAMRegs[reg]] |= 1 << bit;
    }

    clearBit(reg, bit) {
        this.ZRAM[this.ZRAMRegs[reg]] &= ~(1 << bit);
    }

    isBitSet(reg, bit){
        return ((this.ZRAM[this.ZRAMRegs[reg]] >> bit) & 1) ? true : false;
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

        this.setReg('R1', 0x00);
        this.setReg('DIV', 0x00);
        this.setReg('TIMA', 0x00);
        this.setReg('TMA', 0x00);
        this.setReg('TAC', 0x00);
        this.setReg('LCDC', 0x91);
        this.setReg('SCY', 0x00);
        this.setReg('SCX', 0x00);
        this.setReg('LYC', 0x00);
        this.setReg('BGP', 0xFC);
        this.setReg('OBP0', 0xFF);
        this.setReg('OBP1', 0xFF);
        this.setReg('WY', 0x00);
        this.setReg('WX', 0x00);
        this.setReg('IF', 0x00);
        this.setReg('IE', 0x00);

        this.joypad_buttons = 0xF;
        this.joypad_arrows = 0xF;
    }

    fill(array, start, end, value) {
        for (let i = start; i < end - 1; i++) {
            array[i] = value;
        }
    }

    read(location) {
        switch (location & 0xF000) {
            case 0x0000:
            case 0x1000:
            case 0x2000:
            case 0x3000:
            case 0x4000:
            case 0x5000:
            case 0x6000:
            case 0x7000:
                return this.controller.read(location);
            case 0x8000:
            case 0x9000:
                return this.VRAM[location & 0x1FFF]
            case 0xA000:
            case 0xB000:
                return this.controller.read(location);
            case 0xC000:
            case 0xD000:
            case 0xE000:
                return this.WRAM[location & 0x1FFF];
            case 0xF000:
                if (location & 0x0F00 != 0xE00 || location & 0x0F00 != 0xF00){
                    return this.WRAM[location & 0x1FFF];
                }
                else if (location & 0x0F00 == 0xE00) {
                    return this.OAM[location & 0xFF];
                }
                else {
                    return (location == 0xFF00) ? this.getJoypadState() : this.ZRAM[location & 0xFF];
                }
            default:
                return 0xFF;
        }
    }

    getJoypadState(){
        let P1 = this.getReg('P1');
        switch (P1) {
            case 0x10:
                return this.joypad_buttons;
            case 0x20:
                return this.joypad_arrows;
            default:
                return 0xFF;
        }
    }
} export default Memory;
