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
     console.log(response);
     let random =Math.floor(Math.random()*response.message.body.track_list.length);
       let trackId=response.message.body.track_list[random].track.track_id;
       let trackName=response.message.body.track_list[random].track.track_name;
       $.ajax({
        method: "GET",
        url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get",
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
         console.log(page);
         if(page.message.header.status_code===404){
           $("#display").text("No lyrics found, please try another song or click Go again.");
         }
         else{
           $("#info").text("Title: "+trackName);
           $("#display").text("Lyric: "+page.message.body.lyrics.lyrics_body.substring(0,page.message.body.lyrics.lyrics_body.indexOf("...")+3));
        
         }
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
 
 $("#speak").click(function(e){
  e.preventDefault();
    var msg = new window.SpeechSynthesisUtterance();
    var voices =window.speechSynthesis.getVoices();
    console.log(voices);

    msg.voice = voices[10];
    msg.text = document.getElementById("display").innerHTML;
    msg.lang = 'en-US';
    
    window.speechSynthesis.speak(msg);
    });

});


