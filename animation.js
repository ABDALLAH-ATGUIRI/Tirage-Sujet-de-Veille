// Popup show
function popupShow(e) {
  // e.preventDefault();
  // e.stopPropagation();

  const popup = document.getElementById("popup-add");

  if (popup.style.display == "block") {
    popup.style.display = "none";
  } else {
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

