export default function fetchCountries(name) {
  let URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(URL).then(resp => {
    //   console.log(resp);
    if (!resp.ok) {
      // resp.ok === false
      throw new Error(resp.statusText); //
    }
    return resp.json();
  });
};
