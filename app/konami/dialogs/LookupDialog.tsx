import type { FunctionalComponent } from 'preact';
import '../konami.scss';

type LookupDialogProps = {
  lookupSelection: string;
  aspectRatio: string;
  customLogoURL: string;
  onClose: () => void;
  onLookupTypeChange: (type: string) => void;
  LookupTitle: string;
  LookupPrompt: string;
  animate: string;
};

export const LookupDialog: FunctionalComponent<LookupDialogProps> = ({ onClose, onLookupTypeChange, lookupSelection, aspectRatio, customLogoURL, LookupTitle, LookupPrompt, animate }) => {
  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === 'true' ? 'animate' : ''}`}>
        {customLogoURL !== 'default' && <div class={`custom-logo-${aspectRatio}`} style={{ backgroundImage: `url('${customLogoURL}')`, backgroundSize: '100% 100%' }}></div>}

        <div className="custom-dialog-header">
          <h2>{LookupTitle}</h2>
        </div>
        <div className="custom-dialog-content">
          <p>{LookupPrompt}</p>
          <div className="lookup-options">
            {(lookupSelection === 'card' || lookupSelection === 'cardPhone' || lookupSelection === 'cardPatronID' || lookupSelection === 'cardPhonePatronID') && (
              <button className="lookup-button" onClick={() => onLookupTypeChange('Card')}>
                Swipe Card
              </button>
            )}

            {(lookupSelection === 'phone' || lookupSelection === 'cardPhone' || lookupSelection === 'cardPhonePatronID' || lookupSelection === 'phonePatronID') && (
              <button className="lookup-button" onClick={() => onLookupTypeChange('Phone')}>
                Phone Number
              </button>
            )}

            {(lookupSelection === 'PatronID' || lookupSelection === 'cardPatronID' || lookupSelection === 'cardPhonePatronID' || lookupSelection === 'phonePatronID') && (
              <button className="lookup-button" onClick={() => onLookupTypeChange('Patron')}>
                Patron ID
              </button>
            )}
          </div>
        </div>
        <div className="custom-dialog-actions">
          <button className="dialog-button cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LookupDialog;
