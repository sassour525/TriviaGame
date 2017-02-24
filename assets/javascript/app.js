var correctGuesses; //holds total for correctly answered questions
var incorrectGuesses; //holds total for incorrectly answered questions
var unansweredQuestions; //holds total for unanswered questions
var timer; //timer for game
var answerChoices; //array of answer choices for the question
var question; //question for the user to answer
var answerIndex; //correct answer to the question
var triviaList;

function init() {
	$("#start").show();
	$("#time").hide();
	$("#questions").hide();
	$("#results").hide();
	$("#done-button").hide();

	$("#questions").html("");
	$("#results").html("");

	correctGuesses = 0;
	incorrectGuesses = 0;
	unansweredQuestions = 0;
	triviaList = [];

	timer = {
		time: 120,
		interval: null,
		start: function() {
			timer.interval = setInterval(timer.count, 1000);
			$('#time').html(timer.time);
		},
		count: function() {
			timer.time--;
			$('#time').html(timer.time);
			if (timer.time == 0) {
				clearInterval(timer.interval);
				generateResults();

			}
		}
	}

	var question1 = generateQuestion('Bordeaux is a type of wine?', ['True', 'False'], 1); //correct answer is index of the right answer
	displayQuestion('question1', question1);

	var question2 = generateQuestion('What adds a bitter taste to beer?', ['Malt', 'Yeast', 'Hops', 'Barley'], 2);
	displayQuestion('question2', question2);

	var question3 = generateQuestion('What is considered a "mature" wine?', ['1yr', '4yrs', '6yrs', '7yrs'], 3); //correct answer is index of the right answer
	displayQuestion('question3', question3);

	var question4 = generateQuestion('How many yrs is the lease for the Guiness brewery in Dublin, Ireland?', ['10yrs', '9,000yrs', '3,000yrs', '200yrs'], 1);
	displayQuestion('question4', question4);

	var question5 = generateQuestion('What is the component in wine that can cause a headache?', ['Yeast', 'Salt', 'Tannins', 'Sugar'], 2); //correct answer is index of the right answer
	displayQuestion('question5', question5);

	var question6 = generateQuestion('How many oz are in a pint?', ['10oz', '16oz', '8oz', '12oz'], 1);
	displayQuestion('question6', question6);

	var question7 = generateQuestion('Which one of these does not mean "Cheers"?', ['Salude', 'Slainte', 'Cheers', 'Huzzah'], 3);
	displayQuestion('question7', question7);

	var question8 = generateQuestion('What is a 22oz beer commonly referred to as?', ['Bomber', 'Keg', 'Bushel', 'Tank'], 0);
	displayQuestion('question8', question8);

	var question9 = generateQuestion('Why do resturants give a sample of wine before pouring you a glass?', ['To make sure it is not spoiled', 'As a joke', 'To be efficent', 'For fun'], 0);
	displayQuestion('question9', question9);

	var question10 = generateQuestion('What is the alcohol content of the strongest beer in the world?', ['50%', '28.5%', '70.2%', '67.5%'], 3);
	displayQuestion('question10', question10);


}

function generateQuestion(question, answerArray, answer) {
	var question = {
		text: question,
		answers: answerArray,
		answerIndex: answer 
	}

	return question;
}

function displayQuestion(name, question) {
	var output = $('<h2>');
	output.append(question.text);
	$('#questions').append(output);
	triviaList.push({
		name: name,
		question: question
	});

	if (question.answers && question.answers.length > 0) {
		//best practice to wrap for loop with check if looping through an array
		for (var i = 0; i < question.answers.length; i++) {

			var id = name + '-' + question.answers[i];
			var answers = $('<input type="radio"/>');
			answers.attr('name', name);
			answers.attr('id', id);
			answers.attr('value', i);

			var label = $('<label>').html(question.answers[i]);
			label.attr('for', id);

	     	$('#questions').append(answers);
	     	$('#questions').append(label);
		
		}
	}
}

function generateResults() {
	
	if (triviaList && triviaList.length > 0) {
		for (var i = 0; i < triviaList.length; i++) {
			var value = $('input[name="' + triviaList[i].name + '"]:checked').val();
			console.log(value);
			if (value == triviaList[i].question.answerIndex) {
				correctGuesses++;
			} else if (!value) {
				unansweredQuestions++;
			} else {
				incorrectGuesses++;
			}
		}
	}

	$("#time").hide();
	$("#questions").hide();

	var cg = $("<div>").html("Correct Guesses: " + correctGuesses);
	var uaq = $("<div>").html("Unanswered Questions: " + unansweredQuestions);
	var iq = $("<div>").html("Incorrect Guesses: " + incorrectGuesses);
	var restart = $("<button>").html("Restart").on("click", function() {
		init();
	});
	$("#results").append(cg);
	$("#results").append(uaq);
	$("#results").append(iq);
	$("#results").append(restart);

	$("#done-button").hide();
	$("#results").show();
	clearInterval(timer.interval);

}

function startGame() {
	$("#start").hide();
	$("#time").show();
	$("#questions").show();
	$("#done-button").show();
	timer.start();

}

window.onload = function() {
	init();
}


//create radio buttons with labels
// var answers = $('<input type="radio" name="radio-choice-' + question.answers[0] + '" id="radio-choice-' + question.answers[i] 
// 	+ '" value="' + i + '"/><label for="radio-choice-' 
// 	+ question.answers[i] + '">' + question.answers[i] + '</label>');