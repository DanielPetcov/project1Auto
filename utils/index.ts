export async function fetchCars() {
  const RAPID_KEY = process.env.X_RAPIDAPI_KEY;
  const RAPID_HOST = process.env.X_RAPIDAPI_HOST;

  if (!RAPID_KEY || !RAPID_HOST) return null;

  const headers = {
    "x-rapidapi-key": RAPID_KEY,
    "x-rapidapi-host": RAPID_HOST,
  };

  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=carrera`;

  const response = await fetch(url, {
    headers: headers,
  });

  const result = await response.json();
  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};
