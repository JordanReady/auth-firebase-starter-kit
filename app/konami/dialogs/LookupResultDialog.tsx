"use client";
import { useState } from "react";
import "../konami.scss";

type Props = {
  animate: string;
};

export default function LookupResultDialog({ animate }: Props) {
  const [isHeld, setIsHeld] = useState(false);

  const handlePress = () => {
    setIsHeld(true);
  };
  const handleRelease = () => {
    setIsHeld(false);
  };

  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === "true" ? "animate" : ""}`}>
        <div className="custom-dialog-header">
          <h2>Jordan R</h2>
          <span className="custom-order-dialog-content mb">
            Your order total is $4.20.
          </span>
          <br />
          <span className="custom-order-dialog-content mb">
            You have enough Comp points and Slot points to pay for the order.
          </span>
          <br />
          <span className="custom-order-dialog-content">
            Select which payment you would like to use below.
          </span>
        </div>
        <div className="custom-dialog-content">
          <div className="lookup-result-container">
            <div className="lookup-result-left">
              <ul>
                <li>
                  <strong>Card Level</strong>
                  <br />
                  High Roller
                </li>
                <li>
                  <strong>Card Status</strong>
                  <br />
                  <span style={{ color: "green" }}>Acitve</span>
                </li>
              </ul>
            </div>
            <div className="lookup-result-right">
              <ul>
                <li>
                  <strong>Comp Point Balance</strong>
                  <br />
                  <span className={`${isHeld ? "" : "blurred"}`}>$783.39</span>
                </li>
                <li>
                  <strong>Slot Point Balance</strong>
                  <br />
                  <span className={`${isHeld ? "" : "blurred"}`}>$420.69</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <>
          <div className="custom-dialog-actions">
            <button className="dialog-button">Use Comp</button>

            <button className="dialog-button">Use Slot</button>
          </div>
          <br />

          <button
            className="dialog-button cancel-button full mb no-select"
            onTouchStart={handlePress}
            onTouchEnd={handleRelease}
          >
            Reveal Point Balance
          </button>

          <br />
          <button className="dialog-button cancel-button full">Back</button>
        </>

        <br />
      </div>
    </div>
  );
}
