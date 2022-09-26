// Constructors
this.ShowDrawList();
this.ShowContestants();

// Display draw list
function ShowDrawList() {
  this.getDrawList().then((data) => {
    if (data) {
      document.getElementById("draw").innerHTML = "";
      data.forEach((element) => {
        const tr = document.createElement("tr");
        const input = document.createElement("input");
        const td = [
          document.createElement("td"),
          document.createElement("td"),
          document.createElement("td")
        ];
        const name = document.createTextNode(element.name);
        const date = document.createTextNode(element.date);
        input.id = element.id ;
        input.onchange = addWatchTopic(element.id);
        input.placeholder = "Entre le sujet de veille"
        td[0].appendChild(name);
        td[1].appendChild(date);
        td[2].appendChild(input);
        tr.appendChild(td[0]);
        tr.appendChild(td[1]);
        tr.appendChild(td[2]);
        document.getElementById("draw").appendChild(tr);
      });
    }
    return true;
  });
}

// add Watch Topic
function addWatchTopic()
{

}

//display contestants
function ShowContestants() {
  this.getContestants().then((res) => {
    res.forEach((element) => {
      document.getElementById(
        "contestants"
      ).innerHTML += `<span class="names" id="${element.id}" onmouseover="animationDel(${element.id})" onmouseout="animationDel(${element.id})" onClick="delContestant(${element.id})">${element.name}</span>`;
    });
  });
}

// Response of add contestant
function ShowResContestants() {
  this.addContestant().then((res) => {
    if (res) {
      ShowContestants();
      document.getElementById("contestantName").value = "";
    } else {
      document.getElementById("error").innerHTML =
        '<p id="error">Entrez le nom !</p>';
    }
  });
}

// Show popup add contestants
function popupShow(e) {
  const popup = document.getElementById("popup-add");
  const body = document.querySelector("body");
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

//Animation Rand the names in table of random
function goToRend() {
  this.getContestants()
    .then((json) => {
      if (json.length > 0) {
        for (let i = 0; i < 20000; i++) {
          user = this.random(json);
        }
        return true;
      }
      document.getElementById(
        "name"
      ).innerHTML = `<span id="name">Tourne la roue</span>`;
      this.popupShow();
      return false;
    })
    .then((res) => {
      if (res) {
        Swal.fire({
          title: user.name,
          width: 800,
          padding: "9em",
          top: "50px",
          color: "#716add",
          background: '#fff url("/icons/gifty.gif") 180px',
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui, entrez-le!",
          cancelButtonText: "Non, annuler!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.addWatchTopicList(user);
          }
        });
      }
    });
}
