import React, { useEffect, useState } from "react";
import styles from "../Styles/Link.module.css";
import LinkPopup from "../Popups/Addlink";
import EditPopup from "../Popups/Editlink";
import AddImg from "../Popups/AddImg";
import toast, { Toaster } from "react-hot-toast";
import {
  BarChart2,
  Trash,
  Plus,
  GripVertical,
  Store,
  Pencil,
  Loader,
  Save,
} from "lucide-react";

const Links = ({
  setUserInfo,
  UserInfo,
  setLinkInfo,
  LinkInfo,
  setOnUpdate,
  OnUpdate,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [IsImgPopupOpen, setIsImgPopupOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [saving, setSaving] = useState(false);
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const [activePopupType, setActivePopupType] = useState("link");

  const handleOpenImageUploadPopup = () => {
    setIsImgPopupOpen(true);
  };

  const handleColorChange = (color) => {
    setUserInfo((prev) => ({
      ...prev,
      bannerColor: color,
    }));
  };

  const handleToggleLink = async (index) => {
    const linkId = LinkInfo[index]?._id;
    const newEnabledStatus = !LinkInfo[index].enabled;
    const updatedLinkInfo = [...LinkInfo];
    updatedLinkInfo[index] = {
      ...updatedLinkInfo[index],
      enabled: newEnabledStatus,
    };
    setLinkInfo(updatedLinkInfo);

    if (linkId) {
      try {
        const response = await fetch(`${BASE_URL}url/updateLink/${linkId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ enabled: newEnabledStatus }),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success(data?.message);
        } else {
          updatedLinkInfo[index] = {
            ...updatedLinkInfo[index],
            enabled: !newEnabledStatus,
          };
          setLinkInfo(updatedLinkInfo);
          toast.error(data.message || "Failed to update link");
        }
      } catch (error) {
        updatedLinkInfo[index] = {
          ...updatedLinkInfo[index],
          enabled: !newEnabledStatus,
        };
        setLinkInfo(updatedLinkInfo);
        toast.error("Failed to update link");
      }
    }
  };

  const deleteLink = async (linkId) => {
    try {
      const response = await fetch(`${BASE_URL}url/deleteLink/${linkId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Link deleted successfully");
        return true;
      } else {
        toast.error(data.message || "Failed to delete link");
        return false;
      }
    } catch (error) {
      toast.error("Failed to delete link");
      return false;
    }
  };

  const handleDeleteLink = async (index) => {
    const confirmDelete = window.confirm("Do you want to delete the link?");
    if (!confirmDelete) return;
    const linkId = LinkInfo[index]?._id;
    if (!linkId) return;
    const updatedLinkInfo = LinkInfo.filter((_, i) => i !== index);
    setLinkInfo(updatedLinkInfo);
    const success = await deleteLink(linkId);
    if (!success) {
      setLinkInfo(LinkInfo);
    }
  };

  const handleAddLink = (newLink) => {
    setUserInfo((prev) => ({
      ...prev,
      links: [...prev.links, newLink],
    }));
  };

  const saveUserProfile = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${BASE_URL}url/updateUserProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: UserInfo.username,
          bio: UserInfo.bio,
          bannerColor: UserInfo.bannerColor,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const openAddLinkPopup = (type) => {
    setActivePopupType(type);
    setIsPopupOpen(true);
  };

  const handleOpenEditPopup = (link) => {
    setEditingLink(link);
    setIsEditPopupOpen(true);
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
            <button
              className={styles.pickImage}
              onClick={handleOpenImageUploadPopup}
            >
              Pick an image
            </button>
            <button className={styles.removeImage}>Remove</button>
          </div>
        </div>

        <div className={styles.profileDetails}>
          <div className={styles.inputGroup}>
            <label>Profile Title</label>
            <input
              type="text"
              value={UserInfo?.username}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Bio</label>
            <textarea
              value={UserInfo?.bio || "Bio"}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, bio: e.target.value }))
              }
              maxLength={80}
            />
            <span className={styles.charCount}>{UserInfo?.bio.length}/80</span>
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

        {LinkInfo && LinkInfo.length > 0 ? (
          <div className={styles.linksList}>
            {LinkInfo?.map((link, index) => (
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
                      <button
                        className={styles.editButton}
                        onClick={() => handleOpenEditPopup(link)}
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </div>
                  <div className={styles.linkUrlRow}>
                    <div className={styles.linkUrl}>{link.url}</div>
                    <button
                      className={styles.editButton1}
                      onClick={() => handleOpenEditPopup(link)}
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                  <div className={styles.clickStats}>
                    <BarChart2 size={16} color="#999" />
                    <span>{link.totalClicks} clicks</span>
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

      <LinkPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        initialTab={activePopupType}
        setOnUpdate={setOnUpdate}
        OnUpdate={OnUpdate}
      />

      <AddImg
        isOpen={IsImgPopupOpen}
        onClose={() => setIsImgPopupOpen(false)}
        LinkInfo={UserInfo}
        setOnUpdate={setOnUpdate}
        OnUpdate={OnUpdate}
      />
      <EditPopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        linkData={editingLink}
        onUpdateLink={(updatedLink) => {
          if (editingLink && editingLink._id) {
            const updatedLinkInfo = LinkInfo.map((link) =>
              link._id === updatedLink._id ? updatedLink : link
            );
            setLinkInfo(updatedLinkInfo);
          }
        }}
      />

      <h2 className={styles.bannerHead}>Banner</h2>
      <div className={styles.bannerSection}>
        <div className={styles.colorPicker}>
          <div className={styles.bannerPreview}>
            <div
              className={styles.userProfilePreview}
              style={{ backgroundColor: UserInfo?.bannerColor }}
            >
              <div className={styles.profileImagePreview}>
                <img src={`./Images/Face.png`} alt="Profile" />
              </div>
              <h2>{UserInfo?.username || "UserName"}</h2>
              <div className={styles.biosection}>
                <img src="./Images/FooterLogo.png" alt="" />
                <p>{UserInfo?.bio || "Bio"}</p>
              </div>
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
            value={UserInfo?.bannerColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className={styles.colorInput}
          />
        </div>
      </div>

      <button
        className={styles.saveButton}
        onClick={saveUserProfile}
        disabled={saving}
      >
        {saving ? (
          <>
            <Loader size={16} className={styles.spinner} /> Saving...
          </>
        ) : (
          <>Save</>
        )}
      </button>
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

export default Links;
