import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

function TypeSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">
        Type <span className="text-xs font-semibold">(Select one)</span>
      </h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "cursor-pointer bg-yellow-600 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-100 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              className="hidden"
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-normal">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}

export default TypeSection;
