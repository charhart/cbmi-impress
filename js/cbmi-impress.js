var defaultTime = 20000;
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
        timing = setInterval(impress.next, duration);
    });

   function resizeIFrame() {
       $(".iframe")
           .attr("width", $(window).outerWidth())
           .attr("height", $(window).outerHeight());
    }

    function resizePoster() {
        $(".iframe")
            .css("width", $(window).outerWidth())
            .css("height", "auto");
    }
    
    function refreshIFrame() {
        $(".iframe-refresh").attr("src", function() {
           return $(this).attr("src"); 
        });
    }

    // quotes
    var quotes = [];
    var currentQuote, totalQuotes;
    $.getJSON( "data/quotes.json", function( data ) {
       quotes = data;
        currentQuote = 0;
        totalQuotes = quotes.length;
        $("#quote").text(quotes[0].quote);
        $("#quote-attribute").text(quotes[0].author);
    });

    // announcements
    var announcements = [];
    var currentAnnouncement, totalAnnouncements;
    $.getJSON( "data/announcements.json", function( data ) {
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
    $("#posterSrc").attr("src", "posters/" + posters[0]);

    // do resizing
    resizePoster();
    resizeIFrame();

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

    $( window ).resize(function() {
        resizeIFrame();
    });
});

