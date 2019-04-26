/* global $ */
$( document ).ready(function() {
 var key = "5ca0449b957dbc8957a995943e4c93bd";
 $("#button1").click(function(e){
  e.preventDefault();
  let input=$("#inputName").val();
  $.ajax({
   type: "GET",
   url: "https://api.musixmatch.com/ws/1.1/track.search",
   data: {
    apikey: key,
    q_track: input,
    format:"jsonp",
    callback:"jsonp_callback"
   },
   dataType: "jsonp",
   jsonpCallback: 'jsonp_callback',
   contentType: 'application/json',
   success: function(response) {
    console.log("pass");
      let trackId=response.body.track_list[0].track.track_id;
      $.ajax({
       method: "GET",
       url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get?",
       data: {
        apikey: key,
        track_id: trackId,
        format:"jsonp",
        callback:"jsonp_callback"
       },
       dataType: "jsonp",
       jsonpCallback: 'jsonp_callback',
       contentType: 'application/json',
       success: function(page) {
        console.log("hi");
          $("body").append(page.body.lyrics.lyrics_body);
       },
       error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus);
       }
      });
   },
   error: function(jqXHR, textStatus, errorThrown) {
       console.log(textStatus);
   }
  });
  
 });
});


