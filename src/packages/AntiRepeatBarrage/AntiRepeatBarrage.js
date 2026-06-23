let antiRepeatEnabled = false;
let antiRepeatLastText = "";
let antiRepeatCount = 0;
let antiRepeatClickHandler = null;

function initPkg_AntiRepeatBarrage() {
    initPkg_AntiRepeatBarrage_Dom();
    initPkg_AntiRepeatBarrage_Set();
    initPkg_AntiRepeatBarrage_Func();
}

function initPkg_AntiRepeatBarrage_Dom() {
    let panel = document.querySelector(".ChatToolBar-DanmakuTail-Panel");
    if (!panel) return;
    let label = document.createElement("label");
    label.className = "DanmakuTail-checkbox-label";
    label.innerHTML = '<input type="checkbox" id="AntiRepeatBarrage-checkbox" /> 防重复弹幕';
    panel.appendChild(label);
}

function initPkg_AntiRepeatBarrage_Set() {
    let ret = localStorage.getItem("ExSave_AntiRepeatBarrage");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        antiRepeatEnabled = Boolean(retJson.enabled);
        let checkbox = document.getElementById("AntiRepeatBarrage-checkbox");
        if (checkbox) checkbox.checked = antiRepeatEnabled;
    }
    if (antiRepeatEnabled) {
        antiRepeatBarrage_enable();
    }
}

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
        let clean = text.replace(/​+$/, "");
        if (clean === antiRepeatLastText && clean !== "") {
            antiRepeatCount++;
            setBarrageValue(clean + "​".repeat(antiRepeatCount));
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

function initPkg_AntiRepeatBarrage_Func() {
    let checkbox = document.getElementById("AntiRepeatBarrage-checkbox");
    if (!checkbox) return;
    checkbox.addEventListener("change", function () {
        antiRepeatEnabled = this.checked;
        saveData_AntiRepeatBarrage();
        if (antiRepeatEnabled) {
            antiRepeatBarrage_enable();
        } else {
            antiRepeatBarrage_disable();
        }
    });
}