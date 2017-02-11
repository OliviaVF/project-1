$(() => {


  const $p1Card = $('#p1');
  const $compCard = $('#comp');
  console.log(window.cards);
  shuffle(window.cards);

  function shuffle(array) {
    var i = 0
    , j = 0
    , temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const p1 = window.cards.slice(0, 12);
  const comp = window.cards.slice(12, 24);


  const $p1Name = $p1Card.find('.name').text(p1[0].name);
  const $p1Heartache = $p1Card.find('.heartache .value').text(p1[0].heartache);
  const $p1Trauma = $p1Card.find('.trauma .value').text(p1[0].trauma);
  const $p1sexAppeal = $p1Card.find('.sexAppeal .value').text(p1[0].sexAppeal);
  const $compName = $compCard.find('.name').text(comp[0].name);
  const $compHeartache = $compCard.find('.heartache .value').text(comp[0].heartache);
  const $compTrauma = $compCard.find('.trauma .value').text(comp[0].trauma);
  const $compSexAppeal = $compCard.find('.sexAppeal .value').text(comp[0].sexAppeal);

  function fillCards() {
    $p1Name;
    $p1Heartache;
    $p1Trauma;
    $p1sexAppeal;
    $compName;
    $compHeartache;
    $compTrauma;
    $compSexAppeal;
  }

  let p1Score = 10;
  let compScore = 10;
  const $yourScore = $('#yourScore');
  const $compScore = $('#compScore');

  function compare() {
    const category = $(this).attr('class');
    if (p1[0][category] > comp[0][category]) {
      p1Score++;
      compScore--;
      $yourScore.html(p1Score);
      $compScore.html(compScore);
      p1.push(p1.splice(0,1)[0], comp.splice(0,1),[0]);
      console.log('winner');
    } else {
      p1Score--;
      $yourScore.html(p1Score);
      compScore++;
      $compScore.html(compScore);
      comp.push(p1.splice(0,1)[0], comp.splice(0,1),[0]);
      console.log(p1);
      console.log(comp);
    }
  }

  const $timer = $('.timer');
  let timeRemaining = 60;
  let timerId = null;


  function startTimer() {
    timerId = setInterval(() => {
      timeRemaining--;
      $timer.text(timeRemaining);

      if(timeRemaining === 0) {
        clearInterval(timerId);
        timeRemaining = 60;
      }
    }, 1000);
  }

  startTimer();
  fillCards();
  $('.card > div').on('click', compare);
});
