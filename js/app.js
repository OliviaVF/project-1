$(() => {

  const $timer = $('.timer');
  let timeRemaining = 60;
  let timerId = null;
  let timer = null;
  let yourDeck = 12;
  let compDeck = 12;
  const $yourDeck = $('#yourDeck');
  const $compDeck = $('#compDeck');
  const p1 = window.cards.slice(0, 12);
  const comp = window.cards.slice(12, 24);
  const $p1Card = $('#p1');
  const $compCard = $('#comp');

  function removeOverlay() {
    $('.overlay').remove();
    $('audio').stop();
  }



  function startTimer() {
    timer = true;
    timerId = setInterval(() => {
      timeRemaining--;
      $timer.text(timeRemaining);

      if(timeRemaining === 0) {
        timer = false;
        clearInterval(timerId);
        timeRemaining = 60;
      }
    }, 1000);
  }

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

  function flipP1() {
    if (timer) {
      $p1Card.addClass('flipped');
    }
  }

  fillCards();

  function fillCards() {
    $p1Card.find('.name').text(p1[0].name);
    $p1Card.find('.image').css('backgroundImage', p1[0].img);
    $p1Card.find('.heartache .value').text(p1[0].heartache);
    $p1Card.find('.trauma .value').text(p1[0].trauma);
    $p1Card.find('.sexAppeal .value').text(p1[0].sexAppeal);
    $compCard.find('.name').text(comp[0].name);
    $compCard.find('.image').css('backgroundImage', comp[0].img);
    $compCard.find('.heartache .value').text(comp[0].heartache);
    $compCard.find('.trauma .value').text(comp[0].trauma);
    $compCard.find('.sexAppeal .value').text(comp[0].sexAppeal);
  }

  $('#p1').on('click', flipP1);

  function flipComp() {
    $compCard.addClass('flipped');
  }

  function compare() {
    flipComp();
    const category = $(this).attr('class');
    $(this).addClass('selected');
    console.log($(this).attr('class'));
    if (p1[0][category] > comp[0][category]) {
      yourDeck++;
      compDeck--;
      p1.push(p1.splice(0,1)[0], comp.splice(0,1)[0]);
      console.log(p1, comp);
    } else if (p1[0][category] === comp[0][category]) {
      yourDeck;
      compDeck;
      p1.push(p1.splice(0,1)[0]);
      comp.push(comp.splice(0,1)[0]);
      console.log(p1, comp);
    } else {
      yourDeck--;
      compDeck++;
      comp.push(p1.splice(0,1)[0], comp.splice(0,1)[0]);
      console.log(p1, comp);
    }
    $yourDeck.html(yourDeck);
    $compDeck.html(compDeck);
    setTimeout(refill, 3000);
    setTimeout(flipBack, 2000);
  }

  function refill () {
    fillCards();
  }

  function flipBack () {
    $('.card').removeClass('flipped');
    $('.selected').removeClass('selected');
  }

  $('.playButton').on('click', removeOverlay);
  $('.start').on('click', startTimer);
  fillCards();
  $('.back > div:not(.image)').on('click', compare);
});
