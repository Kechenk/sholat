function populateProvinceDropdown() {
    fetch("https://kechenk.github.io/api-wilayah-indonesia/api/provinces.json")
      .then((response) => response.json())
      .then((data) => {
        var provinceSelect = document.getElementById("provinceSelect");
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
        citySelect.innerHTML = ""; // Clear existing options
        data.forEach((city) => {
          var option = document.createElement("option");
          option.value = city.id;
          option.textContent = city.name;
          citySelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }
  
  function fetchPrayerTimes() {
    var selectedCityId = document.getElementById("citySelect").value;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var apiUrl = `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${selectedCityId}&country=Indonesia&method=2`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        var prayerTimes = data.data;
        var cityName = data.data[0].meta.city;
        var provinceName = data.data[0].meta.province;
        var timezone = data.data[0].meta.timezone;
        var monthYear = `${data.data[0].date.gregorian.month.en} - ${year}`;
  
        // Update city name, province, timezone, and month-year
        document.getElementById("city").innerText = cityName;
        document.getElementById("province").innerText = provinceName;
        document.getElementById("timezone").innerText = timezone;
        document.getElementById("month_year").innerText = monthYear;
  
        // Display prayer times in the table
        displayPrayerTimes(prayerTimes);
      })
      .catch((error) => console.error("Error fetching prayer times:", error));
  }
  
  function displayPrayerTimes(prayerTimes) {
    var table = document.querySelector(".table_azan");
  
    // Clear existing rows
    table.querySelectorAll("tr:not(.table_title)").forEach((row) => row.remove());
  
    // Loop through prayer times and create rows dynamically
    prayerTimes.forEach((day) => {
      var row = document.createElement("tr");
      row.className = "table_header";
      row.innerHTML = `
                      <td><b>${day.date.gregorian.date}</b></td>
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
  
  // Populate province dropdown on page load
  populateProvinceDropdown();