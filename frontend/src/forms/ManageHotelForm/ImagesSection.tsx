import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function ImagesSection() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");
  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} alt={url} className="min-h-full object-cover" />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          className="w-full text-gray-700 font-normal"
          multiple
          accept="image/*"
          type="file"
          {...register("imageFiles", {
            validate: (imagesFile) => {
              const totalLength =
                imagesFile.length + (existingImageUrls?.length || 0);
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
