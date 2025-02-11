import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const AcademicBookPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, animationValue } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user) return;
    axiosSecure.get("/all-academic-books").then((res) => {
      setBooks(res.data);
      setLoading(false);
    });
  }, [axiosSecure, user]);

  return (
    <div className="mx-5 md:mx-5 min-h-96">
      <Helmet>
        <title>LMS - Academic Books</title>
      </Helmet>
      {loading ? (
        <div className="text-center mt-10 dark:mt-20">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="md:mt-9 dark:mt-10 md:dark:mt-24">
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
            {books?.map((book, idx) => (
              <motion.div
                {...animationValue}
                key={idx}
                className="dark:bg-c rounded-xl p-5 hover:shadow-2xl shadow-md"
              >
                <img
                  className="w-full h-40 rounded-xl"
                  src={book?.image}
                  alt=""
                />
                <h2 className="font-bold text-xl mt-5">{book?.name}</h2>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-semibold">
                    <i className="fa-solid fa-school"></i> {book?.class_name}
                  </p>
                  <p className="font-semibold">
                    <i className="fa-solid fa-calendar-days"></i> {book?.year}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <Link
                    to={`/bookDetails/${book?._id}`}
                    state={{ academicBook: true }}
                  >
                    <button className="font-bold border border-black px-2 py-.5 rounded-md">
                      Details
                    </button>
                  </Link>
                  <a href={book.source} target="_blank">
                    <button className="font-bold border border-black px-2 py-.5 rounded-md">
                      Read
                    </button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicBookPage;
