// spotify search

var searchButton = $('#search-button').eq(0);
var dropDownValue;
var textInputValue;
var searchURL;
var ddVal;

searchButton.on('click', function() {
    var htmlMusic ='';
    var htmlResultMsg = '';
    dropDownValue = $('#drop-down').eq(0).val();
    textInputValue = $('#text-input').eq(0).val();
    searchURL = "https://api.spotify.com/v1/search?q="+encodeURIComponent(textInputValue)+"&type="+dropDownValue;

    function populateResultMsg(){
        htmlResultMsg += '<h5 class="result-msg">Results displayed for ' + textInputValue + '...</h5>';
        var resultsDisplayedMsg = $('#results-displayed-msg').eq(0);
        resultsDisplayedMsg.html(htmlResultMsg);
    }
    populateResultMsg();

    $.get(searchURL, function(data){
        if(dropDownValue=='album') {
            ddVal='albums';
        }else {
            ddVal='artists';
        }
        //console.log(data[ddVal].items);

        for(var i =0; i<data[ddVal].items.length; i++) {
            htmlMusic += '<a class="music" href="' + data[ddVal].items[i].external_urls.spotify + '"><img class="musicpic" src="'+ data[ddVal].items[i].images[0].url +'"><h4 class="music-name">'+ data[ddVal].items[i].name + '</h4></a>';
        }
        var results = $('#results').eq(0);
        //console.log(results);
        results.html(htmlMusic);
        var music = $('.music');
        console.log(music);
    });
});
