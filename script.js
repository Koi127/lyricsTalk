var authorizationToken = "ME65u51_soQ78ULazWrZ_muetikm6UYwm9KrAVzoZS7XcBbu-vd3VnSa032uYWWL";
debugger;
$.ajax({
 method: "GET",
 url: "https://api.genius.com/annotations/10225840",
 beforeSend: function(xhr) {
     xhr.setRequestHeader('Authorization', 'Bearer ' + authorizationToken);
 },
 success: function(msg) {
     console.log(msg);
 },
 error: function(jqXHR, textStatus, errorThrown) {
     console.log(textStatus);
 }
});