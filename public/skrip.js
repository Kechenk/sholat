function dropdownProvinsi() {
  fetch("https://kechenk.github.io/api-wilayah-indonesia/api/provinces.json")
    .then((response) => response.json())
    .then((data) => {
      var pilihProvinsi = document.getElementById("pilihProvinsi");
      data.forEach((provinces) => {
        var option = document.createElement("option");
        option.value = provinces.id;
        option.textContent = provinces.name;
        pilihProvinsi.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching provinces", error));
}

function dropdownKota() {
  var idProvinsi = document.getElementById("pilihProvinsi").value;
  fetch(
    `https://kechenk.github.io/api-wilayah-indonesia/api/regencies/${idProvinsi}.json`
  )
    .then((response) => response.json())
    .then((data) => {
      var pilihKota = document.getElementById("pilihKota");
      pilihKota.innerHTML = "";
      data.forEach((city) => {
        var option = document.createElement("option");
        option.value = city.id;
        option.textContent = city.name;
        pilihKota.appendChild(option);
      });
      pilihKota.dispatchEvent(new Event("change"));
    });
  console.log(idProvinsi);
}

function jamSholat() {
  var pilihKota = document.getElementById("pilihKota");
  var namaKota = pilihKota.options[pilihKota.selectedIndex].text;
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  var api = `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${namaKota}&country=Indonesia&method=20`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      var waktuSholat = data.data;
      var monthYear = `${monthNames[month - 1]} - ${year}`;
      document.getElementById("city").innerText = namaKota; 
      document.getElementById("month_year").innerText = monthYear;
      var table = document.querySelector(".data_sholat");
      table.innerHTML = ""; 
      displayWaktuSholat(waktuSholat);
      displayTime(); 
    });
    //console.log
}


function displayWaktuSholat(waktuSholat) {
  var table = document.querySelector(".data_sholat");
  table.innerHTML = "";
  var today = new Date().getDate();
  waktuSholat.forEach((day, index) => {
    var row = document.createElement("tr");
    var className = index % 2 === 0 ? "table_dark" : "table_light"; 
    if (index + 1 === today) { 
      className = "table_highlight"; 
    }
    row.className = "table_row " + className; 
    row.innerHTML = `
        <td>${day.date.gregorian.day} / ${day.date.hijri.day} </td>
        <td>${day.timings.Imsak}</td>
        <td><b>${day.timings.Fajr}</b></td>
        <td>${day.timings.Sunrise}</td>
        <td>${day.timings.Dhuhr}</td>
        <td>${day.timings.Asr}</td>
        <td><b>${day.timings.Maghrib}</b></td>
        <td>${day.timings.Isha}</td>
    `;
    table.appendChild(row);
  });
}


function displayTime() {
  var currentTimeElement = document.getElementById("current_time");
  setInterval(() => {
    var currentTime = new Date();
    var hours = currentTime.getHours().toString().padStart(2, "0");
    var minutes = currentTime.getMinutes().toString().padStart(2, "0");
    var seconds = currentTime.getSeconds().toString().padStart(2, "0");
    currentTimeElement.innerText = `${hours}:${minutes}:${seconds}`;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  dropdownProvinsi();
});
document.addEventListener("DOMContentLoaded", function () {
  displayTime();
});
