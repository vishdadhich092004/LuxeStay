import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function ImagesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          className="w-full text-gray-700 font-normal"
          multiple
          accept="image/*"
          type="file"
          {...register("imageFiles", {
            validate: (imagesFile) => {
              const totalLength = imagesFile.length;
              if (totalLength === 0)
                return "At least one image should be added";
              if (totalLength > 6)
                return "Total number of images cannot be more than 6";
              else true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-normal">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
}

export default ImagesSection;
