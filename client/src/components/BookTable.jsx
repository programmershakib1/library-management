import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { Zoom } from "react-awesome-reveal";

const BookTable = ({ books }) => {
  const { animationValue } = useAuth();

  return (
    <div className="w-full overflow-x-auto border border-gray-200 text-center">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <motion.tr {...animationValue}>
            <th className="py-5">Image</th>
            <th className="py-5">Title</th>
            <th className="py-5">Author</th>
            <th className="py-5">Category</th>
            <th className="py-5">Quantity</th>
            <th className="py-5 hidden lg:block">Rating</th>
            <th className="py-5">Action</th>
          </motion.tr>
        </thead>
        <tbody className="divide-y divide-gray-200 ">
          {books.map((book, idx) => (
            <motion.tr {...animationValue} key={idx}>
              <td className="whitespace-nowrap py-5 md:pl-5 lg:pl-10">
                <Zoom>
                  <img
                    className="w-14 h-14 rounded-full"
                    src={book.image}
                    alt=""
                  />
                </Zoom>
              </td>
              <td className="whitespace-nowrap py-5">
                <Zoom>
                  <p className="font-bold">{book.name}</p>
                </Zoom>
              </td>
              <td className="whitespace-nowrap py-5">
                <Zoom>
                  <p className="font-semibold">{book.author}</p>
                </Zoom>
              </td>
              <td className="whitespace-nowrap py-5">
                <Zoom>
                  <p
                    className={`font-semibold badge ${
                      book.category === "Novel" ? "text-primary" : ""
                    } ${book.category === "Thriller" ? "text-warning" : ""} ${
                      book.category === "History" ? "text-success" : ""
                    } ${book.category === "Drama" ? "text-secondary" : ""} ${
                      book.category === "Sci-Fi" ? "text-error" : ""
                    }`}
                  >
                    {book.category}
                  </p>
                </Zoom>
              </td>
              <td className="whitespace-nowrap py-5">
                <Zoom>
                  <p className="font-semibold">{book.quantity}</p>
                </Zoom>
              </td>
              <td className="whitespace-nowrap py-5 hidden lg:block">
                <div className="flex justify-center">
                  <Zoom>
                    <ReactStars
                      count={5}
                      value={parseInt(book.rating)}
                      size={30}
                      edit={false}
                      isHalf={true}
                      activeColor="#ffd700"
                    ></ReactStars>
                  </Zoom>
                </div>
              </td>
              <td className="whitespace-nowrap py-5">
                <Zoom>
                  <Link to={`/updateBook/${book._id}`}>
                    <button className="btn btn-xs font-bold">Update</button>
                  </Link>
                </Zoom>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

BookTable.propTypes = {
  books: PropTypes.object,
};

export default BookTable;
