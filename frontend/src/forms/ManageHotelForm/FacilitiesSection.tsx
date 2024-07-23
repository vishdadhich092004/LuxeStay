import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

function FacilitiesSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const facilitiesWatch = watch("facilities", []);
  return (
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="text-2xl font-bold ">
          Facilities{" "}
          <span className="text-xs font-semibold">(Select one or more)</span>
        </h2>
        {/* <span className="text-xl font-bold">
          Select All <input type="checkbox" onClick={handle} />
        </span> */}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className={
              Array.isArray(facilitiesWatch) &&
              facilitiesWatch.includes(facility)
                ? "cursor-pointer bg-yellow-600 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-100 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              className="hidden"
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) return true;
                  else return "At least one facility is required";
                },
              })}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-normal">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
}

export default FacilitiesSection;
