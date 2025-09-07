export async function fetchCars() {
  const headers = {
    "x-rapidapi-key": "f3c5121b21msh9a789eab36a277ap1a58a2jsnb3a5a1448ae5",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla`;

  const response = await fetch(url, {
    headers: headers,
  });

  const result = await response.json();
  return result;
}
