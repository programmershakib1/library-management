import BookCard from "../components/BookCard";
import { useEffect, useState } from "react";
import BookTable from "../components/BookTable";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const categories = ["All", "Novel", "Thriller", "History", "Drama", "Sci-Fi"];
const sortOptions = [
  { value: "default", label: "Default Order" },
  { value: "highest", label: "Highest Quantity First" },
  { value: "lowest", label: "Lowest Quantity First" },
];

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [originalBooks, setOriginalBooks] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("card");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/all-books?showAvailable=${showAvailable}`
      )
      .then((res) => {
        setBooks(res.data);
        setOriginalBooks(res.data);
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  let filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  if (sortOrder === "highest") {
    filteredBooks = [...filteredBooks].sort((a, b) => b.quantity - a.quantity);
  } else if (sortOrder === "lowest") {
    filteredBooks = [...filteredBooks].sort((a, b) => a.quantity - b.quantity);
  } else {
    filteredBooks = [...originalBooks].filter((book) =>
      selectedCategory === "All" ? true : book.category === selectedCategory
    );
  }

  return (
    <div className="mx-5 md:mx-0 min-h-96">
      <Helmet>
        <title>All Books - LMS</title>
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
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full lg:w-1/5 dark:bg-c border border-black rounded-md font-bold py-2 px-2">
              <select
                className="w-full dark:bg-c"
                value={sortOrder}
                onChange={handleSortChange}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
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
              {showAvailable ? "Show All" : "Show Available"}
            </button>
          </div>
          {viewMode === "card" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
              {filteredBooks.map((book, idx) => (
                <BookCard key={idx} book={book}></BookCard>
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <BookTable books={filteredBooks}></BookTable>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
