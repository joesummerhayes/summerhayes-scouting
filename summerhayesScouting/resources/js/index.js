$(document).ready(function () {

    //set the date we are counting down to

    var countDownDate = new Date("Jan 1, 2019 00:00:1").getTime();

    
    //update the count every 1second
    
    var x = setInterval(function(){
        var now = new Date().getTime();

    // Find the distance between now and the count down date
        var distance = countDownDate - now;
        
    // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Output the result in an element with id="demo"
        
        document.getElementById("countDown").innerHTML = 'New site launch in...<br>'+  days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
        
        if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "Website Live";
    }
}, 1000);

    
    




})
