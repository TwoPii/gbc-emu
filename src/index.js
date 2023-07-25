import Emulator from "./components/Emulator";

window.onload = () => {
    subscribeToUpload();
};

function subscribeToUpload() {
    document.getElementById("upload").addEventListener("click", (e) => {
        let file = document.getElementById("input-file").files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            var content = e.target.result;
            let emu = new Emulator();
            emu.memory.loadROM(content);
        }
        reader.readAsArrayBuffer(file);
    })
}