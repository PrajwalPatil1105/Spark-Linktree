import React, { useState, useEffect, useRef } from "react";
import styles from "../Styles/Addlink.module.css";
import { Copy, Store, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const LinkPopup = ({ isOpen, onClose, initialTab, setOnUpdate, OnUpdate }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [linkData, setLinkData] = useState({
    title: "",
    url: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    url: "",
    platform: "",
  });
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const popupRef = useRef();

  const socialPlatforms = [
    { id: "instagram", name: "Instagram", icon: "./Images/Insta.png" },
    { id: "facebook", name: "FaceBook", icon: "./Images/Facebook.png" },
    { id: "youtube", name: "YouTube", icon: "./Images/YouTube.png" },
    { id: "twitter", name: "X", icon: "./Images/X.png" },
  ];

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const shopPlatforms = [
    { id: "amazon", name: "Amazon", icon: "./Images/Amazon.png" },
    { id: "flipkart", name: "Flipkart", icon: "/Images/Fkart.png" },
    { id: "Zomato", name: "Zomato", icon: "/Images/Zomato.png" },
  ];

  useEffect(() => {
    if (isOpen) {
      setLinkData({ title: "", url: "" });
      setSelectedPlatform(null);
      setErrors({ title: "", url: "", platform: "" });
      setToggleEnabled(false);
      setFormValid(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    setSelectedPlatform(null);
    setLinkData({ title: "", url: "" });
    setErrors({ title: "", url: "", platform: "" });
    setToggleEnabled(false);
    setFormValid(false);
  }, [activeTab]);

  useEffect(() => {
    validateFields(false);
  }, [linkData, selectedPlatform]);

  useEffect(() => {
    if (toggleEnabled && formValid) {
      handleSaveLink();
    }
  }, [toggleEnabled]);

  const validateFields = (showErrors = true) => {
    const newErrors = { title: "", url: "", platform: "" };
    let isValid = true;

    if (!linkData.title.trim()) {
      if (showErrors) newErrors.title = "Title is required";
      isValid = false;
    }

    if (!linkData.url.trim()) {
      if (showErrors) newErrors.url = "URL is required";
      isValid = false;
    } else if (
      !linkData.url.startsWith("http://") &&
      !linkData.url.startsWith("https://")
    ) {
      if (showErrors)
        newErrors.url =
          "Please enter a valid URL (starting with http:// or https://)";
      isValid = false;
    }

    if (!selectedPlatform) {
      if (showErrors) newErrors.platform = "Please select a platform";
      isValid = false;
    }

    if (showErrors) {
      setErrors(newErrors);
    }

    setFormValid(isValid);
    return isValid;
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setErrors((prev) => ({ ...prev, platform: "" }));
  };

  const handleSaveLink = async () => {
    const token = localStorage.getItem("token");
    if (formValid) {
      try {
        const linkPayload = {
          url: linkData.url,
          title: linkData.title,
          type: activeTab === "shop" ? "shop" : "link",
          enabled: true,
          platform: selectedPlatform.id,
          platformName: selectedPlatform.name,
          platformIcon: selectedPlatform.icon,
        };

        const response = await fetch(`${BASE_URL}url/Addlink`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(linkPayload),
        });

        if (!response.ok) {
          throw new Error("Failed to add link");
        }
        const data = await response.json();
        if (data?.code === "1") {
          toast.success(data.message);
          setOnUpdate(!OnUpdate);
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      } catch (error) {
        console.error("Error adding link:", error);
      }
    }
  };

  const handleToggleChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked && !formValid) {
      validateFields(true);
      return;
    }

    setToggleEnabled(isChecked);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkData.url);
  };

  const handleDelLink = () => {
    setLinkData({
      ...linkData,
      url: "",
    });
  };

  if (!isOpen) return null;

  const currentPlatforms =
    activeTab === "shop" ? shopPlatforms : socialPlatforms;

  return (
    <div className={styles.popupOverlay}>
      <div ref={popupRef} className={styles.popup}>
        {/* Tab Header */}
        <div className={styles.header}>
          <button
            className={`${styles.headerBtn} ${
              activeTab === "link" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("link")}
          >
            <Store size={22} /> Add Link
          </button>
          <button
            className={`${styles.headerBtn} ${
              activeTab === "shop" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("shop")}
          >
            <Store size={22} /> Add Shop
          </button>
        </div>

        <div className={styles.Maincard}>
          <h2>Enter URL</h2>
          {/* Title Input */}
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Link title"
                value={linkData.title}
                onChange={(e) => {
                  setLinkData((prev) => ({ ...prev, title: e.target.value }));
                  setErrors((prev) => ({ ...prev, title: "" }));
                }}
              />

              <div className={styles.titleContainer}>
                <label
                  className={styles.toggle}
                  title={formValid ? "Add the link" : "Please fill all fields"}
                >
                  <input
                    type="checkbox"
                    checked={toggleEnabled}
                    onChange={handleToggleChange}
                    disabled={!formValid}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            {/* URL Input */}
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Link URL"
                value={linkData.url}
                onChange={(e) => {
                  setLinkData((prev) => ({ ...prev, url: e.target.value }));
                  setErrors((prev) => ({ ...prev, url: "" }));
                }}
              />
              <button className={styles.copyBtn} onClick={handleCopyLink}>
                <Copy size={16} />
              </button>
              <button className={styles.DelBtn} onClick={handleDelLink}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Platform Selection */}
          <div className={styles.platformSection}>
            <h3>Applications</h3>
            {errors.platform && (
              <span className={styles.error}>{errors.platform}</span>
            )}
            <div className={styles.platformGrid}>
              {currentPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  className={`${styles.platformBtn} ${
                    selectedPlatform?.id === platform.id ? styles.selected : ""
                  }`}
                  onClick={() => handlePlatformSelect(platform)}
                >
                  <img src={platform.icon} alt={platform.name} />
                  <span>{platform.name}</span>
                </button>
              ))}
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

export default LinkPopup;
