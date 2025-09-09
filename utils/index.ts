import { CarProps, FetchCarsProps, FetchCarsReturnType } from "@/types";

export async function fetchCars({
  manufacturer,
  model,
  year,
  limit,
  fuel_type,
}: FetchCarsProps): Promise<FetchCarsReturnType> {
  const env_url = process.env.BACKEND_URL;

  if (!env_url) {
    console.log("backend url is missing");
    return {
      data: [],
      message: "error fetching cars",
    };
  }

  const url = new URL(env_url);

  url.searchParams.append(
    "limit",
    limit && !Array.isArray(limit) ? limit : "10"
  );

  if (manufacturer) {
    if (!Array.isArray(manufacturer))
      url.searchParams.append("make", manufacturer);
  }

  if (model) {
    if (!Array.isArray(model)) url.searchParams.append("model", model);
  }

  if (year) {
    if (!Array.isArray(year)) url.searchParams.append("year", year);
  }

  if (fuel_type) {
    if (!Array.isArray(fuel_type)) url.searchParams.append("fuel", fuel_type);
  }

  const response = await fetch(url);

  const result: CarProps[] = await response.json();

  if (result.length === 0) {
    return {
      data: [],
      message: "No cars where found",
    };
  }

  return {
    data: result,
  };
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

export const updateSearchParams = (type: string, value: string): string => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
