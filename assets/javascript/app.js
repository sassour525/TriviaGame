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

	$("#questions").html("");
	$("#results").html("");

	correctGuesses = 0;
	incorrectGuesses = 0;
	unansweredQuestions = 0;
	triviaList = [];

	timer = {
		time: 3,
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

	var question1 = generateQuestion('What is your favorite color?', ['blue', 'green', 'red'], 0); //correct answer is index of the right answer
	console.log(question1);
	displayQuestion('question1', question1);

	var question2 = generateQuestion('How old is this car?', ['10', '20', '30'], 1);
	console.log(question2);
	displayQuestion('question2', question2);

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

			console.log(answers);

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

	$("#results").show();
}

function startGame() {
	$("#start").hide();
	$("#time").show();
	$("#questions").show();
	timer.start();

}

window.onload = function() {
	init();
}


//create radio buttons with labels
// var answers = $('<input type="radio" name="radio-choice-' + question.answers[0] + '" id="radio-choice-' + question.answers[i] 
// 	+ '" value="' + i + '"/><label for="radio-choice-' 
// 	+ question.answers[i] + '">' + question.answers[i] + '</label>');