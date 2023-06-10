import { API_KEY } from "./env.js";

const ipAddress = document.querySelector(".ip-address");
const locationElement = document.querySelector(".location");
const timezone = document.querySelector(".timezone");
const ISP = document.querySelector(".isp");

let map = L.map("map").setView([51.505, -0.09], 13);
async function getIPAddress(IPAddress) {
  try {
    map.remove();
    let API;
    if (IPAddress != null) {
      API = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${IPAddress}`;
    } else {
      API = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;
    }

    const { data } = await axios.get(API);
    const { ip, isp, location } = data;
    map = L.map("map").setView([location.lat, location.lng], 13);
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

    ipAddress.textContent = ip;
    locationElement.textContent = `${location.city}, ${location.region}, ${location.country}`;
    timezone.textContent = location.timezone;
    ISP.textContent = isp;
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
  getIPAddress(value);
});

document.addEventListener("DOMContentLoaded", () => {
  getIPAddress();
});
