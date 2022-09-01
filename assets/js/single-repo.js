console.log("Anyone Here?")

function renderMessage() {
    var titleInfo = JSON.parse(localStorage.getItem("movieInfo"));
    console.log("I am also here", titleInfo.title)
    if (titleInfo !== null) {
        console.log("I am here")
      document.querySelector("#Movie-Title").textContent = titleInfo.title
      document.querySelector("#plot").textContent = titleInfo.plot
      document.querySelector("#rating").textContent = titleInfo.rating
    }
  }
  renderMessage();