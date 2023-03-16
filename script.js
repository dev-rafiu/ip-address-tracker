import { API_KEY } from "./env.js";

const ipAddress = document.querySelector(".ip-address");
const loc = document.querySelector(".location");
const timezone = document.querySelector(".timezone");
const ispElement = document.querySelector(".isp");

async function getIPAddress(ipaddress) {
  const API = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&ipAddress=${ipaddress}`;
  const { data } = await axios.get(API);
  const { ip, isp, location } = data;

  ipAddress.textContent = ip;
  loc.textContent = `${location.region}, ${location.country}`;
  timezone.textContent = location.timezone;
  ispElement.textContent = isp;
}

const form = document.querySelector("[data-ip-address-form]");
const addressInput = document.querySelector("[data-address-input]");
form.addEventListener("submit", (e) => {
  const { value } = addressInput;
  // if (value === "") {
  //   return;
  // }
  getIPAddress("154.160.23.75");

  e.preventDefault();
});
