import { useForm } from "react-hook-form";
import { imageUpload } from "../../../utils";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import ErrorPage from "../../pages/ErrorPage";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddBookForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  
  const {
    mutateAsync,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/books", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Book Added Successfully");
      reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add book");
    },
  });

  const onSubmit = async (data) => {
    const { name, image, category, description, price, quantity, status } = data;

    try {
      const imageFile = image[0];
      const imageUrl = await imageUpload(imageFile);

      const bookData = {
        name,
        image: imageUrl,
        category,
        description,
        price: Number(price),
        quantity: Number(quantity),
        status,
        author: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
        createdAt: new Date(),
      };

      await mutateAsync(bookData);
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    }
  };

  if (isPending)
    return (
      <div className="flex justify-center mt-10">
        <TbFidgetSpinner className="animate-spin text-4xl" />
      </div>
    );

  if (isError) return <ErrorPage />;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left */}
          <div className="space-y-4">
            {/* Book Name */}
            <div>
              <label className="block text-sm font-medium">Book Name</label>
              <input
                className="w-full border p-2 rounded"
                {...register("name", { required: "Book name is required" })}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                className="w-full border p-2 rounded"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select</option>
                <option value="Novel">Novel</option>
                <option value="Story">Story</option>
                <option value="Education">Education</option>
                <option value="Sci-Fi">Sci-Fi</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                className="w-full border p-2 rounded"
                {...register("status", { required: true })}
              >
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                className="w-full border p-2 rounded h-28"
                {...register("description")}
              />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                {...register("quantity", { required: true })}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                {...register("price", { required: true })}
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium mb-1">Book Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded mt-4"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
