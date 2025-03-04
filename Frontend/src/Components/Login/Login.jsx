import React, { useState } from "react";
import styles from "../Styles/Login.module.css";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [UsernameErr, setUsernameErr] = useState("");
  const [passwordErr, setpasswordErr] = useState("");
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  async function handleSubmit(e) {
    e.preventDefault();
    username.length === 0
      ? setUsernameErr("*Please Enter UserName")
      : setUsernameErr("");
    password.length === 0
      ? setpasswordErr("*Please Enter Password")
      : setpasswordErr("");

    if (username.length >= 3 && password.length >= 1) {
      try {
        const response = await fetch(`${BASE_URL}auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data?.code === "1") {
          localStorage.setItem("token", data.token);
          toast.success(data?.message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Login failed. Please try again.");
      }
    }
  }

  function Login() {
    navigate("/signup");
  }

  return (
    <>
      <main className={styles.main}>
        <section className={styles.Leftsection}>
          <img className={styles.logo} src="./Images/SignIn Logo.png" alt="" />
          <h1 className={styles.mainheading}>Sign in to your Spark</h1>
          <div className={styles.Leftmain}>
            <form onSubmit={handleSubmit}>
              <div className={styles.InputFields}>
                <input
                  className={styles.Nameinput}
                  type="text"
                  name="name"
                  value={username}
                  placeholder="Spark/Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span className={styles.errMsg}>{UsernameErr}</span>
              </div>
              <div className={styles.InputFields}>
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Password"
                  className={styles.Passwordinput}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </button>
                <span className={styles.errMsg}>{passwordErr}</span>
              </div>
              <div className={styles.checkboxContainer}></div>
              <button className={styles.SigninBtn}>Log in</button>
              <p className={styles.Forgot}>Forgot Password</p>
              <p className={styles.SiguupLink}>
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </form>
          </div>
          <p className={styles.belowLine}>
            This site is protected by reCAPTCHA and the{" "}
            <span>Google Privacy Policy</span> and <span>Terms of Service</span>
            apply.
          </p>
        </section>
        <section className={styles.Rightsection}>
          <img className={styles.Img1} src="./Images/SignupImg.png" alt="" />
        </section>
        <Toaster
          toastOptions={{
            style: {
              color: "white",
              backgroundColor: "#05A763",
              fontFamily: "Manrope",
              fontSize: "0.85em",
              fontWeight: "400",
              marginLeft: "3.5em",
            },
          }}
        />
      </main>
    </>
  );
}

export default SignUp;
