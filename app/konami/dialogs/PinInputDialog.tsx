import { useEffect } from "react";
import "../konami.scss";

type Props = {
  animate: string;
};

export default function PinInputDialog({ animate }: Props) {
  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === "true" ? "animate" : ""}`}>
        <div className="custom-dialog-header">
          <h2>Enter your PIN</h2>
        </div>
        <div className="custom-dialog-content">
          <input
            type="password"
            placeholder="Enter PIN"
            className="lookup-input"
            readOnly
          />
          <div className="keyboard-container">
            <div className="pinpad-container">
              <div className="keyboard-row">
                {Array.from("123").map((key) => (
                  <button key={key} className="keyboard-key">
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                {Array.from("456").map((key) => (
                  <button key={key} className="keyboard-key">
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                {Array.from("789").map((key) => (
                  <button key={key} className="keyboard-key">
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                <button className="keyboard-key">0</button>
              </div>
              <div className="dialog-row">
                <button className="dialog-button">Backspace</button>
                <button className="dialog-button">Clear</button>
                <button className="dialog-button cancel-button">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
