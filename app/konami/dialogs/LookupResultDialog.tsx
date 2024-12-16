import type { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/compat';
import '../konami.scss';

type LookupResultDialogProps = {
  total: number;
  lookupResult: any;
  pointsDisplayed: 'comp' | 'slot' | 'voucher' | 'compSlot' | 'compVoucher' | 'slotVoucher' | 'compSlotVoucher';
  displayPoints: any;
  onRedeemComp: () => void;
  onRedeemSlot: () => void;
  onRedeemVoucher: () => void;
  handleClose: () => void;
  handleContinue: () => void;
  playerResultOrderCompletePrompt: string;
  playerResultEnoughCompSlot: string;
  playerResultEnoughComp: string;
  playerResultEnoughSlot: string;
  playerResultNotEnough: string;
  playerResultPaymentPrompt: string;
  playerResultRedeemCompButton: string;
  playerResultRedeemSlotButton: string;
  playerResultRedeemVoucherButton: string;
  playerResultRevealButton: string;
  playerResultBackButton: string;
  playerResultContinueButton: string;
  animate: string;
};

export const LookupResultDialog: FunctionalComponent<LookupResultDialogProps> = ({
  total,
  lookupResult,
  pointsDisplayed,
  displayPoints,
  onRedeemComp,
  onRedeemSlot,
  onRedeemVoucher,
  handleClose,
  handleContinue,
  playerResultOrderCompletePrompt,
  playerResultEnoughCompSlot,
  playerResultEnoughComp,
  playerResultEnoughSlot,
  playerResultNotEnough,
  playerResultPaymentPrompt,
  playerResultRedeemCompButton,
  playerResultRedeemSlotButton,
  playerResultRedeemVoucherButton,
  playerResultRevealButton,
  playerResultBackButton,
  playerResultContinueButton,
  animate,
}) => {
  const [message, setMessage] = useState<string>('');
  const [pointsMessage, setPointsMessage] = useState<string>('');
  const [isHeld, setIsHeld] = useState<boolean>(false);

  // Store current comp and slot points in local state for updating after redemption
  const [currentCompPoints, setCurrentCompPoints] = useState<number>(lookupResult.CompPointsResponse?.Amount || 0);
  const [currentSlotPoints, setCurrentSlotPoints] = useState<number>(lookupResult.PointsResponse?.Amount || 0);

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  useEffect(() => {
    if (total !== 0) {
      setMessage(`Your order total is ${formatAmount(total)}.`);
    } else {
      setMessage(playerResultOrderCompletePrompt);
    }
  }, [total]);

  useEffect(() => {
    if (total > 0) {
      if (currentCompPoints >= total && currentSlotPoints >= total) {
        setPointsMessage(playerResultEnoughCompSlot);
      } else if (currentCompPoints >= total) {
        setPointsMessage(playerResultEnoughComp);
      } else if (currentSlotPoints >= total) {
        setPointsMessage(playerResultEnoughSlot);
      } else {
        setPointsMessage(playerResultNotEnough);
      }
    } else {
      setPointsMessage('');
    }
  }, [total, currentCompPoints, currentSlotPoints]);

  const formatCardholderName = (name: string) => {
    if (!name) return '';
    const [lastName, firstName] = name.split(', ');
    return `${firstName} ${lastName.charAt(0)}`;
  };

  const handlePress = () => {
    setIsHeld(true);
  };

  const handleRelease = () => {
    setIsHeld(false);
  };

  // Handle redeeming comp points
  const handleRedeemCompClick = () => {
    const newCompPoints = currentCompPoints - total;
    setCurrentCompPoints(newCompPoints);
    onRedeemComp();
  };

  // Handle redeeming slot points
  const handleRedeemSlotClick = () => {
    const newSlotPoints = currentSlotPoints - total;
    setCurrentSlotPoints(newSlotPoints);
    onRedeemSlot();
  };

  return (
    <div className="custom-dialog-backdrop">
      <div className={`custom-dialog ${animate === 'true' ? 'animate' : ''}`}>
        <div className="custom-dialog-header">
          <h2>{formatCardholderName(lookupResult.CardResponse?.CardholderName)}</h2>
          <span className="custom-order-dialog-content mb">{message}</span>
          <br />
          <span className="custom-order-dialog-content mb">{pointsMessage}</span>
          <br />
          {total > 0 && pointsMessage !== playerResultNotEnough && <span className="custom-order-dialog-content">{playerResultPaymentPrompt}</span>}
        </div>
        <div className="custom-dialog-content">
          {displayPoints === 'true' && (
            <div className="lookup-result-container">
              <div className="lookup-result-left">
                <ul>
                  <li>
                    <strong>Card Level</strong>
                    <br />
                    {lookupResult.CardResponse?.CardLevel}
                  </li>
                  <li>
                    <strong>Card Status</strong>
                    <br />
                    <span style={{ color: lookupResult.CardResponse?.CardStatus === 'Active' ? 'green' : 'red' }}>{lookupResult.CardResponse?.CardStatus}</span>
                  </li>
                </ul>
              </div>
              <div className="lookup-result-right">
                <ul>
                  {pointsDisplayed === 'comp' && (
                    <li>
                      <strong>Comp Point Balance</strong>
                      <br />
                      <span className={`${isHeld ? '' : 'blurred'}`}>{formatAmount(currentCompPoints)}</span>
                    </li>
                  )}
                  {pointsDisplayed === 'slot' && (
                    <li>
                      <strong>Slot Point Balance</strong>
                      <br />
                      <span className={`${isHeld ? '' : 'blurred'}`}>{formatAmount(currentSlotPoints)}</span>
                    </li>
                  )}
                  {pointsDisplayed === 'voucher' && (
                    <li>
                      <strong>Vouchers Available</strong>
                      <br />
                      <span className={`${isHeld ? '' : 'blurred'}`}>Vouchers Available</span>
                    </li>
                  )}
                  {pointsDisplayed === 'compSlot' && (
                    <>
                      <li>
                        <strong>Comp Point Balance</strong>
                        <br />
                        <span className={`${isHeld ? '' : 'blurred'}`}>{formatAmount(currentCompPoints)}</span>
                      </li>
                      <li>
                        <strong>Slot Point Balance</strong>
                        <br />
                        <span className={`${isHeld ? '' : 'blurred'}`}>{formatAmount(currentSlotPoints)}</span>
                      </li>
                    </>
                  )}
                  {pointsDisplayed === 'compVoucher' && (
                    <>
                      <li>
                        <strong>Comp Point Balance</strong>
                        <br />
                        <span className={`${isHeld ? '' : 'blurred'}`}>{formatAmount(currentCompPoints)}</span>
                      </li>
                      <li>
                        <strong>Vouchers Available</strong>
                        <br />
                        <span className={`${isHeld ? '' : 'blurred'}`}>Vouchers Available</span>
                      </li>
                    </>
                  )}
                  {pointsDisplayed === 'slotVoucher' && (
                    <>
                      <li>
                        <strong>Slot Point Balance</strong>
                        <br />
                        <span className={`${isHeld ? '' : 'blurred'}`}>{formatAmount(currentSlotPoints)}</span>
                      </li>
                      <li>
                        <strong>Vouchers Available</strong>
                        <br />
                        <span className={`${isHeld ? '' : 'blurred'}`}>Vouchers Available</span>
                      </li>
                    </>
                  )}
                  {pointsDisplayed === 'compSlotVoucher' && (
                    <>
                      <li>
                        <strong>Comp Point Balance</strong>
                        <br />
                        <span className={`${isHeld ? '' : 'blurred'}`}>{formatAmount(currentCompPoints)}</span>
                      </li>
                      <li>
                        <strong>Slot Point Balance</strong>
                        <br />
                        <span className={`${isHeld ? '' : 'blurred'}`}>{formatAmount(currentSlotPoints)}</span>
                      </li>
                      <li>
                        <strong>Vouchers Available</strong>
                        <br />
                        <span className={`${isHeld ? '' : 'blurred'}`}>No Vouchers Available</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        {total !== 0 && (
          <>
            <div className="custom-dialog-actions">
              {/* Show Comp Redeem Button only if we have enough comp points */}
              {pointsDisplayed.toLowerCase().includes('comp') && currentCompPoints >= total && (
                <button className="dialog-button" onClick={handleRedeemCompClick}>
                  {playerResultRedeemCompButton}
                </button>
              )}

              {/* Show Slot Redeem Button only if we have enough slot points */}
              {pointsDisplayed.toLowerCase().includes('slot') && currentSlotPoints >= total && (
                <button className="dialog-button" onClick={handleRedeemSlotClick}>
                  {playerResultRedeemSlotButton}
                </button>
              )}

              {/* Show Voucher Redeem Button only if desired */}
              {pointsDisplayed.toLowerCase().includes('voucher') && (
                <button className="dialog-button" onClick={onRedeemVoucher}>
                  {playerResultRedeemVoucherButton}
                </button>
              )}
            </div>
            <br />
            {displayPoints === 'true' && (
              <button className="dialog-button cancel-button full mb no-select" onTouchStart={handlePress} onTouchEnd={handleRelease}>
                {playerResultRevealButton}
              </button>
            )}
            <br />
            <button className="dialog-button cancel-button full" onClick={handleClose}>
              {playerResultBackButton}
            </button>
          </>
        )}
        <br />
        {total === 0 && (
          <>
            {displayPoints === 'true' && (
              <button className="dialog-button cancel-button full mb no-select" onTouchStart={handlePress} onTouchEnd={handleRelease}>
                {playerResultRevealButton}
              </button>
            )}
            <br />
            <button className="dialog-button full" onClick={handleContinue}>
              {playerResultContinueButton}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LookupResultDialog;
