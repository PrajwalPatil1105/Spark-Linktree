import React, { useEffect, useState } from "react";
import styles from "../Styles/link.module.css";
import LinkPopup from "../Popups/Addlink";
import {
  BarChart2,
  Trash,
  Plus,
  GripVertical,
  Store,
  Pencil,
} from "lucide-react";

const Links = ({ userData, setUserData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [trying, settry] = useState([]);

  useEffect(() => {
    console.log(userData);
  }, []);

  const [activePopupType, setActivePopupType] = useState("link");

  const handleImageUpload = (e) => {
    // Handle image upload logic
  };

  const handleColorChange = (color) => {
    setUserData((prev) => ({
      ...prev,
      bannerColor: color,
    }));
  };

  const handleToggleLink = (index) => {
    setUserData((prev) => ({
      ...prev,
      links: prev.links.map((link, i) =>
        i === index ? { ...link, enabled: !link.enabled } : link
      ),
    }));
  };

  const handleDeleteLink = (index) => {
    setUserData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  const handleAddLink = (newLink) => {
    setUserData((prev) => ({
      ...prev,
      links: [...prev.links, newLink],
    }));
  };

  // Open popup with specific type
  const openAddLinkPopup = (type) => {
    setActivePopupType(type);
    setIsPopupOpen(true);
  };

  return (
    <div className={styles.appearanceContainer}>
      <h1>Profile</h1>

      <div className={styles.profileSection}>
        <div className={styles.imageUpload}>
          <img
            src={`./Images/Face.png` || "/placeholder.png"}
            alt="Profile"
            className={styles.preview}
          />
          <div className={styles.uploadButtons}>
            <button className={styles.pickImage}>Pick an image</button>
            <button className={styles.removeImage}>Remove</button>
          </div>
        </div>

        <div className={styles.profileDetails}>
          <div className={styles.inputGroup}>
            <label>Profile Title</label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Bio</label>
            <textarea
              value={userData.bio}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, bio: e.target.value }))
              }
              maxLength={80}
            />
            <span className={styles.charCount}>{userData.bio.length}/80</span>
          </div>
        </div>
      </div>

      {/* Add Link Section */}
      <div className={styles.linksSection}>
        <div className={styles.linkHeader}>
          <button
            className={styles.addLinkBtn}
            onClick={() => openAddLinkPopup("link")}
          >
            <Store size={21} /> Add Link
          </button>
          <button
            className={styles.addShopBtn}
            onClick={() => openAddLinkPopup("shop")}
          >
            <Store size={21} /> Add Shop
          </button>
        </div>

        <button
          className={styles.mainAddButton}
          onClick={() => openAddLinkPopup("link")}
        >
          <Plus size={20} /> Add
        </button>

        {userData.links && userData.links.length > 0 ? (
          <div className={styles.linksList}>
            {userData.links.map((link, index) => (
              <div key={index} className={styles.linkCard}>
                {/* Handle/Drag Icon */}
                <div className={styles.handleIcon}>
                  <GripVertical size={20} color="#999" />
                </div>

                {/* Link Content */}
                <div className={styles.linkContent}>
                  {/* Platform and Title */}
                  <div className={styles.linkTitleRow}>
                    <div className={styles.platformName}>
                      {link.platformName}
                      <button className={styles.editButton}>
                        <Pencil size={16} />
                      </button>
                    </div>
                  </div>

                  {/* URL with Edit button */}
                  <div className={styles.linkUrlRow}>
                    <div className={styles.linkUrl}>{link.url}</div>
                    <button className={styles.editButton1}>
                      <Pencil size={16} />
                    </button>
                  </div>
                  <div className={styles.clickStats}>
                    <BarChart2 size={16} color="#999" />
                    <span>{link.clicks} clicks</span>
                  </div>
                </div>

                {/* Stats and Controls */}
                <div className={styles.linkControls}>
                  {/* Controls */}
                  <div className={styles.controlButtons}>
                    {/* Toggle Button */}
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={link.enabled}
                        onChange={() => handleToggleLink(index)}
                      />
                      <span className={styles.slider}></span>
                    </label>

                    {/* Delete Button */}
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteLink(index)}
                    >
                      <Trash size={16} color="#999" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noLinks}>
            <p>No links added yet. Add your first link!</p>
          </div>
        )}
      </div>

      {/* Link Popup */}
      <LinkPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAddLink={handleAddLink}
        initialTab={activePopupType}
      />

      <h2 className={styles.bannerHead}>Banner</h2>
      <div className={styles.bannerSection}>
        <div className={styles.colorPicker}>
          <div className={styles.bannerPreview}>
            <div
              className={styles.userProfilePreview}
              style={{ backgroundColor: userData.bannerColor }}
            >
              <div className={styles.profileImagePreview}>
                <img src={`./Images/Face.png`} alt="Profile" />
              </div>
              <h2>@{userData.username || "opopo_08"}</h2>
              <p>{userData.username || "opopo_08"}</p>
            </div>
          </div>
          <h3>Custom Background Color</h3>
          <div className={styles.colors}>
            <button
              className={styles.colorOption}
              style={{ background: "#3A3A3A" }}
              onClick={() => handleColorChange("#3A3A3A")}
            />
            <button
              className={styles.colorOption}
              style={{ background: "#FFFFFF" }}
              onClick={() => handleColorChange("#FFFFFF")}
            />
            <button
              className={styles.colorOption}
              style={{ background: "#000000" }}
              onClick={() => handleColorChange("#000000")}
            />
          </div>
          <input
            type="text"
            value={userData.bannerColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className={styles.colorInput}
          />
        </div>
      </div>

      <button className={styles.saveButton}>Save</button>
    </div>
  );
};

export default Links;
