import Memory from "./Memory";
import CPU from "./CPU";
import Display from "./Display";

class Emulator {
    constructor() {
        this.memory = new Memory();
        this.cpu = new CPU(this.memory);
        this.display = new Display(this.memory);
    }

    run() {
        while(true) {
            let cycles_per_frame = this.cpu.CLOCK_SPEED / 60;
            let time_between_frames = 1000 / 60;
            let current_cycle = 0;

            this.handle_events();

            while(current_cycle < cycles_per_frame) {
                let code = this.memory.read(this.cpu.reg_PC);
            }
        }
    }

    handle_events() {

    }
}

export default Emulator;