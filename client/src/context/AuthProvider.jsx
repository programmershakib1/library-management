import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [locations, setLocations] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleSignUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const handleGithubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const handleSingOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const animationValue = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 1 },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post(`${import.meta.env.VITE_SERVER_URL}/jwt`, user, {
            withCredentials: true,
          })
          .then(() => {
            setUser(currentUser);
            setLoading(false);
          });
      } else {
        setUser(currentUser);
        axios
          .post(
            `${import.meta.env.VITE_SERVER_URL}/signOut`,
            {},
            { withCredentials: true }
          )
          .then(() => {
            setLoading(false);
          });
      }
    });
    return () => {
      unsubscribe;
    };
  }, []);

  const authInfo = {
    handleSignUp,
    handleSignIn,
    handleGoogleLogin,
    handleGithubLogin,
    handleSingOut,
    animationValue,
    user,
    setUser,
    loading,
    emailValue,
    setEmailValue,
    locations,
    setLocations,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthProvider;
