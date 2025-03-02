import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Dashboard.module.css";
import Links from "../Dashboard/Links";
import Appearance from "../Dashboard/Appearance";
import Setting from "../Dashboard/Setting";
import {
  GalleryVertical,
  ChartPie,
  Layers2,
  Settings,
  Share,
  Share2,
} from "lucide-react";
import { useEffect } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("links");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "@opopo_08",
    profileImage: "/path-to-avatar.png",
    bio: "Bio",
    links: [
      {
        platform: "youtube",
        platformName: "YouTube",
        platformIcon: "./Images/YouTube.png",
        title: "My YouTube",
        url: "https://youtube.com/",
        enabled: true,
        clicks: 0,
        type: "link",
      },
      {
        platform: "facebook",
        platformName: "FaceBook",
        platformIcon: "./Images/Facebook.png",
        title: "FaceBook",
        url: "https://youtube.com/",
        enabled: true,
        clicks: 10,
        type: "link",
      },
      {
        platform: "twitter",
        platformName: "X",
        platformIcon: "./Images/X.png",
        title: "XX",
        url: "https://youtube.com/",
        enabled: true,
        clicks: 20,
        type: "link",
      },
    ],
    bannerColor: "#3A3A3A",
    layout: "stack",
    theme: "air-snow",
    special: "none",
    buttonStyle: {
      type: "fill",
      backgroundColor: "#C9C9C9",
      textColor: "#000000",
      borderRadius: "lg",
      fontFamily: "Poppins",
    },
  });

  const renderContent = () => {
    switch (activeTab) {
      case "links":
        return <Links userData={userData} setUserData={setUserData} />;
      case "appearance":
        return <Appearance userData={userData} setUserData={setUserData} />;
      case "analytics":
        return <Analytics />;
      case "Setting":
        return <Setting />;
      default:
        return <Links userData={userData} setUserData={setUserData} />;
    }
  };

  // Enhanced button style function to handle special styles
  const getButtonStyle = () => {
    const { buttonStyle, special, layout } = userData;

    if (!buttonStyle) return {};

    let baseStyle = {};

    // Get border radius value
    const getBorderRadiusValue = (size) => {
      switch (size) {
        case "none":
          return "0";
        case "sm":
          return "0.25rem";
        case "md":
          return "0.5rem";
        case "lg":
          return "1.5rem";
        default:
          return "0.5rem";
      }
    };

    // Apply the base button style
    switch (buttonStyle.type) {
      case "fill":
        baseStyle = {
          backgroundColor: buttonStyle.backgroundColor || "#676767",
          color: buttonStyle.textColor || "#ffffff",
          border: "none",
          borderRadius: getBorderRadiusValue(buttonStyle.borderRadius),
          fontFamily: buttonStyle.fontFamily || "DM Sans", // Ensure fontFamily has a fallback
        };
        break;
      case "outline":
        baseStyle = {
          backgroundColor: "transparent",
          color: buttonStyle.textColor,
          border: `2px solid ${buttonStyle.backgroundColor}`,
          borderRadius: getBorderRadiusValue(buttonStyle.borderRadius),
          fontFamily: buttonStyle.fontFamily || "DM Sans", // Ensure fontFamily has a fallback
        };
        break;
      case "hardShadow":
        baseStyle = {
          backgroundColor: "white",
          color: buttonStyle.textColor,
          border: `2px solid ${buttonStyle.backgroundColor}`,
          boxShadow: `4px 4px 0 ${buttonStyle.backgroundColor}`,
          borderRadius: getBorderRadiusValue(buttonStyle.borderRadius),
          fontFamily: buttonStyle.fontFamily || "DM Sans", // Ensure fontFamily has a fallback
        };
        break;
      case "softShadow":
        baseStyle = {
          backgroundColor: "white",
          color: buttonStyle.textColor,
          border: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
          borderRadius: getBorderRadiusValue(buttonStyle.borderRadius),
          fontFamily: buttonStyle.fontFamily || "DM Sans", // Ensure fontFamily has a fallback
        };
        break;
      default:
        break;
    }

    if (special && special !== "none") {
      const specialImages = {
        stack: {
          wavy: "./Images/Stack/Special1ST.png",
          dotted: "./Images/Stack/Special2S.png",
          dashed: "./Images/Stack/Special3S.png",
          gradient: "./Images/Stack/Special5S.png",
          glow: "./Images/Stack/Special6S.png",
        },
        grid: {
          wavy: "./Images/Grid/Special1G.png",
          dotted: "./Images/Grid/Special2G.png",
          dashed: "./Images/Grid/Special3G.png",
          gradient: "./Images/Grid/Special5G.png",
          glow: "./Images/Grid/Special6GT.png",
        },
        carousel: {
          wavy: "./Images/Carousel/Special1C.png",
          dotted: "./Images/Carousel/Special2C.png",
          dashed: "./Images/Carousel/Special3C.png",
          gradient: "./Images/Carousel/Special5C.png",
          glow: "./Images/Carousel/Special6C.png",
        },
      };

      // Select the appropriate image based on the layout and special style
      const layoutSpecialImages = specialImages[layout] || specialImages.stack;
      if (layoutSpecialImages[special]) {
        baseStyle = {
          ...baseStyle,
          backgroundImage: `url(${layoutSpecialImages[special]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: buttonStyle.theme,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          border: "none",
          boxShadow: "none",
          borderRadius: "0px",
          color: buttonStyle.textColor,
          padding: layout === "carousel" ? "" : "10px 15px",
          overflow: "hidden",
          fontFamily: buttonStyle.fontFamily || "DM Sans", // Ensure fontFamily is preserved here
        };
      }
    }

    return baseStyle;
  };

  const getPreviewLayoutClass = () => {
    switch (userData.layout) {
      case "grid":
        return styles.gridLayout;
      case "carousel":
        return styles.carouselLayout;
      default:
        return styles.stackLayout;
    }
  };

  const getThemeBackground = () => {
    const theme = themes.find((t) => t.id === userData.theme);
    return theme ? theme.color : "#ffffff";
  };

  // Theme definitions for background colors
  const themes = [
    { id: "air-snow", color: "#ffffff" },
    { id: "air-grey", color: "#f5f5f5" },
    { id: "air-smoke", color: "#333333" },
    { id: "air-black", color: "#000000" },
    { id: "mineral-blue", color: "#e6f3ff" },
    { id: "mineral-green", color: "#e6fff0" },
    { id: "mineral-orange", color: "#fff0e6" },
    { id: "mineral-yellow", color: "#fffde6" },
  ];

  const showPreview = activeTab === "links" || activeTab === "appearance";

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="./Images/SignIn Logo.png" alt="Spark" />
          <h1>Hi, Jenny Wilson!</h1>
          <p>Congratulations . You got a great response today . </p>
        </div>
        <div className={styles.headerRight}>
          <img src="./Images/Face.png" alt="" />
          <button className={styles.shareButton}>
            <span>
              <Share2 size={18} /> Share
            </span>
          </button>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <div className={styles.logo}>
            <img src="./Images/SignIn Logo.png" alt="Spark" />
          </div>
          <button
            className={`${styles.navButton1} ${
              activeTab === "links" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("links")}
          >
            <GalleryVertical size={20} /> Links
          </button>
          <button
            className={`${styles.navButton} ${
              activeTab === "appearance" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("appearance")}
          >
            <Layers2 size={20} /> Appearance
          </button>
          <button
            className={`${styles.navButton} ${
              activeTab === "analytics" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            <ChartPie size={20} /> Analytics
          </button>
          <button
            className={`${styles.navButton} ${
              activeTab === "Setting" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("Setting")}
          >
            <Settings size={20} /> Setting
          </button>
        </nav>

        <div className={styles.contentArea}>
          {showPreview && (
            <div className={styles.phonePreview}>
              <div className={styles.phoneFrame}>
                <div
                  className={styles.previewContent}
                  style={{
                    backgroundColor: getThemeBackground(),
                    color: userData.theme.includes("black")
                      ? "#ffffff"
                      : "#000000",
                  }}
                >
                  <div
                    className={styles.userProfile}
                    style={{ backgroundColor: userData.bannerColor }}
                  >
                    <button className={styles.share}>
                      <Share size={18} />
                    </button>
                    <div className={styles.profileImage}>
                      <img src={`./Images/Face.png`} alt="Profile" />
                    </div>
                    <h2>{userData.username}</h2>
                  </div>
                  <div className={styles.linkHeader}>
                    <button className={styles.addLinkBtn}>Link</button>
                    <button className={styles.addShopBtn}>Shop</button>
                  </div>
                  <div
                    className={`${
                      styles.previewLinks
                    } ${getPreviewLayoutClass()}`}
                  >
                    {userData.links
                      .filter((link) => link.enabled)
                      .map((link, index) => (
                        <div
                          key={index}
                          className={styles.previewLink}
                          style={getButtonStyle()}
                          data-special={userData.special || "none"}
                          data-layout={userData.layout}
                        >
                          {link.platform && (
                            <div className={styles.linkIcon}>
                              {link.platformIcon ? (
                                <img
                                  src={link.platformIcon}
                                  alt={link.platformName}
                                />
                              ) : (
                                <div className={styles.defaultIcon}></div>
                              )}
                            </div>
                          )}
                          <span
                            className={styles.linkTitle}
                            style={{
                              fontFamily:
                                userData.buttonStyle?.fontFamily || "DM Sans",
                            }}
                          >
                            {link.title}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className={styles.bottomContent}>
                <div className={styles.connectButton}>
                  <button>Get Connected</button>
                </div>
                <div className={styles.sparkLogo}>
                  <img src="./Images/SignIn Logo.png" alt="SPARK" />
                </div>
              </div>
            </div>
          )}
          <div className={styles.mainSection}>{renderContent()}</div>
        </div>
      </div>

      <nav className={styles.mobileNav}>
        <button
          className={`${styles.navButton} ${
            activeTab === "links" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("links")}
        >
          <GalleryVertical size={18} /> Links
        </button>
        <button
          className={`${styles.navButton} ${
            activeTab === "appearance" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("appearance")}
        >
          <Layers2 size={18} /> Appearance
        </button>
        <button
          className={`${styles.navButton} ${
            activeTab === "analytics" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          <ChartPie size={18} /> Analytics
        </button>
        <button
          className={`${styles.navButton} ${
            activeTab === "Setting" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("Setting")}
        >
          <Settings size={18} /> Setting
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
