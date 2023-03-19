import { API_KEY } from "./env.js";

const ipAddressElement = document.querySelector(".ip-address");
const locationElement = document.querySelector(".location");
const timezoneElement = document.querySelector(".timezone");
const ispElement = document.querySelector(".isp");

async function getIPAddress(ipaddress) {
  let API;
  if (ipaddress) {
    API = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipaddress}`;
  } else {
    API = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;
  }

  try {
    const { data } = await axios.get(API);
    console.log(data.location);
    const { ip, isp, location } = data;

    ipAddressElement.textContent = ip;
    locationElement.textContent = `${location.city}, ${location.region}, ${location.country}`;
    timezoneElement.textContent = location.timezone;
    ispElement.textContent = isp;

    // === MAP ===
    const map = L.map("map").setView([location.lat, location.lng], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker([location.lat, location.lng]).addTo(map);
    const circle = L.circle([location.lat, location.lng], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(map);
  } catch (err) {
    console.log(err);
  }
}

const form = document.querySelector("[data-ip-address-form]");
const addressInput = document.querySelector("[data-address-input]");
form.addEventListener("submit", (e) => {
  const { value } = addressInput;
  e.preventDefault();
  if (value === "") {
    return;
  }
  getIPAddress("154.160.23.75");
});

document.addEventListener("DOMContentLoaded", () => {
  getIPAddress();
});
