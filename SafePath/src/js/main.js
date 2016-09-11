function init() {
    
    /* var map = Polymer.dom(this).querySelector('map');
      map.addEventListener('map-ready', function(e) {
        alert('Map loaded!');
      });
    
    var myLatLng = {lat: 39.953173, lng: -75.192865};
    
     var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Starbucks'
      });*/
    getCrimeData(); 
}



function getCrimeData (){
    $.ajax({
        url: "https://data.phila.gov/resource/x5bc-ux9i.json",
        type: "GET",
        data: {
          "$limit" : 100,
          "$where" : "text_general_code not in ('All Other Offenses','Recovered Stolen Motor Vehicle','Embezzlement','GAMBLING VIOLATIONS', 'D.U.I','FORGERY AND COUNTERFEITING','LIQUOR LAW VIOLATIONS')",
          "$$app_token" : "JUfo59aG1S63VK8p47c02wm4J"
        }, 
        success: function(data) {
            alert("Retrieved " + data.length + " records from the dataset!");
            getMarkers(data); 
       },
       error: function() {
            alert('REQUEST FAILED!'); 
        }
    });
    
 
    /*  var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });*/
}

function getMarkers(data){
    var markers = [];
    for (var i = 0; i < data.length; i++){
        if (data[i]['shape'] == null) continue; 
        
        markers.push({
            date: data[i]['dispatch_date'],
            offense: data[i]['text_general_code'],
            lat: data[i]['shape']['coordinates'][1],
            long: data[i]['shape']['coordinates'][0],
      });
    }
    console.log('***Markers***\n'); 
    console.log(markers); 
}