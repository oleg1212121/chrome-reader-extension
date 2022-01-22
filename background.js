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
            minOpacity: 30,
            keyboardKeys: {
                fontSize: {
                    plus: [87, 38, 104],
                    minus: [83, 40, 98],
                },
                opacity: {
                    plus: [68, 39, 102],
                    minus: [65, 37, 100],
                },
            }
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
            let key = e.keyCode
            if(options.keyboardKeys.fontSize.plus.concat(options.keyboardKeys.fontSize.minus).includes(key)){
                if(options.keyboardKeys.fontSize.plus.includes(key)){
                    options.fontSize++;
                } else {
                    options.fontSize--;
                }
                setHidersHeight();
            }
            if(options.keyboardKeys.opacity.plus.concat(options.keyboardKeys.opacity.minus).includes(key)){
                if(options.keyboardKeys.opacity.plus.includes(key)){
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
    "      border-bottom: 1px solid #e0e0e0 ;\n" +
    "      opacity: 60%;\n" +
    "    }\n" +
    "    #bottomhider {\n" +
    "      position: absolute;\n" +
    "      width: 100%;\n" +
    "      height: 100%;\n" +
    "      background-color: white;\n" +
    "      font-size: 0;\n" +
    "      border-top: 1px solid #e0e0e0 ;\n" +
    "      opacity: 60%;\n" +
    "    }\n" +
    "\n" +
    "  </style>\n" +
    "</div>"

