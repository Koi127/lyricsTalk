var key = "apikey=5ca0449b957dbc8957a995943e4c93bd";
$("#button1").click(function(){
 let input=$("#inputName").val();
 $.ajax({
  method: "GET",
  url: `https://api.musixmatch.com/ws/1.1/track.search?q_track=${input}&${key}`,
 
  success: function(response) {
     let trackId=response.body.track_list[0].track.track_id;
     $.ajax({
      method: "GET",
      url: `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&${key}`,
     
      success: function(page) {
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



