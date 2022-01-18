chrome.commands.onCommand.addListener(async (command) => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript(
        {
            target: {tabId: tab.id},
            func: execute,
            args: [element]
        },
        () => {
        });
});

function execute(element) {
    let body = document.querySelector('body');
    let wrapper = document.getElementById('wrapperhider');

    if (wrapper) {
        wrapper.remove();
    } else {
        body.insertAdjacentHTML('afterbegin', element);
        wrapper = document.getElementById('wrapperhider');
        let top = document.getElementById('tophider');
        let bottom = document.getElementById('bottomhider');
        let fontSize = 18;
        let mousePosition = {
            x: window.innerWidth/2,
            y: window.innerHeight/2
        }
        let setMousePosition = function (x,y){
            mousePosition.x = x;
            mousePosition.y = y;
        }
        let setHidersHeight = function () {
            top.style.top = (mousePosition.y - fontSize / 2) - window.innerHeight + 'px';
            bottom.style.top = (mousePosition.y + fontSize / 2) + 'px';
        }
        let setHidersOpacity = function (val) {
            top.style.opacity = val + '%';
            bottom.style.opacity = val + '%';
        }
        let keydownCallback = function (e) {
            if(e.key === '+' || e.key === '='){
                fontSize++;
            }
            if(e.key === '-'){
                fontSize--;
            }
            setHidersHeight();
        }
        wrapper.addEventListener("mousemove", function (e) {
            setMousePosition(e.clientX, e.clientY);
            setHidersHeight();
        });
        wrapper.addEventListener("mousedown", function (e) {
            setHidersOpacity(30);
            document.addEventListener("keydown", keydownCallback);
        });
        wrapper.addEventListener("mouseup", function (e) {
            setHidersOpacity(95);
            document.removeEventListener("keydown", keydownCallback);
        });
    }
}


let element = "<div id=\"wrapperhider\">\n" +
    "  <div id=\"tophider\"></div>\n" +
    "  <div id=\"bottomhider\"></div>\n" +
    "\n" +
    "  <style>\n" +
    "    #wrapperhider {\n" +
    "      position: fixed;\n" +
    "      top:0;\n" +
    "      left:0;\n" +
    "      width: 100%;\n" +
    "      height: 100vh;\n" +
    "      z-index: 10000;\n" +
    "      background: transparent;\n" +
    "      font-size: 0;\n" +
    "      cursor: none;\n" +
    "      overflow: hidden;\n" +
    "    }\n" +
    "    #tophider {\n" +
    "      position: absolute;\n" +
    "      top: 0;\n" +
    "      width: 100%;\n" +
    "      height: 100%;\n" +
    "      background-color: white;\n" +
    "      font-size: 0;\n" +
    "      border-bottom: 1px solid grey;\n" +
    "      opacity: 95%;\n" +
    "    }\n" +
    "    #bottomhider {\n" +
    "      position: absolute;\n" +
    "      width: 100%;\n" +
    "      height: 100%;\n" +
    "      background-color: white;\n" +
    "      font-size: 0;\n" +
    "      border-top: 1px solid grey;\n" +
    "      opacity: 95%;\n" +
    "    }\n" +
    "\n" +
    "  </style>\n" +
    "</div>"

