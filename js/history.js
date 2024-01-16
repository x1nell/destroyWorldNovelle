export default [
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
