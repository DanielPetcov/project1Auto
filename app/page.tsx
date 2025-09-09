import { fetchCars } from "@/utils";
import { CustomFilter, Hero, SearchBar } from "../components";
import { CarCard } from "../components";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { manufacturer, model, year, limit } = await searchParams;

  const allCars = await fetchCars({
    manufacturer: manufacturer,
    model: model,
    year: year,
    limit: limit,
  });
  const isDataEmpty =
    !Array.isArray(allCars.data) || allCars.data.length < 1 || !allCars.data;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.data.map((car) => (
                <CarCard car={car} key={car._id} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              Something went wrong
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
