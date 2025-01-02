import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const GiftBookPage = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [returnDate, setReturnDate] = useState(new Date());
  const { user, animationValue } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!user) return;
    axiosSecure.get("/all-books").then((res) => {
      setBooks(res.data);
      setLoading(false);
    });
  }, [axiosSecure, user]);

  const onSubmit = (data) => {
    const { name, email } = data;
    const bookId = book._id;

    if (email === user.email) {
      return toast.error("You cannot gift to your own account");
    }

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
      return_date: returnDate,
      borrowed_date: new Date(),
      sender_mail: user.email,
    };

    axiosSecure.post("/add-borrow", borrowInfo).then((res) => {
      reset();
      if (res.data.status === false) {
        if (res.data.message === "You can borrow up to 3 books only") {
          toast.error("User's gift list is full");
          return;
        }
        if (res.data.status === false) {
          toast.error("This book is already on the user's gift list");
        }
        return;
      }
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Gift is successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setBooks((prevBooks) =>
          prevBooks.map((b) =>
            b._id === bookId ? { ...b, quantity: b.quantity - 1 } : b
          )
        );
      }
    });
  };

  return (
    <div className="mx-5 md:mx-5">
      <Helmet>
        <title>LMS - Gift Book</title>
      </Helmet>
      {loading ? (
        <div className="text-center mt-10">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="md:mt-10">
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
            {books?.map((book, idx) => (
              <motion.div
                {...animationValue}
                key={idx}
                className="rounded-xl p-5 hover:shadow-2xl shadow-md"
              >
                <img
                  className="w-full h-40 rounded-xl"
                  src={book?.image}
                  alt=""
                />
                <h2 className="font-bold text-xl mt-3">{book?.name}</h2>
                <p className="font-semibold">Author : {book?.author}</p>
                <p className="font-semibold">Quantity : {book?.quantity}</p>
                <button
                  onClick={() => {
                    setBook(book);
                    document.getElementById("my_modal_5").showModal();
                  }}
                  className="w-full btn btn-sm px-6 font-bold rounded-sm mt-4"
                >
                  Gift
                </button>
              </motion.div>
            ))}
          </div>
          {/* modal */}
          <dialog id="my_modal_5" className="modal sm:modal-middle">
            <div className="modal-box">
              <form id="applyForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-10">
                  <label>
                    <span className="font-semibold">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="mt-1 mb-2 border border-black p-2 rounded-full"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="flex flex-col">
                  <label>
                    <span className="font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="mt-1 mb-2 border border-black p-2 rounded-full"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="flex flex-col">
                  <label>
                    <span className="font-semibold">Your email</span>
                  </label>
                  <input
                    name="your_email"
                    type="email"
                    placeholder="Email"
                    required
                    defaultValue={user?.email}
                    className="mt-1 mb-2 border border-black p-2 rounded-full"
                    {...register("your_email", {
                      required: "Your email is required",
                    })}
                  />
                  {errors.your_email && <p>{errors.your_email.message}</p>}
                </div>
                <div className="flex flex-col">
                  <label>
                    <span className="font-semibold">Return date</span>
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
                    disabled={book?.quantity === 0}
                    onClick={() => {
                      const form = document.getElementById("applyForm");
                      if (form.checkValidity()) {
                        document.getElementById("my_modal_5").close();
                      }
                    }}
                    className={`btn btn-md px-4 font-bold ${
                      book?.quantity === 0 ? "text-gray-400" : "text-black"
                    }`}
                  >
                    Gift
                  </button>
                </div>
              </form>
              <div className="flex justify-end mt-2">
                <button
                  className="btn"
                  onClick={() => {
                    setBook("");
                    document.getElementById("my_modal_5").close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default GiftBookPage;
