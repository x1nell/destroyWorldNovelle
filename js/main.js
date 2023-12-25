const storyParts = [
  { text: "привет", imageUrl: "img/1a.jpg", choices: [
    { text: "налево", nextPart: 1 },
    { text: "направо", nextPart: 5 }
  ]},
  
  { text: "текст налево", imageUrl: "img/1a.jpg", nextPart: 2 },
  { text: "текст налево 2", imageUrl: "img/1a.jpg", nextPart: 3 },
  { text: "текст налево 3", imageUrl: "img/1a.jpg", nextPart: 4 },
  { text: "завершение налево", imageUrl: "img/1top.jpg", nextPart: "end" },

  { text: "текст направо", imageUrl: "img/1a.jpg", nextPart: 6 },
  { text: "текст направо 2", imageUrl: "img/1a.jpg", nextPart: 7 },
  { text: "текст направо 3", imageUrl: "img/1a.jpg", nextPart: 8 },
  { text: "завершение направо", imageUrl: "img/1top.jpg", nextPart: "end" },
  // Добавьте другие части и изображения по аналогии
];

let currentPart = parseInt(localStorage.getItem("currentPart")) || 0;

let isMusicPlaying = true;

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
      choiceButton.textContent = storyParts[partIndex].choices[i].text;
      choiceButton.onclick = function() {
        makeChoice(i);
      };
      choicesContainer.appendChild(choiceButton);
    }
  }
}

function makeChoice(choiceIndex) {
  const currentChoices = storyParts[currentPart].choices;

  if (currentChoices && choiceIndex < currentChoices.length) {
    const nextPart = currentChoices[choiceIndex].nextPart;

    if (nextPart !== undefined && nextPart !== null) {
      currentPart = nextPart;

      if (currentPart === "end") {
        displayEnd();
      } else {
        displayStoryPart(currentPart);
        localStorage.setItem("currentPart", currentPart);
      }
    } else {
      alert("Этот выбор не имеет следующей части. Пожалуйста, проверьте конфигурацию истории.");
    }
  } else {
    alert("Неверный индекс выбора!");
  }
}

function displayEnd() {
  alert("Вы достигли конца истории!");
  // Дополнительные действия, если необходимо
}

// Первичное отображение части истории
displayStoryPart(currentPart);

function nextPart() {
  const currentChoices = storyParts[currentPart].choices;

  if (currentChoices && currentChoices.length > 0) {
    // В этом случае, просто перейдем к первой доступной части из выборов
    currentPart = currentChoices[0].nextPart;
  } else if (storyParts[currentPart].nextPart !== undefined) {
    // Если у текущей части есть атрибут nextPart, используем его
    currentPart = storyParts[currentPart].nextPart;
  } else {
    // В противном случае, перейдем к следующей части после текущей
    currentPart++;
  }

  if (currentPart >= storyParts.length || currentPart === "end") {
    // Если достигли конечной части или части с идентификатором "end", отобразим завершение истории
    displayEnd();
  } else {
    displayStoryPart(currentPart);
    localStorage.setItem("currentPart", currentPart);
  }
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

function toggleMusic() {
  const musicControls = document.getElementById('musicControls');
  musicControls.style.display = (musicControls.style.display === 'none') ? 'block' : 'none';
}

function playMusic() {
  const audioElement = document.getElementById('backgroundMusic');
  audioElement.play();
  isMusicPlaying = true;
}

function pauseMusic() {
  const audioElement = document.getElementById('backgroundMusic');
  audioElement.pause();
  isMusicPlaying = false;
}

function setVolume(volume) {
  const audioElement = document.getElementById('backgroundMusic');
  audioElement.volume = parseFloat(volume);
}

// Настройки для аудио-элемента
backgroundMusic.loop = true; // Чтобы музыка повторялась
backgroundMusic.volume = 0.5; // Установите громкость по вашему усмотрению

document.addEventListener("DOMContentLoaded", function() {
  playMusic();
});

// Функция для воспроизведения музыки
function playMusic() {
  backgroundMusic.play();
}

// Сохраняем аудио-элемент в локальное хранилище, чтобы избежать его потери при обновлении страницы
localStorage.setItem('backgroundMusic', JSON.stringify({ isMusicPlaying, currentPart }));
