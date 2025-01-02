import { Link, useLocation, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import border from "../assets/border.png";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const BookDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [returnDate, setReturnDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const {
    name,
    author,
    image,
    quantity,
    rating,
    category,
    description,
    book_content,
  } = book;

  const onSubmit = (data) => {
    const { name, email } = data;

    if (email !== user.email) {
      return toast.error("You cannot use someone else's email.");
    }

    const bookId = book._id;
    const return_date = returnDate;
    const borrowed_date = new Date();

    const borrowInfo = {
      bookId,
      title: book.name,
      author: book.author,
      image: book.image,
      quantity: book.quantity,
      rating: book.rating,
      category: book.category,
      description: book.description,
      book_content: book.book_content,
      name,
      email,
      return_date,
      borrowed_date,
    };

    axiosSecure.post("/add-borrow", borrowInfo).then((res) => {
      if (res.data.status === false) {
        toast.error(res.data.message);
        return;
      }
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Borrowing is successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setBook((prevBook) => ({
          ...prevBook,
          quantity: prevBook.quantity - 1,
        }));
      }
    });
  };

  return (
    <div className="md:mt-10 mx-5 md:mx-0">
      <Helmet>
        <title>LMS - Book Details</title>
      </Helmet>
      {loading ? (
        <div className="text-center mt-10">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div>
          <div className="grid md:grid-cols-2 gap-10 lg:w-9/12 mx-auto">
            <div className="h-60 md:h-80 lg:h-[400px]">
              <img className="w-full h-full rounded-xl" src={image} alt="" />
            </div>
            <div>
              <div className="flex items-center gap-5 mt-5">
                <h2 className="text-xl font-bold">{name}</h2>
                <p
                  className={`font-semibold badge ${
                    category === "Novel" ? "text-primary" : ""
                  } ${category === "Thriller" ? "text-warning" : ""} ${
                    category === "History" ? "text-success" : ""
                  } ${category === "Drama" ? "text-secondary" : ""} ${
                    category === "Sci-Fi" ? "text-error" : ""
                  }`}
                >
                  {category}
                </p>
              </div>
              <div className="mt-5">
                <img src={border} alt="" />
              </div>
              {author && (
                <h4 className="text-xl font-semibold mt-10 mb-5">
                  Author Name : {author}
                </h4>
              )}
              {academicBook ? (
                ""
              ) : (
                <p className="font-semibold">Quantity : {quantity}</p>
              )}
              {rating && (
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Rating : </p>
                  <ReactStars
                    count={5}
                    value={parseInt(rating)}
                    size={30}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                  ></ReactStars>
                </div>
              )}
              {book?.class_name && (
                <h4 className="mt-5 font-semibold">
                  Class : {book?.class_name}
                </h4>
              )}
              {book?.year && (
                <h4 className="mt-5 font-semibold">Year : {book?.year}</h4>
              )}
              {academicBook ? (
                <div className="lg:w-1/2 mt-6 lg:mt-20 flex flex-col gap-5">
                  <a href={book?.source} target="_blank">
                    <button className="w-full bg-primary py-2 px-6 font-bold">
                      Reade
                    </button>
                  </a>
                  <Link
                    to={`/updateBook/${book?._id}`}
                    state={{ academicBook: true }}
                  >
                    <button className="w-full bg-primary py-2 px-6 font-bold">
                      Update
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                  className="bg-primary py-2 px-6 font-bold mt-5"
                >
                  Borrow
                </button>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-10 lg:w-9/12 mx-auto mt-10">
            <div>
              <p className="font-semibold">Description : </p>
              <span className="ml-10">{description}</span>
            </div>
            <div>
              <p className="font-semibold">Book Content : </p>
              <span className="ml-10">{book_content}</span>
            </div>
          </div>
        </div>
      )}
      {/* modal */}
      <dialog id="my_modal_5" className="modal sm:modal-middle">
        <div className="modal-box">
          <form id="applyForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mt-14">
              <label>
                <span className="font-semibold">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                defaultValue={user.displayName}
                className="mt-1 border border-black p-2 rounded-full"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="flex flex-col mt-2">
              <label>
                <span className="font-semibold">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                defaultValue={user.email}
                className="mt-1 mb-2 border border-black p-2 rounded-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="flex flex-col">
              <label>
                <span className="font-semibold">Return Date</span>
              </label>
              <DatePicker
                className="w-full mt-1 mb-2 border border-black p-2 rounded-full"
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
              />
            </div>
            <div className="flex justify-center mt-3">
              <button
                type="submit"
                disabled={quantity === 0}
                className={`btn btn-md px-4 font-bold ${
                  quantity === 0 ? "text-gray-400" : "text-black"
                }`}
                onClick={() => {
                  const form = document.getElementById("applyForm");
                  if (form.checkValidity()) {
                    document.getElementById("my_modal_5").close();
                  }
                }}
              >
                Borrow
              </button>
            </div>
          </form>
          <div className="flex justify-end mt-2">
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookDetails;
