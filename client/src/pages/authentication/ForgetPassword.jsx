import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const ForgetPassword = () => {
  const { emailValue } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    e.target.reset();

    if (!email) {
      toast.error("Please provide a valid mail");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        toast.success("Reset email sent, please check");
        window.location.href = "https://mail.google.com";
      });
    }
  };

  return (
    <div className="md:mt-10 mx-5 md:mx-0">
      <Helmet>
        <title>LMS - Forget Password</title>
      </Helmet>
      <div className="md:w-2/4 lg:w-1/4 mx-auto">
        <h2 className="text-center mb-5 font-black text-2xl font-row">
          Forget Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={`${emailValue ? emailValue : ""}`}
              className="mt-1 p-3 rounded-full border border-black"
              required
            />
          </div>
          <button className="w-full bg-primary mt-3 py-2 rounded-full font-bold">
            Reset Password
          </button>
        </form>
        <p className="mt-2 text-sm font-semibold text-center">
          Back to
          <Link to="/SignIn" className="pl-1 underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
