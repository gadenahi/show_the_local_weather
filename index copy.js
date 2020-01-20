$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var data = position.coords;
        var lat = data.latitude
        var lng = data.longitude
        alert( "あなたの現在位置は、\n[" + lat + "," + lng + "]\nです。" ) ;

      $("#output").addClass("output");
      var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lng;

      $.ajax({
        url: url,
        type: "GET",
        async: false,
        dataType: "jsonp",
        success: function(data) {
          console.log(data)
          var city = data.name
          var icon = data.weather[0].icon
          var tmp = data.main.temp
          var wea = data.weather[0].main
          console.log(wea) 
          $('#output').prepend("<h2>" + city + "</h2><h2>" + tmp + "°C</h2><h2>" + wea + "</h2><img src=" + icon + " alt='' height=100 width=100 />")

        },
        error: function(err){
          alert("err")
        }
      })
    }
    )
  }  
})