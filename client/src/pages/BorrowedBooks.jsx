import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { formatDate } from "date-fns";
import border from "../assets/border.png";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";
import Swal from "sweetalert2";

const BorrowedBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    axiosSecure.get(`/borrow/${user.email}`).then((res) => {
      setBorrows(res.data);
      setLoading(false);
    });
  }, [axiosSecure, user.email, user]);

  const handleReturn = (id, bookId) => {
    Swal.fire({
      title: "Are you sure want to return it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, return it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/borrow/${id}?bookId=${bookId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Returned!",
              icon: "success",
            });
            const remainingBorrow = borrows.filter(
              (borrow) => borrow._id !== id
            );
            setBorrows(remainingBorrow);
          }
        });
      }
    });
  };

  return (
    <div className="mx-5 md:mx-0 min-h-screen">
      <Helmet>
        <title>Borrowed Books - LMS</title>
      </Helmet>
      {!borrows.length && !loading ? (
        <div className="text-center mt-9 dark:mt-10 md:dark:mt-24">
          <div>
            <h2 className="font-semibold mb-3">
              No books you borrowed were found. Explore the All Books page to
              borrow books.
            </h2>
            <Link to="/allBooks">
              <button className="bg-black text-white py-2 px-4 font-bold rounded-sm">
                All Books
              </button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
      {loading ? (
        <div className="text-center mt-10 dark:mt-20">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:mt-9 dark:mt-10 md:dark:mt-24">
          {borrows.map((borrow, idx) => (
            <Zoom key={idx}>
              <div className="dark:bg-c shadow-xl rounded-xl p-5 transition-transform hover:scale-105">
                <img
                  className="w-full h-52 lg:h-48 rounded-xl"
                  src={borrow?.image}
                  alt=""
                />
                <div className="my-2 flex justify-center">
                  <img src={border} alt="" />
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{borrow.title}</h2>
                  <p
                    className={`font-semibold badge ${
                      borrow.category === "Novel" ? "text-primary" : ""
                    } ${borrow.category === "Thriller" ? "text-warning" : ""} ${
                      borrow.category === "History" ? "text-success" : ""
                    } ${borrow.category === "Drama" ? "text-secondary" : ""} ${
                      borrow.category === "Sci-Fi" ? "text-error" : ""
                    }`}
                  >
                    {borrow.category}
                  </p>
                </div>
                <p className="font-semibold">
                  <i className="fa-solid fa-user"></i> {borrow?.author}
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold flex items-center gap-2">
                    <i className="fa-solid fa-clock"></i>{" "}
                    {formatDate(new Date(borrow?.return_date), "P")}
                  </p>
                  <button
                    onClick={() => handleReturn(borrow._id, borrow.bookId)}
                    className="border border-black rounded-md px-6 font-bold"
                  >
                    Return
                  </button>
                </div>
              </div>
            </Zoom>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
