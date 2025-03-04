import React, { useState } from "react";
import styles from "../Styles/Setting.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const Settings = ({ UserInfo }) => {
  const [err, seterr] = useState(" ");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    firstName: UserInfo?.Fname,
    lastName: UserInfo?.Lname,
    email: UserInfo?.email,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      seterr("*Passwords Didn't match");
      return;
    }
    seterr("");
    try {
      const response = await fetch(`${BASE_URL}url/edituserdata`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (data?.code === "1") {
        toast.success(data?.message);
      } else if (data?.code === "3") {
        toast.success(data?.message);
        setFormData((prevState) => ({
          ...prevState,
          password: "",
          confirmPassword: "",
        }));
        setTimeout(() => {
          localStorage.clear();
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <span className={styles.title}>Edit Profile</span>
      <div className={styles.line}></div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <span className={styles.errMsg}>{err}</span>

        <button type="submit" className={styles.saveButton}>
          Save
        </button>
      </form>
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
    </div>
  );
};

export default Settings;
