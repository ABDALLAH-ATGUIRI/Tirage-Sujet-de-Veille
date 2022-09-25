// Popup show
function popupShow(e) {
  const popup = document.getElementById("popup-add");
  const body = document.querySelector("body");

  console.log(popup.style.display == "none");
  console.log(body.style.overflow == "hidden");

  if (popup.style.display == "block") {
    popup.style.display = "none";
    body.style.overflow = "scroll";
  } else {
    body.style.overflow = "hidden";
    popup.style.display = "block";
  }
}

// Animation delete name
function animationDel(el) {
  if (el.style.textDecorationLine == "line-through") {
    el.style.textDecorationLine = "none";
  } else {
    el.style.textDecorationLine = "line-through";
  }
}
