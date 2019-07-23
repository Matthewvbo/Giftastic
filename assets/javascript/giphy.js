const topics = ["Hawkeye", "Black Panther", "Spiderman", "Black Widdow", "Hulk", "Iron man", "Thor", "Captian America"]

function displayTopicInfo() {
	var superHeroes = $(this).attr("data-name")
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HheY4TMLuTpPOXwwXwAoflstAmB910Fl&q=" + superHeroes + "&limit=10&offset=0&rating=PG-13&lang=en"

	$.ajax({
		url: queryURL, 
		method: "GET"
	}).done(function(response) {
		var results = response.data
		$("#cartoons").empty()
		for (var i = 0; i < results.length; i++) {
		
		let topicDiv = $("<div class='heroes'>")
		let rating = response.data[i].rating
		let pRate = $("<p>").text("Rating: " + rating)
		topicDiv.append(pRate)
		let giphyImgStill = response.data[i].images.downsized_still.url
		let giphyImgMotion = response.data[i].images.downsized.url
		let image = $("<img>").attr("src", giphyImgStill)
		image.attr("data-still", giphyImgStill)
		image.attr("data-animate", giphyImgMotion)
		image.attr("data-state", "still")
		image.attr("id", "img"+i)
		image.addClass("giphyImages")
		topicDiv.prepend(image)
		$("#cartoons").prepend(topicDiv)
		}
	})
}

function renderButtons() {
    $("#cartoonButtons").empty()
    
	for (i = 0; i < topics.length; i++) {
		let a = $("<button>")
		a.addClass("topic")
		a.addClass("btn btn-lg")
		a.attr("data-name", topics[i])
		a.attr("type", "button")
		a.text(topics[i])
		$("#cartoonButtons").append(a)
	}
}
$("#addCartoon").on("click", function(event) {
	event.preventDefault()
    let topic = $("#cartoon-input").val().trim()
    topics.push(topic)
    $("form").trigger("reset")
    renderButtons()
    });

$(document).on("click", ".topic", displayTopicInfo)
renderButtons()

$(document).on("click", ".giphyImages", flipAnimate)

function flipAnimate() {
	var item = $(this).attr("id")
	item = "#"+item
	var state = $(item).attr("data-state")
	if (state === "still") {
        $(item).attr("src", $(item).attr("data-animate"))
        $(item).attr("data-state", "animate")
      } else {
        $(item).attr("src", $(item).attr("data-still"))
        $(item).attr("data-state", "still")
      }
}