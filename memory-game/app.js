document.addEventListener('DOMContentLoaded', () => {
  //card options
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []
  let cardsLose = []


  function showCards() {
    for (let k = 0; k < cardArray.length; k++) {
      const card = document.createElement('img')
      card.setAttribute('src', cardArray[k].img)
      card.setAttribute('class', 'shower');
      card.setAttribute('data-id-key', k)
      grid.appendChild(card);
      console.log(grid.appendChild(card))
      function cleanCards() {
          let hint = document.querySelectorAll('.shower');
            for(let p = 0; p < hint.length; p++) {
              hint[p].remove();
            }
      }
    }
    setTimeout(cleanCards, 2500);
  }

  //create your board
  function createBoard() {
    // showAllCards();
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'images/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }

  }
  // helper buttons

  function getHint() {
    const hinter = document.querySelector('.button1');
    hinter.addEventListener('click', showCards);
  }

  function tryAgain() {
    const tryAgn = document.querySelector('.button2');
    tryAgn.addEventListener('click', reload, false);
  }

  function reload() {
    reload = location.reload();
  }

  function readInstructions() {
    const info = document.querySelector('.button3');
    info.addEventListener('click', showInfo);
  }

  function showInfo() {
    const information = document.querySelector('.information');
    information.innerHTML = `
    <h1> Instructions: </h1>
    <h2> Memorize all couples and try to find all matches and get max scores </h2>
    <ul><li>Founded match: +1 point </li></ul>
    <ul><li>Missed match: -1 point </li></ul>
    <ul><li>Used temoprary hint: 0 point </li></ul>
    <ul><li>Maximum score: 6 </li></ul>`
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match +1')
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('Sorry, try again -0.2')
      cardsLose.push(cardsChosen)
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length - cardsLose.length;
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = `Your score: ${cardsWon.length - cardsLose.length} Congratulations!`
    }
  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
  }
  createBoard();
  showCards();
  getHint();
  tryAgain();
  readInstructions();

})


