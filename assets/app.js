//establish the objects with questions, choices, answers, and GIFS
var questions = [{
    q: "Who is the villian in 101 Dalmations?",
    a: ["Spoila", "Devole", "Evilo", "Cruella"],
    ca: "Cruella",
    gif: "assets/gifs/101dalmations.gif"
}, {
    q: "What is Jasmine's tiger's name in Aladdin?",
    a: ["Rojif", "Rajah", "Ralph", "Randall"],
    ca: "Rajah",
    gif: "assets/gifs/aladdin.gif"
}, {
    q: "What town does Lightning Mcqueen pitstop at in Cars?",
    a: ["Galoway Golls", "Muffler City", "The Windshield City", "Radiator Springs"],
    ca: "Radiator Springs",
    gif: "assets/gifs/cars.gif"
}, {
    q: "Which country does the original Cinderella take place in?",
    a: ["England", "France", "Sweden", "Belgium"],
    ca: "France",
    gif: "assets/gifs/cinderella.gif"
}, {
    q: "Which country does Nemo go to in Finding Nemo?",
    a: ["Australia", "America", "Afghanistan", "Algeria"],
    ca: "Australia",
    gif: "assets/gifs/findingnemo.gif"
}, {
    q: "What was the first song played in Lion King?",
    a: ["Circle of Life", "Cant wait to be King!", "The Lionness", "Jungles"],
    ca: "Circle of Life",
    gif: "assets/gifs/lionking.gif"
}, {
    q: "What is the fake name Mulan uses?",
    a: ["Fa Ping", "Sing So", "Tire Ma", "Lil Bool"],
    ca: "Fa Ping",
    gif: "assets/gifs/mulan.gif"
}, {
    q: "What is the name of the boy who owns Buzz in the movie Toy Story?",
    a: ["Paul", "Dave", "Richie", "Andy"],
    ca: "Andy",
    gif: "assets/gifs/toystory.gif"
}];

//grab the game
var panel = $(".quiz-layer");
var timerStarter = 30;
var count;

//initialize the game
var game = {
    questions: questions,
    currentQuestion: 0,
    timer: timerStarter,
    correct: 0,
    wrong: 0,

    countdown: function() {
        game.timer--;
        $("#timerNumber").text(game.timer);
        if(game.timer == 0){
            console.log("Times up, bud!");
            game.roundOver();
        }
    },

    loadQuestion: function() {
        count = setInterval(game.countdown, 1000);

        console.log("loadQuestion");
        panel.html("<h2>" + questions[this.currentQuestion].q + "</h2>");
    //set-up questions
        for (var i = 0; i < questions[this.currentQuestion].a.length; i++) {
            panel.append("<button class='answer-button primary btn btn-primary btn-lg' id='button' data-name='" + 
            questions[this.currentQuestion].a[i] + "'>" + 
            questions[this.currentQuestion].a[i] + "</button");
        }
    },

    nextQuestion: function() {
        game.timer = timerStarter;
        $("#timerNumber").text(game.timer);
        game.currentQuestion++;
        game.loadQuestion();
    },

    roundOver: function() {
        clearInterval(count);
        $("#timerNumber").html(game.timer);

        panel.html("<h2>Out of time!</h2>");
        panel.append("<h3>The correct answer is " + questions[this.currentQuestion].ca);
        panel.append("<img src= '" + questions[this.currentQuestion].gif + "' />");

        if(game.currentQuestion == questions.length - 1){
            setTimeout(game.results, 5 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 5 * 1000)
        }
    },

    results: function() {

        clearInterval(count);

        panel.html("<h2>Results!!!</h2>");

        $("#timerNumber").text(game.timer);

        panel.append("<h3>Correct: " + game.correct + "</h3>")
        panel.append("<h3>Incorrect: " + game.wrong + "</h3>")
        panel.append("<h3>Questions left: " + (questions.length - (game.wrong + game.correct)) + "</h3>")
        panel.append("<br><button id='restart' class='primary'>Restart Game?</button>")
    },

    clicked: function(e) {
        clearInterval(count);
        if ($(e.target).attr("data-name") == questions[this.currentQuestion].ca) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },

    answeredCorrectly: function() {
        clearInterval(count);
        game.correct++;

        panel.html("<h2>Correctamundo!</h2>");
        panel.append("<img src='" + questions[game.currentQuestion].gif + "' />");

        if(game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 5 * 1000);
        } else {
            setTimeout(game.nextQuestion, 5 * 1000)
        }
    },

    answeredIncorrectly: function() {
        clearInterval(count);
        game.incorrect++;

        panel.html("<h2>NAHHHH!</h2>");
        panel.append("<h2>The correct answer was: " + questions[game.currentQuestion].ca + "</h3>");
        panel.append("<img src'" + questions[game.currentQuestion].gif + "' />");

        if(game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 5 * 1000);
        } else {
            setTimeout(game.nextQuestion, 5* 1000);
        }
    },

    reset: function() {
        this.currentQuestion = 0;
        this.timer = timerStarter;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};

//clicking events

$(document).on("click", "#restart", function() {
    game.reset;
});

$(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
});

$(document).on("click", "#start", function() {
    $(".outter-layer").prepend("<h2>Time Remaining: <span id='timerNumber'>30</span> Seconds</h2>");
    console.log("started");
    game.loadQuestion();
});
