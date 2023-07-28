import Memory from "./Memory";
import CPU from "./CPU";
import Display from "./Display";

class Emulator {
    constructor() {
        this.memory = new Memory();
        this.cpu = new CPU(this.memory);
        this.display = new Display(this.memory);

        this.cancelled = false;
        this.subscribeToKeyPress();
    }

    run() {
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop() {
        let cycles_per_frame = CPU.CLOCK_SPEED / 60;
        let time_between_frames = 1000 / 60;
        let current_cycle = 0;

        this.handle_events();
        while(current_cycle < cycles_per_frame && !this.cancelled) {
            let code = this.memory.read(this.cpu.reg_PC);
            this.cpu.parseOPCode(code);

            current_cycle++;
        }

        if(!this.cancelled) requestAnimationFrame(this.gameLoop.bind(this));
    }

    handle_events() {

    }

    subscribeToKeyPress(){
        document.onkeydown = (e) => {
            if (e.key == 'q' || e.key == 'x') {
                this.cancelled = true;
            }
        }
    }
}

export default Emulator;