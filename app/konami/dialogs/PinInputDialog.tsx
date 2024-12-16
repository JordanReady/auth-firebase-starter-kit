import type { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/compat';
import '../konami.scss';

type PinInputDialogProps = {
  pinValue: string;
  onPinValueChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  onBackspace: () => void;
  onClear: () => void;
  pinPrompt: string;
  animate: string;
};

export const PinInputDialog: FunctionalComponent<PinInputDialogProps> = ({ pinValue, onPinValueChange, onSubmit, onClose, onBackspace, onClear, pinPrompt, animate }) => {
  useEffect(() => {
    if (pinValue.length === 4) {
      onSubmit();
    }
  }, [pinValue, onSubmit]);

  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === 'true' ? 'animate' : ''}`}>
        <div className="custom-dialog-header">
          <h2>{pinPrompt}</h2>
        </div>
        <div className="custom-dialog-content">
          <input type="password" value={pinValue} placeholder="Enter PIN" className="lookup-input" readOnly />
          <div className="keyboard-container">
            <div className="pinpad-container">
              <div className="keyboard-row">
                {[...'123'].map((key) => (
                  <button key={key} className="keyboard-key" onClick={() => onPinValueChange(key)}>
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                {[...'456'].map((key) => (
                  <button key={key} className="keyboard-key" onClick={() => onPinValueChange(key)}>
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                {[...'789'].map((key) => (
                  <button key={key} className="keyboard-key" onClick={() => onPinValueChange(key)}>
                    {key}
                  </button>
                ))}
              </div>
              <div className="keyboard-row">
                <button className="keyboard-key" onClick={() => onPinValueChange('0')}>
                  0
                </button>
              </div>
              <div className="dialog-row">
                <button className="dialog-button" onClick={onBackspace}>
                  Backspace
                </button>
                <button className="dialog-button" onClick={onClear}>
                  Clear
                </button>
                <button className="dialog-button cancel-button" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinInputDialog;
