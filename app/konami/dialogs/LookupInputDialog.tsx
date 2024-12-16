import type { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/compat';
import '../konami.scss';

type LookupInputDialogProps = {
  manualEntry: string;
  lookupType: string;
  lookupValue: string;
  onLookupValueChange: (any) => void;
  onSubmit: () => void;
  onClose: () => void;
  onKeyboardInput: (value: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  cardSwipePrompt: string;
  phoneNumberPrompt: string;
  patronIdPrompt: string;
  cardSwipe: () => void;
  animate: string;
};

export const LookupInputDialog: FunctionalComponent<LookupInputDialogProps> = ({
  manualEntry,
  lookupType,
  lookupValue,
  onLookupValueChange,
  onSubmit,
  onClose,
  onKeyboardInput,
  onBackspace,
  onClear,
  cardSwipePrompt,
  phoneNumberPrompt,
  patronIdPrompt,
  cardSwipe,
  animate,
}) => {
  useEffect(() => {}, [manualEntry]);
  useEffect(() => {
    if (lookupType === 'Card') {
      cardSwipe();
    }
  }, []);

  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === 'true' ? 'animate' : ''}`}>
        <div className="custom-dialog-header">
          {lookupType === 'Card' && <h2>{cardSwipePrompt}</h2>}
          {lookupType === 'Phone' && <h2>{phoneNumberPrompt}</h2>}
          {lookupType === 'Patron' && <h2>{patronIdPrompt}</h2>}
        </div>
        <div className="custom-dialog-content">
          <input type={lookupType === 'Card' ? 'password' : 'text'} value={lookupValue} onChange={onLookupValueChange} placeholder={`Enter ${lookupType} here`} className="lookup-input" />
        </div>
        {(lookupType === 'Phone' || lookupType === 'Patron') && (
          <div className="keyboard-container">
            <div className="pinpad-container">
              <div className="keyboard-row">
                {[...'123'].map((key) => (
                  <button key={key} className="keyboard-key" onClick={() => onKeyboardInput(key)}>
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                {[...'456'].map((key) => (
                  <button key={key} className="keyboard-key" onClick={() => onKeyboardInput(key)}>
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                {[...'789'].map((key) => (
                  <button key={key} className="keyboard-key" onClick={() => onKeyboardInput(key)}>
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                <button className="keyboard-key" onClick={() => onKeyboardInput('0')}>
                  0
                </button>
              </div>
              <div className="keyboard-row">
                <button className="keyboard-key" onClick={onBackspace}>
                  Backspace
                </button>
                <button className="keyboard-key" onClick={onClear}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
        {lookupType === 'Card' && manualEntry === 'true' && (
          <div className="keyboard-container">
            <div className="pinpad-container">
              <div className="keyboard-row">
                {[...'123'].map((key) => (
                  <button key={key} className="keyboard-key" onClick={() => onKeyboardInput(key)}>
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                {[...'456'].map((key) => (
                  <button key={key} className="keyboard-key" onClick={() => onKeyboardInput(key)}>
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                {[...'789'].map((key) => (
                  <button key={key} className="keyboard-key" onClick={() => onKeyboardInput(key)}>
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                <button className="keyboard-key" onClick={() => onKeyboardInput('0')}>
                  0
                </button>
              </div>
              <div className="keyboard-row">
                <button className="keyboard-key" onClick={onBackspace}>
                  Backspace
                </button>
                <button className="keyboard-key" onClick={onClear}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="custom-dialog-actions">
          <button className="dialog-button cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="dialog-button submit-button" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
      {lookupType === 'Card' && (
        <div className={`card-prompt ${animate === 'true' ? 'animate' : ''}`}>
          <div className="card-text">
            <p>Swipe card below</p>
          </div>
          <div className="card-reader"></div>
          <div className="card ">
            <div className="card-barcode"></div>
            <div className="card-line"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LookupInputDialog;
