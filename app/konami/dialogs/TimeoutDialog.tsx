"use client";
import { useEffect, useState } from "react";
import "../konami.scss";

type Props = {
  animate: string;
};

export default function TimeoutDialog({ animate }: Props) {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === "true" ? "animate" : ""}`}>
        <div className="custom-dialog-header">
          <h2>Yooo, You Still there?</h2>
        </div>
        <div className="custom-dialog-content">
          <p>
            Your session will timeout in {timeLeft} seconds due to inactivity.
            Please continue to use the app.
          </p>
        </div>
        <div className="custom-dialog-actions">
          <button
            className="dialog-button full"
            onClick={() => {
              setTimeLeft(30);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
