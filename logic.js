// Constructors
this.ShowDrawList();
this.ShowContestants();

function ShowDrawList() {
  drawList().then((data) => {
    if (data) {
      document.getElementById("draw").innerHTML = "";
      data.forEach((element) => {
        const tr = document.createElement("tr");
        const td = [
          document.createElement("td"),
          document.createElement("td"),
          document.createElement("td")
        ];
        const input = document.createElement("input");
        const name = document.createTextNode(element.name);
        const date = document.createTextNode(element.date);
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

/**
 * display the list of Watch Subject Draw
 * @param {*} e
 */
function drawList() {
  return fetch("http://localhost:3000/WatchTopic", {
    method: "GET"
  })
    .then((res) => res.json())
    .then((json) => {
      if (json) return json;
      return false;
    })
    .catch(() => {
      console.error();
    });
}

/**
 * display contestants
 * @param {*}
 */
function ShowContestants() {
  document.getElementById("contestants").innerHTML = "";
  fetch("http://localhost:3000/Contestant", {
    method: "GET"
  })
    .then((res) => res.json())
    .then((json) => {
      if (json) {
        json.forEach((element) => {
          document.getElementById(
            "contestants"
          ).innerHTML += `<span class="names" id="${element.id}" onmouseover="animationDel(${element.id})" onmouseout="animationDel(${element.id})" onClick="delContestant(${element.id})">${element.name}</span>`;
        });
      }
      return false;
    })
    .catch(() => {
      console.error();
    });
}

/**
 * add contestant to object Contestant*
 * @param {*} e
 */

function addContestant(e) {
  // e.preventDefault();

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
      .then(() => {
        this.ShowContestants();
        document.getElementById("contestantName").value = "";
      })
      .catch(() => {
        console.error();
      });
  } else {
    document.getElementById("error").innerHTML =
      '<p id="error">Entrez le nom !</p>';
  }
}

/**
 * Delete contestant from object Contestant
 * @param {*} e
 */
function delContestant(el) {
  fetch("http://localhost:3000/Contestant/" + el.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: el.id })
  })
    .then((res) => {
      this.ShowContestants();
    })
    .catch(() => console.error());
}

/**
 * Animation Rand the names
 * @param {*} e
 */
function goToRend() {
  fetch("http://localhost:3000/Contestant", {
    method: "GET"
  })
    .then((res) => res.json())
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

/**
 * Random function
 * @param {*} e
 */
function random(json) {
  let index = Math.floor(Math.random() * json.length);
  setTimeout(() => {
    document.getElementById(
      "name"
    ).innerHTML = `<span id="name" > ${json[index].name}</span>`;
  }, 1);
  return json[index];
}

/**
 * add contestant to the list of Watch topic
 * @param {*} e
 */
function addWatchTopicList(contestant) {
  getDate().then((date) => {
    if (contestant) {
      const data = {
        id: contestant.id,
        name: contestant.name,
        date: date
      };
      fetch("http://localhost:3000/WatchTopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then((json) => {
          this.delContestant(json);
        })
        .catch(() => {
          console.error();
        });
    } else {
      console.error("Object is vide");
    }
  });
}

/**
 * get contestant to the list of Watch topic
 * @param {*} e
 */
function getWatchTopicList() {
  return fetch("http://localhost:3000/WatchTopic", {
    method: "GET"
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch(() => {
      console.error();
    });
}

/**
 * Clear the list of contestants
 * @param {*}
 *
 */
function clearWatchTopic() {
  drawList().then((list) => {
    list.forEach(async (Contestant) => {
      await fetch("http://localhost:3000/WatchTopic/" + Contestant.id, {
        method: "DELETE"
      })
        .then((res) => res.json())
        .then((result) => {
          this.ShowDrawList();
          // console.log(res.status);
        })
        .catch(() => console.error());
    });
  });
}

/**
 * Get date of Watch topic
 * @param {*} e
 */
const getDate = () => {
  return getWatchTopicList().then(async (list) => {
    if (list.length > 0) {
      today = new Date(list[list.length - 1].date);
      today.setDate(today.getDate() + 1);
    } else {
      today = new Date();
    }
    do {
      valDate = await ValDate(today).then((res) => {
        return res;
      });
      if (valDate) today.setDate(today.getDate() + 1);
    } while (!valDate);
    return (
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    );
  });
};

/**
 * Validate Date
 *
 */
function ValDate(dateToVal) {
  toDate = new Date(dateToVal);
  return holidays().then((res) => {
    date =
      toDate.getDate() +
      "-" +
      (toDate.getMonth() + 1) +
      "-" +
      toDate.getFullYear();

    const holiday =
      res.filter((result) => {
        if (result.date == date) return true;
        return false;
      }).length == 0
        ? true
        : false;

    if (today.getDay() == 0 || today.getDay() == 6 || holiday == true)
      return true;
    return false;
  });
}

/**
 * Retrieves a list public holidays and observances for countries, states and provinces.
 *
 */
const holidays = () => {
  return fetch("https://public-holiday.p.rapidapi.com/2023/MA", {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "dbcef4c569msh329fafd979acf5cp1e4d01jsn60ba6fc54e93",
      "X-RapidAPI-Host": "public-holiday.p.rapidapi.com"
    }
  })
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch((err) => console.error(err));
};
