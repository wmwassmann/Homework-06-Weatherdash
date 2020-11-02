// there are a few things that don't quite work just yet - but we are getting there.
// NOTE to William
// continue working on the CSS
// Get 5 day Forecast up and running. 




$(document).ready(function () {
    $('#search001').on('click', function () {
        var value001 = $('#value001').val();

        // clear input box
        $('#value001').val('');

        search001(value001);
    });

    $('.history001').on('click', 'li', function () {
        search001($(this).text());
    });

    function generate001(text) {
        var li = $('<li>').addClass('list-group-item list-group-item-action').text(text);
        $('.history001').append(li);
    }

 
    // API key for global usage.
    var APIkey = '3bb30fcd3337d734195788d660433784'

    function search001(value001) {
        // I prefer to columnize strings of code like this. I 'personally' read better when it's vertical. 
        var queryURL001 = 'https://api.openweathermap.org/data/2.5/weather?q='
            + value001
            + '&APPID='
            + APIkey
            + '&units=imperial';

        $.ajax({
            url: queryURL001,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (history001.indexOf(value001) === -1) {
                    history001.push(value001);
                    window.localStorage.setItem('history001', JSON.stringify(history001));

                    generate001(value001);
                }
                // empties today001 field
                $('#today001').empty();

                // constructing the html - was originally going to verticalize these but that might be frustrating for some people. 
                var title001 = $('<h1>').addClass('title001').text(data.name + ' (' + new Date().toLocaleDateString() + ')');
                var card001 = $('<div>').addClass('card001');
                var speed001 = $('<p>').addClass('text001').text('Wind Speed: ' + data.wind.speed + ' MPH');
                var humidity001 = $('<p>').addClass('text001').text('Humidity: ' + data.main.humidity + '%');
                var tempuratur001 = $('<p>').addClass('text001').text('Temperature: ' + data.main.temp + ' °F');
                var body001 = $('<div>').addClass('card001');
                var image001 = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');

                // appends everything to #today001 in the DOM
                // Plan to try to make the classes more dynamic to allow for better CSS control - 
                // if that makes sense...it's 1:25 AM right now and I don't typically stay up this late but I'm having fun.
                title001.append(
                    image001
                );
                body001.append(
                    title001,
                    speed001,
                    humidity001,
                    tempuratur001
                );
                card001.append(
                    body001
                );
                $('#today001').append(card001);

                forecast001(value001);
                // coord001(data.coord.lat, data.coord.lon);
            }

        });
    }

    var history001 = JSON.parse(window.localStorage.getItem("history001")) || [];

    if (history001.length > 0) {
        search001(history001[history001.length - 1]);
    }

    for (var i = 0; i < history001.length; i++) {
        generate001(history001[i]);
    }



});

// ALL CODE THAT I'm still working on but am not confident on how to get multiple days to populate.  Still figure that out.  Just trying to turn stuff in at this point. 

// This function will eventually be it's own forecast.js file
// function forecast001(value001) {
//     var APIkey = '3bb30fcd3337d734195788d660433784'

//     var header001 = $('<div>');
//     $(header001).addClass('col-12 row forecast003');
//     $('.result001').append(header001);

//     var row001 = $('<div>');
//     $(row001).addClass('col-12 my-3');
//     $('.forecast003').append(row001);

//     var header002 = $('<h2>');
//     $(header002).attr('id', 'head001');
//     $(header002).text('5 Day Forecast:');
//     $(row001).append(header002);


//     var queryURL002 = 'https://api.openweathermap.org/data/2.5/weather?q='
//         + value001
//         + '&APPID='
//         + APIkey
//         + '&units=imperial';
//     $.ajax({
//         url: queryURL002,
//         method: 'GET',
//     }).then(function (response) {
//         // Temp and humidity variables to be called in the forecast
//         var tempF002 = [];
//         var humidity003 = [];
        
//         function timeConverter(UNIX_timestamp) {
//             var a = new Date(UNIX_timestamp * 1000);
//             var year = a.getFullYear();
//             var month = a.getMonth() + 1;
//             var date = a.getDate();
//             var finalDate = month + '/' + date + '/' + year;
//             return finalDate;
//         }
        

//         for (i = 1; i < 6; i++) {
//             date002[i] = timeConverter(
//                 response.daily[i].dt + response.timezone_offset
//             );
//             // Creating a div to display the response.
//             var result002 = $('<div>');
//             $(result002).addClass('result002 col-12 col-lg-2 mr-lg-2 mb-3 mr-lg-3 pt-lg-2 containerShadow');
//             $(result002).addClass('forecast004' + i);
//             $('.forecast003').append(result002);

//             var row002 = $('<div>');
//             $(row002).addClass('row002');
//             $(result002).append(row002);

//             var date002 = $('<div>');
//             $(date002).addClass('date002 resultData002 col-lg-12 col-3');
//             $(date002).attr('id', 'date002' + i);
//             $(row002).append(date002);
//             $('#date002' + i).text(date002[i]);


//             var temp002 = $('<div>');
//             var tempF001 = (response.daily[i].temp.day - 273.15) * 1.8 + 32;
//             tempF002[i] = Math.round(tempF001 * 10) / 10
//             $(temp002).addClass('resultData002 temp002 col-lg-12 col-3 px-lg-3 px-0');
//             $(temp002).attr('id', 'temp002' + i);
//             $(row002).append(temp002);
//             $('temp002' + i).html(' Temperature: </br>' + tempF002[i] + ' °F');

//             var humidity002 = $('<div>');
//             humidity003[i] = response.daily[i].humidity;
//             $(humidity002).addClass('resultData002 humidity002 col-lg-12 col-3 px-lg-3 px-0');
//             $(humidity002).attr('id', 'humidity002' + i);
//             $(row002).append(humidity002);
//             $('#humidity002' + i).html(' Humidity: </br>' + humidity003[i] + ' %');




//         }
//     }
//     );
// }




// function default001() {
//     $('.forecast001').empty();

//     function success001(pos) {
//         let location = pos.cords;
//         console.log('Your current location is:');
//         console.log(`Latitude : ${location.latitude}`);
//         console.log(`Longitude: ${location.longitude}`);

//         let lat001 = location.latitude;
//         let lon001 = location.longitude;

//         var APIKey = '3bb30fcd3337d734195788d660433784';
//         var queryURL003 =
//             'https://api.openweathermap.org/data/2.5/weather?lat=' +
//             lat001 +
//             '&lon=' +
//             lon001 +
//             '&appid=' +
//             APIKey;

//         showResultAjax(queryURL003, APIKey);
//     }

//     function error001(err) {
//         console.warn(`Error(${err.code}): ${err.message}`);

//         var today001 = $('<h2>');

//         $(today001).addClass('row002 error001');
//         $('.forecast001').append(today001);


//         var span001 = $('<span>');
//         // adds id and class to the city in the result h2
//         $(span001).addClass('result003 mr-lg-2 display-4 mb-2');
//         $(span001).html('We are unable to find your location, please enter a city');
//         $('.forecast001').append(span001);
//     }
//     navigator.geolocation.getCurrentPosition(success001, error001, options);
// }

// function display001() {
//    // clear old result
//     $('.forecast001').empty();
//     // This is our API key
//     var APIKey = '3bb30fcd3337d734195788d660433784';
   
//     var queryURL004 =
//         'https://api.openweathermap.org/data/2.5/weather?' +
//         'q=' +
//         inputByUser +
//         '&appid=' +
//         APIKey;
    
//     showResultAjax(queryURL004, APIKey);
// }        
    












