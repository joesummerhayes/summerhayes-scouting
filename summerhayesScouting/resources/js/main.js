$(document).ready(function () {







    // Adding Score Predictions button

    $('.scoreButton').click(function () {
        var x = document.getElementById('score-prediction').value;
        localStorage.setItem('myTeam', x);

        var displayPred = localStorage.getItem('myTeam');
        document.querySelector('.predictionDisplay').innerHTML = displayPred;


        if (x === "liverpool" || x === "pool" || x === "the reds" || x === "Liverpool") {
            document.querySelector('.dillyDisplay').innerHTML = "You are a friend of the crown, DILLY DILLY!!";

        } else {
            document.querySelector('.dillyDisplay').innerHTML = "You are doomed to the pit of misery! Boooo";
        };
    });





    var displayPred = localStorage.getItem('myTeam');
    document.querySelector('.predictionDisplay').innerHTML = displayPred;



    $.ajax({
        headers: {
            'X-Auth-Token': '9ef5e64e3b704ad088300d88086d786c'
        },
        url: "http://api.football-data.org/v2/competitions/PL/standings",
        method: 'GET',
        dataType: 'json',


        success: function (Standings) {

            //array of prem teams
            var teamNames = []
            var tableIndex = []




            for (var i = 0; i < 20; i++) {
                var name = Standings.standings[0].table[i].team.name;
                var goalDifference = Standings.standings[0].table[i].goalDifference;
                var playedGames = Standings.standings[0].table[i].playedGames;
                var points = Standings.standings[0].table[i].points;
                var id = Standings.standings[0].table[i].team.id;
                var standings = Standings.standings[0].table[i].position;



                teamNames.push(name);
                tableIndex.push(standings);





                $('.premTeam').append("<p>" + name + "</p>");
                $('.premPoints').append("<p>" + points + "</p>");
                $('.playedGames').append("<p>" + playedGames + "</p>");
                $('.goalDifference').append("<p>" + goalDifference + "</p>");


                $('.premTeam').hover(function () {
                    $('.premTeam').css("background-color", "red");
                }, function () {
                    $('.premTeam').css("background-color", "#D79789");
                })


            };

          //clicking the confirm button      

            $('.generateScore').click(function () {
                var optionsOne = document.getElementById('listHome').value;
                var optionsTwo = document.getElementById('listAway').value;
                
                
                var tablePositionHome = teamNames.indexOf(optionsOne)
                var tablePositionAway = teamNames.indexOf(optionsTwo)
                
               
                
                if (tablePositionHome <= 4) {
                    var scoreHome = Math.floor(Math.random()*6)
                } else if (tablePositionHome > 4 && tablePositionHome <= 10) {
                    scoreHome = Math.floor(Math.random()*4)
                } else if (tablePositionHome > 10 && tablePositionHome<= 16) {
                    scoreHome = Math.floor(Math.random()*3)
                } else {
                    scoreHome = Math.floor(Math.random()*2)
                };
                
                if (tablePositionAway <= 4) {
                    var scoreAway = Math.floor(Math.random()*6)
                } else if (tablePositionAway > 4 && tablePositionAway <= 10) {
                    scoreAway = Math.floor(Math.random()*4)
                } else if (tablePositionAway > 10 && tablePositionAway<= 16) {
                    scoreAway = Math.floor(Math.random()*3)
                } else {
                    scoreAway = Math.floor(Math.random()*2)
                };
                
                console.log(scoreHome, scoreAway)
                
                document.querySelector('.generatedScore').innerHTML = optionsOne + ' : ' + scoreHome + '     ' + optionsTwo + ' : ' + scoreAway;
                


                   
            });
            





           
            //use team names array to populate my drop down menue


            var dropDown = document.getElementById("listHome");

            for (var i = 0; i < teamNames.length; i++) {
                dropDown[dropDown.length] = new Option(teamNames[i], teamNames[i])
            };

            var dropDownTwo = document.getElementById("listAway");

            for (var i = 0; i < teamNames.length; i++) {
                dropDownTwo[dropDownTwo.length] = new Option(teamNames[i], teamNames[i]) // first value is print name, second value is what's stored.
            };



            $('.squadButton').click(function () {

                $('.liverpoolTeam').toggle();

            });



            $('.fixturesButton').click(function () {
                $('.liverpoolFixtures').toggle();
            });



            $('.liveTableButton').click(function () {
                $('.liverpoolTableOne').toggle();
            });



            $('.liveTableButton').hover(function () {
                $('.liveTableButton').css("background-color", "red");
            }, function () {
                $('.liveTableButton').css("background-color", "white");
            });






        }



    });



    $.ajax({
        headers: {
            'X-Auth-Token': '9ef5e64e3b704ad088300d88086d786c'
        },
        url: "http://api.football-data.org/v2/teams/64",
        method: 'GET',
        dataType: 'json',

        success: function (Team) {


            for (var i = 0; i < 26; i++) {
                var players = Team.squad[i].name;
                var position = Team.squad[i].position;
                var nationality = Team.squad[i].nationality;

                $('.players').append("<p>" + players + "</p>");
                $('.position').append("<p>" + position + "</p>");
                $('.nationality').append("<p>" + nationality + "</p>");


            };


        }

    });



    $.ajax({
        headers: {
            'X-Auth-Token': '9ef5e64e3b704ad088300d88086d786c'
        },
        url: "http://api.football-data.org/v2/teams/64/matches?limit=100",
        method: 'GET',
        dataType: 'json',

        success: function (Match) {

            var livFixtures = [];




            for (var i = 0; i < Match.matches.length; i++) {
                var fixturesHome = Match.matches[i].homeTeam.name;
                var fixturesAway = Match.matches[i].awayTeam.name;
                var fixturesDate = Match.matches[i].utcDate;
                var matchResult = Match.matches[i].score.winner;
                var matchStatus = Match.matches[i].status;

                livFixtures.push(fixturesHome + " VS " + fixturesAway);


                $('.lfcFixturesHome').append("<p>" + fixturesHome + "</p>");
                $('.lfcFixturesAway').append("<p>" + fixturesAway + "</p>");
                $('.tableFixtureDates').append("<p>" + fixturesDate + "</p>");
                $('.tableFixtureResult').append("<p>" + matchResult + "</p>");
                $('.tableFixtureStatus').append("<p>" + matchStatus + "</p>");

            }



            for (var i = 0; i < Match.matches.length; i++) {
                var fixturesHome = Match.matches[i].homeTeam.name;
                var fixturesAway = Match.matches[i].awayTeam.name;
                var fixturesDate = Match.matches[i].utcDate;
                var matchResult = Match.matches[i].score.winner;
                var matchStatus = Match.matches[i].status;

                if (matchStatus !== "SCHEDULED") {
                    continue;
                }
                var nextGame = fixturesHome + " VS " + fixturesAway;
                $('.liverpoolNextGame').append(nextGame);
                break;
            }



        }
    });


    //   localStorage.setItem('myCat', 'Tom');


})
