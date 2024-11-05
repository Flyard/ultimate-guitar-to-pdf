//   import "./libs/html2pdf.bundle.min.js"

// import { html2pdf } from "./libs/html2pdf.bundle.min.js";

async function generatePDF(titre, html) {
    const tempContainer = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = titre
    tempContainer.appendChild(title)
    
    const contentElement = document.createElement("div");
    contentElement.innerHTML = html;

    tempContainer.appendChild(contentElement)
    
    document.body.appendChild(tempContainer);

    const element = tempContainer


    if (element) {

      const pdf = await html2pdf()
        .from(element)
        .outputPdf("blob");

      const url = URL.createObjectURL(pdf)
      window.open(url, "_blank")
  
    } 

    document.body.removeChild(tempContainer)
  }
  
  
  document.getElementById("convertBtn").addEventListener("click", () => {
    (async() => {
      const [tab] = await chrome.tabs.query({active:true, lastFocusedWindow: true});
      const res = await chrome.tabs.sendMessage(tab.id, {action: "getElement"})

      const p = document.querySelector("#resultMessage");
      p.innerHTML = "";
      p.textContent = res.titre

      await generatePDF(res.titre, res.element)

    }) ();
  });