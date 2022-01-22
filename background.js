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
        let options = {
            fontSize: 55,
            mousePosition: {
                x: window.innerWidth/2,
                y: window.innerHeight/2
            },
            maxOpacity: 60,
            minOpacity: 30
        }
        let setMousePosition = function (x,y){
            options.mousePosition.x = x;
            options.mousePosition.y = y;
        }
        let setHidersHeight = function () {
            top.style.top = (options.mousePosition.y - options.fontSize / 2) - window.innerHeight + 'px';
            bottom.style.top = (options.mousePosition.y + options.fontSize / 2) + 'px';
        }
        let setHidersOpacity = function (val) {
            top.style.opacity = val + '%';
            bottom.style.opacity = val + '%';
        }
        let keydownCallback = function (e) {
            let key = e.key.toLowerCase()
            if(['w', 'arrowup', 's', 'arrowdown'].includes(key)){
                if(key === 'w' || key === 'arrowup'){
                    options.fontSize++;
                } else {
                    options.fontSize--;
                }
                setHidersHeight();
            }
            if(['d', 'arrowright', 'a', 'arrowleft'].includes(key)){
                if(key === 'd' || key === 'arrowright'){
                    options.maxOpacity++;
                } else {
                    options.maxOpacity--;
                }
                setHidersOpacity(options.maxOpacity);
            }
        }
        wrapper.addEventListener("mousemove", function (e) {
            setMousePosition(e.clientX, e.clientY);
            setHidersHeight();
        });
        wrapper.addEventListener("mousedown", function (e) {
            setHidersOpacity(options.minOpacity);
            document.addEventListener("keydown", keydownCallback);
        });
        wrapper.addEventListener("mouseup", function (e) {
            setHidersOpacity(options.maxOpacity);
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
    "      border-bottom: 1px solid lightgray ;\n" +
    "      opacity: 50%;\n" +
    "    }\n" +
    "    #bottomhider {\n" +
    "      position: absolute;\n" +
    "      width: 100%;\n" +
    "      height: 100%;\n" +
    "      background-color: white;\n" +
    "      font-size: 0;\n" +
    "      border-top: 1px solid lightgray ;\n" +
    "      opacity: 50%;\n" +
    "    }\n" +
    "\n" +
    "  </style>\n" +
    "</div>"

