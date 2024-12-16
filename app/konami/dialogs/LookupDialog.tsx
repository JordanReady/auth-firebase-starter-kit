import "../konami.scss";

type Props = {
  animate: string;
};

export default function LookupDialog({ animate }: Props) {
  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === "true" ? "animate" : ""}`}>
        <div className="custom-dialog-header">
          <h2>Player Account Lookup</h2>
        </div>
        <div className="custom-dialog-content">
          <p>Please select how you want to look up your account:</p>
          <div className="lookup-options">
            <button className="lookup-button">Swipe Card</button>
            <button className="lookup-button">Phone Number</button>
            <button className="lookup-button">Patron ID</button>
          </div>
        </div>
        <div className="custom-dialog-actions">
          <button className="dialog-button cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}
