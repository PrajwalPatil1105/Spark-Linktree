import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import styles from "../Styles/Dashboard.module.css";
import Links from "../Dashboard/Links";
import Appearance from "../Dashboard/Appearance";
import Analytics from "../Dashboard/Analytics";
import Setting from "../Dashboard/Setting";
import {
  GalleryVertical,
  ChartPie,
  Layers2,
  Settings,
  Share,
  Share2,
  Eye,
  X,
  LogOut,
} from "lucide-react";
import { useEffect } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("links");
  const [activeContentType, setActiveContentType] = useState("link");
  const [loading, setLoading] = useState(true);
  const [OnUpdate, setOnUpdate] = useState(false);
  const [ShowLogout, setShowLogout] = useState(false);
  const [ShowMobLogout, setShowMobLogout] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const navigate = useNavigate();
  const [UserInfo, setUserInfo] = useState();
  const [LinkInfo, setLinkInfo] = useState();
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Please Login");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "links":
        return (
          <Links
            UserInfo={UserInfo}
            setUserInfo={setUserInfo}
            LinkInfo={LinkInfo}
            setLinkInfo={setLinkInfo}
            setOnUpdate={setOnUpdate}
            OnUpdate={OnUpdate}
          />
        );
      case "appearance":
        return <Appearance UserInfo={UserInfo} setUserInfo={setUserInfo} />;
      case "analytics":
        return <Analytics UserInfo={UserInfo} LinkInfo={LinkInfo} />;
      case "Setting":
        return <Setting UserInfo={UserInfo} />;
      default:
        return (
          <Links
            UserInfo={UserInfo}
            setUserInfo={setUserInfo}
            LinkInfo={LinkInfo}
            setLinkInfo={setLinkInfo}
          />
        );
    }
  };

  async function fetchUserdata() {
    try {
      const response = await fetch(`${BASE_URL}url/UserData`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
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
      const response = await fetch(`${BASE_URL}url/LinkData`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
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

  function handleLogout() {
    toast.success("Log Out Successfully");
    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    }, 2000);
  }

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
          glow: "./Images/Grid/Special6G.png",
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

  // Create phone preview component to reuse in both desktop and mobile
  const PhonePreviewComponent = ({ className, fullScreen = false }) => (
    <div
      className={`${styles.phonePreview} ${className || ""}`}
      style={{ display: fullScreen ? "block" : "" }}
    >
      {fullScreen && (
        <button
          className={styles.closePreviewBtn}
          onClick={() => setShowMobilePreview(false)}
        >
          <X size={20} />
        </button>
      )}
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
            <button
              className={styles.share}
              onClick={() => {
                const url = `https://spark-linktree-nine.vercel.app/share/${UserInfo._id}`;
                navigator.clipboard.writeText(url).then(() => {
                  toast.success("Link copied to clipboard!");
                });
              }}
            >
              <Share size={18} />
            </button>
            <div className={styles.profileImage}>
              <img src={`./Images/Face.png`} alt="Profile" />
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
                >
                  {link && (
                    <div className={styles.linkIcon}>
                      {link.platformIcon ? (
                        <img src={link.platformIcon} alt={link.platformName} />
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
          <button
            onClick={() => {
              const url = `https://spark-linktree-nine.vercel.app/`;
              navigator.clipboard.writeText(url).then(() => {
                window.location.href = url;
              });
            }}
          >
            Get Connected
          </button>
        </div>
        <div className={styles.sparkLogo}>
          <img src="./Images/SignIn Logo.png" alt="SPARK" />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile Phone Preview Popup - shows when showMobilePreview is true */}
      {showMobilePreview && (
        <div
          className={styles.mobilePreviewOverlay}
          onClick={(e) => {
            // Close when clicking outside the preview content
            if (e.target.className === styles.mobilePreviewOverlay) {
              setShowMobilePreview(false);
            }
          }}
        >
          <PhonePreviewComponent
            className={styles.mobilePreviewContent}
            fullScreen={true}
          />
        </div>
      )}

      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="./Images/SignIn Logo.png" alt="Spark" />
          <h1>Hi, {UserInfo?.Fname}!</h1>
          <p>Congratulations . You got a great response today . </p>
        </div>
        <div className={styles.headerRight}>
          <img
            src="./Images/Face.png"
            alt=""
            onClick={() => setShowMobLogout(!ShowMobLogout)}
          />
          <button className={styles.shareButton}>
            <span>
              <Share2 size={18} /> Share
            </span>
          </button>
        </div>
      </header>
      {ShowMobLogout && (
        <button className={styles.Moblogout} onClick={handleLogout}>
          <LogOut size={20} /> LogOut
        </button>
      )}

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
          <div className={styles.logoutContainer}>
            {ShowLogout && (
              <button className={styles.logout} onClick={handleLogout}>
                <LogOut size={20} /> LogOut
              </button>
            )}
          </div>
        </nav>
        <button
          className={styles.logoutToggle}
          onClick={(e) => {
            e.stopPropagation();
            setShowLogout(!ShowLogout);
          }}
        >
          <img src="./Images/MobileFace.png" alt="" />
          {UserInfo?.Fname}
        </button>

        <div className={styles.contentArea}>
          {showPreview && (
            <PhonePreviewComponent className={styles.desktopPhonePreview} />
          )}
          <div className={styles.mainSection}>{renderContent()}</div>
        </div>
      </div>

      {/* Floating preview button for mobile */}
      <button
        className={styles.floatingPreviewBtn}
        onClick={() => setShowMobilePreview(true)}
      >
        <Eye size={20} /> Preview
      </button>

      {/* Mobile Navigation */}
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
      <Toaster
        toastOptions={{
          style: {
            color: "white",
            backgroundColor: "#05A763",
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

export default Dashboard;
