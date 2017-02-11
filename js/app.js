$(() => {


  const $p1Card = $('#p1');
  const $compCard = $('#comp');
  console.log(window.cards);

  const p1 = [];
  const comp = [];

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
      console.log('winner');
    } else {
      p1Score--;
      $yourScore.html(p1Score);
      compScore++;
      $compScore.html(compScore);
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
