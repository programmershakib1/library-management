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
    <div className="mx-5 md:mx-5">
      <Helmet>
        <title>LMS - Academic Books</title>
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
                <div className="flex items-center justify-between mt-5">
                  <h2 className="font-bold text-xl">{book?.name}</h2>
                  <a href={book.source} target="_blank">
                    <button className="font-bold underline">Read</button>
                  </a>
                </div>
                <p className="font-semibold">Class : {book?.class_name}</p>
                <p className="font-semibold">Year : {book?.year}</p>
                <Link
                  to={`/bookDetails/${book?._id}`}
                  state={{ academicBook: true }}
                >
                  <button className="w-full btn btn-sm px-6 font-bold rounded-sm mt-4">
                    Details
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicBookPage;
