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

  let p1 = window.cards.slice(0, 12);
  let comp = window.cards.slice(12, 24);

  let $p1Name;
  let $p1Image;
  let $p1Heartache;
  let $p1Trauma;
  let $p1sexAppeal;
  let $compName;
  let $compImage;
  let $compHeartache;
  let $compTrauma;
  let $compSexAppeal;


  function fillCards() {
    $p1Name = $p1Card.find('.name').text(p1[0].name);
    $p1Image = $p1Card.find('.image').css('backgroundImage', p1[0].img);
    $p1Heartache = $p1Card.find('.heartache .value').text(p1[0].heartache);
    $p1Trauma = $p1Card.find('.trauma .value').text(p1[0].trauma);
    $p1sexAppeal = $p1Card.find('.sexAppeal .value').text(p1[0].sexAppeal);
    $compName = $compCard.find('.name').text(comp[0].name);
    $compImage = $compCard.find('.image').css('backgroundImage', comp[0].img);
    $compHeartache = $compCard.find('.heartache .value').text(comp[0].heartache);
    $compTrauma = $compCard.find('.trauma .value').text(comp[0].trauma);
    $compSexAppeal = $compCard.find('.sexAppeal .value').text(comp[0].sexAppeal);
  }

  let yourDeck = 10;
  let compDeck = 10;
  const $yourDeck = $('#yourDeck');
  const $compDeck = $('#compDeck');

  function compare() {
    const category = $(this).attr('class');
    if (p1[0][category] > comp[0][category]) {
      yourDeck++;
      compDeck--;
      p1.push(p1.splice(0,1)[0], comp.splice(0,1)[0]);
      console.log(p1, comp);
    } else {
      yourDeck--;
      compDeck++;
      comp.push(p1.splice(0,1)[0], comp.splice(0,1)[0]);
      console.log(p1, comp);
    }
    $yourDeck.html(yourDeck);
    $compDeck.html(compDeck);
    fillCards();
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
  $('.card > div').on('click', compare);
  fillCards();
});
