
function celsiusToFahren(num) {
    let resultTemp = num * 1.8 + 32
    return Math.round(resultTemp)
}

function fahrenToCels(num) {
    let resultTemp = (num - 32) * 0.5556
    return Math.round(resultTemp)
}

function cityHandler(str) {
    console.log(str)
    let newCity = str.split(' ').join('+');
    return newCity;
}
// cityHandler('New York');

function getLocation() {
    // console.log(city)
    var lat;
    var lon;


    $.get('http://ipinfo.io', function (response) {
        let city = response.city;
        let newCityFormat = cityHandler(city);
        console.log(newCityFormat);

        $.ajax({
            headers: {
                'X-Mashape-Key': 'kucXE9EouAmshUBd1XuCgCrvjQcVp1Kg4AHjsn4x0wAed3NEoS',
                Accept: 'application/json'
            },
            url: `https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=${newCityFormat} `,
            success: function(r) {
                if (typeof r === 'string') {
                    r = JSON.parse(r);
                }
                console.log(r);

                lat = r.Results[0].lat;
                lon = r.Results[0].lon;
                console.log('lat = ' + lat + ' and lon = ' + lon);

                $.ajax({
                    headers: {
                        Accept: 'application/json'
                    },
                    url: `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`,
                    success: function(resp) {
                        if (typeof resp === 'string') {
                            resp = JSON.parse(resp);
                        }
                        let temp = Math.round(resp.main.temp);
                        let desc = resp.weather[0].description;
                        let mainDesc = resp.weather[0].main;
                        $('#temp').html(temp);
                        $('#des').html(desc);
                        (function(str) {
                            if (mainDesc === 'Rain' || mainDesc === 'Drizzle') {
                                $('#emoji').attr('src', './images/rain.png');
                            }
                            if (mainDesc === 'Clouds' || mainDesc === 'Mist') {
                                $('#emoji').attr('src', './images/cludy.png');
                            }
                            if (mainDesc === 'Clear') {
                                $('#emoji').attr('src', './images/suny.png');
                            }
                            if (mainDesc === 'Thunderstorm') {
                                $('#emoji').attr('src', './images/storm.png');
                            }
                            if (mainDesc === 'Snow') {
                                $('#emoji').attr('src', './images/snow.png');
                            }
                        })(mainDesc);
                     
                        console.log(resp);
                        console.log(temp);
                    }
                });
            }
        });
    }, 'jsonp');

}

$(document).ready(function () {
    console.log('page loaded');
    $.get('http://ipinfo.io', function (response) {
        $('#city').html(response.city + ',' + response.country);
    }, 'jsonp');
    getLocation();
    $('#tempScale').on('click', function(){
      console.log('I was clicked');
    })
})
