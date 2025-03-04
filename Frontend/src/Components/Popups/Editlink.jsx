import React, { useState, useEffect, useRef } from "react";
import styles from "../Styles/Addlink.module.css";
import { Copy, Store, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const EditPopup = ({ isOpen, onClose, linkData, onUpdateLink }) => {
  const [activeTab, setActiveTab] = useState("link");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
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

  const shopPlatforms = [
    { id: "amazon", name: "Amazon", icon: "./Images/Amazon.png" },
    { id: "flipkart", name: "Flipkart", icon: "/Images/Fkart.png" },
    { id: "Zomato", name: "Zomato", icon: "/Images/Zomato.png" },
  ];

  useEffect(() => {
    if (linkData && isOpen) {
      setFormData({
        title: linkData.title || "",
        url: linkData.url || "",
      });
      setActiveTab(linkData.type === "shop" ? "shop" : "link");
      const platforms =
        linkData.type === "shop" ? shopPlatforms : socialPlatforms;
      const platformMatch = platforms.find(
        (p) => p.name.toLowerCase() === linkData.platformName.toLowerCase()
      );
      setSelectedPlatform(platformMatch || null);

      setToggleEnabled(false);
      setFormValid(true);
    }
  }, [linkData, isOpen]);

  console.log(linkData);
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
    if (!linkData) return;

    const platforms = activeTab === "shop" ? shopPlatforms : socialPlatforms;
    const platformMatch = platforms.find(
      (p) => p.name === linkData.platformName
    );

    if (platformMatch) {
      setSelectedPlatform(platformMatch);
    } else {
      setSelectedPlatform(null);
    }
  }, [activeTab, linkData]);

  useEffect(() => {
    validateFields(false);
  }, [formData, selectedPlatform]);

  useEffect(() => {
    if (toggleEnabled && formValid) {
      handleSaveLink();
    }
  }, [toggleEnabled]);

  const validateFields = (showErrors = true) => {
    let isValid = true;

    if (!formData.title.trim()) {
      if (showErrors) toast.error("Title is required");
      isValid = false;
    }

    if (!formData.url.trim()) {
      if (showErrors) toast.error("URL is required");
      isValid = false;
    } else if (
      !formData.url.startsWith("http://") &&
      !formData.url.startsWith("https://")
    ) {
      if (showErrors)
        toast.error(
          "Please enter a valid URL (starting with http:// or https://)"
        );
      isValid = false;
    }

    if (!selectedPlatform) {
      if (showErrors) toast.error("Please select a platform");
      isValid = false;
    }

    setFormValid(isValid);
    return isValid;
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  const handleSaveLink = async () => {
    const token = localStorage.getItem("token");
    if (formValid && linkData && linkData._id) {
      try {
        const updatedLinkPayload = {
          url: formData.url,
          title: formData.title,
          type: activeTab === "shop" ? "shop" : "link",
          platform: selectedPlatform.id,
          platformName: selectedPlatform.name,
          platformIcon: selectedPlatform.icon,
        };
        const response = await fetch(
          `${BASE_URL}url/updateLink/${linkData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedLinkPayload),
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to update link: ${response.status}`);
        }
        const data = await response.json();
        if (data?.code === "1") {
          toast.success(data?.message || "Link updated successfully");
          const updatedLink = {
            ...linkData,
            ...updatedLinkPayload,
          };
          onUpdateLink(updatedLink);
          if (toggleEnabled) {
            setTimeout(() => {
              onClose();
            }, 2000);
          }
        } else {
          throw new Error(data.message || "Failed to update link");
        }
      } catch (error) {
        console.error("Error updating link:", error);
        toast.error(error.message || "Failed to update link");
        setToggleEnabled(false);
      }
    }
  };

  const handleToggleChange = (e) => {
    const isChecked = e.target.checked;
    setToggleEnabled(isChecked);
    if (isChecked) {
      if (validateFields(true)) {
        handleSaveLink();
      } else {
        setToggleEnabled(false);
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(formData.url);
    toast.success("URL copied to clipboard");
  };

  const handleDelLink = () => {
    setFormData({
      ...formData,
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
            <Store size={22} /> Edit Link
          </button>
          <button
            className={`${styles.headerBtn} ${
              activeTab === "shop" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("shop")}
          >
            <Store size={22} /> Edit Shop
          </button>
        </div>

        <div className={styles.Maincard}>
          <h2>Edit URL</h2>
          {/* Title Input */}
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Link title"
                value={formData.title}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, title: e.target.value }));
                }}
              />

              <div className={styles.titleContainer}>
                <label className={styles.toggle} title="Toggle to save changes">
                  <input
                    type="checkbox"
                    checked={toggleEnabled}
                    onChange={handleToggleChange}
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
                value={formData.url}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, url: e.target.value }));
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

          <div className={styles.platformSection}>
            <h3>Applications</h3>
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
            backgroundColor: "rgb(172, 167, 167)",
            fontFamily: "Manrope",
            fontSize: "0.95em",
            fontWeight: "400",
            marginLeft: "3.5em",
          },
        }}
      />
    </div>
  );
};

export default EditPopup;
