var site = location;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'report_back') {
        var filename = site.pathname.replace('/planner/', '').slice(0, -1);
        filename = (filename != "") ? filename : "Farm";
        downloadFarm(filename);
        sendResponse(filename);
    }
});

function downloadFarm(filename) {
    var actualCode = "var a = document.createElement('a');";
    actualCode += "a.href = URL.createObjectURL(new Blob([JSON.stringify(board.exportData())], {type: 'text/json'}));";
    actualCode += `a.download = "${filename}.json";`;
    actualCode += "a.click();";

    var script = document.createElement('script');
    script.textContent = actualCode;
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
}