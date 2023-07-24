import MemoryController from "./components/MemoryController";

window.onload = () => {
    subscribeToUpload();
};

function subscribeToUpload() {
    document.getElementById("upload").addEventListener("click", (e) => {
        let file = document.getElementById("input-file").files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            var content = e.target.result;
            loadROM(content);
        }
        reader.readAsArrayBuffer(file);
    })
}

function loadROM(arrayBuffer) {
    let rom = new Uint8Array(arrayBuffer);
    console.log(getTitle(rom));
    let controller = new MemoryController(rom);
}

function getTitle(rom) {
    let title = "";
    for (let i = 0x0134; i <= 0x142; i++) {
        let character = rom[i];
        if (character == 0) break;
        else title += String.fromCharCode(character);
    }
    return title;
}