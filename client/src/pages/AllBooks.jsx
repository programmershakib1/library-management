import BookCard from "../components/BookCard";
import { useEffect, useState } from "react";
import BookTable from "../components/BookTable";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("card");

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/all-books?showAvailable=${showAvailable}`
      )
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      });
  }, [showAvailable]);

  const handleFilter = () => {
    setLoading(true);
    setShowAvailable(!showAvailable);
  };

  const handleViewToggle = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="mx-5 md:mx-0 min-h-96">
      <Helmet>
        <title>LMS - All Books</title>
      </Helmet>
      {loading ? (
        <div className="text-center mt-10 dark:mt-20">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="dark:mt-10 md:dark:mt-24">
          <div className="flex justify-center items-center gap-5 mt-5">
            <button
              onClick={() => handleViewToggle("card")}
              className={`text-3xl ${
                viewMode === "card"
                  ? "text-black dark:text-white"
                  : "text-gray-500"
              }`}
            >
              <i className="fa-solid fa-table-cells"></i>
            </button>
            <button
              onClick={() => handleViewToggle("table")}
              className={`text-3xl ${
                viewMode === "table"
                  ? "text-black dark:text-white"
                  : "text-gray-500"
              }`}
            >
              <i className="fa-solid fa-table-list"></i>
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-5 items-center justify-center m-5">
            <div className="w-full lg:w-1/5 dark:bg-c border border-black rounded-md font-bold py-2 px-2">
              <select
                className="w-full dark:bg-c"
                value={viewMode}
                onChange={(e) => handleViewToggle(e.target.value)}
              >
                <option value="card">View Mode: Card</option>
                <option value="table">View Mode: Table</option>
              </select>
            </div>
            <button
              onClick={handleFilter}
              className="w-full lg:w-1/5 text-left dark:bg-c border border-black rounded-md py-2 px-4 font-bold"
            >
              {showAvailable ? "Show All Books" : "Show Available Books"}
            </button>
          </div>
          {viewMode === "card" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
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
