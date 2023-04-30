import "./css/styles.css";
import fetchCountries from "./fetchCountries"
import debounce from "lodash.debounce";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const input = document.querySelector("input#search-box");
const list = document.querySelector(".country-list");
const info = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;

input.addEventListener("input", debounce(onImput, DEBOUNCE_DELAY));

function onImput(evt) {
  const nameContry = evt.target.value.trim();
   if (!nameContry) {
     info.innerHTML = "";
     list.innerHTML = "";
     return;
   }
  fetchCountries(nameContry)
    .then(getCountry)
    .catch(err => Notify.failure("Oops, there is no country with that name"));
}

function creatCountryList(Array) {
  const countryList = Array.map(
    ({ flags: { svg, alt }, name: { official } }) => {
      return `<li class="country">
      <img src="${svg}" width="50" height="30" alt="flag of ${alt}">
      <p>${official}</p></li>`;
    }
  ).join("");
  list.innerHTML = countryList;
}

function renderCountryInfo(Array) {
  const countryInfo = Array.map(
    ({
      flags: { svg, alt },
      name: { official },
      capital,
      population,
      languages
    }) => {
      return `<div class="country">
      <img src="${svg}" width="200" alt="flag of ${alt}">
      <h2>${official}</h2></div>
            <p><b>Capital</b>: ${capital}</p>
            <p><b>Population</b>: ${population}</p>
            <p><b>Languages</b>: ${Object.values(languages)}</p>`;
    }
  ).join("");
  info.innerHTML = countryInfo;
};

function getCountry(data) {
  if (data.length > 10) {
    Notify.info("Too many matches found. Please enter a more specific name.");
    info.innerHTML = "";
    list.innerHTML = "";
    return;
  }
  if (data.length === 1) {
    list.innerHTML = "";
    renderCountryInfo(data);
    return;
  }
  if (data.length > 1) {
    info.innerHTML = "";
    creatCountryList(data);
    return;
  }
};
