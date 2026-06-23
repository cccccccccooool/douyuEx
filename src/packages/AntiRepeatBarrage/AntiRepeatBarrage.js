let antiRepeatEnabled = false;
let antiRepeatLastText = "";
let antiRepeatCount = 0;
let antiRepeatClickHandler = null;

function saveData_AntiRepeatBarrage() {
    localStorage.setItem("ExSave_AntiRepeatBarrage", JSON.stringify({ enabled: antiRepeatEnabled }));
}

function antiRepeatBarrage_enable() {
    let button = document.querySelector(".ChatSend-button");
    if (!button) return;
    antiRepeatBarrage_disable();

    antiRepeatClickHandler = function () {
        let text = getBarrageValue();
        if (!text || text.trim() === "") return;
        let clean = text.replace(/\u200B+$/, "");
        if (clean === antiRepeatLastText && clean !== "") {
            antiRepeatCount = antiRepeatCount === 0 ? 1 : 0;
            setBarrageValue(clean + "\u200B".repeat(antiRepeatCount));
            let textarea = document.querySelector("textarea.ChatSend-txt") || document.querySelector("div.ChatSend-txt");
            if (textarea) textarea.dispatchEvent(new Event("input", { bubbles: true }));
        } else {
            antiRepeatLastText = clean;
            antiRepeatCount = 0;
        }
    };

    button.addEventListener("click", antiRepeatClickHandler, true);
}

function antiRepeatBarrage_disable() {
    let button = document.querySelector(".ChatSend-button");
    if (button && antiRepeatClickHandler) {
        button.removeEventListener("click", antiRepeatClickHandler, true);
    }
    antiRepeatClickHandler = null;
}