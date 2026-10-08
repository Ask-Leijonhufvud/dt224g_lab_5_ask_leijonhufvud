"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: DITT NAMN
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // rensa errors-array
    for (let i = errors.length - 1; i >= 0; i--) {
        // remove an element from the array
        errors.pop();
    }

    // Kontrollera formulärets obligatoriska fält
    let isValid = true; // variabel som anger om formulärets inmatning är korrekt, vi börjar med att anta att den är det
    // om namn ej matats in
    if (fullnameInput.value.trim() === "") {
        // lägg till felmeddelande i array
        errors.push("Du måste ange ett namn"); 
        // ange att inmatning ej är korrekt
        isValid = false; 
    }
    // om en email-address ej inmatats
    if (emailInput.value.trim() === "") {
        // lägg till felmeddelande i array
        errors.push("Du måste ange en email-address");
        // ange att inmatning ej är korrekt
        isValid = false;
    }
    // om ett telefonnummer ej inmatats
    if (phoneInput.value.trim() === "") {
        // lägg till felmeddelande i array
        errors.push("Du måste ange ett telefonnummer");
        // ange att inmatning ej är korrekt
        isValid = false;
    }

    // Visa eventuella felmeddelanden
    displayErrors();

    // Returnera resultatet (true eller false) av valideringen
    return isValid;
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    // så länge det finns felmeddelanden i listan
    while (errorList.firstChild !== null) {
        // ta bort det första felmeddelandet
        errorList.removeChild(errorList.firstChild);
    }

    // Skriv ut aktuella felmeddelanden till DOM
    errors.forEach(error => {
        // skapa ett li-element
        const errorNode = document.createElement("li");
        // lägg till felmeddelande till li-element
        errorNode.textContent = error;
        // lägg till li-element till felmeddelandelista
        errorList.appendChild(errorNode);
    });
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const name = fullnameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const font = fontSelect.value;

    // Uppdatera studentkortet
    // uppdatera namn
    previewFullname.textContent = name;
    previewFullname.style.fontFamily = font;
    // uppdatera email
    previewEmail.textContent = email;
    previewEmail.style.fontFamily = font;
    // uppdatera telefonnummer
    previewPhone.textContent = phone;
    previewPhone.style.fontFamily = font;
    // av okända anledningar verkar endast courier och arial visas för mig, kan inte hitta varför

    // Lägg till studentkortet i historiken
    history.unshift({
        name: name,
        email: email,
        phone: phone,
        font: font
    })

    // Spara och uppdatera historiken
    saveHistory();
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem("history", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    let storedHistory = localStorage.getItem("history");

    // Uppdatera history
    // om det finns någon historik lagrad
    if (storedHistory !== null) {
        history = JSON.parse(storedHistory);
    }
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
    history.forEach(card => {
        const studentCard = document.createElement("article");
        studentCard.style.border = "solid";
        studentCard.style.padding = "10px";

        // namn
        const name = document.createElement("p");
        name.textContent = card.name;
        studentCard.appendChild(name);

        // email
        const email = document.createElement("p");
         email.textContent = card.email;
        studentCard.appendChild(email);

        // telefonnummer
        const phone = document.createElement("p");
         phone.textContent = card.phone;
        studentCard.appendChild(phone);

        // font
        const font = document.createElement("p");
         font.textContent = card.font;
        studentCard.appendChild(font);

        historySection.appendChild(studentCard);
    });
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär
    fullnameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    fontSelect.value = "Georgia";

    // Rensa eventuella felmeddelanden
    // så länge det finns felmeddelanden i listan
    while (errorList.firstChild !== null) {
        // ta bort det första felmeddelandet
        errorList.removeChild(errorList.firstChild);
    }
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas
form.addEventListener("submit", event => {
    // preventdefault
    event.preventDefault()
    // om inmatningen är korrekt
    if (validateForm() == true) {
        // skapa studentkort
        createStudentCard();
    }
});


// När användaren klickar på "Rensa"
clearButton.addEventListener("click", clearForm);


// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik