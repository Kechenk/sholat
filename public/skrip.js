populateProvinsiDropdown();

function populateProvinsiDropdown() {
    fetch("https://kechenk.github.io/api-wilayah-indonesia/api/provinces.json")
    .then((response) => response.json())
    .then((data) => {
        var provinceSelect = document.getElementById("provinceSelect");
        provinceSelect.innerHTML = "<option value=''>Pilih Provinsi</option>"
        data.forEach(province => {
            var option = document.createElement("option");
            option.value = province.id;
            option.textContent = province.name;
            provinceSelect.appendChild(option);
        });
    })
    .catch((error) => console.error("Erorr fetching province", error));
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