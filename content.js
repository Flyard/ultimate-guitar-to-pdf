chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "getElement") {

        const element = document.querySelector("pre");
        const title = document.querySelector("h1");
        if(element) {
            sendResponse({element: element.outerHTML, titre: title.textContent})
        } else {
            sendResponse({element: null, titre: null})
        }
    }
  });


