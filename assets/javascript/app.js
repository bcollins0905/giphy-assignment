var topics = ["zombie", "ghoul", "frankenstein", "werewolf"];
for(var i = 0; i<topics.length; i++){


//creating the buttons
var topicBtn = $("<button>")
topicBtn.addClass("topic-button topic topic-button-color");
topicBtn.attr("monster", topics[i]);
topicBtn.text(topics[i]);
$("#buttons").append(topicBtn);
};
//adding the "on-click"

$("button").on("click", function(event){
var topic = $(this).attr("monster");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic
+ "&api_key=6e6f8fea2d084271b6cc7d9eafaec8b4&limit=10"  


//----------------------this section of the code, I am not using at this point-------
// $(".topic-button").on("click", function() {     
//  var newGif = $("<div>");        
//  newGif.addClass("topic gif-color");       
//  newGif.text($(this).attr("data-topic")); 
//  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//     topics + "&api_key=6e6f8fea2d084271b6cc7d9eafaec8b4";     
//  $("#display").append(newGif);
//--------------------------------------------------------------------------------------
   // AJAX Get Request
    $.ajax({
              url: queryURL,
              method: "GET"
            })
    .done(function(response) {
    var results = response.data;
      for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");
              

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var animated = results[i].images.fixed_height.url;
              var still = results[i].images.fixed_height_still.url;
              var monsterImage = $('<img>');

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              monsterImage.attr("src", animated);
              monsterImage.attr("src", still);
              monsterImage.attr("data-still", still);
              monsterImage.attr("data-animate", animated);
              monsterImage.attr("data-state", "still")
              monsterImage.addClass("gif")
              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(monsterImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#display").prepend(gifDiv);
          }
        });
    });
      
 $(document).on("click", ".gif", function(event){ 
    var currentState = $(this).attr("data-state")
    var newState = (currentState === 'animate') ? 'still' : 'animate' 
    var imageUrl = $(this).attr("data-" + newState)
      $(this).attr("src", imageUrl)
      $(this).attr("data-state", newState)
    });
  










