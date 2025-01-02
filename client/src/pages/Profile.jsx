import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { deleteUser } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookData, setBookData] = useState([]);
  const [borrowedData, setBorrowedData] = useState([]);
  const [giftedData, setGiftedData] = useState([]);

  useEffect(() => {
    axiosSecure.get("/all-books").then((res) => {
      const myAddedBook = res.data.filter((d) => d.email === user.email);
      setBookData(myAddedBook);
    });
    axiosSecure.get(`/borrow/${user.email}`).then((res) => {
      setBorrowedData(res.data);
    });

    axiosSecure.get(`/gifted-book/${user.email}`).then((res) => {
      setGiftedData(res.data);
    });
  }, [axiosSecure, user.email]);

  const handleUserDelete = () => {
    const user = auth.currentUser;
    const email = user?.email;
    axiosSecure.delete(`/user/${email}`, deleteUser).then((res) => {
      if (res.data.deletedCount > 0) {
        toast.success("User delete successful in Database");
      }
    });
    if (user) {
      deleteUser(user)
        .then(() => {
          toast.success("User delete successful");
        })
        .catch((error) => {
          toast.error(error?.code);
        });
    }
  };

  return (
    <div className="mx-5 md:mx-0 mt-10">
      <Helmet>
        <title>LMS - Profile</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-bold font-row">
          Welcome {user?.displayName}
        </h2>
        <img
          className="w-40 h-40 rounded-full animate__animated animate__zoomIn mt-5"
          src={user.photoURL}
          alt=""
        />
        <h2 className="font-bold mt-3">{user?.displayName}</h2>
        <p className="text-p font-semibold">{user?.email}</p>
        <div className="flex flex-col gap-3 mt-2">
          <Link to="/updateProfile">
            <button className="w-full border rounded-full border-black py-1 px-10 font-semibold">
              Update Profile
            </button>
          </Link>
          <Link to="/SignIn">
            <button className="w-full border rounded-full border-black py-1 px-10 font-semibold">
              Change Account
            </button>
          </Link>
          <button
            onClick={() => document.getElementById("my_modal_5").showModal()}
            className="w-full rounded-full py-1 px-10 font-semibold bg-error text-white"
          >
            Delete Account
          </button>
        </div>
      </div>

      <h2 className="text-2xl text-center my-10 font-bold font-row">
        Your Account Info
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div>
          <h4 className="mt-5 text-xl font-bold mb-3">
            Your Added Book : {bookData ? bookData.length : "not found"}
          </h4>
          {bookData.map((book, idx) => (
            <div key={idx} className="mb-1">
              <span className="font-row">{idx + 1}.</span>
              <div>
                <span className="font-bold">Book</span> : {book.name}
              </div>
              <div>
                <span className="font-bold">Rating</span> : {book.rating}
              </div>
              <div>
                <span className="font-bold">Current quantity</span> :{" "}
                {book.quantity}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h4 className="mt-5 text-xl font-bold mb-3">
            Your borrowed book :{" "}
            {borrowedData ? borrowedData.length : "not found"}
          </h4>
          {borrowedData.map((book, idx) => (
            <div key={idx} className="mb-1">
              <span className="font-row">{idx + 1}.</span>
              <div>
                <span className="font-bold">Book</span> : {book.title}
              </div>
              <div>
                <span className="font-bold">Return Date</span> :{" "}
                {formatDate(new Date(book?.return_date), "P")}
              </div>
              <div>
                <span className="font-bold">Borrowed Date</span> :{" "}
                {formatDate(new Date(book?.borrowed_date), "P")}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h4 className="mt-5 text-xl font-bold mb-3">
            Your gifted book : {giftedData ? giftedData.length : "not found"}
          </h4>
          {giftedData.map((book, idx) => (
            <div key={idx} className="mb-1">
              <span className="font-row">{idx + 1}.</span>
              <div>
                <span className="font-bold">Book</span> : {book.title}
              </div>
              <div>
                <span className="font-bold">Recipient</span> : {book.name}
              </div>
              <div>
                <span className="font-bold">Return Date</span> :{" "}
                {formatDate(new Date(book?.return_date), "P")}
              </div>
              <div>
                <span className="font-bold">Borrowed Date</span> :{" "}
                {formatDate(new Date(book?.borrowed_date), "P")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* modal */}
      <dialog
        id="my_modal_5"
        className="modal sm:modal-middle text-center dark:text-black"
      >
        <div className="modal-box">
          <h3 className="font-bold text-3xl">{user.displayName}</h3>
          <h4 className="py-4 text-error text-lg font-bold">
            You are in danger zone now
          </h4>
          <p className="font-medium">
            If you really want to delete your account, click Delete Account
          </p>
          <div className="modal-action">
            <form className="mx-auto" method="dialog">
              <button
                onClick={handleUserDelete}
                className="py-2 px-6 bg-error text-white font-semibold"
              >
                Delete Account
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form className="mx-auto" method="dialog">
              <button className="underline font-semibold">Back</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
