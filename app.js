console.log("Let's get this party started!");

$(document).ready(function () {
  $("#search-form").on("submit", function (e) {
    e.preventDefault();
    let searchText = $("#search-text").val();
    getGif(searchText);
    $("#search-text").val("");
  });
});

const api_key = "Q9hb7utGlqGzQLOZJA5wt5HvUf1twpKt";
const selectionBox = $("#selection-box");

async function getGif(q) {
  try {
    const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: { api_key, q },
    });
    const data = res.data.data;
    $("#gifs").empty();
    for (let i = 0; i < 30; i++) {
      let img = data[i].images.fixed_width.webp;
      $("#gifs").append(`<img class="select-gif" src="${img}">`);
    }
    selectionBox.css("display", "block");
    $(".select-gif").click(function () {
      let selectedGifUrl = $(this).attr("src");
      appendGif(selectedGifUrl);
      selectionBox.css("display", "none");
    });
  } catch (err) {
    selectionBox.css("display", "block");
    $("#gifs").append("<h3>Sorry, no Gifs found.</h3>");
  }
}

function appendGif(gifUrl) {
  $("#gif-output").append(`<img class="picked-gif" src="${gifUrl}">`);
}

$("#remove").click(function () {
  selectionBox.css("display", "none");
});

$("#remove-all-button").click(function () {
  $("#gif-output").empty();
});
