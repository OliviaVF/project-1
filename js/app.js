let timeRemaining = 60;
let timerId = null;
let timer = null;
let yourDeck = 12;
let compDeck = 12;
let p1 = [];
let comp = [];

function playGame() {

  const $timer = $('.timer');
  const $yourDeck = $('#yourDeck');
  const $compDeck = $('#compDeck');
  const $p1Card = $('#p1');
  const $compCard = $('#comp');

  $('.youWon').hide();
  $('.youLost').hide();
  $('.youDrew').hide();
  $('header').hide();
  $('main').hide();
  $('.score-board').hide();

  function removeOverlay() {
    $('.overlay').remove();
    $('#wicked').get(0).play();
    $('.instructions').show();
  }

  function removeInstructions() {
    $('.instructions').hide();
    $('header').show();
    $('main').show();
    $('.score-board').show();
  }

  function startTimer() {
    timer = true;
    timerId = setInterval(() => {
      timeRemaining--;
      $timer.text(timeRemaining);
      if(timeRemaining === 0) {
        timer = false;
        clearInterval(timerId);
        win();
        timeRemaining = 60;
      } if (timeRemaining <= 5){
        $('.timer').addClass('selected');
      }
    }, 1000);
  }


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

  function shuffleAndDeal() {
    shuffle(window.cards);
    p1 = window.cards.slice(0, 12);
    comp = window.cards.slice(12, 24);
  }

  shuffleAndDeal();
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
    if (p1[0][category] > comp[0][category]) {
      yourDeck++;
      compDeck--;
      p1.push(p1.splice(0,1)[0], comp.splice(0,1)[0]);
      $('#pounds').get(0).play();
      $('.playerDeck').addClass('selected');
    } else if (p1[0][category] === comp[0][category]) {
      yourDeck;
      compDeck;
      p1.push(p1.splice(0,1)[0]);
      comp.push(comp.splice(0,1)[0]);
      $('#draw').get(0).play();
    } else {
      yourDeck--;
      compDeck++;
      comp.push(p1.splice(0,1)[0], comp.splice(0,1)[0]);
      console.log(p1, comp);
      $('#ricky').get(0).play();
      $('.computerDeck').addClass('selected');
    }
    $yourDeck.html(yourDeck);
    $compDeck.html(compDeck);
    setTimeout(refill, 4000);
    setTimeout(flipBack, 3000);
    win();
  }

  function refill () {
    fillCards();
  }

  function flipBack () {
    $('.card').removeClass('flipped');
    $('.selected').removeClass('selected');
  }

  function win() {
    console.log('inside the win');
    if(yourDeck === 24 || compDeck === 24 || timeRemaining === 0) {
      if (yourDeck > compDeck) {
        $('#win').get(0).play();
        $('.youWon').show();
      } else if (yourDeck === compDeck){
        $('#drew').get(0).play();
        $('.youDrew').show();
      } else {
        $('#lose').get(0).play();
        $('.youLost').show();
      }
      $('.container').hide();
      $('.score-board').hide();
      $('.start').hide();
      $timer.hide();
    }
    $('.reset').on('click', playAgain);
  }

  function playAgain() {
    timeRemaining = 60;
    $timer.html(60);
    $yourDeck.html(0);
    $compDeck.html(0);
    shuffleAndDeal();
    fillCards();
    $('.youWon').hide();
    $('.youLost').hide();
    $('.youDrew').hide();
    $('.container').show();
    $('.score-board').show();
    $('.start').show();
    $timer.show();
  }

  //make sure cards spin back to show queen vic

  $('.playButton').on('click', removeOverlay);
  $('.closeInstructions').on('click', removeInstructions);
  $('.start').on('click', startTimer);
  fillCards();
  $('.back > div:not(.image)').on('click', compare);
}

$(playGame);
