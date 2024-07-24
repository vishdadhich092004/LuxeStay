import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function GuestSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 ">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-100">
        <label className="text-gray-700 text-sm font-bold">
          Adults
          <input
            defaultValue={1}
            type="number"
            min={1}
            className="border rounded w-full py-2 px-3 font-normal"
            {...register("adultCount", {
              required: "This field is required",
            })}
          ></input>
          {errors.adultCount && (
            <span className="text-red-500 text-sm font-normal">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Children
          <input
            defaultValue={1}
            type="number"
            min={0}
            className="border rounded w-full py-2 px-3 font-normal"
            {...register("childCount", {
              required: "This field is required",
            })}
          ></input>
          {errors.childCount && (
            <span className="text-red-500 text-sm font-normal">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
}

export default GuestSection;
