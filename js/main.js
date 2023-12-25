const storyParts = [
  { text: "Текст части 1", imageUrl: "img/1a.jpg", choices: ["Выбор 1.1", "Выбор 1.2"] },
  { text: "Текст части 2", imageUrl: "img/1a.jpg", choices: ["Выбор 2.1", "Выбор 2.2"] },
  { text: "Текст части 3", imageUrl: "img/1a.jpg", choices: ["Выбор 3.1", "Выбор 3.2"] }
  // Добавьте другие части и изображения по аналогии
];

let currentPart = parseInt(localStorage.getItem("currentPart")) || 0;

function displayStoryPart(partIndex) {
  const storyTextElement = document.getElementById('storyText');
  const storyImageElement = document.getElementById('storyImage');
  const choicesContainer = document.getElementById('choices');

  storyTextElement.textContent = storyParts[partIndex].text;
  storyImageElement.src = storyParts[partIndex].imageUrl;

  // Очищаем предыдущие кнопки выбора
  choicesContainer.innerHTML = "";

  // Показываем кнопки выбора, если они есть
  if (storyParts[partIndex].choices && storyParts[partIndex].choices.length > 0) {
    for (let i = 0; i < storyParts[partIndex].choices.length; i++) {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = storyParts[partIndex].choices[i];
      choiceButton.onclick = function() {
        makeChoice(i);
      };
      choicesContainer.appendChild(choiceButton);
    }
  }
}

function makeChoice(choiceIndex) {
  const currentChoices = storyParts[currentPart].choices;
  if (choiceIndex < currentChoices.length) {
    // Обновляем текущую часть с учетом выбора
    currentPart = currentChoices[choiceIndex].nextPart;
    displayStoryPart(currentPart);
    localStorage.setItem("currentPart", currentPart);
  }
}

function nextPart() {
  currentPart++;
  if (currentPart >= storyParts.length) {
    currentPart = 0; // Циклическое повторение истории после последней части
  }
  displayStoryPart(currentPart);
  localStorage.setItem("currentPart", currentPart);
}

function showMenu() {
  const menuContainer = document.getElementById('menuContainer');
  const menuList = document.getElementById('menuList');
  
  // Очищаем текущее меню
  menuList.innerHTML = "";
  
  // Создаем элементы меню для каждой части
  for (let i = 0; i < storyParts.length; i++) {
    const menuItem = document.createElement('li');
    menuItem.textContent = `Глава ${i + 1}`;
    menuItem.onclick = () => goToPart(i);
    menuList.appendChild(menuItem);
  }
  
  // Показываем меню
  menuContainer.style.display = "block";
}

function goToPart(partIndex) {
  displayStoryPart(partIndex);
  localStorage.setItem("currentPart", partIndex);
  closeMenu();
}

const MAX_SAVED_SLOTS = 3; // Максимальное количество сохраненных ячеек

let savedProgress = JSON.parse(localStorage.getItem("savedProgress")) || Array(MAX_SAVED_SLOTS).fill(null);

function openMenu() {
  showMenu();
  updateMenuList();
  document.getElementById('menuContainer').style.display = "block";
}

function closeMenu() {
  document.getElementById('menuContainer').style.display = "none";
}

function saveProgress() {
  const currentSlot = prompt("Введите номер ячейки сохранения (1-" + MAX_SAVED_SLOTS + "):");
  const slotIndex = parseInt(currentSlot) - 1;

  if (!isNaN(slotIndex) && slotIndex >= 0 && slotIndex < MAX_SAVED_SLOTS) {
    savedProgress[slotIndex] = currentPart;
    localStorage.setItem("savedProgress", JSON.stringify(savedProgress));
    updateMenuList();
    alert("Прогресс сохранен в ячейке " + (slotIndex + 1) + "!");
  } else {
    alert("Неправильный номер ячейки сохранения!");
  }
}

function loadProgress() {
  const selectedSlot = prompt("Введите номер ячейки сохранения (1-" + MAX_SAVED_SLOTS + "):");
  const slotIndex = parseInt(selectedSlot) - 1;

  if (!isNaN(slotIndex) && slotIndex >= 0 && slotIndex < MAX_SAVED_SLOTS) {
    if (savedProgress[slotIndex] !== null) {
      currentPart = savedProgress[slotIndex];
      displayStoryPart(currentPart);
      localStorage.setItem("currentPart", currentPart);
      closeMenu(); // Закрываем меню после загрузки прогресса
      alert("Прогресс загружен из ячейки " + (slotIndex + 1) + "!");
    } else {
      alert("В этой ячейке нет сохраненного прогресса!");
    }
  } else {
    alert("Неправильный номер ячейки сохранения!");
  }
}

function updateMenuList() {
  const menuList = document.getElementById('menuList');
  menuList.innerHTML = "";
  
  for (let i = 0; i < storyParts.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = "Глава " + (i + 1) + ": " + storyParts[i].text;
    listItem.onclick = function() {
      currentPart = i;
      displayStoryPart(currentPart);
      closeMenu();
    };
    menuList.appendChild(listItem);
  }

  for (let i = 0; i < MAX_SAVED_SLOTS; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = "Ячейка " + (i + 1) + ": " + (savedProgress[i] !== null ? "Прогресс сохранен" : "Пусто");
    listItem.onclick = function() {
      loadProgress(i);
    };
    menuList.appendChild(listItem);
  }
}
