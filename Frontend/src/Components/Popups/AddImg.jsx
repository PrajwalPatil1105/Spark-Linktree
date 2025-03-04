import React, { useState, useEffect, useRef } from "react";
import styles from "../Styles/AddImg.module.css";
import { Copy, Store, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const AddImg = ({
  isOpen,
  onClose,
  LinkInfo,
  initialTab,
  setOnUpdate,
  OnUpdate,
}) => {
  if (!isOpen) {
    return null;
  }

  const [ImageUrl, setImageUrl] = useState(LinkInfo?.profileImage || "");
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const handleSaveImage = async () => {
    const token = localStorage.getItem("token");

    if (!ImageUrl) {
      toast.error("Please enter an image URL");
      return;
    }

    try {
      const response = await fetch(`${BASE_URLS}url/updateProfileImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profileImage: ImageUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile image updated successfully");
        setOnUpdate(!OnUpdate);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error(data.message || "Failed to update profile image");
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("Failed to update profile image");
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <div className={styles.Maincard}>
          <h2>Enter Image URL</h2>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Enter image URL"
                value={ImageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={handleSaveImage} className={styles.saveButton}>
                Save Image
              </button>
              <button onClick={onClose} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
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

export default AddImg;
