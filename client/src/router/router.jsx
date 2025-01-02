import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import ForgetPassword from "../pages/authentication/ForgetPassword";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../pages/authentication/UpdateProfile";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import BorrowedBooks from "../pages/BorrowedBooks";
import UpdateBook from "../pages/UpdateBook";
import BookDetails from "../pages/BookDetails";
import BookCategoryPage from "../pages/BookCategoryPage";
import PopularBooks from "../components/PopularBooks";
import GiftBookPage from "../pages/GiftBookPage";
import AddAcademicBook from "../pages/AddAcademicBook";
import AcademicBookPage from "../pages/AcademicBookPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allBooks",
        element: (
          <PrivateRoute>
            <AllBooks></AllBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/addBook",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/addAcademicBook",
        element: (
          <PrivateRoute>
            <AddAcademicBook></AddAcademicBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/academicBookPage",
        element: (
          <PrivateRoute>
            <AcademicBookPage></AcademicBookPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/category/:category",
        element: (
          <PrivateRoute>
            <BookCategoryPage></BookCategoryPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/borrowedBooks",
        element: (
          <PrivateRoute>
            <BorrowedBooks></BorrowedBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/bookDetails/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateBook/:id",
        element: (
          <PrivateRoute>
            <UpdateBook></UpdateBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/giftBook",
        element: (
          <PrivateRoute>
            <GiftBookPage></GiftBookPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/popularBooks",
        element: <PopularBooks></PopularBooks>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/forgetPassword",
        element: <ForgetPassword></ForgetPassword>,
      },
    ],
  },
]);

export default router;
