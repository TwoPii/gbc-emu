class Display {
    static get COLOR_WHITE() { return 0; }
    static get COLOR_LIGHT_GRAY() { return 1; }
    static get COLOR_DARK_GRAY() { return 2; }
    static get COLOR_BLACK() { return 3; }

    constructor(memory) {
        this.memory = memory;
        this.scale = 1;
        this.width = 160;
        this.height = 144;
        this.emulate_pallete = true;
        this.debug_enabled = false;
        this.force_bg_map = false;
        this.force_bg_loc = false;
        this.scanlines_rendered = 0;
        this.shades_of_gray = new Array(4);

        this.canvas = document.createElement('canvas');
        this.canvas.id ="display";
        this.canvas.width = this.width * this.scale;
        this.canvas.height = this.height * this.scale;
        this.canvas.style.border = "1px solid";

        var body = document.getElementsByTagName("body")[0];
        body.appendChild(this.canvas);

        this.context = this.canvas.getContext("2d"); 

        this.shades_of_gray[0x0] = "rgb(255, 255, 255)";
        this.shades_of_gray[0x1] = "rgb(198, 198, 198)";
        this.shades_of_gray[0x2] = "rgb(127, 127, 127))";
        this.shades_of_gray[0x3] = "rgb(0, 0, 0)";
    }

    getBgArray() {
        ctx.rect(0,0,160, 144),
        ctx.fillStyle= "rgb(255, 0, 255)";
        ctx.fill();
    }

    getWindowArray() {
        ctx.rect(0,0,160, 144),
        ctx.fillStyle= "rgba(0, 0, 0, 0))";
        ctx.fill();
    }

    getSpritesArray() {
        ctx.rect(0,0,160, 144),
        ctx.fillStyle= "rgba(0, 0, 0, 0)";
        ctx.fill();
    }
}
export default Display;