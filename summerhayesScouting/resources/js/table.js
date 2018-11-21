$(document).ready(function () {
    $.ajax({
        headers: {
            'X-Auth-Token': '9ef5e64e3b704ad088300d88086d786c'
        },
        url: "http://api.football-data.org/v2/competitions/PL/standings",
        method: 'GET',
        dataType: 'json',

        success: function (Standings) {



            for (var i = 0; i < 20; i++) {
                var name = Standings.standings[0].table[i].team.name;
                var points = Standings.standings[0].table[i].points;
                var playedGames = Standings.standings[0].table[i].playedGames;
                var gamesWon = Standings.standings[0].table[i].won;
                var gamesDrawn = Standings.standings[0].table[i].draw;
                var gamesLost = Standings.standings[0].table[i].lost;
                var goalDifference = Standings.standings[0].table[i].goalDifference;



                var rowHtml = '<tr><td>' + name + '</td><td>'+ playedGames +'</td><td>' + gamesWon + '</td><td>' + gamesDrawn + '</td><td>' + gamesLost + '</td><td>' + goalDifference  + '</td><td>'+ points + '</td></tr>';
                $('.premTable').append(rowHtml);


            }

        }
    })
    
    
    $.ajax({
        headers: {
            'X-Auth-Token': '9ef5e64e3b704ad088300d88086d786c'
        },
        url: "http://api.football-data.org/v2/competitions/CL/standings",
        method: 'GET',
        dataType: 'json',

        success: function (Standings) {
            var Cl = Standings.standings[6].table;
            
            for(var i = 0; i < Cl.length; i++){
                var name = Cl[i].team.name;
                var playedGames = Cl[i]. points;
                var gamesWon = Cl[i].won;
                var gamesDrawn = Cl[i].drawn;
                var gamesLost = Cl[i].lost;
                var goalDifference = Cl[i].goalDifference;
                var points = Cl[i].points;
                
                if (gamesDrawn === undefined) {
                    gamesDrawn = '0';
                }
                
                var table_cl =  '<tr><td>'+ name +'</td><td>'+ playedGames +'</td><td>' + gamesWon + '</td><td>' +gamesDrawn + '</td><td>' +gamesLost + '</td><td>' + goalDifference+ '</td><td>' + points + '</td></tr>';
                
                $('.clTable').append(table_cl)

            }

            
        }
    })


});
