// Populate province dropdown on page load
populateProvinceDropdown();

function populateProvinceDropdown() {
    fetch("https://kechenk.github.io/api-wilayah-indonesia/api/provinces.json")
        .then((response) => response.json())
        .then((data) => {
            var provinceSelect = document.getElementById("provinceSelect");
            provinceSelect.innerHTML = "<option value=''>Pilih Provinsi</option>" 
            data.forEach((province) => {
                var option = document.createElement("option");
                option.value = province.id;
                option.textContent = province.name;
                provinceSelect.appendChild(option);
            });
        })
        .catch((error) => console.error("Error fetching provinces:", error));
}

function populateCityDropdown() {
    var selectedProvinceId = document.getElementById("provinceSelect").value;
    fetch(
        `https://kechenk.github.io/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`
    )
        .then((response) => response.json())
        .then((data) => {
            var citySelect = document.getElementById("citySelect");
            citySelect.innerHTML = "<option value=''>Pilih Kota</option>"; // Clear existing options and add default option
            data.forEach((city) => {
                var option = document.createElement("option");
                option.value = city.id;
                option.textContent = city.name;
                citySelect.appendChild(option);
            });
            // Fetch prayer times when a new city is selected
            fetchPrayerTimes();
        })
        .catch((error) => console.error("Error fetching cities:", error));
}


function fetchPrayerTimes() {
    var selectedCityId = document.getElementById("citySelect").value;
    var selectedCityName = document.getElementById("citySelect").options[document.getElementById("citySelect").selectedIndex].text;
    var selectedProvinceName = document.getElementById("provinceSelect").options[document.getElementById("provinceSelect").selectedIndex].text;

    if (!selectedCityId || !selectedProvinceName) return; // If no city or province selected, exit the function

    fetchPrayerTimesData(selectedCityId, selectedCityName, selectedProvinceName);
}

function fetchPrayerTimesData(cityId, _cityName, provinceName) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var apiUrl = `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${cityId}&country=Indonesia&method=2`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            var prayerTimes = data.data;
            var cityFromApi = data.data[0].meta.city;

            // Update city name and province
            document.getElementById("city").innerText = cityFromApi;
            document.getElementById("province").innerText = provinceName;

            // Display prayer times in the table
            displayPrayerTimes(prayerTimes);
        })
        .catch((error) => console.error("Error fetching prayer times:", error));
}


/*
function fetchPrayerTimes() {
    var selectedCityId = document.getElementById("citySelect").value;
    var selectedCityName = document.getElementById("citySelect").options[document.getElementById("citySelect").selectedIndex].text;
    var selectedProvinceName = document.getElementById("provinceSelect").value; // Retrieve province value instead of text

    // if (!selectedCityId || !selectedProvinceName) return; // If no city or province selected, exit the function

    fetchPrayerTimesData(selectedCityId, selectedCityName, selectedProvinceName);
}


function fetchPrayerTimesData(cityId, provinceName) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var apiUrl = `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${cityId}&country=Indonesia&method=2`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            var prayerTimes = data.data;
            var timezone = data.data[0].timezones;

            // Update city name and province
            document.getElementById("timezone").innerText = timezone;
            document.getElementById("province").innerText = provinceName;

            // Display prayer times in the table
            displayPrayerTimes(prayerTimes);
        })
        .catch((error) => console.error("Error fetching prayer times:", error));
}
*/

function displayPrayerTimes(prayerTimes) {
    var table = document.querySelector(".table_azan");

    // Clear existing rows
    table.querySelectorAll("tr:not(.table_header)").forEach((row) => row.remove());

    // Loop through prayer times and create rows dynamically
    prayerTimes.forEach((day) => {
        var row = document.createElement("tr");
        row.className = "table_header";
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
