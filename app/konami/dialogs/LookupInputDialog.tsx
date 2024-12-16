import type { FunctionalComponent } from "preact";
import { useEffect } from "preact/compat";
import "../konami.scss";

type Props = {
  animate: string;
};

export default function LookupInputDialog({ animate }: Props) {
  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === "true" ? "animate" : ""}`}>
        <div className="custom-dialog-header">
          <h2>Please Swipe Your Card</h2>
        </div>
        <div className="custom-dialog-content">
          <input
            type="password"
            placeholder={`Enter info here`}
            className="lookup-input"
          />
        </div>

        <div className="custom-dialog-actions">
          <button className="dialog-button cancel-button">Cancel</button>
          <button className="dialog-button submit-button">Submit</button>
        </div>
      </div>

      <div className={`card-prompt ${animate === "true" ? "animate" : ""}`}>
        <div className="card-text">
          <p>Swipe card below</p>
        </div>
        <div className="card-reader"></div>
        <div className="card ">
          <div className="card-barcode"></div>
          <div className="card-line"></div>
        </div>
      </div>
    </div>
  );
}
