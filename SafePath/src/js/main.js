function getMarkers (){
    alert('here'); 
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
            return populateMarkers(data); 
       },
       error: function() {
            alert('REQUEST FAILED!'); 
        }
    });
    
    return null; 

}

function populateMarkers(data){
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
    return markers; 
}