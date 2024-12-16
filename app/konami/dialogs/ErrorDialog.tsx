import type { FunctionalComponent } from 'preact';
import '../konami.scss';

type ErrorDialogProps = {
  pinValue?: string;
  lookupType: string;
  lookupValue: string;
  errorMessage: string;
  onRetry: () => void;
  onClose: () => void;
  errorHelpPrompt?: string;
  animate: string;
};

export const ErrorDialog: FunctionalComponent<ErrorDialogProps> = ({ pinValue, lookupType, lookupValue, errorMessage, onRetry, onClose, errorHelpPrompt, animate }) => {
  const handleRetry = () => {
    onRetry();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === 'true' ? 'animate' : ''}`}>
        <div className="custom-dialog-header">
          <h2>Error</h2>
        </div>
        <div className="custom-dialog-content">
          {(() => {
            if (errorMessage.includes('Redeem CompPoints failed. Amount must be greater than zero')) {
              return (
                <p>
                  Redeem Comp Points failed. The amount total must be greater than zero. It is likely you have already completed payment for your order. Check your acount balance and try again if
                  necessary. {errorHelpPrompt}
                </p>
              );
            } else if (errorMessage.includes('An error occurred during redeeming slot points. Please verify your information and try again later.')) {
              return <p>An error occurred during redeeming slot points. Please verify your information and try again later. {errorHelpPrompt}</p>;
            } else if (errorMessage.includes('Redeem Voucher failed.')) {
              return <p>Redeem Voucher failed. The voucher ID provided is invalid. Please verify the voucher information and try again. {errorHelpPrompt}</p>;
            } else if (errorMessage.includes('Lookup failed for Card:') && errorMessage.includes('Unknown error')) {
              return (
                <p>
                  Lookup failed for Card: <strong>{lookupValue}</strong>. An unknown error occurred. Please try again or {errorHelpPrompt}.
                </p>
              );
            } else if (errorMessage.includes('PIN validation failed. (F11) Error: Invalid Patron PIN.')) {
              return (
                <p>
                  PIN validation failed. The PIN: <strong>{pinValue}</strong> is invalid. Please verify your PIN and try again. {errorHelpPrompt}
                </p>
              );
            } else if (errorMessage.includes('PIN validation failed. (F15) Error: This Patron card is locked due to invalid PIN.')) {
              return <p>This Patron card is locked due to multiple invalid PIN attempts. {errorHelpPrompt}</p>;
            } else if (errorMessage.includes('Redeem SlotPoints failed. Amount must be greater than zero')) {
              return (
                <p>
                  Redeem Slot Points failed. The amount must be greater than zero. It is likely you have already completed payment for your order. Check your acount balance and try again if necessary.{' '}
                  {errorHelpPrompt}
                </p>
              );
            } else if (pinValue && pinValue.length > 0) {
              return (
                <p>
                  The PIN you entered is incorrect. You entered: <strong>{pinValue}</strong>. Please double-check your PIN and try again. {errorHelpPrompt}
                </p>
              );
            } else {
              return (
                <>
                  <p>
                    You tried an account lookup using <strong>{lookupType}</strong> with the value: <strong>{lookupValue}</strong>.
                  </p>
                  <p>Please double-check the information entered. Make sure it matches the details on your account. {errorHelpPrompt}</p>
                </>
              );
            }
          })()}
        </div>
        <div className="custom-dialog-actions">
          <button className="dialog-button retry-button" onClick={handleRetry}>
            Try Again
          </button>
          <button className="dialog-button cancel-button" onClick={handleClose}>
            Close
          </button>
        </div>
        <p className="custom-dialog-content">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorDialog;
