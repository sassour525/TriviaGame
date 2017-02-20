var correctGuesses; //holds total for correctly answered questions
var incorrectGuesses; //holds total for incorrectly answered questions
var unansweredQuestions; //holds total for unanswered questions
var timer; //timer for game
var answerChoices; //array of answer choices for the question
var question; //question for the user to answer
var correctAnswer; //correct answer to the question

function init() {
	// correctGuesses = 0;
	// incorrectGuesses = 0;
	// unansweredQuestions = 0;

	timer = {
		time: 30,
		start: function() {
			intervalId = setInterval(timer.count, 1000);
		},
		count: function() {
			timer.time--;
			$('.time').html(timer.time);
		}
	}
	$('.time').html(timer.time);
	timer.start();

	var question1 = generateQuestion('What is your favorite color?', ['blue', 'green', 'red'], 'blue');
	console.log(question1);
	var question2 = generateQuestion('How old is this car?', ['10', '20', '30'], '20');
	console.log(question1);

	displayQuestions(question1);
	displayQuestions(question2);
}


function generateQuestion(question, answerArray, answer) {
	var question = {
		questionText: question,
		questionAnswers: answerArray,
		correctAnswer: answer 
	}

	return question;
}

function displayQuestions(question) {
	var output = $('<div>');
	output.append(question.questionText);
	$('.test').append(output);

	for (var i = 0; i < question.questionAnswers.length; i++) {

		//create radio buttons with labels
		var answers = $('<input type="radio" name="radio-choice" id="radio-choice-' + question.questionAnswers[i] + '" value="' + question.questionAnswers[i] + '"/><label for="radio-choice-' + i + '">' + question.questionAnswers[i] + '</label>');

		console.log(answers);

     	$(".test").append(answers);
	
	}
}

window.onload = function() {
	init();
}