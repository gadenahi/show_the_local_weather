$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);

    var options = {
      // Use GPS for mobile
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0
    };
    
    function success(position) {
        var data = position.coords;
        var lat = data.latitude
        var lng = data.longitude
        // alert( "Your location is \n[" + lat + "," + lng + "]\n" ) ;
        var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lng;

      $.ajax({
        url: url,
        type: "GET",
        async: false,
        dataType: "jsonp",
        success: function(data) {
          // console.log(data)
          var city = data.name
          var country = data.sys.country
          var icon = data.weather[0].icon
          var tmp = data.main.temp
          var wea = data.weather[0].main
          $('#output').prepend("<h2>" + city + ", " + country +"</h2><h2>" + tmp + "<span class=last-letter> ℃</span></h2><h2>" + wea + "</h2><img src=" + icon + " alt=weather_icon height=80 width=80 />")
        },
        error: function(err){
          alert("err")
        }
      })
    }
    function error(err) {
      document.getElementById("output").textContent = "Error Code" + err.code + "Error Message" + err.message;
    }
  } else {
    document.getElementById("output").textContent = "Geolocation cannnot be used"
  }
})