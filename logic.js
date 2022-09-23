fetch("http://localhost:3000/Contestant", {
  method: "GET"
})
  .then((res) => res.json())
  .then((json) => {
    json.forEach((element) => {
      document.getElementById(
        "contestants"
      ).innerHTML += `<span class="names" id="${element.id}" onmouseover="animationDel(${element.id})" onmouseout="animationDel(${element.id})" onClick="delContestant(${element.id})">${element.name}</span>`;
    });
  })
  .catch(() => {
    console.error();
  });

// add contestant to object Contestant*
function addContestant(e) {
e.preventDefault();
  let id = ("user_" + Math.floor(Math.random() * 100000)).toString();
  let name = document.getElementById("contestantName").value;
  let data = { id, name };
  if (name) {
    fetch("http://localhost:3000/Contestant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
      })
      .catch(() => {
        console.error();
      });
  } else {
    document.getElementById("error").innerHTML =
      '<p id="error">Entrez le nom !</p>';
  }
}

// Delete contestant from object Contestant
function delContestant(el) {
  fetch("http://localhost:3000/Contestant" + "/" + el.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: el.id })
  })
    .then((res) => {})
    .catch(() => console.error());
}

// get all contestant from object Contestant
// function getContestants() {
//     fetch("http://localhost:3000/Contestant", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//       })
//         .then((res) => res.json())
//         .then((json) => {
//           Story.innerHTML = "";
//           console.log(json);
//         })
//         .catch(() => {
//           console.error();
//         });
// }

// Animation Rand the names
function goToRend() {
  fetch("http://localhost:3000/Contestant", {
    method: "GET"
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.length > 0) {
        for (let i = 0; i < 30000; i++) {
          user = this.random(json);
        }
      } else {
        document.getElementById("popup-add").style.display = "block";
      }
    })
    .then(() => {
      Swal.fire({
        title: user.name,
        width: 700,
        height: 1200,
        padding: "3em",
        color: "#716add",
        background: '#fff url("/icons/gifty.gif") 100px',

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
    });
}

// Random
function random(json) {
  let index = Math.floor(Math.random() * json.length);
  setTimeout(() => {
    document.getElementById(
      "name"
    ).innerHTML = `<span id="name" > ${json[index].name}</span>`;
  }, 1);
  return json[index];
}

// add contestant to the list of Watch topic
function addWatchTopicList(contestant) {
  if (contestant) {
    fetch("http://localhost:3000/WatchTopic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contestant)
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        this.delContestant(json);
      })
      .catch(() => {
        console.error();
      });
  } else {
    console.error("Object is vide");
  }
}

// Get date of Watch topic

function getDate() {
  const today = new Date();

  today.setDate(today.getDate() + 2);

  if (today.getDay() == 0) {
    today.setDate(today.getDate() + 1);
  } else if (today.getDay() == 6) {
    today.setDate(today.getDate() + 2);
  }

  day = today.getDate();
  month = today.getMonth() + 1;
  year = today.getFullYear();

  console.log(today.getDay());

  const date = day + "-" + month + "-" + year;

  console.log(date);
}
