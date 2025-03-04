import React, { useEffect, useState } from "react";
import styles from "../Styles/About.module.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [UsernameErr, setUsernameErr] = useState("");
  const [category, setCategory] = useState("");
  const [CatErr, setCatErr] = useState("");
  const userId = location.state?.id;
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    if (!userId) {
      toast.error("Please sign up first");
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
    }
  }, [userId, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    username.length === 0
      ? setUsernameErr("*Please add username")
      : setUsernameErr("");
    category.length === 0
      ? setCatErr("*Please select Category")
      : setCatErr("");

    if (username.length >= 1 && category.length >= 1) {
      try {
        const response = await fetch(
          `${BASE_URL}auth/update-profile/${userId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, category }),
          }
        );
        const data = await response.json();
        if (data?.code === "1") {
          toast.success(data?.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        toast.error("Failed to update profile. Please try again.");
      }
    }
  }

  console.log(userId);

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
                  value={username}
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
                      category === "Business" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Business")}
                  >
                    🏢 Business
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      category === "Creative" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Creative")}
                  >
                    🎨 Creative
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      category === "Education" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Education")}
                  >
                    📚 Education
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      category === "Entertainment" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Entertainment")}
                  >
                    🎵 Entertainment
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      category === "Fashion & Beauty" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Fashion & Beauty")}
                  >
                    💄 Fashion & Beauty
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      category === "Food & Beverage" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Food & Beverage")}
                  >
                    🍔 Food & Beverage
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      category === "Government & Politics"
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
                      category === "Health & Wellness" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Health & Wellness")}
                  >
                    🍎 Health & Wellness
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      category === "Non-Profit" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Non-Profit")}
                  >
                    💝 Non-Profit
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      category === "Other" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Other")}
                  >
                    💝 Other
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      category === "Tech" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Tech")}
                  >
                    💻 Tech
                  </button>
                  <button
                    type="button"
                    className={`${styles.categoryBtn} ${
                      category === "Travel & Tourism" ? styles.selected : ""
                    }`}
                    onClick={() => setCategory("Travel & Tourism")}
                  >
                    ✈️ Travel & Tourism
                  </button>
                </div>
                <span className={styles.CatMsg}>{CatErr}</span>
                <button className={styles.SigninBtn}>Continue</button>
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
