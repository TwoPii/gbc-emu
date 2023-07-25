class MemoryController {
    rom_bank_id = 1;
    ram_bank_id = 0;

    ram_bank_enabled = false;
    ram_access_enabled = false;
    rtc_enabled = false;
    mode = 0;
    mode_rom = 0;
    mode_ram = 1;

    constructor(buffer) {
        this.rom = buffer;
        this.eram = new Uint8Array(0x8000);
    }

    getRam() {
        return this.eram;
    }

    setRam(eram) {
        this.eram = eram;
    }

    read(location) {
        if (location >= 0x0000 && location <= 0x3FFF) return this.rom[location];
        else if (location >= 0x4000 && location <= 0x7FFF) {
            let offset = location - 0x4000;
            let lookup = (rom_bank_id * 0x4000) + offset;
            return this.rom[lookup]
        }
        else if (location >= 0xA000 && location <= 0xBFFF) {
            if (this.rtc_enabled) return 0x00;
            if (!this.ram_access_enabled) return false;
            let offset = location - 0xA000;
            let lookup = (this.ram_bank_id * 0x2000) + offset;
            return this.eram[lookup];
        }
    }

    write(location, data) {
        if (location >= 0x000 && location <= 0x1FFF) {
            if ((data & 0x0A) > 0) {
                this.ram_access_enabled = true;
                this.rtc_enabled = true;
            }
            else {
                this.ram_access_enabled = false;
                this.rtc_enabled = false;
            }
        }

        else if (location >= 0x2000 && location <= 0x3FFF){
            this.rom_bank_id = data & 0x7F;

            if (this.rom_bank_id == 0) this.rom_bank_id++;
        }
        
        else if (location >= 0x4000 && location <= 0x5FFF) {
            if (data <= 0x3) {
                this.rtc_enabled = false;
                this.ram_bank_id = data;
            }
            else if (data >= 0x08 && data <= 0x0C) this.rtc_enabled = true;
        
        }

        else if (location >= 0xA000 && location <= 0xBFFF){
            if (!this.rtc_enabled){
                if (!this.ram_access_enabled) return;
                let offset = location - 0xA000;
                let lookup = (this.ram_bank_id * 0x2000) + offset;

                this.eram[lookup] = data;
            }
        }
    }

    save_state(stream) {
        
    }

    load_state(file) {
        
    }
}

export default MemoryController;