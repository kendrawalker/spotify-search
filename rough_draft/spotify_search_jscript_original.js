// spotify search

var searchButton = $('#search-button').eq(0);
var dropDownValue;
var textInputValue;
var inp = $('#text-input').eq(0);
var searchURL;
var ddVal;
var htmlMusic;
var htmlResultMsg;
var genericImage = "http://www.giga.de/wp-content/uploads/2014/03/unnamed1.png";
var moreURL;
var move;

//setting input field to blank when user clicks to type
inp.on('click', function(){
    inp.html('');
});

//calling the search results when user hits enter button
inp.on('keydown', function(e){
    move = e.key;
    if(move=='Enter'){
        htmlMusic ='';
        htmlResultMsg ='';
        dropDownValue = $('#drop-down').eq(0).val();
        textInputValue = $('#text-input').eq(0).val();
        if(dropDownValue=='album') {
            ddVal='albums';
        }else {
            ddVal='artists';
        }
        searchURL = "https://api.spotify.com/v1/search?q="+encodeURIComponent(textInputValue)+"&type="+dropDownValue;

        $.get(searchURL, function(data){
            if(data[ddVal].total==0) {
                htmlResultMsg += '<h5 class="result-msg">No results for ' + textInputValue + '.</h5>';
            } else {
                htmlResultMsg += '<h5 class="result-msg">Results out of ' + data[ddVal].total + ' displayed for ' + textInputValue + '...</h5>';
            }
            var resultsDisplayedMsg = $('#results-displayed-msg').eq(0);
            resultsDisplayedMsg.html(htmlResultMsg);

            for(var i=0; i<data[ddVal].items.length; i++) {
                console.log(data[ddVal].items[i].images[0]);
                if(data[ddVal].items[i].images[0]) {
                    htmlMusic += '<a class="music" href="' + data[ddVal].items[i].external_urls.spotify + '"><img class="musicpic" src="'+ data[ddVal].items[i].images[0].url +'"><h4 class="music-name">'+ data[ddVal].items[i].name + '</h4></a>';
                } else {
                    htmlMusic += '<a class="music" href="' + data[ddVal].items[i].external_urls.spotify + '"><img class="musicpic" src='+ genericImage +'><h4 class="music-name">'+ data[ddVal].items[i].name + '</h4></a>';
                }
            }
            var results = $('#results').eq(0);
            results.html(htmlMusic);

            if(data[ddVal].next) {
                moreURL = data[ddVal].next;
            } else {
                moreURL = null;
            }
        });
    }
});

//calling search results when user clicks the search button
searchButton.on('click', function() {
    htmlMusic ='';
    htmlResultMsg ='';
    dropDownValue = $('#drop-down').eq(0).val();
    textInputValue = $('#text-input').eq(0).val();
    if(dropDownValue=='album') {
        ddVal='albums';
    }else {
        ddVal='artists';
    }
    searchURL = "https://api.spotify.com/v1/search?q="+encodeURIComponent(textInputValue)+"&type="+dropDownValue;

    $.get(searchURL, function(data){
        if(data[ddVal].total==0) {
            htmlResultMsg += '<h5 class="result-msg">No results for ' + textInputValue + '.</h5>';
        } else {
            htmlResultMsg += '<h5 class="result-msg">Results out of ' + data[ddVal].total + ' displayed for ' + textInputValue + '...</h5>';
        }
        var resultsDisplayedMsg = $('#results-displayed-msg').eq(0);
        resultsDisplayedMsg.html(htmlResultMsg);

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
            moreURL = data[ddVal].next;
        } else {
            moreURL = null;
        }
    });
});


//adding additional results when the user clicks more
function addMoreResults(){
    var windowHeight = $(window).height();
    var docHeight= $(document).height();
    var windowScrollTop = $(window).scrollTop();

    if(!moreURL) {
        setTimeout(addMoreResults,1000);
        return;
    }

    if(windowScrollTop+windowHeight >= docHeight-100) {
        $.get(moreURL, function(data){
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
                moreURL = data[ddVal].next;
            } else {
                moreURL = null;
            }
            setTimeout(addMoreResults,1000);
        });
    } else {
        setTimeout(addMoreResults,1000);
    }

}

addMoreResults();
