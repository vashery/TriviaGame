
        $(document).ready(function () {
            var correctscore = 0;
            var incorrectscore = 0;
            var unanswered = 0;
            var playnumber = 0;
            var currentquestion = "";
            var currentanswers = [];
            var correctanswer = "";
            var intervalId;
            var number = 30;

            function clearScreen() {
                $("main").empty();
            }

            function getNewQuestion() {
                $.get("https://opentdb.com/api.php?amount=1&category=12&difficulty=medium&type=multiple", function (data, status) {
                    for (var i = 0; i < data.results[0].incorrect_answers.length; i++) {
                        currentanswers.push(data.results[0].incorrect_answers[i])
                    }
                    currentquestion = data.results[0].question;
                    correctanswer = data.results[0].correct_answer;
                    currentanswers.push(data.results[0].correct_answer)
                    currentanswers.sort(function () { return 0.5 - Math.random() });
                    console.log(currentanswers);
                    console.log(currentquestion);
                    
                    $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><h1>Time Remaining</h1><h1 id='timeleft' class='text-center'>30</h1></div></div></div><br><div class='row justify-content-center'><div class='card bg-dark text-white border-0'><h1 id='questiontext' class='card-body'>" + currentquestion + "</h1></div></div>")
                    for (let i = 0; i < currentanswers.length; i++) {
                        $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><button id='" + currentanswers[i] + "' type='button' class='ansbutton btn btn-lg btn-block btn-primary font-weight-bold bg-info'><h3>" + currentanswers[i] +"</h3></button></div></div></div>")
                    }
                    $(".ansbutton").click(function () {
                        stop();
                        clearScreen();
                        $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><h1>Time Remaining</h1><h1 id='timeleft' class='text-center'>30</h1></div></div></div><br><div class='row justify-content-center'><div class='card bg-dark text-white border-0'><h1 id='questiontext' class='card-body'>" + currentquestion + "</h1></div></div>")
                        buttonpressed = $(this).attr("id")

                        if (buttonpressed === correctanswer) {
                            correctscore++
                            $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><h1 class='display-4'>You are Correct! <br> The Correct Answer Was: " + correctanswer + "</h1></div></div></div>")
                            playnumber++
                            windowTimeout = setTimeout(function () {
                                runGame()
                            }, 2000);

                        }
                        else {
                            incorrectscore++
                            $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><h1 class='display-4'>You are Incorrect! <br> The Correct Answer Was: " + correctanswer + "</h1></div></div></div>")
                            playnumber++
                            var windowTimeout = setTimeout(function () {
                                runGame()
                            }, 2000);

                        }
                    });


                });

            }

            function getGameStart() {
                clearScreen();
                $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><h1 class='display-4'>Welcome to the Trivia Game!</h1></div></div></div>")
                $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><button id='startgamebutton' type='button' class='btn btn-lg btn-block btn-primary font-weight-bold bg-info'><h3>Click Here to Start!</h3></button></div></div></div>")
            }

            function run() {
                intervalId = setInterval(decrement, 1000);
            }

            function stop() {

                clearInterval(intervalId);

            }

            function decrement() {

                number--;

                $("#timeleft").html("<h1 id='timeleft' class='text-center'>" + number + "</h1>");

                if (number === 0) {

                    stop();
                    clearScreen();
                    $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><h1>Time Remaining</h1><h1 class='text-center'>30</h1></div></div></div><br><div class='row justify-content-center'><div class='card bg-dark text-white border-0'><h1 id='questiontext' class='card-body'>" + currentquestion + "</h1></div></div>")
                    $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><h1 class='display-4'>Times Up! <br> The Correct Answer Was: " + correctanswer + "</h1></div></div></div>")
                    //$("main").append("<div class='jumbotron text-center'><h1 cla='display-4'>Times Up! The Correct Answer Was: " + correctanswer + "</h1></div>")
                    unanswered++
                    playnumber++
                    var windowTimeout = setTimeout(function () {
                        runGame();
                    }, 3000);

                }
            }

            function runGame() {
                if (playnumber === 10) {
                    clearScreen();
                    $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><h1 class='display-4'>Game Over!</h1></div></div></div>")
                    $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><h1 class='display-4'>Number of correct answers: " + correctscore + "</h1></div></div></div>")
                    $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><h1 class='display-4'>Number of incorrect answers: " + incorrectscore + "</h1></div></div></div>")
                    $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><h1 class='display-4'>Number of unanswered: " + unanswered + "</h1></div></div></div>")
                    $("main").append("<div class='row justify-content-center'><div class='card bg-dark text-white border-0'><div class='card-body'><button id='restartbutton' type='button' class='btn btn-lg btn-block btn-primary font-weight-bold bg-info'><h3>Play Again?</h3></button></div></div></div>")
                    $(document).on('click', '#restartbutton', function () {
                        playnumber = 0;
                        correctscore = 0;
                        incorrectscore = 0;
                        unanswered = 0;
                        getGameStart();
                    });

                }
                else {
                    number = 30;
                    currentquestion = "";
                    currentanswers = [];
                    correctanswer = "";
                    clearScreen();
                    getNewQuestion();
                    run();

                }

            }

            getGameStart();

            $(document).on('click', '#startgamebutton', function () {
                runGame()

            });

        })