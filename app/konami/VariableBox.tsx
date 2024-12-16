"use client";
import { useState, useEffect } from "react";

interface VariableBoxProps {
  label: string;
  variableName: string;
  baseColor: string; // The starting hex color (without gradient)
  colorValue: string; // The currently applied color (could be hex or gradient)
  onColorChange: (val: string) => void; // Called when final color (gradient or hex) changes
  onBaseColorChange: (val: string) => void; // Called when the base hex color changes
}

export default function VariableBox({
  label,
  variableName,
  baseColor,
  colorValue,
  onColorChange,
  onBaseColorChange,
}: VariableBoxProps) {
  const [percent, setPercent] = useState(0.2);
  const [degree, setDegree] = useState(145);
  const [isGradient, setIsGradient] = useState(false);

  // Utility function to lighten a hex color by a given percent p (0 to 1)
  function lightenColor(hex: string, p: number) {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, Math.floor((num >> 16) + 255 * p));
    const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + 255 * p));
    const b = Math.min(255, Math.floor((num & 0x0000ff) + 255 * p));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }

  // Generate a gradient based on current percent and degree using the baseColor
  const convertToGradient = (p: number, d: number) => {
    if (!baseColor.startsWith("#")) return; // ensure baseColor is hex
    const lighterColor = lightenColor(baseColor, p);
    const gradient = `linear-gradient(${d}deg, ${lighterColor}, ${baseColor})`;
    onColorChange(gradient);
  };

  // If isGradient is on, update the gradient when percent or degree changes
  useEffect(() => {
    if (isGradient) {
      convertToGradient(percent, degree);
    }
  }, [percent, degree]);

  // Extract the color values from the gradient or hex value
  const cleanColorValue = colorValue.startsWith("linear-gradient")
    ? colorValue.replace(/linear-gradient\([^,]+, (.*)\)/, "$1")
    : colorValue;

  return (
    <span className="css-variable-box">
      <span className="variable-name">{label}</span>
      <div className={`color-preview ${variableName}`}>
        <input
          type="color"
          className={`input ${variableName}`}
          value={
            colorValue.startsWith("linear-gradient") ? baseColor : colorValue
          }
          onChange={(e) => {
            const newBase = e.target.value;
            onBaseColorChange(newBase);
            // If gradient is off, directly set the chosen color
            // If gradient is on, recalculate the gradient
            if (isGradient) {
              convertToGradient(percent, degree);
            } else {
              onColorChange(newBase);
            }
          }}
        />
      </div>

      <div className="gradient-container">
        <button
          className="gradient-button"
          onClick={() => {
            if (!isGradient) {
              // Turning gradient on
              setIsGradient(true);
              convertToGradient(percent, degree);
            } else {
              // Turning gradient off - revert to base color
              setIsGradient(false);
              onColorChange(baseColor);
            }
          }}
        >
          {isGradient ? "Disable Gradient" : "Select Gradient"}
        </button>

        {/* Show sliders if gradient is selected, but they only apply if isGradient is true */}
        <div className="slider-container">
          <label
            className="percent-slider"
            htmlFor={`${variableName}-percent-slider`}
          >
            <span className="slider-label">Percent</span>
            <input
              id={`${variableName}-percent-slider`}
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={percent}
              onChange={(e) => setPercent(Number(e.target.value))}
              disabled={!isGradient}
            />
            <span className="value-display">{(percent * 100).toFixed(0)}%</span>
          </label>

          <label
            className="degree-slider"
            htmlFor={`${variableName}-degree-slider`}
          >
            <span className="slider-label">Degree</span>
            <input
              id={`${variableName}-degree-slider`}
              type="range"
              min="0"
              max="360"
              step="1"
              value={degree}
              onChange={(e) => setDegree(Number(e.target.value))}
              disabled={!isGradient}
            />
            <span className="value-display">{degree}°</span>
          </label>
        </div>
      </div>

      <span className="value-display">{cleanColorValue}</span>
    </span>
  );
}
