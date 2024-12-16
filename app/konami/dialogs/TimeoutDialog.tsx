import type { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/compat';
import '../konami.scss';

type TimeoutDialogProps = {
  onContinue: Function;
  onTimeout: Function;
  timeoutTitle?: string;
  timeoutPrompt?: string;
  animate: string;
};

export const TimeoutDialog: FunctionalComponent<TimeoutDialogProps> = ({ onContinue, onTimeout, timeoutTitle, timeoutPrompt, animate }) => {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        onTimeout();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === 'true' ? 'animate' : ''}`}>
        <div className="custom-dialog-header">
          <h2>{timeoutTitle}</h2>
        </div>
        <div className="custom-dialog-content">
          <p>
            Your session will timeout in {timeLeft} seconds due to inactivity. {timeoutPrompt}
          </p>
        </div>
        <div className="custom-dialog-actions">
          <button
            className="dialog-button full"
            onClick={() => {
              onContinue();
              setTimeLeft(30);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeoutDialog;
