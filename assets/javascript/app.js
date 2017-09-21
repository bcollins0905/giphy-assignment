var topics = ["zombie", "ghoul", "frankenstein", "werewolf"];
for(var i = 0; i<topics.length; i++){

var topicBtn = $("<button>")
topicBtn.addClass("topic-button");
topicBtn.attr("monster", topics[i]);
topicBtn.text(topics[i]);
$("#buttons").append(topicBtn);
};

function renderButtons() {

 
$("#buttons").empty();

for(var i = 0; i<topics.length; i++){

var topicBtn = $("<button>")
topicBtn.addClass("topic-button");
topicBtn.attr("monster", topics[i]);
topicBtn.text(topics[i]);
$("#buttons").append(topicBtn);

  }
};
      
      $(document).on("click","#add-monster", function(event) {
         event.preventDefault();
 
        var monster = $("#monster-input").val().trim();

        topics.push(monster);

        renderButtons();
  });


$(document).on("click",".topic-button", function(event){
var topic = $(this).attr("monster");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic
+ "&api_key=6e6f8fea2d084271b6cc7d9eafaec8b4&limit=10"  


    $.ajax({
              url: queryURL,
              method: "GET"
            })
    .done(function(response) {
    var results = response.data;
      for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");
              
              var rating = results[i].rating;

       
              var p = $("<p>").text("Rating: " + rating);

         
              var animated = results[i].images.fixed_height.url;
              var still = results[i].images.fixed_height_still.url;
              var monsterImage = $('<img>');

 
              monsterImage.attr("src", animated);
              monsterImage.attr("src", still);
              monsterImage.attr("data-still", still);
              monsterImage.attr("data-animate", animated);
              monsterImage.attr("data-state", "still")
              monsterImage.addClass("gif")
             
              gifDiv.append(p);
              gifDiv.append(monsterImage);

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

 
  










