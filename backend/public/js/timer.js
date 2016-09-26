function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML =
            current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                setTimeout(function () { countdown(mins - 1); }, 1000);
            }
        }
        if(current_minutes==00 && seconds==30)    {
            setTimeout(function(){alert("30 seconds left");},3000);
        }
        if(current_minutes==0 && seconds==0)    {
            window.open("/complete","_self");     }
    }
    tick();
}
countdown(1);