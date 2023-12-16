const storyParts = [
  { text: "Текст части 1", imageUrl: "URL_Картинки_1" },
  { text: "Текст части 2", imageUrl: "URL_Картинки_2" },
  { text: "Текст части 3", imageUrl: "URL_Картинки_3" }
  // Добавьте другие части и изображения по аналогии
];

let currentPart = parseInt(localStorage.getItem("currentPart")) || 0;

function displayStoryPart(partIndex) {
  const storyTextElement = document.getElementById('storyText');
  const storyImageElement = document.getElementById('storyImage');
  
  storyTextElement.textContent = storyParts[partIndex].text;
  storyImageElement.src = storyParts[partIndex].imageUrl;
}

function nextPart() {
  currentPart++;
  if (currentPart >= storyParts.length) {
    currentPart = 0; // Циклическое повторение истории после последней части
  }
  displayStoryPart(currentPart);
  localStorage.setItem("currentPart", currentPart);
}

function saveProgress() {
  localStorage.setItem("savedPart", currentPart);
  alert("Прогресс сохранен!");
}

function loadProgress() {
  const savedPart = parseInt(localStorage.getItem("savedPart"));
  if (!isNaN(savedPart) && savedPart >= 0 && savedPart < storyParts.length) {
    currentPart = savedPart;
    displayStoryPart(currentPart);
    localStorage.setItem("currentPart", currentPart);
    alert("Прогресс загружен!");
  } else {
    alert("Нет сохраненного прогресса!");
  }
}
