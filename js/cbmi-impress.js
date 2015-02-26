var defaultTime = 5000;
var impress = impress();




$(document).ready(function(){

    var winWidth = $(window).outerWidth();
    $('.step').css("width", winWidth);

    // finally init impress
    impress.init();


    var timing;
    document.addEventListener('impress:stepenter', function(e){
        if (typeof timing !== 'undefined') clearInterval(timing);
        // use the set duration or fallback to default
        var duration = (e.target.getAttribute('data-transition-duration') ? e.target.getAttribute('data-transition-duration') : defaultTime);
        timing = setInterval(impress.next, duration);
    });

    $(".iframe")
        .attr("width", $(window).outerWidth())
        .attr("height", $(window).outerHeight());
});

