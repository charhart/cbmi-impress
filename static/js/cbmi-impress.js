var defaultTime = 30000;
var impress = impress();




$(document).ready(function(){

    var winWidth = $(window).outerWidth();
    $('.step').css("width", winWidth);

    // finally init impress
    impress.init();


    var timing;
    document.addEventListener('impress:stepenter', function(e){
        // reset any existing iFrame
        refreshIFrame();

        if (typeof timing !== 'undefined') clearInterval(timing);
        // use the set duration or fallback to default
        var duration = (e.target.getAttribute('data-transition-duration') ? e.target.getAttribute('data-transition-duration') : defaultTime);
        var tgt = $(e.target);
        if (tgt.hasClass("step-time")) {
            $("#timeDiv").fadeIn();
        } else {
            $("#timeDiv").fadeOut();
        }
        timing = setInterval(impress.next, duration);
    });

   function resizeIFrame() {
       $(".iframe")
           .attr("width", $(window).outerWidth())
           .attr("height", $(window).outerHeight());
    }

    function resizePoster() {
        $("#posterSrc")
            .css("width", "90%")
            .css("height", "auto");
    }

    function resizeOther() {
        //$("#ken-codepen").attr("data-height", $(window).outerHeight());


        $("#nav")
            .css("left", $(window).outerWidth() - 50)
            .css("top", 0);

        $(".iframe-resize").attr("src", function() {
            return $(this).attr("src");
        });
    }
    
    function refreshIFrame() {
        $(".iframe-refresh").attr("src", function() {
           return $(this).attr("src"); 
        });
    }




    // quotes
    var quotes = [];
    var currentQuote, totalQuotes;
    $.getJSON( "../static/data/quotes.json", function( data ) {
       quotes = data;
        currentQuote = 0;
        totalQuotes = quotes.length;
        $("#quote").text(quotes[0].quote);
        $("#quote-attribute").text(quotes[0].author);
    });

    // announcements
    var announcements = [];
    var currentAnnouncement, totalAnnouncements;
    $.getJSON( "../static/data/announcements.json", function( data ) {
        announcements = data;
        currentAnnouncement = 0;
        totalAnnouncements = announcements.length;
        $("#announcement").text(announcements[0].announcement);
        $("#subtext").text(announcements[0].subtext);
    });

    // posters
    var posters = [
        "2014-03-25 Joint Summits Colonoscopy.pptx 2015-03-18 10-15-28.jpg"
    ];
    var currentPoster = 0, totalPosters = posters.length;
    $("#posterSrc").attr("src", "../static/posters/" + posters[0]);

    // do resizing
    resizePoster();
    resizeIFrame();
    resizeOther();

    // startup timer
    setInterval(function() {
        if ($("#announcements").is(":visible") && totalAnnouncements > 1) {
            $("#announcements-wrapper").fadeOut('fast', function() {
                currentAnnouncement++;
                if (currentAnnouncement >= totalAnnouncements) {
                    currentAnnouncement = 0;
                }
                $("#announcement").text(announcements[currentAnnouncement].announcement);
                $("#subtext").text(announcements[currentAnnouncement].subtext);
                $("#announcements-wrapper").fadeIn('fast');

            });


        }

        if ($("#posters").is(":visible") && totalPosters > 1) {
            currentPoster++;
            if (currentPoster >= totalPosters) {
                currentPoster = 0;
            }
            $("#posterSrc").fadeOut('fast', function() {
                $("#posterSrc").attr("src", "posters/" + posters[currentPoster]);
                resizePoster();
                $("#posterSrc").fadeIn('fast');
            });

        }

        if ($("#quotes").is(":visible") && totalQuotes > 1) {
            currentQuote++;
            $("#quotes-wrapper").fadeOut('slow', function() {
                if (currentQuote >= totalQuotes) {
                    currentQuote = 0;
                }
                $("#quote").text(quotes[currentQuote].quote);
                $("#quote-attribute").text(quotes[currentQuote].author);
                $("#quotes-wrapper").fadeIn('slow');
            });


        }


    }, 15000);

    setInterval(function() {
        if ($(".iframe-refresh-often").is(":visible")) {
            $(".iframe-refresh-often:visible").attr("src", function () {
                return $(this).attr("src");
            });
        }

    }, 30000);

    var af = false;
    if (af) {
        $("#afDiv").width($(document).outerWidth());
        $("#af").attr("src", "../static/images/4-1/gop.gif");
        var imgs = ["gop.gif", "mk.png", "rw.png"];
        var afTimeout = 15000;

        setInterval(function () {

            var ran = Math.floor((Math.random() * (imgs.length)));
            $("#af").attr("src", "../static/images/4-1/" + imgs[ran]);

            afTimeout = Math.floor((Math.random() * 100) + 15) * 1000;
            var left = Math.floor((Math.random() * ($(document).outerWidth() / 3)) + 1);
            console.log(ran + " " + imgs[ran] + " " + left + " " + afTimeout);
            $("#afDiv").css("left", left);

            $("#afDiv").animate({
                opacity: 1,
                height: "toggle"
            }, 500, function () {
                // Animation complete.
            });
            setTimeout(function () {
                $("#afDiv").animate({
                    opacity: 0,
                    height: "toggle"
                }, 500, function () {
                    // Animation complete.
                });


            }, 1000);


        }, afTimeout);
    }

    /*
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    var timeTimout;
    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());

        var ampm = h >= 12 ? 'pm' : 'am';
        h = h % 12;
        h = h ? h : 12; // the hour '0' should be '12'
        m = m < 10 ? '0'+m : m;
        document.getElementById('time').innerHTML = h + ":" + m + ":" + s + ' ' + ampm;
        timeTimout = setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
    */

    $("#prev").click(function(){
        impress.prev();
    });
    $("#next").click(function(){
        impress.next();
    });

    $( window ).resize(function() {
        resizeIFrame();
        resizePoster();
        resizeOther();
    });

});

