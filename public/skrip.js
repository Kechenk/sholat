dropdownProvinsi();

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
      data.forEach((city) => {
        var option = document.createElement("option");
        option.value = city.id;
        option.textContent = city.name;
        pilihKota.appendChild(option);
      });
    });
}

function jamSholat(){
    var idKota = document.getElementById("pilihKota").value;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var api = `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${idKota}&country=Indonesia&method=20`;

    fetch(api)
    .then((response) => response.json())
    .then((data) => {
        var waktuSholat = data.data;
        var namaKota = idKota;
        var monthYear = `${month} - ${year}`;
        document.getElementById("city").innerText = namaKota;
        document.getElementById("month_year").innerText = monthYear;
        displayWaktuSholat(waktuSholat);
    });
}

function displayWaktuSholat(waktuSholat) {
    var table = document.querySelector(".table_azan");
    waktuSholat.forEach((day) => {
        var row = document.createElement("tr");
        row.innerHTML = `
        <td>${day.date.gregorian.day}</td>
        <td>${day.timings.Imsak}</td>
        <td>${day.timings.Fajr}</td>
        <td>${day.timings.Sunrise}</td>
        <td>${day.timings.Dhuhr}</td>
        <td>${day.timings.Asr}</td>
        <td>${day.timings.Maghrib}</td>
        <td>${day.timings.Isha}</td>
    `;
    table.appendChild(row);
    });
}

function displayTime() {
    var currentTimeElement = document.getElementById("current_time");
    setInterval(() => {
        var currentTime = new Date();
        var hours = currentTime.getHours().toString().padStart(2, '0');
        var minutes = currentTime.getMinutes().toString().padStart(2, '0');
        var seconds = currentTime.getSeconds().toString().padStart(2, '0');
        currentTimeElement.innerText = `${hours}:${minutes}:${seconds}`;
    }, 1000); // Update every second
}

jamSholat();
displayTime();