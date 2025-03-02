import React, { useEffect, useState } from "react";
import styles from "../Styles/About.module.css";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [UsernameErr, setUsernameErr] = useState("");
  const [Category, setCategory] = useState("");
  const [CatErr, setCatErr] = useState("");
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    console.log(Category);
  }, [Category]);

  async function handleSubmit(e) {
    e.preventDefault();
    Username.length === 0
      ? setUsernameErr("*Please add username")
      : setUsernameErr("");
    Category.length === 0
      ? setCatErr("*Please select Category")
      : setCatErr("");

    if (About.length >= 0) {
      try {
        const responce = await fetch(`${BASE_URL}auth/signup`, {
          method: "POST",
          headers: { "Content-type": "application/JSON" },
          body: JSON.stringify({ Username, email, mobile, password }),
        });
        const data = await responce.json();
        if (data?.code === "1") {
          toast?.success(data?.message);
          setTimeout(() => {
            Login();
          }, 2000);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        toast.error("Sign Up failed. Please try again.");
      }
    }
  }

  return (
    <>
      <main className={styles.main}>
        <section className={styles.Leftsection}>
          <img className={styles.logo} src="./Images/SignIn Logo.png" alt="" />
          <h1 className={styles.mainheading}>Tell us about youself</h1>
          <p className={styles.subheading}>
            For a personalized Spark experience
          </p>
          <div className={styles.Leftmain}>
            <form onSubmit={handleSubmit}>
              <div className={styles.InputFields}>
                <input
                  className={styles.Nameinput}
                  type="text"
                  name="name"
                  value={Username}
                  placeholder="Tell us your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span className={styles.errMsg}>{UsernameErr}</span>
              </div>

              <div className={styles.categoryContainer}>
                <h3 className={styles.categoryTitle}>
                  Select one category that best describes your Linktree:
                </h3>
                <div className={styles.categoryGrid}>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Business" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Business")}
                  >
                    🏢 Business
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Creative" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Creative")}
                  >
                    🎨 Creative
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Education" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Education")}
                  >
                    📚 Education
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Entertainment" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Entertainment")}
                  >
                    🎵 Entertainment
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Fashion & Beauty" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Fashion & Beauty")}
                  >
                    💄 Fashion & Beauty
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Food & Beverage" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Food & Beverage")}
                  >
                    🍔 Food & Beverage
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Government & Politics"
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => setCategory("Government & Politics")}
                  >
                    ⚖️ Government & Politics
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Health & Wellness" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Health & Wellness")}
                  >
                    🍎 Health & Wellness
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Non-Profit" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Non-Profit")}
                  >
                    💝 Non-Profit
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Other" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Other")}
                  >
                    💝 Other
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Tech" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Tech")}
                  >
                    💻 Tech
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      Category === "Travel & Tourism" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Travel & Tourism")}
                  >
                    ✈️ Travel & Tourism
                  </button>
                </div>
                <span className={styles.CatMsg}>{CatErr}</span>
                <button className={styles.SigninBtn}>Log in</button>
              </div>
            </form>
          </div>
        </section>
        <section className={styles.Rightsection}>
          <img className={styles.Img1} src="./Images/SignupImg.png" alt="" />
        </section>
        <Toaster
          toastOptions={{
            style: {
              color: "white",
              backgroundColor: "rgb(172, 167, 167)",
              fontFamily: "Manrope",
              fontSize: "0.95em",
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
