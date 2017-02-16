var ett = ett || {};

ett.removeOverlay = function() {
  $('.overlay').remove();
  $('#wicked').get(0).play();
  this.$instructions.show();
};

ett.removeInstructions = function() {
  this.$instructions.hide();
  $('header').show();
  $('main').show();
  $('.score-board').show();
};

ett.startTimer = function() {
  $('.start').css('visibility', 'hidden');
  this.timer = true;
  this.timerId = setInterval(() => {
    this.timeRemaining--;
    this.$timer.text(this.timeRemaining);
    if(this.timeRemaining === 0) {
      this.timer = false;
      clearInterval(this.timerId);
      this.win();
      this.timeRemaining = 60;
    } if (this.timeRemaining <= 5){
      this.$timer.addClass('selected');
    }
  }, 1000);
};

ett.shuffle = function(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

ett.flipP1 = function() {
  if (this.timer) {
    this.$p1Card.addClass('flipped');
    $('.container').removeClass('compWin playerWin transitioning');
  }
};

ett.shuffleAndDeal = function() {
  this.cards = this.shuffle(this.cards);
  this.p1 = this.cards.slice(0, 12);
  this.comp = this.cards.slice(12, 24);
};

ett.fillCards = function() {
  this.$p1Card.find('.name').text(this.p1[0].name);
  this.$p1Card.find('.image').css('backgroundImage', this.p1[0].img);
  this.$p1Card.find('.heartache .value').text(this.p1[0].heartache);
  this.$p1Card.find('.trauma .value').text(this.p1[0].trauma);
  this.$p1Card.find('.sexAppeal .value').text(this.p1[0].sexAppeal);
  this.$compCard.find('.name').text(this.comp[0].name);
  this.$compCard.find('.image').css('backgroundImage', this.comp[0].img);
  this.$compCard.find('.heartache .value').text(this.comp[0].heartache);
  this.$compCard.find('.trauma .value').text(this.comp[0].trauma);
  this.$compCard.find('.sexAppeal .value').text(this.comp[0].sexAppeal);
};

ett.flipComp = function() {
  this.$compCard.addClass('flipped');
};

ett.compare = function(e) {
  const inPlay = this.$p1Card.find('.selected').length !== 0 ? true : false;
  if (!inPlay) {
    this.flipComp();
    const $el = $(e.target);
    const $target = $el.is('div') ? $el : $el.parent();
    const category = $target.attr('class');
    $target.addClass('selected');
    if (this.p1[0][category] > this.comp[0][category]) {
      this.yourDeck++;
      this.compDeck--;
      this.p1.push(this.p1.splice(0,1)[0], this.comp.splice(0,1)[0]);
      $('#pounds').get(0).play();
      $('.playerDeck').addClass('selected');
      setTimeout(() => {
        $('.container').addClass('playerWin');
      }, 3200);
      setTimeout(() => {
        $('.container').addClass('playerWin transitioning');
      }, 3500);
    } else if (this.p1[0][category] === this.comp[0][category]) {
      this.yourDeck;
      this.compDeck;
      this.p1.push(this.p1.splice(0,1)[0]);
      this.comp.push(this.comp.splice(0,1)[0]);
      $('#draw').get(0).play();
    } else {
      this.yourDeck--;
      this.compDeck++;
      this.comp.push(this.p1.splice(0,1)[0], this.comp.splice(0,1)[0]);
      console.log(this.p1, this.comp);
      $('#ricky').get(0).play();
      $('.computerDeck').addClass('selected');
      setTimeout(() => {
        $('.container').addClass('compWin');
      }, 3200);
      setTimeout(() => {
        $('.container').addClass('compWin transitioning');
      }, 3500);
    }
    this.$yourDeck.html(this.yourDeck);
    this.$compDeck.html(this.compDeck);
    setTimeout(()=>{
      this.fillCards();
    }, 4000);
    setTimeout(this.flipBack, 3000);
    this.win();
  }
};

ett.flipBack = function() {
  $('.card').removeClass('flipped');
  $('.selected').removeClass('selected');
};

ett.win = function() {
  console.log('inside the win');
  if(this.yourDeck === 24 || this.compDeck === 24 || this.timeRemaining === 0) {
    if (this.yourDeck > this.compDeck) {
      $('#win').get(0).play();
      $('.youWon').show();
    } else if (this.yourDeck === this.compDeck){
      $('#drew').get(0).play();
      $('.youDrew').show();
    } else {
      $('#lose').get(0).play();
      $('.youLost').show();
    }
    $('.container').hide();
    $('.score-board').hide();
    $('.start').hide();
    this.$timer.hide();
  }
  $('.reset').on('click', this.playAgain.bind(this));
};

ett.playAgain = function() {
  this.timeRemaining = 60;
  this.$timer.html(60);
  this.$yourDeck.html(12);
  this.$compDeck.html(12);
  this.yourDeck = 12;
  this.compDeck = 12;
  this.shuffleAndDeal();
  this.fillCards();
  this.flipBack();
  $('.youWon').hide();
  $('.youLost').hide();
  $('.youDrew').hide();
  $('.container').show();
  $('.score-board').show();
  $('.start').show();
  this.$timer.show();
  this.$timer.removeClass('selected');
  $('.start').css('visibility', 'visible');
};

ett.setup = function() {
  this.timeRemaining = 60;
  this.timerId = null;
  this.timer = null;
  this.yourDeck = 12;
  this.compDeck = 12;
  this.p1 = [];
  this.comp = [];
  this.$timer = $('.timer');
  this.$yourDeck = $('#yourDeck');
  this.$compDeck = $('#compDeck');
  this.$p1Card = $('#p1');
  this.$compCard = $('#comp');
  this.$instructions = $('.instructions');
  $('.youWon').hide();
  $('.youLost').hide();
  $('.youDrew').hide();
  $('header').hide();
  $('main').hide();
  $('.score-board').hide();
  this.$instructions.hide();
  this.shuffleAndDeal();
  this.fillCards();
  $('#p1').on('click', this.flipP1.bind(this));
  $('.playButton').on('click', this.removeOverlay.bind(this));
  $('.closeInstructions').on('click', this.removeInstructions.bind(this));
  $('.start').on('click', this.startTimer.bind(this));
  $('.back > div:not(.image)').on('click', this.compare.bind(this));
};

$(ett.setup.bind(ett));
