$(document).ready(function () {


    $.ajax({
        headers: {
            'X-Auth-Token': '9ef5e64e3b704ad088300d88086d786c'
        },
        url: "http://api.football-data.org/v2/teams/64/matches?limit=100",
        method: 'GET',
        dataType: 'json',

        success: function (Match) {

            for (var i = 0; i < Match.matches.length; i++) {
                var home = Match.matches[i].homeTeam.name;
                var away = Match.matches[i].awayTeam.name;
                var date = Match.matches[i].utcDate;
                var status = Match.matches[i].status;
                var scoreHome = Match.matches[i].score.fullTime.homeTeam
                var scoreAway = Match.matches[i].score.fullTime.awayTeam;
                var id = Match.matches[i].id;


                if (status === "SCHEDULED") {
                    var fixturesTable = '<tr><td>' + home + '</td><td>' + away + '</td><td>' + date + '</td><tr';
                    $('.fixtures').append(fixturesTable)
                } else {
                    var resultsTable = '<tr><td>' + home + '</td><td>' + away + '</td><td>' + scoreHome + ' - ' + scoreAway + '</td><tr';
                    $('.results').append(resultsTable)
                }

            }

        }

    })
    

            
    
    

})
