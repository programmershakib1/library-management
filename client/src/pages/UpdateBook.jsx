import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const UpdateBook = () => {
  const { id } = useParams();
  const location = useLocation();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const academicBook =
    location?.state?.academicBook ??
    JSON.parse(localStorage.getItem("academicBook")) ??
    false;

  useEffect(() => {
    if (location?.state?.academicBook !== undefined) {
      localStorage.setItem(
        "academicBook",
        JSON.stringify(location.state.academicBook)
      );
    }
  }, [location?.state?.academicBook]);

  useEffect(() => {
    if (!user) return;
    if (academicBook) {
      axiosSecure.get(`/academic-book/${id}`).then((res) => {
        setBook(res.data);
        setLoading(false);
      });
    } else {
      axiosSecure.get(`/book/${id}`).then((res) => {
        setBook(res.data);
        setLoading(false);
      });
    }
  }, [axiosSecure, id, user, academicBook]);

  const { _id, name, author, image, rating, category } = book;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, author, image, rating, category, class_name, year, source } =
      data;

    const ratingNumber = parseInt(rating);

    if (ratingNumber > 5 || ratingNumber <= 0) {
      return toast.error("You cannot add ratings below zero and above 5.");
    }

    const updatedBookInfo = {
      name,
      author,
      image,
      rating,
      category,
    };

    const academicUpdatedBookInfo = {
      name,
      class_name,
      image,
      year,
      source,
    };

    if (academicBook && book.email !== user.email) {
      return toast.error("You cannot update someone else book.");
    }

    if (academicBook) {
      axiosSecure
        .patch(`/academic-book/${book._id}`, academicUpdatedBookInfo)
        .then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Book update successful",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(-1);
          }
        });
    } else {
      axiosSecure.patch(`/book/${_id}`, updatedBookInfo).then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Book update successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/allBooks");
        }
      });
    }
  };

  return (
    <div className="mx-5 md:mx-0">
      <Helmet>
        <title>LMS - Update Book</title>
      </Helmet>
      {loading ? (
        <div className="text-center mt-10">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:mt-10 flex flex-col gap-2"
        >
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <div className="w-full flex flex-col">
              <label>
                <span className="font-semibold">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Book Name"
                defaultValue={name}
                className="border border-black mt-2 p-3 rounded-full"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            {book.class_name && (
              <div className="w-full flex flex-col">
                <label>
                  <span className="font-semibold">Class</span>
                </label>
                <input
                  name="class_name"
                  type="text"
                  placeholder="Class Name"
                  defaultValue={book?.class_name}
                  className="border border-black mt-2 p-3 rounded-full"
                  {...register("class_name", {
                    required: "Class name is required",
                  })}
                />
                {errors.class_name && <p>{errors.class_name.message}</p>}
              </div>
            )}
            {author && (
              <div className="w-full flex flex-col">
                <label>
                  <span className="font-semibold">Author Name</span>
                </label>
                <input
                  name="author"
                  type="text"
                  placeholder="Author Name"
                  defaultValue={author}
                  className="border border-black mt-2 p-3 rounded-full"
                  {...register("author", { required: "Author is required" })}
                />
                {errors.author && <p>{errors.author.message}</p>}
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-5">
            <div className="w-full flex flex-col">
              <label>
                <span className="font-semibold">Image</span>
              </label>
              <input
                name="image"
                type="url"
                placeholder="Image"
                defaultValue={image}
                className="border border-black mt-2 p-3 rounded-full"
                {...register("image", { required: "Image URL is required" })}
              />
              {errors.image && <p>{errors.image.message}</p>}
            </div>
            {book.year && (
              <div className="w-full flex flex-col">
                <label>
                  <span className="font-semibold">Year</span>
                </label>
                <input
                  name="year"
                  type="number"
                  placeholder="Year"
                  defaultValue={book?.year}
                  className="border border-black mt-2 p-3 rounded-full"
                  {...register("year", {
                    required: "Year is required",
                  })}
                />
                {errors.year && <p>{errors.year.message}</p>}
              </div>
            )}
            {rating && (
              <div className="w-full flex flex-col">
                <label>
                  <span className="font-semibold">Rating</span>
                </label>
                <input
                  name="rating"
                  type="number"
                  placeholder="Rating"
                  defaultValue={rating}
                  className="border border-black mt-2 p-3 rounded-full"
                  {...register("rating", {
                    required: "Rating is required",
                    min: {
                      value: 1,
                      message: "Rating must be at least 1",
                    },
                    max: {
                      value: 5,
                      message: "Rating cannot be more than 5",
                    },
                  })}
                />
                {errors.rating && <p>{errors.rating.message}</p>}
              </div>
            )}
          </div>
          {book.source && (
            <div className="w-full flex flex-col">
              <label>
                <span className="font-semibold">Source URL</span>
              </label>
              <input
                name="source"
                type="url"
                placeholder="Source URL"
                defaultValue={book?.source}
                className="border border-black mt-2 p-3 rounded-full"
                {...register("source", {
                  required: "Source URL is required",
                })}
              />
              {errors.source && <p>{errors.source.message}</p>}
            </div>
          )}
          {category && (
            <div className="flex flex-col">
              <label>
                <span className="font-semibold">Category</span>
              </label>
              <select
                name="category"
                defaultValue={category}
                className="border border-black mt-2 p-3 rounded-full"
                {...register("category", { required: "Category is required" })}
              >
                <option disabled value="Select Category">
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
          )}
          <div className="flex justify-center mt-5">
            <button className="bg-primary py-2 px-6 font-bold">
              Update Book
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateBook;
