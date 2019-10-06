// alert("hello"); to make sure linked properly
//questions
var questions = [{
    question: "Botany is the study of?",
    answers: ["Plants", "Rocks", "Planets", "Gorillas"],
    correctAnswer: "Plants",
    Image: "assets/images/plants.jpg",
}, {
    question: "Who is known as the 'father of botany'?",
    answers: ["Mendel", "Aristotle", "Theophrastus", "Linnaeus"],
    correctAnswer: "Theophrastus",
    Image: "assets/images/Theophrastus.jpg",
}, {
    question: "How many seed leaves does a dicotyledon have?",
    answers: ["0", "1", "2", "3"],
    correctAnswer: "2",
    Image: "assets/images/dicotyledon.jpg",
}, {
    question: "What is the botanical name for the male reporoductive organ in flowering plants?",
    answers: ["Calyx", "Frond", "Carpel", "Stamen"],
    correctAnswer: "Stamen",
    Image: "assets/images/stamen.jpg",
}, {
    question: "What is the most poisonous plant in the world?",
    answers: ["Narcissus", "Arican Daisy", "Poppy", "Orchid"],
    correctAnswer: "Narcissus",
    Image: "assets/images/narcissus.jpg",
}, {
    question: "What is the fastest growing plant in the world?",
    answers: ["Cactus", "Carrots", "Bamboo", "Grass"],
    correctAnswer: "Bamboo",
    Image: "assets/images/bamboo.jpg",
}, {
    question: "What gives Carrots their orange color?",
    answers: ["Chlorophyll", "Beta-carotene", "Carotene", "Vitamin A"],
    correctAnswer: "Beta-carotene",
    Image: "assets/images/beta-carotene.jpg",
}];

var timer=30;
var correct =0;
var incorrect = 0;
var unanswered =0; 
var currentlyOnQuestion = 0;
var countDown;


//start screen
$("#begin").on ('click', function(){
    $("#begin").remove();
    currentQuestion();

});

// timer
function startTimer  (){
    timer --;
    $('#timer-here').html("Time Left:" + timer);
    if(timer<=0){
        // alert("Sorry, you ran out of time");
        outOfTime();
    }

}

//current question
function currentQuestion (){
    clearInterval(countDown);
     countDown = setInterval(startTimer, 1000);
    $('.mainContainer').html('<h2>'+ questions[currentlyOnQuestion].question+ '</h2>');
    for (var i=0; i <questions[currentlyOnQuestion].answers.length; i++){
        $('.mainContainer').append('<button class="answer-choices" id="button-'+ i + '"data-name="'+questions[currentlyOnQuestion].answers[i]+ '">'+questions[currentlyOnQuestion].answers[i]+ '</button');
    }
}

//next question
function nextQuestion (){
    timer =30;
    $('#timer-here').html(timer);
    currentlyOnQuestion ++;
    currentQuestion();

}

// timeout
function outOfTime (){
    clearInterval(countDown);
    unanswered++;
    $('.mainContainer').html('<h2> You ran out of Time!</h2>');
    $('.mainContainer').append('<h3> The Correct Answer is: '+questions[currentlyOnQuestion].correctAnswer+'</h3>')
    if(currentlyOnQuestion ===questions.length-1){
        setTimeout(showResults, 5*1000);
    }else{
        setTimeout(nextQuestion, 5*1000);
    }

}
$(document).on('click', '.answer-choices', function(e){
    clickedAnswer(e);
})

// question answered
function clickedAnswer (e){
    clearInterval(countDown);
    if($(e.target).data("name")===questions[currentlyOnQuestion].correctAnswer) {
        correctlyAnswered();
    }else {
        incorrectlyAnswered();
    }
}

//if question is answered correctly
function correctlyAnswered (){
    // alert("Correct");
    clearInterval(countDown);
    correct ++;
    $('.mainContainer').html('<h2> Correct!</h2>');
    if(currentlyOnQuestion ===questions.length-1){
        setTimeout(showResults, 5*1000);
    }else{
        setTimeout(nextQuestion, 5*1000);
    }

}
// if question is answered incorrectly
function incorrectlyAnswered (){
    // alert("Incorrect");
    clearInterval(countDown);
    incorrect ++;
    $('.mainContainer').html('<h2> Wrong!</h2>');
    $('.mainContainer').append('<h3> The Correct Answer is: '+questions[currentlyOnQuestion].correctAnswer+'</h3>')
    if(currentlyOnQuestion ===questions.length-1){
        setTimeout(showResults, 5*1000);
    }else{
        setTimeout(nextQuestion, 5*1000);
    }
}

// result page
function showResults (){
    clearInterval(countDown);
    $('.mainContainer').html('<h2> All Done!</h2>');
    $('.mainContainer').append('<h3> Correct: ' + correct +'</h3>');
    $('.mainContainer').append('<h3> Incorrect:'+ incorrect +'</h3>');
    $('.mainContainer').append('<h3> Unanswered:'+ unanswered +'</h3>');
    $('.mainContainer').append("<button id='reset'> RESET </button>");
   }
$(document).on('click', '#reset', function(){
    restart();
})

// reset
function restart (){
    currentlyOnQuestion = 0;
    timer=30;
    correct =0;
    incorrect = 0;
    unanswered =0; 
    countDown;
    currentQuestion();
}


