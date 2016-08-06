/**
 * Created by Michael on 8/2/2015.
 */
//xmr = new XMLHttpRequest();
$(document).ready(function() {
    xmr = new XMLHttpRequest();
    geolock = 'http://ipinfo.io/json';
    xmr.open('GET', geolock, false);
    xmr.send();
    myloc = JSON.parse(xmr.response);
    console.log(myloc.city);
    $('#zipcode').val(myloc.city);
    getWeather();
    $('#zipcode').val('');
$('.icon').click(function() {
    units = 'imperial';
    getWeather();
});
    $('input').keypress(function (e) {
        if (e.which == 13) {
           getWeather();
        }
    });
    //988e8029aac13b38 wunderground api
    function getWeather() {

        zip = $('#zipcode').val();
        //req = 'http://api.openweathermap.org/data/2.5/daily?zip=' + zip + ',us&units=' + units + '&APPID={49b1474bb8d9b3e002b778aff4a1dc2d}';
        req = 'http://api.wunderground.com/api/988e8029aac13b38/geolookup/q/'+zip + '.json';
        xmr.open('GET', req, false);
        xmr.send();
        locateme = JSON.parse(xmr.response);
        console.log(locateme);
        req = 'http://api.wunderground.com/api/988e8029aac13b38/conditions/q/'+zip+'.json';
        xmr.open('GET', req, false);
        xmr.send();
        conditions = JSON.parse(xmr.response);
        req = 'http://api.wunderground.com/api/988e8029aac13b38/forecast10day/q/' + zip +'.json';
        xmr.open('GET', req, false);
        xmr.send();
        forecast = JSON.parse(xmr.response);
        console.log(locateme.location.city);
        console.log(conditions);
        console.log(forecast);



    loc = locateme.location.city + ', ' + locateme.location.state;
    desc = conditions.current_observation.weather;
        myicon = conditions.current_observation.icon_url;
        console.log(myicon);
    currenttemp = conditions.current_observation.temperature_string;
    //hitemp = z.main.temp_max;
    //lowtemp = z.main.temp_min;
    humidity = conditions.current_observation.relative_humidity;
    wind = conditions.current_observation.wind_string;
    monthday = forecast.forecast.simpleforecast.forecastday[0].date.monthname + ' ' + forecast.forecast.simpleforecast.forecastday[0].date.day

        console.log(desc);
        $('#today').html(forecast.forecast.simpleforecast.forecastday[0].date.weekday);
        $('#todaydate').html(monthday);

    $('#location').html(loc);
    $('#currenttemp').html(currenttemp);
    $('#description').html(desc);
    $('#hitemp').html('Feels like: ' + conditions.current_observation.feelslike_string);
   // $('#lowtemp').html('Lo: ' + Math.floor(lowtemp) + uncode);
    $('#wind').html('Wind ' + wind);
    $('#humidity').html('Relative Humidity '+humidity);
    $('.deg').html(' &#8457');

        iconpath = '<img src = "'+ myicon + '" </img>';
        console.log(iconpath);
        $('#myicon').html(iconpath);

        var count = 0;
        var forecastday = {};
        while (count < 6){
            forecastday[count] = {};
            count++;
        }
        console.log(forecastday[2]);
        count = 0;
        while (count < 6) {
            forecastday[count].conditions = forecast.forecast.simpleforecast.forecastday[count].conditions;
            forecastday[count].iconurl = '<img src = "' +forecast.forecast.simpleforecast.forecastday[count].icon_url + '"> ';
            forecastday[count].temp = 'HI:' + forecast.forecast.simpleforecast.forecastday[count].high.fahrenheit + '/' + 'LO: '+forecast.forecast.simpleforecast.forecastday[count].low.fahrenheit ;
            forecastday[count].forecastdate = forecast.forecast.simpleforecast.forecastday[count].date.monthname_short + ' ' + forecast.forecast.simpleforecast.forecastday[count].date.day;
            forecastday[count].weekday = forecast.forecast.simpleforecast.forecastday[count].date.weekday_short;
            count++;
        }
        console.log(forecastday[1]);


        $('#day1date').html(forecastday[1].forecastdate);
        $('#day1conditions').html(forecastday[1].conditions);
        $('#day1icon').html(forecastday[1].iconurl);
        $('#day1temp').html(forecastday[1].temp);
        $('#day1day').html(forecastday[1].weekday);
        $('#day2date').html(forecastday[2].forecastdate);
        $('#day2conditions').html(forecastday[2].conditions);
        $('#day2icon').html(forecastday[2].iconurl);
        $('#day2temp').html(forecastday[2].temp);
        $('#day2day').html(forecastday[2].weekday);
        $('#day3date').html(forecastday[3].forecastdate);
        $('#day3conditions').html(forecastday[3].conditions);
        $('#day3icon').html(forecastday[3].iconurl);
        $('#day3temp').html(forecastday[3].temp);
        $('#day3day').html(forecastday[3].weekday);
        $('#day4date').html(forecastday[4].forecastdate);
        $('#day4conditions').html(forecastday[4].conditions);
        $('#day4icon').html(forecastday[4].iconurl);
        $('#day4temp').html(forecastday[4].temp);
        $('#day4day').html(forecastday[4].weekday);
        $('#day5date').html(forecastday[5].forecastdate);
        $('#day5conditions').html(forecastday[5].conditions);
        $('#day5icon').html(forecastday[5].iconurl);
        $('#day5temp').html(forecastday[5].temp);
        $('#day5day').html(forecastday[5].weekday);
}


});
