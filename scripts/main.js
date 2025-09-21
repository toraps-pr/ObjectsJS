// Аптека
let pharmacy = {
    name: "Аптека Крафт",
    address: "м. Київ, вул. Хрещатик, 10",
    medicines: []
};

//Конструктор Препарат
function Medicine(name, action, producer, country, price) {
    this.name = name;
    this.action = action;
    this.producer = producer;
    this.country = country;
    this.price = parseFloat(price);
    this.socialPrice = (this.price * 0.9).toFixed(2); // 90%
}

//Робота з формою
const form = document.getElementById("addItemForm");
const medicinesList = document.querySelector(".medicines-list");
const defaultText = medicinesList.querySelector(".default");
const seeBtn = document.querySelector(".seeBtn");

// Додавання препарату
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const action = document.getElementById("action").value.trim();
    const producer = document.getElementById("producer").value.trim();
    const country = document.getElementById("country").value.trim();
    const price = document.getElementById("price").value.trim();

    if (!name || !action || !producer || !country || !price) return;

    const med = new Medicine(name, action, producer, country, price);
    pharmacy.medicines.push(med);

    // Прибираємо дефолтний надпис
    if (defaultText) defaultText.style.display = "none";

    // Виводимо новий препарат у список
    const p = document.createElement("p");
    p.textContent = med.name;
    p.classList.add("text-usual");
    p.classList.add("list-item");
    medicinesList.appendChild(p);

    // Додаємо скрол якщо багато
    medicinesList.style.maxHeight = "362px";
    medicinesList.style.overflowY = "auto";

    form.reset();
});

//Знаходження найдешевшого
seeBtn.addEventListener("click", function () {
    if (pharmacy.medicines.length === 0) {
        alert("Немає доступних ліків.");
        return;
    }

    // пошук мінімальної ціни
    let cheapest = pharmacy.medicines.reduce((min, med) =>
        med.price < min.price ? med : min
    );

    showModal(cheapest);
});

//Модальне вікно
function showModal(medicine) {
    // overlay
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    // modal
    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
        <button class="closeBtn" style="align-self:flex-end;"><img src="images/close.svg"></button>
        <h2 class="title-text">${pharmacy.name}</h2>
        <div class="text-usual details">
            <p><b>Назва:</b> ${medicine.name}</p>
            <p><b>Основна дія:</b> ${medicine.action}</p>
            <p><b>Виробник:</b> ${medicine.producer}</p>
            <p><b>Країна:</b> ${medicine.country}</p>
            <p><b>Ціна:</b> ${medicine.price} грн</p>
            <p><b>Соціальна ціна:</b> ${medicine.socialPrice} грн</p>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Закриття по кнопці
    modal.querySelector(".closeBtn").addEventListener("click", () => {
        overlay.remove();
    });

    // Закриття по кліку на overlay
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });
}
