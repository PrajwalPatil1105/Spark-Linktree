import { useState, useEffect } from "react";
import styles from "../Styles/Appearance.module.css";
import toast, { Toaster } from "react-hot-toast";

const Appearance = ({ UserInfo, setUserInfo }) => {
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const [selectedLayout, setSelectedLayout] = useState(
    UserInfo?.layout || "stack"
  );
  const [selectedTheme, setSelectedTheme] = useState(
    UserInfo?.theme || "air-snow"
  );
  const [selectedSpecial, setSelectedSpecial] = useState(
    UserInfo?.special || "none"
  );
  const [selectedBorderRadius, setSelectedBorderRadius] = useState(
    UserInfo?.buttonStyle?.borderRadius || "md"
  );
  const [buttonStyle, setButtonStyle] = useState(
    UserInfo?.buttonStyle || {
      type: "outline",
      backgroundColor: "#c9c9c9",
      textColor: "#ffffff",
      borderRadius: "md",
      fontFamily: "Poppins",
    }
  );

  useEffect(() => {
    setUserInfo((prev) => ({
      ...prev,
      layout: selectedLayout,
      theme: selectedTheme,
      special: selectedSpecial,
      buttonStyle: {
        ...buttonStyle,
        borderRadius: selectedBorderRadius,
      },
    }));
  }, [
    buttonStyle,
    selectedLayout,
    selectedTheme,
    selectedSpecial,
    selectedBorderRadius,
    setUserInfo,
  ]);

  const layouts = [
    { id: "stack", label: "Stack" },
    { id: "grid", label: "Grid" },
    { id: "carousel", label: "Carousel" },
  ];

  const themes = [
    { id: "air-snow", label: "Air Snow", color: "#ffffff" },
    { id: "air-grey", label: "Air Grey", color: "#f5f5f5" },
    { id: "air-smoke", label: "Air Smoke", color: "#333333" },
    { id: "air-black", label: "Air Black", color: "#000000" },
    { id: "mineral-blue", label: "Mineral Blue", color: "#e6f3ff" },
    { id: "mineral-green", label: "Mineral Green", color: "#e6fff0" },
    { id: "mineral-orange", label: "Mineral Orange", color: "#fff0e6" },
    { id: "mineral-yellow", label: "Mineral Yellow", color: "#fffde6" },
  ];

  const fonts = [
    { id: "dmsans", label: "DM Sans" },
    { id: "inter", label: "Inter" },
    { id: "roboto", label: "Roboto" },
    { id: "poppins", label: "Poppins" },
    { id: "Madimi One", label: "Madimi One" },
    { id: "Tiny5", label: "Tiny5" },
    { id: "Single Day", label: "Single Day" },
    { id: "Bebas Neue", label: "Bebas Neue" },
    { id: "Karla", label: "Karla" },
    { id: "K2D", label: "K2D" },
  ];

  const specialStyles = [
    { id: "wavy", label: "Wavy", image: "./Images/Special1.png" },
    { id: "dotted", label: "Dotted", image: "./Images/Special2.png" },
    { id: "dashed", label: "Dashed", image: "./Images/Special3.png" },
    { id: "none", label: "None" },
    {
      id: "gradient",
      label: "Gradient",
      image: "./Images/Special5.png",
    },
    { id: "glow", label: "Glow", image: "./Images/Special6.png" },
  ];

  const borderRadiusOptions = [
    { id: "none", label: "None" },
    { id: "sm", label: "Small" },
    { id: "md", label: "Medium" },
    { id: "lg", label: "Large" },
  ];

  // Handler for button style selection
  const handleButtonStyleChange = (type) => {
    setButtonStyle((prev) => ({
      ...prev,
      type: type,
    }));
  };

  // Handler for button color changes
  const handleButtonColorChange = (color) => {
    setButtonStyle((prev) => ({
      ...prev,
      backgroundColor: color,
    }));
  };

  // Handler for text color changes
  const handleTextColorChange = (color) => {
    setButtonStyle((prev) => ({
      ...prev,
      textColor: color,
    }));
  };

  // Handler for font family changes
  const handleFontFamilyChange = (fontFamily) => {
    setButtonStyle((prev) => ({
      ...prev,
      fontFamily,
    }));
  };

  // Handler for border radius changes
  const handleBorderRadiusChange = (radius) => {
    setSelectedBorderRadius(radius);
    setButtonStyle((prev) => ({
      ...prev,
      borderRadius: radius,
    }));
  };

  // Function to get border radius value based on size
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

  const saveChanges = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}url/updateUserData`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(UserInfo),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Changes saved successfully!");
        setUserInfo(data.userData);
      } else {
        toast.error(data?.message || "Failed to save changes");
      }
    } catch (error) {
      toast.error("Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  // Function to render the special button style preview
  const renderSpecialButton = (specialType) => {
    const special = specialStyles.find((s) => s.id === specialType);
    if (specialType === "none") {
      return {
        backgroundColor: buttonStyle.backgroundColor,
        color: buttonStyle.textColor,
        border: "none",
      };
    } else if (special && special.image) {
      return {
        backgroundImage: `url(${special.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "transparent",
        color: buttonStyle.textColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
    }
    return {};
  };

  return (
    <div className={styles.appearanceContainer}>
      <div className={styles.rightPanel}>
        <h1>Layout</h1>
        <div className={styles.card}>
          <div className={styles.layoutOptions}>
            {layouts.map((layout) => (
              <button
                key={layout.id}
                className={`${styles.layoutOption} ${
                  selectedLayout === layout.id ? styles.active : ""
                }`}
                onClick={() => setSelectedLayout(layout.id)}
              >
                <div className={styles.layoutIcon}>
                  {layout.id === "stack" && (
                    <div className={styles.stackIcon}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                  {layout.id === "grid" && (
                    <div className={styles.gridIcon}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                  {layout.id === "carousel" && (
                    <div className={styles.carouselIcon}>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                </div>
                <span>{layout.label}</span>
              </button>
            ))}
          </div>
        </div>

        <h1>Buttons</h1>
        <div className={styles.card}>
          <h2>Fill</h2>
          <div className={styles.buttonStyleRow}>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "fill" && selectedBorderRadius === "none"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("fill");
                handleBorderRadiusChange("none");
              }}
            >
              <button
                className={styles.fillButton}
                style={{
                  backgroundColor: buttonStyle.backgroundColor,
                  color: buttonStyle.textColor,
                  borderRadius: "0",
                  fontFamily: buttonStyle.fontFamily,
                }}
              >
                Button
              </button>
            </div>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "fill" && selectedBorderRadius === "md"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("fill");
                handleBorderRadiusChange("md");
              }}
            >
              <button
                className={styles.fillButton}
                style={{
                  backgroundColor: buttonStyle.backgroundColor,
                  color: buttonStyle.textColor,
                  borderRadius: "0.5rem",
                  fontFamily: buttonStyle.fontFamily,
                }}
              >
                Button
              </button>
            </div>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "fill" && selectedBorderRadius === "lg"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("fill");
                handleBorderRadiusChange("lg");
              }}
            >
              <button
                className={styles.fillButton}
                style={{
                  backgroundColor: buttonStyle.backgroundColor,
                  color: buttonStyle.textColor,
                  borderRadius: "2rem",
                  fontFamily: buttonStyle.fontFamily,
                }}
              >
                Button
              </button>
            </div>
          </div>

          <h2>Outline</h2>
          <div className={styles.buttonStyleRow}>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "outline" &&
                selectedBorderRadius === "none"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("outline");
                handleBorderRadiusChange("none");
              }}
            >
              <button
                className={styles.outlineButton}
                style={{
                  borderColor: buttonStyle.backgroundColor,
                  color: buttonStyle.textColor,
                  borderRadius: "0",
                  fontFamily: buttonStyle.fontFamily,
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
              >
                Button
              </button>
            </div>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "outline" && selectedBorderRadius === "md"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("outline");
                handleBorderRadiusChange("md");
              }}
            >
              <button
                className={styles.outlineButton}
                style={{
                  borderColor: buttonStyle.backgroundColor,
                  color: buttonStyle.textColor,
                  borderRadius: "0.5rem",
                  fontFamily: buttonStyle.fontFamily,
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
              >
                Button
              </button>
            </div>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "outline" && selectedBorderRadius === "lg"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("outline");
                handleBorderRadiusChange("lg");
              }}
            >
              <button
                className={styles.outlineButton}
                style={{
                  borderColor: buttonStyle.backgroundColor,
                  color: buttonStyle.textColor,
                  borderRadius: "2rem",
                  fontFamily: buttonStyle.fontFamily,
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
              >
                Button
              </button>
            </div>
          </div>

          <h2>Hard Shadow</h2>
          <div className={styles.buttonStyleRow}>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "hardShadow" &&
                selectedBorderRadius === "none"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("hardShadow");
                handleBorderRadiusChange("none");
              }}
            >
              <button
                className={styles.hardShadowButton}
                style={{
                  borderColor: buttonStyle.backgroundColor,
                  boxShadow: `4px 4px 0 ${buttonStyle.backgroundColor}`,
                  color: buttonStyle.textColor,
                  borderRadius: "0",
                  fontFamily: buttonStyle.fontFamily,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  backgroundColor: "white",
                }}
              >
                Button
              </button>
            </div>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "hardShadow" &&
                selectedBorderRadius === "md"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("hardShadow");
                handleBorderRadiusChange("md");
              }}
            >
              <button
                className={styles.hardShadowButton}
                style={{
                  borderColor: buttonStyle.backgroundColor,
                  boxShadow: `4px 4px 0 ${buttonStyle.backgroundColor}`,
                  color: buttonStyle.textColor,
                  borderRadius: "0.5rem",
                  fontFamily: buttonStyle.fontFamily,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  backgroundColor: "white",
                }}
              >
                Button
              </button>
            </div>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "hardShadow" &&
                selectedBorderRadius === "lg"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("hardShadow");
                handleBorderRadiusChange("lg");
              }}
            >
              <button
                className={styles.hardShadowButton}
                style={{
                  borderColor: buttonStyle.backgroundColor,
                  boxShadow: `4px 4px 0 ${buttonStyle.backgroundColor}`,
                  color: buttonStyle.textColor,
                  borderRadius: "2rem",
                  fontFamily: buttonStyle.fontFamily,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  backgroundColor: "white",
                }}
              >
                Button
              </button>
            </div>
          </div>

          <h2>Soft Shadow</h2>
          <div className={styles.buttonStyleRow}>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "softShadow" &&
                selectedBorderRadius === "none"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("softShadow");
                handleBorderRadiusChange("none");
              }}
            >
              <button
                className={styles.softShadowButton}
                style={{
                  backgroundColor: "white",
                  color: buttonStyle.textColor,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "0",
                  fontFamily: buttonStyle.fontFamily,
                }}
              >
                Button
              </button>
            </div>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "softShadow" &&
                selectedBorderRadius === "md"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("softShadow");
                handleBorderRadiusChange("md");
              }}
            >
              <button
                className={styles.softShadowButton}
                style={{
                  backgroundColor: "white",
                  color: buttonStyle.textColor,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "0.5rem",
                  fontFamily: buttonStyle.fontFamily,
                }}
              >
                Button
              </button>
            </div>
            <div
              className={`${styles.buttonPreview} ${
                buttonStyle.type === "softShadow" &&
                selectedBorderRadius === "lg"
                  ? styles.activeButtonType
                  : ""
              }`}
              onClick={() => {
                handleButtonStyleChange("softShadow");
                handleBorderRadiusChange("lg");
              }}
            >
              <button
                className={styles.softShadowButton}
                style={{
                  backgroundColor: "white",
                  color: buttonStyle.textColor,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "2rem",
                  fontFamily: buttonStyle.fontFamily,
                }}
              >
                Button
              </button>
            </div>
          </div>

          <h2>Special</h2>
          <div className={styles.specialOptions}>
            {specialStyles.map((special) => (
              <div
                key={special.id}
                className={`${styles.specialPreview} ${
                  selectedSpecial === special.id ? styles.activeSpecial : ""
                }`}
                onClick={() => setSelectedSpecial(special.id)}
              >
                {special.id === "none" ? (
                  <button
                    className={styles.specialButton}
                    style={{
                      backgroundColor: buttonStyle.backgroundColor,
                      color: buttonStyle.textColor,
                      fontFamily: buttonStyle.fontFamily,
                      borderRadius: getBorderRadiusValue(selectedBorderRadius),
                    }}
                  >
                    Button
                  </button>
                ) : (
                  <div
                    className={`${styles.specialButton}`}
                    style={{
                      ...renderSpecialButton(special.id),
                      fontFamily: buttonStyle.fontFamily,
                    }}
                  >
                    Button
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.colorPicker}>
            <h3>Button color</h3>
            <div className={styles.colorOption}>
              <input
                className={styles.colorInput}
                type="color"
                value={buttonStyle.backgroundColor}
                style={{ backgroundColor: buttonStyle.backgroundColor }}
                onChange={(e) => handleButtonColorChange(e.target.value)}
              />
              <input
                className={styles.colorcode}
                value={buttonStyle.backgroundColor}
                onChange={(e) => handleButtonColorChange(e.target.value)}
              />
            </div>
            <h3>Button font color</h3>
            <div className={styles.colorOption}>
              <input
                className={styles.colorInput}
                type="color"
                value={buttonStyle.textColor}
                style={{
                  backgroundColor: buttonStyle.textColor,
                }}
                onChange={(e) => handleTextColorChange(e.target.value)}
              />
              <input
                className={styles.colorcode}
                value={buttonStyle.textColor}
                onChange={(e) => handleTextColorChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        <h1>Fonts</h1>
        <div className={styles.card}>
          <div className={styles.fontSelector}>
            <h3>Font</h3>
            <div className={styles.fontdiv}>
              <p style={{ fontFamily: buttonStyle.fontFamily }}>Aa</p>
              <select
                value={buttonStyle.fontFamily}
                onChange={(e) => handleFontFamilyChange(e.target.value)}
                style={{ fontFamily: buttonStyle.fontFamily }}
              >
                {fonts.map((font) => (
                  <option key={font.id} value={font.label}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.fontColor}>
            <h3>Color</h3>
            <div className={styles.colorContainer}>
              <input
                className={styles.colorInput}
                type="color"
                value={buttonStyle.textColor}
                style={{ backgroundColor: buttonStyle.textColor }}
                onChange={(e) => handleTextColorChange(e.target.value)}
              />
              <input
                className={styles.colorCode}
                value={buttonStyle.textColor}
                onChange={(e) => handleTextColorChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        <h1>Themes</h1>
        <div className={styles.card}>
          <div className={styles.themeGrid}>
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`${styles.themeOption} ${
                  selectedTheme === theme.id ? styles.active : ""
                }`}
                onClick={() => setSelectedTheme(theme.id)}
                style={{ "--theme-color": theme.color }}
              >
                <div className={styles.themePreview}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.saveButtonContainer}>
          <button
            className={styles.saveButton}
            onClick={saveChanges}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
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

export default Appearance;
