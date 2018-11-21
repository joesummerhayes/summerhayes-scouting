$(document).ready(function () {

    $.ajax({
        headers: {
            'X-Auth-Token': '9ef5e64e3b704ad088300d88086d786c'
        },
        url: "http://api.football-data.org/v2/competitions/PL/standings",
        method: 'GET',
        dataType: 'json',

        success: function (Standings) {

            var teamNames = []
            var tableIndex = []

            for (var i = 0; i < 20; i++) {
                var name = Standings.standings[0].table[i].team.name;

                teamNames.push(name);
            }

            // console.log(teamNames)

            var dropDownHome = document.getElementById("listHome");
            var dropDownAway = document.getElementById("listAway")

            for (var i = 0; i < teamNames.length; i++) {
                dropDownHome[dropDownHome.length] = new Option(teamNames[i], teamNames[i]);
                dropDownAway[dropDownAway.length] = new Option(teamNames[i], teamNames[i]);
            };

            // clicking the generate score button grabs values from the drop down menues

            $('.generateScore').click(function () {
                var homeTeam = document.getElementById('listHome').value;
                var awayTeam = document.getElementById('listAway').value;

                //now i need to find the table positions of each team

                var tablePositionHome = teamNames.indexOf(homeTeam);
                var tablePositionAway = teamNames.indexOf(awayTeam);

                //now i need to do a big if else statement that applies the correct random score arrray based on league position. 

                // RANDOM GOAL GENERATOR    

                var rand = function (min, max) {
                    return Math.random() * (max - min) + min;
                };

                var getRandomItem = function (list, weight) {
                    var total_weight = weight.reduce(function (prev, cur, i, arr) {
                        return prev + cur;
                    });

                    var random_num = rand(0, total_weight);
                    var weight_sum = 0;
                    //console.log(random_num)

                    for (var i = 0; i < list.length; i++) {
                        weight_sum += weight[i];
                        weight_sum = +weight_sum.toFixed(2);

                        if (random_num <= weight_sum) {
                            return list[i];
                        }
                    }

                    // end of function
                };

                var list = [0, 1, 2, 3, 4, 5];
                var weightOne = [.05, .1, .4, .3, .1, .05];
                var weightTwo = [.09, .22, .36, .23, .07, .03];
                var weightThree = [.3, .44, .19, .04, .03, .01];
                var weightFour = [.5, .4, .07, .02, .01, 0];


                // calling the random item generator using the different weight categories for the different table positions. 
                var random_item1 = getRandomItem(list, weightOne);
                var random_item2 = getRandomItem(list, weightTwo);
                var random_item3 = getRandomItem(list, weightThree);
                var random_item4 = getRandomItem(list, weightFour);
                
                var scoreHome 
                var scoreAway


                if (tablePositionHome <= 1) {
                    scoreHome = getRandomItem(list, weightOne);
                } else if (tablePositionHome > 1 && tablePositionHome < 5) {
                    scoreHome = getRandomItem(list, weightTwo);
                } else if (tablePositionHome > 5 && tablePositionHome < 15) {
                    scoreHome = getRandomItem(list, weightThree);
                } else {
                    scoreHome = getRandomItem(list, weightFour);
                };

                if (tablePositionAway <= 1) {
                    scoreAway = getRandomItem(list, weightOne)
                } else if (tablePositionAway > 1 && tablePositionAway < 5) {
                    scoreAway = getRandomItem(list, weightTwo);
                } else if (tablePositionAway > 5 && tablePositionAway < 15) {
                    scoreAway = random_item3
                } else {
                    scoreAway = getRandomItem(list, weightFour);
                };
                
                document.getElementById('displayScore').innerHTML = homeTeam + ' ' + scoreHome + ':' + scoreAway + ' ' + awayTeam
                
      

            })

        }

    });

    


})
