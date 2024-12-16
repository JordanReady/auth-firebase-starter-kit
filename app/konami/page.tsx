"use client";
import "./konami.scss";
import { useState, useEffect } from "react";

import LookupDialog from "./dialogs/LookupDialog";
import LookupInputDialog from "./dialogs/LookupInputDialog";
import LookupResultDialog from "./dialogs/LookupResultDialog";
import ErrorDialog from "./dialogs/ErrorDialog";
import PinInputDialog from "./dialogs/PinInputDialog";
import TimeoutDialog from "./dialogs/TimeoutDialog";

import VariableBox from "./VariableBox";

type Props = {};

export default function Konami({}: Props) {
  // State to track which dialog is active
  const [activeDialog, setActiveDialog] = useState<string | null>(
    "LookupDialog"
  );
  const [timer, setTimer] = useState(6000);

  // Base and current colors
  const [baseBackgroundColor, setBaseBackgroundColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState(baseBackgroundColor);

  const [baseAccentColor, setBaseAccentColor] = useState("grey");
  const [accentColor, setAccentColor] = useState(baseAccentColor);

  const [baseTextColor, setBaseTextColor] = useState("grey");
  const [textColor, setTextColor] = useState(baseTextColor);

  const [baseButtonBackground, setBaseButtonBackground] = useState(
    "linear-gradient(145deg, #ff6b81, #e63946)"
  );
  const [buttonBackground, setButtonBackground] =
    useState(baseButtonBackground);

  const [baseButtonHoverBackground, setBaseButtonHoverBackground] = useState(
    "linear-gradient(145deg, #ff1744, #ff5252)"
  );
  const [buttonHoverBackground, setButtonHoverBackground] = useState(
    baseButtonHoverBackground
  );

  const [baseButtonActiveBackground, setBaseButtonActiveBackground] = useState(
    "linear-gradient(145deg, #ff6b81, #e63946)"
  );
  const [buttonActiveBackground, setButtonActiveBackground] = useState(
    baseButtonActiveBackground
  );

  const [baseButtonBorderColor, setBaseButtonBorderColor] = useState("#ff1744");
  const [buttonBorderColor, setButtonBorderColor] = useState(
    baseButtonBorderColor
  );

  const [baseButtonTextColor, setBaseButtonTextColor] = useState("#ffffff");
  const [buttonTextColor, setButtonTextColor] = useState(baseButtonTextColor);

  const [baseShadowColor, setBaseShadowColor] = useState(
    "rgba(255, 23, 68, 0.3)"
  );
  const [shadowColor, setShadowColor] = useState(baseShadowColor);

  const [baseScale, setBaseScale] = useState(0.8);
  const [scale, setScale] = useState(baseScale);

  // New gradient-related states
  const [isGradientSelected, setIsGradientSelected] = useState(false);
  const [lightnessPercent, setLightnessPercent] = useState(50);
  const [gradientDegree, setGradientDegree] = useState(45);

  // This function would apply gradient logic based on the current colors, lightnessPercent, and gradientDegree.
  // Replace with your actual gradient logic.
  const convertToGradient = () => {
    // Example: Create a simple linear gradient for the background
    // using the accent color and a lightened version of the background color.
    // You could use any color manipulation library or logic here.
    const lightenedColor = lightenColor(backgroundColor, lightnessPercent);
    const gradientValue = `linear-gradient(${gradientDegree}deg, ${backgroundColor}, ${lightenedColor})`;

    const root = document.documentElement;
    root.style.setProperty("--background-color", gradientValue);
  };

  // Whenever percent or degree changes and gradient is selected, update the gradient
  useEffect(() => {
    if (isGradientSelected) {
      convertToGradient();
    }
  }, [lightnessPercent, gradientDegree, isGradientSelected]);

  // Apply variables to root
  useEffect(() => {
    const root = document.documentElement;

    // If gradient is not selected, use solid colors; if selected, gradient logic runs above.
    const colorVariables = {
      "--accent-color": accentColor,
      "--background-color": isGradientSelected
        ? root.style.getPropertyValue("--background-color")
        : backgroundColor,
      "--button-active-background": buttonActiveBackground,
      "--button-background": buttonBackground,
      "--button-border-color": buttonBorderColor,
      "--button-hover-background": buttonHoverBackground,
      "--button-text-color": buttonTextColor,
      "--shadow-color": shadowColor,
      "--text-color": textColor,
    };

    const allColorsAreSet = Object.values(colorVariables).every(
      (color) => color !== "default"
    );

    if (allColorsAreSet && !isGradientSelected) {
      Object.entries(colorVariables).forEach(([variable, value]) => {
        root.style.setProperty(variable, value);
      });
    }
  }, [
    accentColor,
    backgroundColor,
    buttonActiveBackground,
    buttonBackground,
    buttonBorderColor,
    buttonHoverBackground,
    shadowColor,
    textColor,
    buttonTextColor,
    isGradientSelected,
  ]);

  // Array of dialog names to cycle through
  const dialogNames = [
    "LookupDialog",
    "LookupInputDialog",
    "LookupResultDialog",
    "ErrorDialog",
    "PinInputDialog",
    "TimeoutDialog",
  ];

  // Index to track which dialog is currently being displayed
  const [dialogIndex, setDialogIndex] = useState<number>(0);

  // Function to switch the active dialog
  const openDialog = (dialogName: string) => {
    setActiveDialog(dialogName);
    setTimer(60000);
    setTimeout(() => {
      setTimer(3000);
    }, 60000);
  };

  const closeDialog = () => {
    setActiveDialog(null);
  };

  // Rotate dialogs automatically
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDialogIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % dialogNames.length;
        setActiveDialog(dialogNames[nextIndex]);
        return nextIndex;
      });
    }, timer);
    return () => clearInterval(intervalId);
  }, [timer]);

  return (
    <div className="konami-container">
      {activeDialog === "LookupDialog" && <LookupDialog animate="true" />}
      {activeDialog === "LookupInputDialog" && (
        <LookupInputDialog animate="true" />
      )}
      {activeDialog === "LookupResultDialog" && (
        <LookupResultDialog animate="true" />
      )}
      {activeDialog === "ErrorDialog" && <ErrorDialog animate="true" />}
      {activeDialog === "PinInputDialog" && <PinInputDialog animate="true" />}
      {activeDialog === "TimeoutDialog" && <TimeoutDialog animate="true" />}

      <div className="theme-picker-container">
        <div className="dialog-picker">
          <div className="dialog-switch-buttons">
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("LookupDialog")}
            >
              Open LookupDialog
            </button>
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("LookupInputDialog")}
            >
              Open LookupInputDialog
            </button>
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("LookupResultDialog")}
            >
              Open LookupResultDialog
            </button>
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("ErrorDialog")}
            >
              Open ErrorDialog
            </button>
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("PinInputDialog")}
            >
              Open PinInputDialog
            </button>
            <button
              className="dialog-switch-button"
              onClick={() => openDialog("TimeoutDialog")}
            >
              Open TimeoutDialog
            </button>
          </div>
        </div>

        <div className="theme-picker">
          {/* Background Color */}
          <VariableBox
            label="Background Color"
            variableName="background-color"
            baseColor={baseBackgroundColor}
            colorValue={backgroundColor}
            onColorChange={(val) => setBackgroundColor(val)}
            onBaseColorChange={(val) => setBaseBackgroundColor(val)}
          />

          {/* Accent Color */}
          <VariableBox
            label="Accent Color"
            variableName="accent-color"
            baseColor={baseAccentColor}
            colorValue={accentColor}
            onColorChange={(val) => setAccentColor(val)}
            onBaseColorChange={(val) => setBaseAccentColor(val)}
          />

          {/* Text Color */}
          <VariableBox
            label="Text Color"
            variableName="text-color"
            baseColor={baseTextColor}
            colorValue={textColor}
            onColorChange={(val) => setTextColor(val)}
            onBaseColorChange={(val) => setBaseTextColor(val)}
          />

          {/* Button Background */}
          <VariableBox
            label="Button Background"
            variableName="button-background"
            baseColor={baseButtonBackground}
            colorValue={buttonBackground}
            onColorChange={(val) => setButtonBackground(val)}
            onBaseColorChange={(val) => setBaseButtonBackground(val)}
          />

          {/* Button Hover Background */}
          <VariableBox
            label="Button Hover Background"
            variableName="button-hover-background"
            baseColor={baseButtonHoverBackground}
            colorValue={buttonHoverBackground}
            onColorChange={(val) => setButtonHoverBackground(val)}
            onBaseColorChange={(val) => setBaseButtonHoverBackground(val)}
          />

          {/* Button Active Background */}
          <VariableBox
            label="Button Active Background"
            variableName="button-active-background"
            baseColor={baseButtonActiveBackground}
            colorValue={buttonActiveBackground}
            onColorChange={(val) => setButtonActiveBackground(val)}
            onBaseColorChange={(val) => setBaseButtonActiveBackground(val)}
          />

          {/* Button Border Color */}
          <VariableBox
            label="Button Border Color"
            variableName="button-border-color"
            baseColor={baseButtonBorderColor}
            colorValue={buttonBorderColor}
            onColorChange={(val) => setButtonBorderColor(val)}
            onBaseColorChange={(val) => setBaseButtonBorderColor(val)}
          />

          {/* Button Text Color */}
          <VariableBox
            label="Button Text Color"
            variableName="button-text-color"
            baseColor={baseButtonTextColor}
            colorValue={buttonTextColor}
            onColorChange={(val) => setButtonTextColor(val)}
            onBaseColorChange={(val) => setBaseButtonTextColor(val)}
          />

          {/* Shadow Color */}
          <VariableBox
            label="Shadow Color"
            variableName="shadow-color"
            baseColor={baseShadowColor}
            colorValue={shadowColor}
            onColorChange={(val) => setShadowColor(val)}
            onBaseColorChange={(val) => setBaseShadowColor(val)}
          />
        </div>
      </div>
    </div>
  );
}
