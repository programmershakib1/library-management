import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddBook = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const {
      name,
      author,
      image,
      quantity,
      rating,
      category,
      description,
      book_content,
    } = data;

    const ratingNumber = parseInt(rating);
    const quantityNumber = parseInt(quantity);

    if (ratingNumber > 5 || ratingNumber <= 0) {
      return toast.error("You cannot add ratings below zero and above 5.");
    }

    if (quantityNumber <= 0) {
      return toast.error("Quantity must be at least 1");
    }

    const bookInfo = {
      name,
      author,
      image,
      quantity: parseInt(quantity),
      rating,
      category,
      description,
      book_content,
      email: user.email,
    };

    if (!user) return;
    axiosSecure.post("/add-book", bookInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Book added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    });
  };

  return (
    <div className="md:mt-10 mx-5 md:mx-0">
      <Helmet>
        <title>LMS - Add Book</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Name</span>
            </label>
            <input
              type="text"
              placeholder="Book Name"
              className="border border-black mt-2 p-3 rounded-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Author Name</span>
            </label>
            <input
              type="text"
              placeholder="Author Name"
              className="border border-black mt-2 p-3 rounded-full"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && <p>{errors.author.message}</p>}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Image</span>
            </label>
            <input
              type="url"
              placeholder="Image"
              className="border border-black mt-2 p-3 rounded-full"
              {...register("image", { required: "Image URL is required" })}
            />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Quantity</span>
            </label>
            <input
              type="number"
              placeholder="Quantity"
              className="border border-black mt-2 p-3 rounded-full"
              {...register("quantity", {
                required: "Quantity is required",
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
                pattern: {
                  value: /^[1-9]\d*$/,
                  message: "Quantity cannot start with 0",
                },
              })}
            />
            {errors.quantity && <p>{errors.quantity.message}</p>}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Rating</span>
            </label>
            <input
              type="number"
              placeholder="Rating"
              className="border border-black mt-2 p-3 rounded-full"
              {...register("rating", {
                required: "Rating is required",
                min: { value: 1, message: "Rating must be at least 1" },
                max: { value: 5, message: "Rating cannot exceed 5" },
              })}
            />
            {errors.rating && <p>{errors.rating.message}</p>}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Category</span>
            </label>
            <select
              defaultValue={""}
              className="border border-black mt-2 p-3 rounded-full"
              {...register("category", { required: "Category is required" })}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Novel">Novel</option>
              <option value="Thriller">Thriller</option>
              <option value="History">History</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
            {errors.category && <p>{errors.category.message}</p>}
          </div>
        </div>
        <div className="flex flex-col">
          <label>
            <span className="font-semibold">Short Description</span>
          </label>
          <textarea
            placeholder="Short Description"
            className="border border-black mt-2 h-20 p-3"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className="flex flex-col">
          <label>
            <span className="font-semibold">Book Content</span>
          </label>
          <textarea
            placeholder="Book Content"
            className="border border-black mt-2 h-40 p-3"
            {...register("book_content", {
              required: "Book content is required",
            })}
          />
          {errors.book_content && <p>{errors.book_content.message}</p>}
        </div>
        <div className="flex justify-center mt-5">
          <button className="bg-primary py-2 px-6 font-bold">Add Book</button>
        </div>
      </form>
      <Link to="/addAcademicBook">
        <button className="btn py-2 px-6 font-bold mt-5 md:mt-0 w-full md:w-52">Add Academic Book</button>
      </Link>
    </div>
  );
};

export default AddBook;
