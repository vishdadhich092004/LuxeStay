import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { HotelType } from "../../../backend/src/shared/types";
import { IoLocation, IoPricetags } from "react-icons/io5";
import { FaPerson, FaChildren, FaStar } from "react-icons/fa6";
import { BsBuildingsFill } from "react-icons/bs";

function MyHotels() {
  const { showToast } = useAppContext();

  const {
    data: hotelData,
    isLoading,
    isError,
  } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
    onError: () => {
      showToast({ message: "Error Fetching Hotels", type: "ERROR" });
    },
  });

  if (isLoading) {
    return <span className="text-2xl font-bold">Loading...</span>;
  }

  if (isError || !hotelData || hotelData.length === 0) {
    return (
      <div className="flex justify-between">
        <span className="text-2xl font-bold">No Hotels Found</span>
        <Link
          to="/add-hotel"
          className="flex bg-yellow-600 text-white text-cl font-bold p-2 hover:bg-yellow-500"
        >
          Add Hotel
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-yellow-600 text-white text-cl font-bold p-2 hover:bg-yellow-500"
        >
          Add Hotel
        </Link>
      </div>
      <div className="space-y-8">
        {hotelData.map((hotel: HotelType) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5 shadow-lg w-full"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <IoLocation className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="flex items-center">
                <BsBuildingsFill className="mr-1" />
                Type: {hotel.type}
              </div>
              <div className="flex items-center">
                <FaPerson className="mr-1" />
                Adults: {hotel.adultCount}
              </div>
              <div className="flex items-center">
                <FaChildren className="mr-1" />
                Children: {hotel.childCount}
              </div>
              <div className="flex items-center">
                <IoPricetags className="mr-1" />
                Price per Night: ${hotel.pricePerNight}
              </div>
              <div className="flex items-center">
                <FaStar className="mr-1" />
                Star Rating: {hotel.starRating}
              </div>
            </div>
            <div>
              Facilities:
              <ul className="list-disc ml-5">
                {hotel.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 mt-4">
                {hotel.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Image of ${hotel.name}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-yellow-600 text-white p-2 font-bold hover:bg-yellow-500 h-10 mt-10"
              >
                More Details
              </Link>
            </div>
            <div className="text-sm text-gray-500">
              Last Updated: {new Date(hotel.lastUpdated).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyHotels;
