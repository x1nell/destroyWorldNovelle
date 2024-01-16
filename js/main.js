const storyParts = [
  {
    speaker: "Кацуми:",
    text: "Что вершит судьбу человечества?",
    imageUrl: "img/foni/1fon.png",
    nextPart: 1
  },
  {
    speaker: "Кацуми:",
    text: "Жизнь, или ожидание смерти - заставляет тебя двигаться дальше?",
    music: "msc/1track.mp3",
    imageUrl: "img/foni/1fon.png",
    nextPart: 2
  },
  {
    text: "Однажды и ты сможешь пройти свой путь до конца",
    imageUrl: "img/foni/1fon.png",
    nextPart: 3
  },
  {
    text: "Но сможешь ли ты вспомнить все моменты своей жизни после её окончания?",
    imageUrl: "img/foni/1fon.png",
    nextPart: 4
  },
  {
    text: "Существует ли в этом смысл? Почему у каждого живого существа есть свои рамки в мире?",
    imageUrl: "img/foni/1fon.png",
    nextPart: 5
  },
  {
    text: "Почему люди должны сидеть взаперти - как птицы в клетках, ведь пташки могут летать, но человек ограничил им доступ к свободе.",
    imageUrl: "img/foni/1fon.png",
    nextPart: 6
  },
  {
    text: "Так кто ограничил людям возможности?",
    imageUrl: "img/foni/1fon.png",
    nextPart: 7
  },
  {
    text: "Почему я должен сидеть в этой стереотипной для людей клетке, во избежание опасности, которой не было уже много лет?",
    imageUrl: "img/foni/1fon.png",
    nextPart: 8
  },
  {
    text: "Надо найти тут ключ",
    imageUrl: "img/foni/1fon.png",
    nextPart: 9
  },
  {
    text: "1",
    imageUrl: "img/foni/1fon.png",
    onItemAppear: function() {
      displayItemOnScreen("img/predmeti/key.png", 200, 200);
    },
    addItemToInventory: true,
    nextPart: 10
  },
  {
    text: "Ты нашёл ключ",
    imageUrl: "img/foni/1fon.png",
    nextPart: 11
  },
  {
    text: "ТЕКСТ ПОСЛЕ КЛЮЧА2",
    imageUrl: "img/foni/1fon.png",
    choices: [
      { text: "налево", nextPart: 12 },
      { text: "направо", nextPart: 15 }],
  },
  {
    text: "текст налево",
    imageUrl: "img/foni/1fon.png",
    nextPart: 13
  },
  {
    text: "текст налево 2",
    imageUrl: "img/foni/1fon.png",
    nextPart: 14
  },
  {
    text: "текст налево 3",
    imageUrl: "img/foni/1fon.png",
    nextPart: "end" 
  },
  {
    text: "текст направо",
    imageUrl: "img/foni/1fon.png",
    nextPart: 16
  },
  {
    text: "текст направо 2",
    imageUrl: "img/foni/1fon.png",
    nextPart: 17
  },
  {
    text: "текст направо 3",
    imageUrl: "img/foni/1fon.png",
    nextPart: "end" 
  },
];

let currentPart = parseInt(localStorage.getItem("currentPart")) || 0;
let isMusicPlaying = true;
let backgroundMusic = document.getElementById('backgroundMusic');

function displayStoryPart(partIndex) {
  const storyTextElement = document.getElementById('storyText');
  const storyImageElement = document.getElementById('storyImage');
  const itemImageUrl = storyParts[partIndex].itemImageUrl;
  const choicesContainer = document.getElementById('choices');
  const characterImageElement = document.getElementById('characterImage');
  const speakerElement = document.getElementById('speaker');
  // Отображение имени говорящего
  if (storyParts[partIndex].speaker) {
    speakerElement.textContent = storyParts[partIndex].speaker;
  } else {
    speakerElement.textContent = ""; // Очищаем, если имя не указано
  }
  if (storyParts[partIndex].music && isMusicPlaying) {
    backgroundMusic.src = storyParts[partIndex].music;
    backgroundMusic.play();
  }
  if (storyParts[partIndex].onItemAppear) {
    storyParts[partIndex].onItemAppear();
  }
  if (itemImageUrl && storyParts[partIndex].addItemToInventory) {
    const canAddItem = canAddItemToScreen(partIndex);
    if (canAddItem) {
      displayItemOnScreen(itemImageUrl);
    } else {
      // Если предмет нельзя добавить на экран, используем обычное изображение
      storyImageElement.src = storyParts[partIndex].imageUrl;
    }
  } else {
    storyImageElement.src = storyParts[partIndex].imageUrl;
  }

  storyTextElement.textContent = storyParts[partIndex].text;
  storyImageElement.src = storyParts[partIndex].imageUrl;

  if (storyParts[partIndex].characterImageUrl) {
    characterImageElement.innerHTML = `<img src="${storyParts[partIndex].characterImageUrl}" alt="Персонаж">`;
  } else {
    characterImageElement.innerHTML = "";
  }

  choicesContainer.innerHTML = "";
  if (storyParts[partIndex].choices && storyParts[partIndex].choices.length > 0) {
    for (let i = 0; i < storyParts[partIndex].choices.length; i++) {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = storyParts[partIndex].choices[i].text;
      choiceButton.onclick = function () {
        makeChoice(i);
      };
      choicesContainer.appendChild(choiceButton);
    }
  }
}

