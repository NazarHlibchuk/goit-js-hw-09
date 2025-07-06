const STORAGE_KEY = "feedback-form-state";

// Оголошуємо об'єкт для збереження даних форми
const formData = {
  email: "",
  message: ""
};

const form = document.querySelector(".feedback-form");

// Функція для збереження даних у localStorage
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функція для завантаження даних із localStorage і заповнення форми
function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      // Записуємо у formData без undefined
      formData.email = parsedData.email || "";
      formData.message = parsedData.message || "";

      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error("Помилка при читанні даних з localStorage:", error);
    }
  }
}

// Делегування події input для всього форми
form.addEventListener("input", event => {
  const target = event.target;
  if (target.name === "email" || target.name === "message") {
    // Обрізаємо пробіли з початку і кінця
    formData[target.name] = target.value.trim();
    saveToLocalStorage();
  }
});

// Обробник submit
form.addEventListener("submit", event => {
  event.preventDefault();

  // Перевірка, що обидва поля заповнені
  if (formData.email === "" || formData.message === "") {
    alert("Fill please all fields");
    return;
  }

  console.log("Відправлені дані форми:", formData);

  // Очищуємо локальне сховище, об'єкт і форму
  localStorage.removeItem(STORAGE_KEY);
  formData.email = "";
  formData.message = "";
  form.reset();
});


// При завантаженні сторінки заповнюємо форму
populateForm();
