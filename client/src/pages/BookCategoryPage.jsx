import { useLocation, useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const BookCategoryPage = () => {
  const { category } = useParams();
  const { pathname, state } = useLocation();
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const filterAvailable = state?.filterAvailable || false;
    axiosSecure
      .get(`/category/${category}`, {
        params: { source: filterAvailable ? "available" : "all" },
      })
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      });
  }, [axiosSecure, category, state, user]);

  return (
    <div>
      {loading ? (
        <div className="text-center mt-10 dark:mt-20">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:mt-9 dark:mt-10 md:dark:mt-24 mx-5 md:mx-0">
          <Helmet>
            <title>{`${pathname === "/category/Novel" ? "Novel" : ""} ${
              pathname === "/category/Thriller" ? "Thriller" : ""
            }  ${pathname === "/category/History" ? "History" : ""}  ${
              pathname === "/category/Drama" ? "Drama" : ""
            }  ${
              pathname === "/category/Sci-Fi" ? "Sci-Fi" : ""
            } Category - LMS`}</title>
          </Helmet>
          {books.map((book, idx) => (
            <BookCard key={idx} book={book}></BookCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookCategoryPage;
