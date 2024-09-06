const cards = [
    { name: 'dhoni', img: 'ipl/dhoni.jpg' },
    { name: 'virat', img: 'ipl/virat.jpg' },
    { name: 'rohit', img: 'ipl/rohit.jpg' },
    { name: 'axar', img: 'ipl/axar.jpg' },
    { name: 'bumrah', img: 'ipl/bumrah.jpg' },
    { name: 'dinesh', img: 'ipl/dinesh.jpg' },
    { name: 'hardik', img: 'ipl/hardik.jpg' },
    { name: 'jadeja', img: 'ipl/jadeja.jpg' },
    { name: 'rahul', img: 'ipl/rahul.jpg' },
    { name: 'rishabh', img: 'ipl/rishab.jpg' }
  ];
  
  let timelimit=90;
  let timerelement=document.getElementById("t")
  function starttimer()
  {
    const tiinter=setInterval(()=>{
      let mins=Math.floor(timelimit/60);
      let secs=timelimit%60;
      secs=secs<10?"0"+secs:secs;
      timerelement.textContent=`${mins}:${secs}`;
      if(timelimit==0)
      {
        unflipCards();
        clearInterval(tiinter);
        create();
        gameover();
      }
      timelimit--;},1000);
  }
  var over=document.getElementById("over")
  function gameover()
  {
    over.textContent="Game Over!!"
  }
  let ca = [...cards, ...cards];
  ca.sort(() => 0.5 - Math.random());
  
  const board = document.querySelector(".memory");
  let firstCard, secondCard;
  let lock = false;
  let hasFlip = false;
  
  function create() {
    ca.forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.classList.add('memory-card');
      cardElement.dataset.name = card.name;
      cardElement.innerHTML = `
        <img src='ipl/back.jpeg' class="front" alt="card-back">
        <img src="${card.img}" class="back" alt="${card.name}">
      `;
      cardElement.addEventListener("click", flipCard);
      board.appendChild(cardElement);
    });
  }
  
  function flipCard() {
    if (lock) return;
    if (this === firstCard) return;
  
    this.classList.add('flip');
  
    if (!hasFlip) {
      hasFlip = true;
      firstCard = this;
      return;
    }
  
    secondCard = this;
    lock = true;
    checkMatch();
  }
  var count=0;
  var score=0;
  var co=document.getElementById("co")
  var sc=document.getElementById("sc")
  function checkMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  
    if (isMatch) {
      disableCards();
      score+=10;
      count++;
      sc.textContent="The score is"+" "+score
      co.textContent="The chances you took is "+count
    } else {
        count++;
        sc.textContent="The score is"+" "+score
      co.textContent="The chances you took is "+count
      unflipCards();
    }
  }
  
  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1000);
  }
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }
  
  function resetBoard() {
    [hasFlip, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
  
  create();
  starttimer();