/**
 * Get API from table WatchTopic the list of Watch Subject Draw
 * @param {*}
 */
function getDrawList() {
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
 * Get API from table Contestant the list of Contestants
 * @param {*}
 */
function getContestants() {
  document.getElementById("contestants").innerHTML = "";
  return fetch("http://localhost:3000/Contestant", {
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
 * Add API to table Contestant the list of Contestants
 * @param {*}
 */
function addContestant() {
  const id = ("user_" + Math.floor(Math.random() * 100000)).toString();
  const name = document.getElementById("contestantName").value;
  const date = "";
  const watchTopic = "";
  const data = { id, name, date, watchTopic };
  if (name) {
    return fetch("http://localhost:3000/Contestant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then(() => {
        return true;
      })
      .catch(() => {
        console.error();
      });
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
 * Random function for get a random contestant
 * @param {*} Contestant
 */
function random(Contestants) {
  let index = Math.floor(Math.random() * Contestants.length);
  setTimeout(() => {
    document.getElementById(
      "name"
    ).innerHTML = `<span id="name" > ${Contestants[index].name}</span>`;
  }, 1);
  return Contestants[index];
}

/**
 * Add contestant to the list of Watch topic
 * @param {*} contestant
 */
function addWatchTopicList(contestant) {
  this.getDate().then((date) => {
    if (contestant) {
      contestant.date = date;
      fetch("http://localhost:3000/WatchTopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(contestant)
      })
        .then((res) => res.json())
        .then((json) => {
          this.ShowDrawList();
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
 * Get contestant to the list of Watch topic
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
 *
 */
function clearWatchTopic() {
  getDrawList().then((list) => {
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
 */
function getDate() {
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
    } while (valDate);
    return (
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    );
  });
}

/**
 * Validate daysOf if was a saturday or sunday or one of holidays
 * @param {*} dateToVal
 */
function ValDate(dateToVal) {
  toDate = new Date(dateToVal);
  return holidays(toDate.getFullYear()).then((res) => {
    date =
      toDate.getDate() +
      "-" +
      (toDate.getMonth() + 1) +
      "-" +
      toDate.getFullYear();
    // validate holidays
    const holiday = res.filter((result) => {
      if (result.date == date) return true;
      return false;
    });
    // validate saturday or sunday
    if (today.getDay() == 0 || today.getDay() == 6 || holiday.length > 0)
      return true;
    return false;
  });
}

/**
 * Retrieves a list public holidays and observances for countries, states and provinces.
 * @param year : year of get APIs for validate condition
 */
const holidays = (year) => {
  return fetch("https://public-holiday.p.rapidapi.com/" + year + "/MA", {
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

/**
 * The exportTableToExcel() function convert HTML table data to excel and download as XLS file (.xls).
 * @param {*} tableID
 * @param {*} filename default file name
 */
function exportTableToExcel(tableID, filename = "") {
  var downloadLink;
  var dataType = "application/vnd.ms-excel";
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

  // Specify file name
  filename = filename ? filename + ".xls" : "excel_data.xls";

  // Create download link element
  downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(["\ufeff", tableHTML], {
      type: dataType
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = "data:" + dataType + ", " + tableHTML;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }
}
