// Initialization
const en = document.getElementById("us");                   // Button for English language
const sk = document.getElementById("sk");                   // Button for Slovak language
const animDiv = document.getElementById("animDiv");         // Animation div
const graphDiv = document.getElementById("graphDiv");       // Graph div
const anim = document.getElementById("anim");               // Animation checkbox
const graph = document.getElementById("graph");             // Graph checkbox

// Language elements
const mailLabel = document.getElementById("mailLabel");
const animLabel = document.getElementById("animLabel");
const graphLabel = document.getElementById("graphLabel");
const button = document.getElementById("button");
const h1 = document.getElementById("h1");

// Toggle animDiv
anim.addEventListener("change", () => {
    animDiv.classList.toggle("active");
})

// Toggle graphDiv
graph.addEventListener("change", () => {
    graphDiv.classList.toggle("active");
})

// JSON file which contains all Slovak and English text
const language = {
    // English text
    len:{
        mailLabel: "Input mail for sending log export",
        button: "Submit",
        animLabel: "Show animation",
        graphLabel: "Show graph",
        h1: "Animation of a dynamic system \"shock absorber\""

    },

    // Slovak text
    lsk:{
        mailLabel: "Vneste mail pre posielanie exportu logov ",
        button: "Potvrď",
        animLabel: "Prikáž animáciu",
        graphLabel: "Prikáž graf",
        h1: "Animácia dynamického systému „tlmič automobil\""
    }
}

// Display selected language (slovak by default)
checkLanguage();

function checkLanguage() {

    // Remembering your previously selected language across all pages
    if(localStorage.getItem("language")) {
        if(localStorage.getItem("language") === "sk")
            slovak();
        else
            english();
    }

    // English by default
    else english();
}

// Change all elements text to English
function english() {
    en.style.border = "0.75px solid white";
    sk.style.border = "0px";

    // Remember the selected language
    localStorage.setItem("language", "en");

    mailLabel.textContent = language.len.mailLabel;
    button.textContent = language.len.button;
    animLabel.textContent = language.len.animLabel;
    graphLabel.textContent = language.len.graphLabel;
    h1.textContent = language.len.h1;
}

// Change all element text to Slovak
function slovak() {
    sk.style.border = "0.75px solid white";
    en.style.border = "0px";

    // Remember the selected language
    localStorage.setItem("language", "sk");

    mailLabel.textContent = language.lsk.mailLabel;
    button.textContent = language.lsk.button;
    animLabel.textContent = language.lsk.animLabel;
    graphLabel.textContent = language.lsk.graphLabel;
    h1.textContent = language.lsk.h1;
}