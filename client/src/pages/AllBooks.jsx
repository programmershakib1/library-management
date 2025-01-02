import BookCard from "../components/BookCard";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import BookTable from "../components/BookTable";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("card");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    axiosSecure.get(`/all-books?showAvailable=${showAvailable}`).then((res) => {
      setBooks(res.data);
      setLoading(false);
    });
  }, [axiosSecure, showAvailable, user]);

  const handleFilter = () => {
    setLoading(true);
    setShowAvailable(!showAvailable);
  };

  const handleViewToggle = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="mx-5 md:mx-0">
      <Helmet>
        <title>LMS - All Books</title>
      </Helmet>
      {loading ? (
        <div className="text-center mt-10">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="md:mt-10">
          <div className="flex justify-center items-center gap-5 mt-5">
            <button
              onClick={() => handleViewToggle("card")}
              className={`text-3xl ${
                viewMode === "card" ? "text-black" : "text-gray-500"
              }`}
            >
              <i className="fa-solid fa-table-cells"></i>
            </button>
            <button
              onClick={() => handleViewToggle("table")}
              className={`text-3xl ${
                viewMode === "table" ? "text-black" : "text-gray-500"
              }`}
            >
              <i className="fa-solid fa-table-list"></i>
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-5 items-center justify-center m-5">
            <div className="w-full lg:w-1/5 border border-black rounded-md font-bold py-2 px-2">
              <select
                className="w-full"
                value={viewMode}
                onChange={(e) => handleViewToggle(e.target.value)}
              >
                <option value="card">View Mode: Card</option>
                <option value="table">View Mode: Table</option>
              </select>
            </div>
            <button
              onClick={handleFilter}
              className="w-full lg:w-1/5 text-left border border-black rounded-md py-2 px-4 font-bold"
            >
              {showAvailable ? "Show All Books" : "Show Available Books"}
            </button>
          </div>
          {viewMode === "card" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {books.map((book, idx) => (
                <BookCard key={idx} book={book}></BookCard>
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <BookTable books={books}></BookTable>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
