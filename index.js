// DOM GAMBAR
document.addEventListener("DOMContentLoaded", function () {
  const gambarContainers = document.querySelectorAll(".gambarContainer");
  const gambar = document.querySelector(".gambar");

  function tampilkanGambar(angka) {
    const gambar = gambarContainers[angka - 1].querySelector(".gambar");
    if (gambar) {
      if (angka === 1) {
        gambar.src = "/assets/images/html_css.svg";
      } else if (angka === 2) {
        gambar.src = "/assets/images/js.svg";
      } else if (angka === 3) {
        gambar.src = "/assets/images/leaflet_openlayers.svg";
      } else if (angka === 4) {
        gambar.src = "/assets/images/geoserver.svg";
      } else if (angka === 5) {
        gambar.src = "/assets/images/postgre_postgis.svg";
      } else {
        gambar.style.display = "none";
      }
    }
  }

  const buttons = document.querySelectorAll(".software-button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const angka = parseInt(button.getAttribute("data-angka"));
      tampilkanGambar(angka);

      gambarContainers.forEach(
        (container) => (container.style.display = "none")
      );
      gambarContainers[angka - 1].style.display = "block";

      const learnMoreLink = button.parentNode.querySelector(".learn-more-link");
      learnMoreLink.style.display = "block";
    });
  });

  // Dropdown logic
  const dropdownTrigger = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdownTrigger.addEventListener("mouseenter", () => {
    dropdownContent.style.display = "block";
  });

  dropdownContent.addEventListener("mouseleave", () => {
    dropdownContent.style.display = "none";
  });

  dropdownContent.addEventListener("click", (event) => {
    const clickedItem = event.target;
    if (clickedItem.classList.contains("block")) {
      dropdownContent.style.display = "none";
    }
  });
});

// FETCH API
document.addEventListener("DOMContentLoaded", function () {
  const dataContainer = document.getElementById("data-container");

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        const userElement = document.createElement("div");
        userElement.innerHTML = `
<div class="hover:shadow-md pl-6  py-1 hover:cursor-pointer rounded-md"> <h2 class="text-black"><b>Name</b> : ${user.name}</h2>
<p class="text-black"><b>Email</b> : ${user.email}</p>
<p class="text-black mb-4"><b>Area</b> : ${user.address.city}</p></div>
       
          `;
        dataContainer.appendChild(userElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

//Geolocation API
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Menggunakan API Nominatim untuk dapat data Negara
  var apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      var country = data.address.country;

      var now = new Date();
      var day = now.toLocaleString("default", { weekday: "long" });
      var date = now.toLocaleDateString();
      var time = now.toLocaleTimeString();

      var table = `
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light">
                  <thead class="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" class="px-6 py-4">No</th>
                      <th scope="col" class="px-6 py-4">Info</th>
                      <th scope="col" class="px-6 py-4">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                      <td class="whitespace-nowrap px-6 py-4">Latitude</td>
                      <td class="whitespace-nowrap px-6 py-4">${latitude}</td>
                    </tr>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
                      <td class="whitespace-nowrap px-6 py-4">Longitude</td>
                      <td class="whitespace-nowrap px-6 py-4">${longitude}</td>
                    </tr>
                    
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">3</td>
                      <td class="whitespace-nowrap px-6 py-4">Country</td>
                      <td class="whitespace-nowrap px-6 py-4">${country}</td>
                    </tr>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">4</td>
                      <td class="whitespace-nowrap px-6 py-4">Day</td>
                      <td class="whitespace-nowrap px-6 py-4">${day}</td>
                    </tr>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">5</td>
                      <td class="whitespace-nowrap px-6 py-4">Date</td>
                      <td class="whitespace-nowrap px-6 py-4">${date}</td>
                    </tr>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">6</td>
                      <td class="whitespace-nowrap px-6 py-4">Local Time</td>
                      <td class="whitespace-nowrap px-6 py-4">${time}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      `;

      x.innerHTML = table;
    })
    .catch((error) => {
      x.innerHTML = "Error fetching location data.";
      console.error("Error fetching location data:", error);
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}

//FORM
const form = document.getElementById("subscription-form");
const fullnameInput = document.getElementById("grid-full-name");
const emailInput = document.getElementById("grid-email");
const message = document.getElementById("subscription-message");

emailInput.value = localStorage.getItem("subscriptionEmail") || "";

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = emailInput.value;
  const fullname = fullnameInput.value;

  // Validasi Email
  if (!email) {
    message.textContent = "Please provide a valid email address.";
    return;
  }

  localStorage.setItem("subscriptionEmail", email);
  localStorage.setItem("subscriptionFullname", fullname);

  message.textContent = `You've successfully subscribed with email: ${email}`;
  emailInput.value = "";
  fullnameInput.value = "";
  console.log("Subscription data:", {
    fullname: fullname,
    email: email,
  });
});
