import { FC } from "react";
import { HotelType } from "../../../backend/src/shared/types";

type SearchResultCardProps = {
  hotel: HotelType; // Assuming you have this type defined elsewhere
};

const SearchResultCard: FC<SearchResultCardProps> = ({ hotel }) => {
  return (
    <div className="flex flex-col md:flex-row bg-yellow-50 border border-yellow-600 rounded-xl overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Carousel Section */}
      <div className="md:w-1/3 w-full relative">
        <div className="relative h-48 md:h-full">
          <img
            src={hotel.imageUrls[0]}
            alt={hotel.name}
            className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
          />
          <span className="absolute top-2 left-2 bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded">
            {hotel.starRating} ★
          </span>
        </div>
      </div>

      {/* Details Section */}
      <div className="md:w-2/3 w-full p-4 md:p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-yellow-800">
            {hotel.name}
          </h2>
          <p className="text-yellow-600 mt-1 text-sm md:text-base">
            {hotel.city}, {hotel.country}
          </p>
          <p className="mt-4 text-gray-700 text-sm md:text-base">
            {hotel.description}
          </p>
          <p className="mt-2 text-xs md:text-sm text-gray-500">
            Facilities: {hotel.facilities.join(", ")}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4 md:mt-6">
          <span className="text-lg md:text-xl text-yellow-800 font-bold">
            ${hotel.pricePerNight} / night
          </span>
          <button className="bg-yellow-600 text-white px-3 md:px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition-colors duration-200 text-sm md:text-base">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
