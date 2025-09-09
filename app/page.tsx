import { fetchCars } from "@/utils";
import { CustomFilter, Hero, SearchBar, ShowMore } from "../components";
import { CarCard } from "../components";
import { SearchParams } from "next/dist/server/request/search-params";
import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { manufacturer, model, year, limit, fuel } = await searchParams;

  const allCars = await fetchCars({
    manufacturer: manufacturer,
    model: model,
    year: year,
    limit: limit,
    fuel_type: fuel,
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
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.data.map((car) => (
                <CarCard car={car} key={car._id} />
              ))}
            </div>
            <ShowMore
              pageNumber={(Number(limit) || 10) / 10}
              isNext={10 > allCars.data.length}
            />
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
