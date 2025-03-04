import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import styles from "../Styles/Share.module.css";
import { useEffect } from "react";

const ShareLinks = () => {
  const { UserId } = useParams();
  const [activeTab, setActiveTab] = useState("links");
  const [activeContentType, setActiveContentType] = useState("link");
  const [loading, setLoading] = useState(true);
  const [OnUpdate, setOnUpdate] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const navigate = useNavigate();
  const [UserInfo, setUserInfo] = useState();
  const [LinkInfo, setLinkInfo] = useState();
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const token = localStorage.getItem("token");

  const forward = async (linkId) => {
    try {
      const response = await fetch(`${BASE_URL}url/forward/${linkId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No URL found in response");
      }
    } catch (error) {
      console.error("Error redirecting link:", error);
    }
  };

  async function fetchUserdata() {
    try {
      const response = await fetch(`${BASE_URL}url/Userdata/${UserId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUserInfo(data?.userData || []);
        setLoading(false);
      } else {
        toast.error(data?.message || "Failed to fetch User Data");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to fetch User Data");
      setLoading(false);
    }
  }

  async function fetchlinkdata() {
    try {
      const response = await fetch(`${BASE_URL}url/Linkdata/${UserId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLinkInfo(data?.LinkData || []);
        setLoading(false);
      } else {
        toast.error(data?.message || "Failed to fetch User Data");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to fetch User Data");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserdata();
  }, []);

  useEffect(() => {
    fetchlinkdata();
  }, [OnUpdate]);

  useEffect(() => {
    console.log(UserInfo);
    console.log(LinkInfo);
  }, [UserInfo, LinkInfo]);

  const getButtonStyle = (isMobilePreview = false) => {
    const { buttonStyle, special, layout } = UserInfo || {};

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
          wavy: "../Images/Stack/Special1ST.png",
          dotted: "../Images/Stack/Special2S.png",
          dashed: "../Images/Stack/Special3S.png",
          gradient: "../Images/Stack/Special5S.png",
          glow: "../Images/Stack/Special6S.png",
        },
        grid: {
          wavy: "../Images/Grid/Special1G.png",
          dotted: "../Images/Grid/Special2G.png",
          dashed: "../Images/Grid/Special3G.png",
          gradient: "../Images/Grid/Special5G.png",
          glow: "../Images/Grid/Special6G.png",
        },
        carousel: {
          wavy: "../Images/Carousel/Special1C.png",
          dotted: "../Images/Carousel/Special2C.png",
          dashed: "../Images/Carousel/Special3C.png",
          gradient: "../Images/Carousel/Special5C.png",
          glow: "../Images/Carousel/Special6C.png",
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
          color: buttonStyle.textColor || "#fffff",
          padding:
            layout === "grid"
              ? "10px 15px"
              : layout === "stack"
              ? isMobilePreview
                ? "15px 19px"
                : "28px 17px"
              : layout === "carousel"
              ? ""
              : "10px 15px",
          overflow: "hidden",
          fontFamily: buttonStyle.fontFamily || "DM Sans",
        };
      }
    }

    return baseStyle;
  };

  const getPreviewLayoutClass = () => {
    switch (UserInfo?.layout) {
      case "grid":
        return styles.gridLayout;
      case "carousel":
        return styles.carouselLayout;
      default:
        return styles.stackLayout;
    }
  };

  const getThemeBackground = () => {
    const theme = themes.find((t) => t.id === UserInfo?.theme);
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

  const PhonePreviewComponent = ({ className, fullScreen = false }) => (
    <div className={styles.phonePreview}>
      <div className={styles.phoneFrame}>
        <div
          className={styles.previewContent}
          style={{
            backgroundColor: getThemeBackground(),
            color: UserInfo?.theme?.includes("black") ? "#ffffff" : "#000000",
          }}
        >
          <div
            className={styles.userProfile}
            style={{ backgroundColor: UserInfo?.bannerColor }}
          >
            <div className={styles.profileImage}>
              <img src={`../Images/Face.png`} alt="Profile" />
            </div>
            <h2>{UserInfo?.username || "UserName"}</h2>
          </div>
          <div className={styles.linkHeader}>
            <div className={styles.tabSlider}>
              <button
                className={`${styles.addLinkBtn} ${
                  activeContentType === "link" ? styles.active : ""
                }`}
                onClick={() => setActiveContentType("link")}
              >
                Link
              </button>
              <button
                className={`${styles.addShopBtn} ${
                  activeContentType === "shop" ? styles.active : ""
                }`}
                onClick={() => setActiveContentType("shop")}
              >
                Shop
              </button>
              <div
                className={styles.sliderIndicator}
                style={{
                  transform:
                    activeContentType === "shop"
                      ? "translateX(100%)"
                      : "translateX(0)",
                }}
              ></div>
            </div>
          </div>
          <div className={`${styles.previewLinks} ${getPreviewLayoutClass()}`}>
            {LinkInfo &&
              Array.isArray(LinkInfo) &&
              LinkInfo.filter(
                (link) =>
                  link?.enabled === true && link?.type === activeContentType
              ).map((link, index) => (
                <div
                  key={index}
                  className={styles.previewLink}
                  style={getButtonStyle(fullScreen)}
                  data-special={UserInfo?.special || "none"}
                  data-layout={UserInfo?.layout}
                  onClick={() => forward(link._id)}
                >
                  {link && (
                    <div className={styles.linkIcon}>
                      {link.platformIcon ? (
                        <img
                          src={"." + link.platformIcon}
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
                        UserInfo?.buttonStyle?.fontFamily || "DM Sans",
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
          <img src="../Images/SignIn Logo.png" alt="SPARK" />
        </div>
      </div>
    </div>
  );
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          {showPreview && (
            <PhonePreviewComponent className={styles.desktopPhonePreview} />
          )}
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

export default ShareLinks;
