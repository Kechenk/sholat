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
    })
    
}