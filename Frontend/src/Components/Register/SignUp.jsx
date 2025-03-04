import React, { useState } from "react";
import styles from "../Styles/SignUp.module.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [checkbox, setcheckbox] = useState("");
  const [Compassword, setCompassword] = useState("");
  const [FnameErr, setFnameErr] = useState("");
  const [checkboxErr, setcheckboxErr] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [passwordErr, setpasswordErr] = useState("");
  const [CompasswordErr, setCompasswordErr] = useState("");
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  async function handleSubmit(e) {
    e.preventDefault();
    Fname.length === 0
      ? setFnameErr("*Please Enter First Name")
      : setFnameErr("");
    checkbox ? setcheckboxErr("") : setcheckboxErr("*Please check this box");

    password.length === 0
      ? setpasswordErr("*Please Enter Password")
      : setpasswordErr("");

    if (email.length === 0) {
      setemailErr("*Please Enter Email");
    } else if (!email.includes("@")) {
      setemailErr("*Enter Valid Email");
    } else {
      setemailErr("");
    }

    if (password != Compassword) {
      setCompasswordErr("Password Did Not Match");
    } else {
      setCompasswordErr("");
    }

    if (
      Fname.length >= 1 &&
      email.length >= 3 &&
      email.includes("@") &&
      checkbox &&
      password.length >= 1 &&
      password === Compassword
    ) {
      try {
        const responce = await fetch(`${BASE_URL}auth/signup`, {
          method: "POST",
          headers: { "Content-type": "application/JSON" },
          body: JSON.stringify({ Fname, Lname, email, password }),
        });
        const data = await responce.json();
        if (data?.code === "1") {
          toast?.success(data?.message);
          setTimeout(() => {
            navigate("/about", { state: { id: data.id } });
          }, 2000);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        toast.error("Sign Up failed. Please try again.");
      }
    }
  }

  function Login() {
    navigate("/Login");
  }

  return (
    <>
      <main className={styles.main}>
        <section className={styles.Leftsection}>
          <img className={styles.logo} src="./Images/SignIn Logo.png" alt="" />
          <h1 className={styles.mainheading}>Sign up to your Spark</h1>
          <div className={styles.Leftmain}>
            <div className={styles.Leftheading}>
              <p className={styles.L1}>Create an account</p>
              <a href="/Login">Sign In instead</a>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.InputFields}>
                <label>First name</label>
                <input
                  className={styles.Nameinput}
                  type="text"
                  name="name"
                  value={Fname}
                  onChange={(e) => setFname(e.target.value)}
                />
                <span className={styles.errMsg}>{FnameErr}</span>
              </div>
              <div className={styles.InputFields}>
                <label>Last name</label>
                <input
                  className={styles.Nameinput}
                  type="text"
                  name="email"
                  value={Lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <div className={styles.InputFields}>
                <label>Email</label>
                <input
                  className={styles.Emailinput}
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <span className={styles.errMsg}>{emailErr}</span>
              </div>
              <div className={styles.InputFields}>
                <label>Password</label>
                <input
                  className={styles.Passwordinput}
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <span className={styles.errMsg}>{passwordErr}</span>
              </div>
              <div className={styles.InputFields}>
                <label>Confirm Password</label>
                <input
                  className={styles.Passwordinput}
                  type="password"
                  value={Compassword}
                  onChange={(e) => setCompassword(e.target.value)}
                />
                <span className={styles.errMsg}>{CompasswordErr}</span>
              </div>

              <div className={styles.checkboxContainer}>
                <div>
                  <input
                    type="checkbox"
                    id="terms"
                    onChange={(e) => setcheckbox(e.target.checked)}
                    className={styles.checkbox}
                  />
                </div>
                <label htmlFor="terms" className={styles.checkboxLabel}>
                  By creating an account, I agree to our{" "}
                  <a href="#" className={styles.link}>
                    Terms of use
                  </a>{" "}
                  and{" "}
                  <a href="#" className={styles.link}>
                    Privacy Policy
                  </a>
                </label>
                <span className={styles.errMsg}>{checkboxErr}</span>
              </div>
              <button className={styles.SigninBtn}>Create an account</button>
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
