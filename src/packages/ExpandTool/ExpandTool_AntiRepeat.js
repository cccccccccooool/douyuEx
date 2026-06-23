function initPkg_ExpandTool_AntiRepeat() {
    ExpandTool_AntiRepeat_insertDom();
    ExpandTool_AntiRepeat_insertFunc();
    initPkg_ExpandTool_AntiRepeat_Set();
}

function ExpandTool_AntiRepeat_insertDom() {
    let a = document.createElement("span");
    a.innerHTML = '<label title="发送重复弹幕时自动在末尾追加不可见字符绕过服务端检测，对+1功能同样生效"><input id="extool__antirepeat" type="checkbox">防重复弹幕</label>';
    let b = document.getElementsByClassName("extool")[0];
    b.insertBefore(a, b.childNodes[0]);
}

function ExpandTool_AntiRepeat_insertFunc() {
    document.getElementById("extool__antirepeat").addEventListener("click", function () {
        antiRepeatEnabled = this.checked;
        saveData_AntiRepeatBarrage();
        if (antiRepeatEnabled) {
            antiRepeatBarrage_enable();
        } else {
            antiRepeatBarrage_disable();
        }
    });
}

function initPkg_ExpandTool_AntiRepeat_Set() {
    let ret = localStorage.getItem("ExSave_AntiRepeatBarrage");
    if (ret != null) {
        let retJson = JSON.parse(ret);
        antiRepeatEnabled = Boolean(retJson.enabled);
        document.getElementById("extool__antirepeat").checked = antiRepeatEnabled;
    }
    if (antiRepeatEnabled) {
        antiRepeatBarrage_enable();
    }
}