let isItemVisible = false;

function displayItemOnScreen(itemImageUrl, x, y) {
  const itemImage = document.createElement('img');
  itemImage.src = itemImageUrl;
  itemImage.classList.add('itemOnScreen');
  const storyContainer = document.getElementById('storyContainer');
  
  // Установка координат
  itemImage.style.position = 'absolute';
  itemImage.style.left = `${x}px`;
  itemImage.style.top = `${y}px`;

  storyContainer.appendChild(itemImage);

  // Установите флаг, что предмет виден
  isItemVisible = true;

  itemImage.addEventListener('click', function() {
    addToInventory(itemImageUrl);
    itemImage.remove();
    // Сбросьте флаг при клике на предмет
    isItemVisible = false;
  });
}

function makeChoice(choiceIndex) {
  const currentChoices = storyParts[currentPart].choices;
  if (currentChoices && choiceIndex < currentChoices.length) {
    const nextPart = currentChoices[choiceIndex].nextPart;
    if (nextPart !== undefined && nextPart !== null) {
      currentPart = nextPart;
      if (currentPart === "end" || currentPart >= storyParts.length) {
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
}

displayStoryPart(currentPart);
document.body.style.cursor = "pointer";

function nextPart(event) {
  const clickX = event.clientX;
  const clickY = event.clientY;
  const imageElement = document.getElementById('storyImage');
  const imageRect = imageElement.getBoundingClientRect();
  const distance = Math.sqrt((clickX - imageRect.left - imageRect.width / 2) ** 2 + (clickY - imageRect.top - imageRect.height / 2) ** 2);

  // Проверка, есть ли предмет на экране
  if (isItemVisible && distance <= imageRect.width / 2) {
    // Обработка клика по изображению предмета
    const currentChoices = storyParts[currentPart].choices;
    if (currentChoices && currentChoices.length > 0) {
      const nextPart = currentChoices[0].nextPart;
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
  } else {
    // Обработка клика вне изображения предмета
    const nextPart = storyParts[currentPart].nextPart;
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
  }
}

let isInventoryOpen = false;

function toggleInventory() {
    const inventory = document.getElementById('inventory');
    isInventoryOpen = !isInventoryOpen;

    if (isInventoryOpen) {
        inventory.style.display = 'flex';
    } else {
        inventory.style.display = 'none';
    }
}

function addToInventory(itemImageUrl) {
  const inventorySlots = document.querySelectorAll('.inventorySlot');
  for (let i = 0; i < inventorySlots.length; i++) {
    const slot = inventorySlots[i];
    if (!slot.hasItem) {
      slot.style.backgroundImage = `url(${itemImageUrl})`;
      slot.hasItem = true;
      break;
    }
  }
}

function canAddItemToScreen(partIndex) {
  const inventorySlots = document.querySelectorAll('.inventorySlot');
  // Измените условие, чтобы предмет добавлялся только в определенных сценариях
  return storyParts[partIndex].addItemToInventory && !inventoryIsFull(inventorySlots);
}


function inventoryIsFull(inventorySlots) {
  for (let i = 0; i < inventorySlots.length; i++) {
    if (!inventorySlots[i].hasItem) {
      return false;
    }
  }
  return true;
}

function toggleMenu() {
  const menuContainer = document.getElementById('menuContainer');
  if (menuContainer.style.display === 'none' || menuContainer.style.display === '') {
      showMenu();
  } else {
      closeMenu();
  }
}

function showMenu() {
  updateMenuList(); 
  const menuContainer = document.getElementById('menuContainer');
  menuContainer.style.display = "block";
}

function goToPart(partIndex) {
  displayStoryPart(partIndex);
  localStorage.setItem("currentPart", partIndex);
  closeMenu();
}

const MAX_SAVED_SLOTS = 3;
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
      closeMenu();
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
    listItem.dataset.partIndex = i;
    listItem.onclick = function () {
      const partIndex = parseInt(this.dataset.partIndex, 10);
      currentPart = partIndex;
      displayStoryPart(currentPart);
      closeMenu();
    };
    menuList.appendChild(listItem);
  }

  for (let i = 0; i < MAX_SAVED_SLOTS; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = "Ячейка " + (i + 1) + ": " + (savedProgress[i] !== null ? "Прогресс сохранен" : "Пусто");
    listItem.dataset.slotIndex = i;
    listItem.onclick = function () {
      const slotIndex = parseInt(this.dataset.slotIndex, 10);
      if (savedProgress[slotIndex] !== null) {
        currentPart = savedProgress[slotIndex];
        displayStoryPart(currentPart);
        closeMenu();
      } else {
        alert("В этой ячейке нет сохраненного прогресса!");
      }
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

backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

document.addEventListener("DOMContentLoaded", function () {
  playMusic();
});

localStorage.setItem('backgroundMusic', JSON.stringify({
  isMusicPlaying,
  currentPart
}));
