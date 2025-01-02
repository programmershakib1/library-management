import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const AddAcademicBook = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, class_name, image, year, source, description, book_content } =
      data;

    const bookInfo = {
      name,
      class_name,
      image,
      year,
      source,
      description,
      book_content,
      email: user.email,
    };

    if (!user) return;
    axiosSecure.post("/add-academic-book", bookInfo).then((res) => {
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
        <title>LMS - Add Academic Book</title>
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
              <span className="font-semibold">Class</span>
            </label>
            <input
              type="text"
              placeholder="Class Name"
              className="border border-black mt-2 p-3 rounded-full"
              {...register("class_name", {
                required: "Class name is required",
              })}
            />
            {errors.class_name && <p>{errors.class_name.message}</p>}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Image</span>
            </label>
            <input
              type="url"
              placeholder="Book Image"
              className="border border-black mt-2 p-3 rounded-full"
              {...register("image", { required: "Image URL is required" })}
            />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Year</span>
            </label>
            <input
              type="number"
              placeholder="Year"
              className="border border-black mt-2 p-3 rounded-full"
              {...register("year", {
                required: "Year is required",
              })}
            />
            {errors.year && <p>{errors.year.message}</p>}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label>
            <span className="font-semibold">Source URL</span>
          </label>
          <input
            type="url"
            placeholder="Source URL"
            className="border border-black mt-2 p-3 rounded-full"
            {...register("source", {
              required: "Source URL is required",
            })}
          />
          {errors.source && <p>{errors.source.message}</p>}
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
          <button className="bg-accent py-2 px-6 font-bold">Add Book</button>
        </div>
      </form>
      <Link to="/addBook">
        <button className="btn py-2 px-6 font-bold mt-5 md:mt-0 w-full md:w-52">
          Add Other Book
        </button>
      </Link>
    </div>
  );
};

export default AddAcademicBook;
