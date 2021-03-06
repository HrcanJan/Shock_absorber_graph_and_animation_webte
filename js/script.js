// Initialization
const en = document.getElementById("us");                   // Button for English language
const sk = document.getElementById("sk");                   // Button for Slovak language
const animDiv = document.getElementById("animDiv");         // Animation div
const graphDiv = document.getElementById("graphDiv");       // Graph div
const anim = document.getElementById("anim");               // Animation checkbox
const graph = document.getElementById("graph");             // Graph checkbox

// Language elements
let animLabel;
let graphLabel;
let button;
let h1;

let li1;
let li2;
let li3;
let li4;
let li5;
let li6;

let ivan;
let jan;
let jovan;
let paljko;

if(document.getElementById("animLabel")){
    animLabel = document.getElementById("animLabel");
    graphLabel = document.getElementById("graphLabel");
    button = document.getElementById("button");
    h1 = document.getElementById("h1");

    // Toggle animDiv
    anim.addEventListener("change", () => {
        animDiv.classList.toggle("active");
    })

// Toggle graphDiv
    graph.addEventListener("change", () => {
        graphDiv.classList.toggle("active");
    })
}

if(document.getElementById("li1")){
    li1 = document.getElementById("li1");
    li2 = document.getElementById("li2");
    li3 = document.getElementById("li3");
    li4 = document.getElementById("li4");
    li5 = document.getElementById("li5");
    li6 = document.getElementById("li6");

    ivan = document.getElementById("ivan");
    jan = document.getElementById("jan");
    jovan = document.getElementById("jovan");
    paljko = document.getElementById("paljko");
}

// JSON file which contains all Slovak and English text
const language = {
    // English text
    len:{
        button: "Submit",
        animLabel: "Show animation",
        graphLabel: "Show graph",
        h1: "Animation of a dynamic system \"shock absorber\"",
        li1: "Clicking on these flags will change your preferred language",
        li2: "This is where you input data for the animation to work",
        li3: "Clicking on the checkbox will show the animation",
        li4: "Clicking on the checkbox will show the graph",
        li5: "Clicking this button will submit your data and make a new graph and animation",
        li6: "Clicking this will direct to the API page",
        ivan: "Ivan Cicka has been tasked on setting the CAS. He also has set up the server for us to upload our files to, and has set up the database for our data to be saved at.",
        jan: "Jan Hr??an has made the entire frontpage as well as setting up the database and code that will write the data into our database. He has also made the animation as well as this API page.",
        jovan: "Jovan Ki?? has made logging system and export into CSV. He also made this API printable to a PDF file and has made it able to be sent to an email.",
        paljko: "Paljko Urbanek has created the animated graph. He also set up the github for us to branch our commits. He was also tasked to merge all of our branches into main."
    },

    // Slovak text
    lsk:{
        button: "Potvr??",
        animLabel: "Prik???? anim??ciu",
        graphLabel: "Prik???? graf",
        h1: "Anim??cia dynamick??ho syst??mu ???tlmi?? automobil\"",
        li1: "Kliknut??m na tieto vlajky zmen??te preferovan?? jazyk",
        li2: "Tu zad??vate ??daje, aby anim??cia mohla fungova??",
        li3: "Kliknut??m na za??iarkavacie pol????ko sa zobraz?? anim??cia",
        li4: "Kliknut??m na za??iarkavacie pol????ko sa zobraz?? graf",
        li5: "Kliknut??m na toto tla??idlo odo??lete svoje ??daje a vytvor??te nov?? graf a anim??ciu",
        li6: "Kliknut??m na toto prejdete na str??nku API",
        ivan: "Ivan Cicka dostal za ??lohu nastavi?? CAS. Tie?? n??m nastavil server, na ktor?? budeme odovzd??va?? na??e s??bory, a nastavil datab??zu, na ktorej sa maj?? uklada?? na??e ??daje.",
        jan: "Jan Hr??an urobil cel?? tituln?? str??nku, ako aj nastavenie datab??zy a k??du, ktor?? bude zapisova?? ??daje do na??ej datab??zy. Urobil tie?? anim??ciu, ako aj t??to str??nku API.",
        jovan: "Jovan Ki?? vytvoril logovac?? syst??m a export do CSV. Tie?? urobil toto API vytla??ite??n?? do s??boru PDF aj umo??nil posielanie na mail.",
        paljko: "Paljko Urb??nek vytvoril animovan?? graf. Nastavil n??m tie?? github na vetvenie na??ich z??v??zkov. Tie?? mal za ??lohu zl????i?? v??etky na??e pobo??ky do main."
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

    if(button) {
        button.textContent = language.len.button;
        animLabel.textContent = language.len.animLabel;
        graphLabel.textContent = language.len.graphLabel;
        h1.textContent = language.len.h1;
    }

    if(li1){
        li1.textContent = language.len.li1;
        li2.textContent = language.len.li2;
        li3.textContent = language.len.li3;
        li4.textContent = language.len.li4;
        li5.textContent = language.len.li5;
        li6.textContent = language.len.li6;

        ivan.textContent = language.len.ivan;
        jan.textContent = language.len.jan;
        jovan.textContent = language.len.jovan;
        paljko.textContent = language.len.paljko;
    }
}

// Change all element text to Slovak
function slovak() {
    sk.style.border = "0.75px solid white";
    en.style.border = "0px";

    // Remember the selected language
    localStorage.setItem("language", "sk");

    if(button) {
        button.textContent = language.lsk.button;
        animLabel.textContent = language.lsk.animLabel;
        graphLabel.textContent = language.lsk.graphLabel;
        h1.textContent = language.lsk.h1;
    }

    if(li1){
        li1.textContent = language.lsk.li1;
        li2.textContent = language.lsk.li2;
        li3.textContent = language.lsk.li3;
        li4.textContent = language.lsk.li4;
        li5.textContent = language.lsk.li5;
        li6.textContent = language.lsk.li6;

        ivan.textContent = language.lsk.ivan;
        jan.textContent = language.lsk.jan;
        jovan.textContent = language.lsk.jovan;
        paljko.textContent = language.lsk.paljko;
    }
}