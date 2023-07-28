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
        this.bg_array = this.getFilledDisplay(255, 0, 255, 255);
        this.window_array = this.getFilledDisplay(0, 0, 0, 0);
        this.sprites_array = this.getFilledDisplay(0, 0, 0, 0);

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

    getFilledDisplay(r, g, b, a) {
        let array = new Uint8ClampedArray(160*144*4*this.scale);
        for (let i = 0; i < array.length; i+= 4*this.scale) {
            for (let j = 0; j < this.scale; j++) {
                array[i + j] = r;
                array[i + j * 1] = g;
                array[i + j * 2] = b;
                array[i + j * 3] = a;
            }
        }
        return array;
    }

    render() {
        if (!this.isLCDEnabled()) return;

        this.context.clearRect(0, 0, this.width * this.scale, this.height * this.scale);
        this.sprites_array = this.getFilledDisplay(0, 0, 0, 0);

        let doSprites = this.memory.isBitSet('LCDC', 1);
        if (doSprites) renderSprites();

        //Continue render method.

        let windowImage = new ImageData(this.window_array, 160 * this.scale);
        let bgImage = new ImageData(this.bg_array, 160 * this.scale);
        let spritesImage = new ImageData(this.sprites_array, 160 * this.scale);

        this.context.putImageData(bgImage, 0, 0);
        this.context.putImageData(windowImage, 0, 0);
        this.context.putImageData(spritesImage, 0, 0);
    }

    isLCDEnabled() {
        return this.memory.isBitSet('LCDC', 7);
    }

    renderSprites() {
        //Add rendering of sprites.
    }
}
export default Display;