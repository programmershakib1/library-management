import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../../firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const {
    handleSignUp,
    handleGoogleLogin,
    handleGithubLogin,
    setUser,
    locations,
    setLocations,
  } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    )
      return toast.error(
        password.length < 6
          ? "Password must be 6 characters long"
          : !/[A-Z]/.test(password)
          ? "Password at least one uppercase letter"
          : "Password at least one lowercase letter"
      );

    handleSignUp(email, password)
      .then((result) => {
        setUser(result?.user);
        e.target.reset();

        const createdAt = result?.user?.metadata?.creationTime;
        const newUser = { name, email, photo, createdAt };

        updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
        setUser({ displayName: name, photoURL: photo });
        toast.success("User sign Up successful");

        axiosSecure.post("/user", newUser).then(() => {});
        navigate(locations ? locations : "/");
      })
      .catch((error) => {
        toast.error(error?.code);
      });
  };

  const handleLocations = () => {
    setLocations(locations);
  };

  return (
    <div className="md:mt-10 mx-5 md:mx-0">
      <Helmet>
        <title>LMS - Sign Up</title>
      </Helmet>
      <div className="md:w-2/4 lg:w-1/4 mx-auto">
        <h2 className="text-center mb-5 font-black text-2xl font-row">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="mt-1 p-3 rounded-full border border-black"
              required
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <label>
              <span className="font-semibold">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Photo url"
              className="mt-1 p-3 rounded-full border border-black"
              required
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <label>
              <span className="font-semibold">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="mt-1 p-3 rounded-full border border-black"
              required
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <label>
              <span className="font-semibold">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="mt-1 p-3 rounded-full border border-black"
              required
            />
          </div>
          <button className="w-full bg-primary mt-5 py-2 rounded-full font-bold">
            Sign Up
          </button>
        </form>
        <p className="pt-2 text-center text-sm font-semibold">
          Already have an Account?<span> </span>
          <Link to="/signIn" onClick={handleLocations} className="underline">
            Sign In
          </Link>
        </p>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <button
            onClick={() => {
              handleGoogleLogin()
                .then((result) => {
                  setUser(result?.user);

                  const name = result?.user?.displayName;
                  const email = result?.user?.email;
                  const photo = result?.user?.photoURL;
                  const createdAt = result?.user?.metadata?.creationTime;
                  const userInfo = { name, email, photo, createdAt };

                  axiosSecure.post("/user", userInfo).then((res) => {
                    if (res.data.insertedId) {
                      toast.success("User sign Up successful");
                    }
                  });
                  navigate(locations ? locations : "/");
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="w-full bg-primary py-2 rounded-full font-bold"
          >
            <i className="fa-brands fa-google pr-2"></i>Google
          </button>
          <button
            onClick={() => {
              handleGithubLogin()
                .then((result) => {
                  setUser(result?.user);

                  const name = result?.user?.displayName;
                  const email = result?.user?.email;
                  const photo = result?.user?.photoURL;
                  const createdAt = result?.user?.metadata?.creationTime;
                  const userInfo = { name, email, photo, createdAt };

                  axiosSecure.post("/user", userInfo).then((res) => {
                    if (res.data.insertedId) {
                      toast.success("User sign Up successful");
                    }
                  });
                  navigate(locations ? locations : "/");
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="w-full bg-primary py-2 rounded-full font-bold"
          >
            <i className="fa-brands fa-github pr-2"></i>Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
