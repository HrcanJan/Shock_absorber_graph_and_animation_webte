// Print page function
function printPage(){
    const doc = new jsPDF();
    var text = document.getElementById("h1").textContent;
    doc.text(text, 20, 20);
    text = "-Kliknutím na EN sa zmení jazyk na Anglicky";
    doc.text(text, 10, 30);
    text = "-Kliknutím na SK sa zmeni jazyk na Slovenský";
    doc.text(text, 10, 40);
    text = "-Po zakliknutí checkboxu Show Graph za zobrazý graf";
    doc.text(text, 10, 50);
    text = "-Po zakliknutí checkboxu Show animation za zobrazý animácia";
    doc.text(text, 10, 60);
    text = "-Po vyplnení všetkých hodnôt a zakliknutí tlačitka SUBMIT sa";
    doc.text(text, 10, 70);
    text = "zobrazí graph pre tie hodnoty ktoré použivatel zadal";
    doc.text(text, 10, 80);
    text = "-Po vyplnení emailu a kliknutí na tlacitko EXPORT";
    doc.text(text, 10, 90);
    text = "sa pouzivatelovi posle subor so vsetkymi logmi";
    doc.text(text, 10, 100);

    doc.save("Popis API.pdf");
}