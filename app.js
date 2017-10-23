  var apiKey = "gmtlatOluYGndFT5bBBSKYvQmaOOpBVm";
  var topics = ["atari", "snes", "playstation", "xbox", "nintendo"];
  
  // window.onload = function(){
    renderButtons();

    //Giphy Api Call with results dynamic changing the page
    $(document.body).on("click", ".btn-game", function(event) {
      var person = $(this).attr("data-info");
      var limit = 10;
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + 
        "&api_key=" +
        apiKey +
        "&limit=" +
        limit;

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='col-sm-4 mb-5'>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var personImage = $("<img>");
            var imageStill = results[i].images.fixed_height_still.url;
            var imageAnimate = results[i].images.fixed_height.url;
            personImage.attr("src", imageStill);
            personImage.attr("data-still", imageStill);
            personImage.attr("data-animate", imageAnimate);
            personImage.attr("data-state", "still");

            gifDiv.append(p);
            gifDiv.append(personImage);

            $("#row-div").prepend(gifDiv);
          }

          $('img').on("click", function() {
            var state = $(this).attr('data-state');
           if (state === "still") {
             $(this).attr("src", $(this).attr("data-animate"));
             $(this).attr("data-state", "animate");
           } else {
             $(this).attr("src", $(this).attr("data-still"));
             $(this).attr("data-state", "still");
           }

          });
        });

    });


    // Form to create New Buttons
    $(document.body).on("click", ".btn-submit", function(event) {
      event.preventDefault();
      var result = $('#add-videogame').val();

      if (topics.indexOf(result)=== -1 && result.trim() != "") {
        topics.push(result);  
        $(".jumbotron").empty();
        renderButtons();
      }
      
    });

  // }
  //Buttons Creation

  function renderButtons(){

  for (var i = 0; i < topics.length; i++) {
    var button = $('<button>');
    button.attr("type", "button");
    button.attr("class", "btn btn-info mr-2 btn-game");
    button.attr("data-info", topics[i]);
    button.text(topics[i]);
    $(".jumbotron").append(button);
  }

}