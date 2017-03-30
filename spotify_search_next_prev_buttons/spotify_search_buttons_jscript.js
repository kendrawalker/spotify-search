// spotify search

var searchButton = $('#search-button').eq(0);
var nextButton = $('#next-button').eq(0);
var prevButton = $('#prev-button').eq(0);
var dropDownValue;
var textInputValue;
var searchURL;
var ddVal;
var htmlMusic;
var htmlResultMsg;
var htmlNext;
var htmlPrev;
var genericImage = "http://www.giga.de/wp-content/uploads/2014/03/unnamed1.png";
var nextURL;
var prevURL;

searchButton.on('click', function() {
    htmlMusic ='';
    htmlResultMsg ='';
    htmlNext ='';
    dropDownValue = $('#drop-down').eq(0).val();
    textInputValue = $('#text-input').eq(0).val();
    if(dropDownValue=='album') {
        ddVal='albums';
    }else {
        ddVal='artists';
    }
    searchURL = "https://api.spotify.com/v1/search?q="+encodeURIComponent(textInputValue)+"&type="+dropDownValue;

    $.get(searchURL, function(data){

        function populateResultMsg(){
            htmlResultMsg += '<h5 class="result-msg">20 results out of ' + data[ddVal].total + ' displayed for ' + textInputValue + '...</h5>';
            var resultsDisplayedMsg = $('#results-displayed-msg').eq(0);
            resultsDisplayedMsg.html(htmlResultMsg);
        }
        populateResultMsg();

        for(var i =0; i<data[ddVal].items.length; i++) {
            if(data[ddVal].items[i].images[0]) {
                htmlMusic += '<a class="music" href="' + data[ddVal].items[i].external_urls.spotify + '"><img class="musicpic" src="'+ data[ddVal].items[i].images[0].url +'"><h4 class="music-name">'+ data[ddVal].items[i].name + '</h4></a>';
            } else {
                htmlMusic += '<a class="music" href="' + data[ddVal].items[i].external_urls.spotify + '"><img class="musicpic" src='+ genericImage +'><h4 class="music-name">'+ data[ddVal].items[i].name + '</h4></a>';
            }
        }
        var results = $('#results').eq(0);
        results.html(htmlMusic);

        if(data[ddVal].next) {
            nextURL = data[ddVal].next;
            htmlNext += '<button class="next">&gt;&gt;Next Page&gt;&gt;</button>';
            nextButton = $('#next-button').eq(0);
            nextButton.html(htmlNext);
        }

    });
});



nextButton.on('click', function() {
    htmlMusic ='';
    htmlNext ='';
    htmlPrev ='';

    $.get(nextURL, function(data){

        for(var i =0; i<data[ddVal].items.length; i++) {
            if(data[ddVal].items[i].images[0]) {
                htmlMusic += '<a class="music" href="' + data[ddVal].items[i].external_urls.spotify + '"><img class="musicpic" src="'+ data[ddVal].items[i].images[0].url +'"><h4 class="music-name">'+ data[ddVal].items[i].name + '</h4></a>';
            } else {
                htmlMusic += '<a class="music" href="' + data[ddVal].items[i].external_urls.spotify + '"><img class="musicpic" src='+ genericImage +'><h4 class="music-name">'+ data[ddVal].items[i].name + '</h4></a>';
            }
        }
        var results = $('#results').eq(0);
        results.html(htmlMusic);

        if(data[ddVal].next) {
            nextURL = data[ddVal].next;
            htmlNext += '<button class="next">&gt;&gt;Next Page&gt;&gt;</button>';
            nextButton = $('#next-button').eq(0);
            nextButton.html(htmlNext);
        } else {
            htmlNext ='';
        }

        prevURL = data[ddVal].previous;
        htmlPrev += '<button class="prev">&lt;&lt;Previous Page&lt;&lt;</button>';
        prevButton = $('#prev-button').eq(0);
        prevButton.html(htmlPrev);
    });
});


prevButton.on('click', function() {
    htmlMusic ='';
    htmlNext ='';
    htmlPrev ='';

    $.get(prevURL, function(data){

        for(var i =0; i<data[ddVal].items.length; i++) {
            if(data[ddVal].items[i].images[0]) {
                htmlMusic += '<a class="music" href="' + data[ddVal].items[i].external_urls.spotify + '"><img class="musicpic" src="'+ data[ddVal].items[i].images[0].url +'"><h4 class="music-name">'+ data[ddVal].items[i].name + '</h4></a>';
            } else {
                htmlMusic += '<a class="music" href="' + data[ddVal].items[i].external_urls.spotify + '"><img class="musicpic" src='+ genericImage +'><h4 class="music-name">'+ data[ddVal].items[i].name + '</h4></a>';
            }
        }
        var results = $('#results').eq(0);
        results.html(htmlMusic);

        if(data[ddVal].next) {
            nextURL = data[ddVal].next;
            htmlNext += '<button class="next">&gt;&gt;Next Page&gt;&gt;</button>';
            nextButton = $('#next-button').eq(0);
            nextButton.html(htmlNext);
        } else {
            htmlNext ='';
        }

        if(data[ddVal].previous) {
            prevURL = data[ddVal].previous;
            htmlPrev += '<button class="prev">&lt;&lt;Previous Page&lt;&lt;</button>';
            prevButton = $('#prev-button').eq(0);
            prevButton.html(htmlPrev);
        } else {
            htmlPrev ='';
        }
    });
});
