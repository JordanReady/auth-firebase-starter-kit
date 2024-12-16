import type { FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/compat';
import { useNavigate } from 'react-router-dom';
import './konami.scss';
import { useCart } from '../cart/hooks/cart.hook';

// Import the dialog components
import { LookupDialog } from './dialogs/LookupDialog';
import { LookupInputDialog } from './dialogs/LookupInputDialog';
import { LookupResultDialog } from './dialogs/LookupResultDialog';
import { ErrorDialog } from './dialogs/ErrorDialog';
import { PinInputDialog } from './dialogs/PinInputDialog';
import { TimeoutDialog } from './dialogs/TimeoutDialog';

type Props = {};

export const KonamiPayment: FunctionalComponent<Props> = () => {
  // Allow the user to navigate to different pages
  const navigate = useNavigate();

  // Get order total from shopping cart
  const [total, setTotal] = useState<number>(0);
  const shoppingCart = useCart();

  useEffect(() => {
    const subtotal = shoppingCart.state.totals.subtotal ?? 0;
    const tax = shoppingCart.state.totals.tax ?? 0;
    const computedTotal = subtotal + tax;
    setTotal(computedTotal);
  }, [shoppingCart.state.totals]);

  // Timeout dialog states
  const [timeLeft, setTimeLeft] = useState(60); // 60-second timer
  const [isTimeout, setIsTimeout] = useState(false);

  // Dialog states
  const [openLookupDialog, setopenLookupDialog] = useState(true);
  const [openLookupInputDialog, setOpenLookupInputDialog] = useState(false);
  const [openPinInputDialog, setOpenPinInputDialog] = useState(false);
  const [openLookupResultDialog, setOpenLookupResultDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openTimeoutDialog, setOpenTimeoutDialog] = useState(false);

  // User input states
  const [lookupType, setLookupType] = useState('Card');
  const [lookupValue, setLookupValue] = useState<any>('');
  const [pinValue, setPinValue] = useState('');

  //Api response states
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [settings, setSettings] = useState<any>(null);

  // Configuration
  const [animate, setAnimate] = useState<any>('true');
  const [pointsDisplayed, setPointsDisplayed] = useState<any>('compSlotVoucher');
  const [displayPoints, setDisplayPoints] = useState<any>('default');
  const [customLogoRatio, setCustomLogoRatio] = useState<any>('square');
  const [customLogoURL, setCustomLogoURL] = useState<any>('default');
  const [manualEntry, setManualEntry] = useState('false');
  const [lookupSelection, setLookupSelection] = useState<any>('Card');
  const [scale, setScale] = useState<any>('default');
  const [unitId, setUnitId] = useState<any>('default');

  // Theme states
  const [theme, setTheme] = useState<any>('default');
  const [accentColor, setAccentColor] = useState<any>('default');
  const [backgroundColor, setBackgroundColor] = useState<any>('default');
  const [buttonActiveBackground, setButtonActiveBackground] = useState<any>('default');
  const [buttonBackground, setButtonBackground] = useState<any>('default');
  const [buttonBorderColor, setButtonBorderColor] = useState<any>('default');
  const [buttonHoverBackground, setButtonHoverBackground] = useState<any>('default');
  const [buttonTextColor, setButtonTextColor] = useState<any>('default');
  const [shadowColor, setShadowColor] = useState<any>('default');
  const [textColor, setTextColor] = useState<any>('default');

  // Dialog states
  const [lookupTitle, setLookupTitle] = useState<string>('text');
  const [lookupPrompt, setLookupPrompt] = useState<string>('text');
  const [cardSwipePrompt, setCardSwipePrompt] = useState<string>('Enter Konami Account Info Or Swipe Card');
  const [phoneNumberPrompt, setPhoneNumberPrompt] = useState<string>('text');
  const [patronIdPrompt, setPatronIdPrompt] = useState<string>('text');
  const [pinPrompt, setPinPrompt] = useState<string>('text');
  const [playerResultOrderCompletePrompt, setPlayerResultOrderCompletePrompt] = useState<string>('text');
  const [playerResultEnoughCompSlot, setPlayerResultEnoughCompSlot] = useState<string>('text');
  const [playerResultEnoughComp, setPlayerResultEnoughComp] = useState<string>('text');
  const [playerResultEnoughSlot, setPlayerResultEnoughSlot] = useState<string>('text');
  const [playerResultNotEnough, setPlayerResultNotEnough] = useState<string>('text');
  const [playerResultPaymentPrompt, setPlayerResultPaymentPrompt] = useState<string>('text');
  const [playerResultRedeemCompButton, setPlayerResultRedeemCompButton] = useState<string>('text');
  const [playerResultRedeemSlotButton, setPlayerResultRedeemSlotButton] = useState<string>('text');
  const [playerResultRedeemVoucherButton, setPlayerResultRedeemVoucherButton] = useState<string>('text');
  const [playerResultRevealButton, setPlayerResultRevealButton] = useState<string>('text');
  const [playerResultBackButton, setPlayerResultBackButton] = useState<string>('text');
  const [playerResultContinueButton, setPlayerResultContinueButton] = useState<string>('text');
  const [timeoutTitle, setTimeoutTitle] = useState<string>('text');
  const [timeoutPrompt, setTimeoutPrompt] = useState<string>('text');
  const [errorHelpPrompt, setErrorHelpPrompt] = useState<string>('text');

  // if all the variables have custom values, set the custom theme
  useEffect(() => {
    const root = document.documentElement;
    if (
      accentColor !== 'default' &&
      backgroundColor !== 'default' &&
      buttonActiveBackground !== 'default' &&
      buttonBackground !== 'default' &&
      buttonBorderColor !== 'default' &&
      buttonHoverBackground !== 'default' &&
      shadowColor !== 'default' &&
      textColor !== 'default' &&
      buttonTextColor !== 'default'
    ) {
      root.style.setProperty('--accent-color', accentColor);
      root.style.setProperty('--background-color', backgroundColor);
      root.style.setProperty('--button-active-background', buttonActiveBackground);
      root.style.setProperty('--button-background', buttonBackground);
      root.style.setProperty('--button-border-color', buttonBorderColor);
      root.style.setProperty('--button-hover-background', buttonHoverBackground);
      root.style.setProperty('--button-text-color', buttonTextColor);
      root.style.setProperty('--shadow-color', shadowColor);
      root.style.setProperty('--text-color', textColor);
    }
  }, [accentColor, backgroundColor, buttonActiveBackground, buttonBackground, buttonBorderColor, buttonHoverBackground, shadowColor, textColor]);

  // if the scale is custom, set the scale variable in scss
  useEffect(() => {
    const root = document.documentElement;
    if (scale !== 'default') {
      root.style.setProperty('--scale', scale);
    }
  }, [scale]);

  // Card swipe prompt effect
  async function listenForCardSwipe() {
    try {
      // Make a request to fetch swipe data
      const response = await fetch('http://localhost:8088/otms/DataStore/getmsrdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('sent getmsrdata request');

      // Handle non-OK responses
      if (!response.ok) {
        console.error('Network response was not ok:', response.statusText);
        return null;
      }

      // Parse the response data
      const msrResponse = await response.json();

      // Check for timeout
      if (msrResponse.TimeoutReached) {
        console.warn('Card swipe timeout reached.');
        console.log('msrResponse:', msrResponse);
        setopenLookupDialog(false);

        return null;
      }

      let swipeData = msrResponse.SwipeData;
      console.log('Swipe Data received:', swipeData);

      if (swipeData !== '') {
        setLookupValue(swipeData);
        handleLookupSwipe(swipeData);
      }

      return swipeData;
    } catch (error) {
      console.error('Error during card swipe:', error);
      return null;
    }
  }

  const handleLookupSwipe = async (search) => {
    try {
      const response = await fetch('http://localhost:8088/otms/konami/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Search: search,
          UnitId: unitId,
          LookupType: lookupType,
          ShowPoints: true,
        }),
      });
      const data = await response.json();
      if (data.Success) {
        console.log('Lookup successful:', data);
        setLookupResult(data);
        setOpenPinInputDialog(true); // Open the PIN dialog before showing the result
      } else {
        console.error('Lookup failed:', data.Error);
        setErrorMessage(`Lookup failed for ${lookupType}: "${search}". ${data.Error || 'Please check your information and try again.'}`);
        setOpenErrorDialog(true); // Open the error dialog
      }
    } catch (error) {
      console.error('Error during lookup:', error);
      setErrorMessage(`An error occurred during the lookup for ${lookupType}: "${lookupValue}". Please verify your information and try again later.`);
      setOpenErrorDialog(true); // Open the error dialog
    }
    setOpenLookupInputDialog(false);
  };

  // Fetch settings and setting states
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:8088/otms/konami/getsettings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        // Applying the settings
        setSettings(data);
        console.log('Settings:', data);
        // Applying the theme
        if (data.Theme === 'Custom') {
          setTheme(data.CustomTheme);
          setAccentColor(data.CustomTheme.accentColor);
          setBackgroundColor(data.CustomTheme.backgroundColor);
          setButtonActiveBackground(data.CustomTheme.buttonActiveBackground);
          setButtonBackground(data.CustomTheme.buttonBackground);
          setButtonBorderColor(data.CustomTheme.buttonBorderColor);
          setButtonHoverBackground(data.CustomTheme.buttonHoverBackground);
          setButtonTextColor(data.CustomTheme.buttonTextColor);
          setShadowColor(data.CustomTheme.shadowColor);
          setTextColor(data.CustomTheme.textColor);
        }
        if (data.Theme === 'Ocean') {
          setTheme(data.Theme);
          setAccentColor('#0077b6');
          setBackgroundColor('#1b2a3f');
          setButtonActiveBackground('#005f73');
          setButtonBackground('linear-gradient(145deg, #0096c7, #00b4d8)');
          setButtonBorderColor('#0096c7');
          setButtonHoverBackground('linear-gradient(145deg, #0077b6, #023e8a)');
          setButtonTextColor('#ffffff');
          setShadowColor('rgba(0, 600, 199, 0.4)');
          setTextColor('#ffffff');
        }

        if (data.Theme === 'Hornet') {
          setTheme(data.Theme);
          setAccentColor('#ffb703');
          setBackgroundColor('#2f2b1b');
          setButtonActiveBackground('#cc7a00');
          setButtonBackground('linear-gradient(145deg, #ffca3a, #ffb703)');
          setButtonBorderColor('#ffb703');
          setButtonHoverBackground('linear-gradient(145deg, #ffb703, #ff8c00)');
          setButtonTextColor('#ffffff');
          setShadowColor('rgba(255, 183, 3, 0.4)');
          setTextColor('#ffffff');
        }

        if (data.Theme === 'Leaf') {
          setTheme(data.Theme);
          setAccentColor('#28a745');
          setBackgroundColor('#1b3f2f');
          setButtonActiveBackground('#1a6932');
          setButtonBackground('linear-gradient(145deg, #34d058, #28a745)');
          setButtonBorderColor('#28a745');
          setButtonHoverBackground('linear-gradient(145deg, #28a745, #1c7c3f)');
          setButtonTextColor('#ffffff');
          setShadowColor('rgba(40, 167, 69, 0.4)');
          setTextColor('#ffffff');
        }

        if (data.Theme === 'Rose') {
          setTheme(data.Theme);
          setAccentColor('grey');
          setBackgroundColor('#ffffff');
          setButtonActiveBackground('#e83e8c');
          setButtonBackground('linear-gradient(145deg, #ff6b81, #e63946)');
          setButtonBorderColor('#e63946');
          setButtonHoverBackground('linear-gradient(145deg, #e63946, #d63384)');
          setButtonTextColor('#ffffff');
          setShadowColor('rgba(230, 57, 70, 0.3)');
          setTextColor('#8E8E8E');
        }
        // Applying the dialog states
        if (data.CustomDialog) {
          setLookupTitle(data.CustomDialog.LookupTitle);
          setLookupPrompt(data.CustomDialog.LookupPrompt);
          setCardSwipePrompt(data.CustomDialog.CardSwipePrompt);
          setPhoneNumberPrompt(data.CustomDialog.PhoneNumberPrompt);
          setPatronIdPrompt(data.CustomDialog.PatronIdPrompt);
          setPinPrompt(data.CustomDialog.PinPrompt);
          setPlayerResultOrderCompletePrompt(data.CustomDialog.PlayerResultOrderCompletePrompt);
          setPlayerResultEnoughCompSlot(data.CustomDialog.PlayerResultEnoughCompSlot);
          setPlayerResultEnoughComp(data.CustomDialog.PlayerResultEnoughComp);
          setPlayerResultEnoughSlot(data.CustomDialog.PlayerResultEnoughSlot);
          setPlayerResultNotEnough(data.CustomDialog.PlayerResultNotEnough);
          setPlayerResultPaymentPrompt(data.CustomDialog.PlayerResultPaymentPrompt);
          setPlayerResultRedeemCompButton(data.CustomDialog.PlayerResultRedeemCompButton);
          setPlayerResultRedeemSlotButton(data.CustomDialog.PlayerResultRedeemSlotButton);
          setPlayerResultRedeemVoucherButton(data.CustomDialog.PlayerResultRedeemVoucherButton);
          setPlayerResultRevealButton(data.CustomDialog.PlayerResultRevealButton);
          setPlayerResultBackButton(data.CustomDialog.PlayerResultBackButton);
          setPlayerResultContinueButton(data.CustomDialog.PlayerResultContinueButton);
          setTimeoutTitle(data.CustomDialog.TimeoutTitle);
          setTimeoutPrompt(data.CustomDialog.TimeoutPrompt);
          setErrorHelpPrompt(data.CustomDialog.ErrorHelpPrompt);
        }

        if (data.RVCSettings[0].UnitId) {
          setUnitId(data.RVCSettings[0].UnitId);
        }

        if (data.Animate) {
          setAnimate(data.Animate);
        }

        if (data.Scale) {
          setScale(data.Scale);
        }

        if (data.DisplayPoints) {
          setDisplayPoints(data.DisplayPoints);
        }

        if (data.ManualCardEntry) {
          setManualEntry(data.ManualCardEntry);
        }

        if (data.CustomLogoName) {
          getLogo(data.CustomLogoName);
          setCustomLogoRatio(data.CustomLogoAspectRatio);
        }

        if (data.PointsDisplayed) {
          setPointsDisplayed(data.PointsDisplayed);
        }

        if (data.LookupSelection) {
          setLookupSelection(data.LookupSelection);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    async function getLogo(contentName) {
      const url = 'http://localhost:8088/otms/stay/image';

      // POST request payload
      const body = JSON.stringify({
        ContentName: contentName,
      });

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Process the response (assume it returns an image or path to the image)
        const blob = await response.blob();

        // Create a URL for the image blob
        const imageUrl = URL.createObjectURL(blob);
        setCustomLogoURL(imageUrl);

        return imageUrl; // Optionally return the URL
      } catch (error) {
        console.error('Error fetching logo:', error);
        throw error;
      }
    }

    fetchSettings();
  }, []);

  // close all dialogs and clear states
  const closeDialogs = () => {
    setOpenLookupInputDialog(false);
    setOpenLookupResultDialog(false);
    setOpenErrorDialog(false);
    setOpenPinInputDialog(false);
    setopenLookupDialog(false);
    setLookupValue('');
    setPinValue('');
    setLookupResult(null);
    setErrorMessage('');
  };

  const handleLookupDialogClose = () => {
    setopenLookupDialog(false);
    navigate('/payment');
  };

  const handleLookupInputDialogClose = () => {
    closeDialogs();
    setopenLookupDialog(true);
  };

  const handleLookupResultDialogClose = () => {
    closeDialogs();
    setopenLookupDialog(true);
  };

  const handleErrorDialogClose = () => {
    closeDialogs();
    setopenLookupDialog(true);
  };

  const handlePinInputDialogClose = () => {
    closeDialogs();
    setopenLookupDialog(true);
  };

  const handleLookupTypeChange = (type: string) => {
    setLookupType(type);
    setopenLookupDialog(false);
    setOpenLookupInputDialog(true);
  };

  const handleLookupSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8088/otms/konami/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Search: lookupValue,
          UnitId: unitId,
          LookupType: lookupType,
          ShowPoints: true,
        }),
      });
      const data = await response.json();
      if (data.Success) {
        console.log('Lookup successful:', data);
        setLookupResult(data);
        setOpenPinInputDialog(true); // Open the PIN dialog before showing the result
      } else {
        console.error('Lookup failed:', data.Error);
        setErrorMessage(`Lookup failed for ${lookupType}: "${lookupValue}". ${data.Error || 'Please check your information and try again.'}`);
        setOpenErrorDialog(true); // Open the error dialog
      }
    } catch (error) {
      console.error('Error during lookup:', error);
      setErrorMessage(`An error occurred during the lookup for ${lookupType}: "${lookupValue}". Please verify your information and try again later.`);
      setOpenErrorDialog(true); // Open the error dialog
    }
    setOpenLookupInputDialog(false);
  };

  const handlePinSubmit = async () => {
    // Submit PIN for validation
    try {
      const response = await fetch('http://localhost:8088/otms/konami/pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CardNumber: lookupResult?.CardResponse?.CardNumber,
          UnitId: unitId,
          Pin: pinValue,
        }),
      });
      const data = await response.json();
      if (data.Status === 'GOOD') {
        setOpenLookupInputDialog(false);
        setOpenErrorDialog(false);
        setOpenPinInputDialog(false);
        setopenLookupDialog(false);
        setOpenLookupResultDialog(true);
      } else {
        console.error('PIN validation failed:', data.Error);
        setErrorMessage(`PIN validation failed. ${data.Error || 'Please check your PIN and try again.'}`);
        setOpenErrorDialog(true); // Open the error dialog
      }
    } catch (error) {
      console.error('Error during PIN validation:', error);
      setErrorMessage(`An error occurred during PIN validation. Please verify your information and try again later.`);
      setOpenErrorDialog(true); // Open the error dialog
    }
  };

  const handleRedeemComp = async () => {
    // POST request to redeem comp points
    try {
      const response = await fetch('http://localhost:8088/otms/konami/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CardNumber: lookupResult?.CardResponse?.CardNumber,
          UnitId: unitId,
          Amount: total,
          RedeemType: 'CompPoints',
        }),
      });
      const data = await response.json();
      if (data.Success) {
        // Set order total to 0 after successful redemption
        setTotal(0);
        shoppingCart.clear();
        // Recall the lookup function after successful redemption
        // handleLookupSubmit();
      } else {
        console.error('Redeem CompPoints failed:', data.Error);
        setErrorMessage(`Redeem CompPoints failed. ${data.Error || 'Please try again.'}`);
        setOpenErrorDialog(true); // Open the error dialog
      }
    } catch (error) {
      console.error('Error during redeem comp points:', error);
      setErrorMessage('An error occurred during redeeming comp points. Please verify your information and try again later.');
      setOpenErrorDialog(true); // Open the error dialog
    }
  };

  const handleRedeemSlot = async () => {
    // POST request to redeem slot points
    try {
      const response = await fetch('http://localhost:8088/otms/konami/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CardNumber: lookupResult?.CardResponse?.CardNumber,
          UnitId: unitId,
          Amount: total,
          RedeemType: 'Points',
        }),
      });
      const data = await response.json();
      if (data.Success) {
        // Set order total to 0 after successful redemption
        setTotal(0);
        shoppingCart.clear();
        // Recall the lookup function after successful redemption
        // handleLookupSubmit();
      } else {
        console.error('Redeem SlotPoints failed:', data.Error);
        setErrorMessage(`Redeem SlotPoints failed. ${data.Error || 'Please try again.'}`);
        setOpenErrorDialog(true); // Open the error dialog
      }
    } catch (error) {
      console.error('Error during redeem slot points:', error);
      setErrorMessage('An error occurred during redeeming slot points. Please verify your information and try again later.');
      setOpenErrorDialog(true); // Open the error dialog
    }
  };

  const handleRedeemVoucher = async () => {
    // POST request to redeem voucher
    try {
      const response = await fetch('http://localhost:8088/otms/konami/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CardNumber: lookupResult?.CardResponse?.CardNumber,
          UnitId: unitId,
          Amount: total,
          RedeemType: 'Voucher',
        }),
      });
      const data = await response.json();
      if (data.Success) {
        // Set order total to 0 after successful redemption
        setTotal(0);
        shoppingCart.clear();
        // Recall the lookup function after successful redemption
        handleLookupSubmit();
      } else {
        console.error('Redeem Voucher failed:', data.Error);
        setErrorMessage(`Redeem Voucher failed. ${data.Error || 'Please try again.'}`);
        setOpenErrorDialog(true); // Open the error dialog
      }
    } catch (error) {
      console.error('Error during redeem voucher:', error);
      setErrorMessage('An error occurred during redeeming voucher. Please verify your information and try again later.');
      setOpenErrorDialog(true); // Open the error dialog
    }
  };

  const handleChargeAccountClick = async () => {
    setTotal(0);
    shoppingCart.clear();
    navigate('/processing', { state: { paymentType: 'AccountCharge' } });
  };

  const handleResultClose = async () => {
    handleLookupResultDialogClose();
  };

  const handleResultContinue = async () => {
    navigate('/thanks');
    handleLookupResultDialogClose();
  };

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      setIsTimeout(true);
      return; // Stop the timer when it hits 0
    }

    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timerId); // Cleanup timer on component unmount or re-render
    }
  }, [timeLeft]);

  // listen for any dialog changes and reset the timer
  useEffect(() => {
    // Reset timer to 60 seconds whenever any dialog state changes
    setTimeLeft(60);
  }, [openTimeoutDialog, openLookupDialog, openLookupInputDialog, openPinInputDialog, openLookupResultDialog, openErrorDialog, lookupType, lookupValue, pinValue, lookupResult, errorMessage]);

  // Effect to listen to `isTimeout` change and open the dialog
  useEffect(() => {
    if (isTimeout) {
      setOpenTimeoutDialog(true);
    }
  }, [isTimeout]);

  // Reset timer when the user chooses to continue
  const onTimeoutContinue = () => {
    setOpenTimeoutDialog(false);
    setTimeLeft(60);
    setIsTimeout(false); // Reset the timeout state
  };

  // Clear the cart and navigate to the start order page
  const onTimeout = () => {
    shoppingCart.clear();
    navigate('/home');
  };

  return (
    // only render if the settings are loaded
    settings ? (
      <div className={`oj-gbu-suspense-backdrop theme-${theme}`}>
        {/* Custom dialogs imported from separate components */}
        {openLookupDialog && (
          <LookupDialog
            lookupSelection={lookupSelection}
            onClose={handleLookupDialogClose}
            onLookupTypeChange={handleLookupTypeChange}
            aspectRatio={customLogoRatio}
            customLogoURL={customLogoURL}
            LookupTitle={lookupTitle}
            LookupPrompt={lookupPrompt}
            animate={animate}
          />
        )}

        {openLookupInputDialog && (
          <LookupInputDialog
            manualEntry={manualEntry}
            lookupType={lookupType}
            lookupValue={lookupValue}
            onLookupValueChange={(event) => setLookupValue((event.target as HTMLInputElement).value)}
            onSubmit={handleLookupSubmit}
            onClose={handleLookupInputDialogClose}
            onKeyboardInput={(value) => setLookupValue((prevValue) => prevValue + value)}
            onBackspace={() => setLookupValue((prevValue) => prevValue.slice(0, -1))}
            onClear={() => setLookupValue('')}
            cardSwipePrompt={cardSwipePrompt}
            phoneNumberPrompt={phoneNumberPrompt}
            patronIdPrompt={patronIdPrompt}
            cardSwipe={listenForCardSwipe}
            animate={animate}
          />
        )}

        {openPinInputDialog && (
          <PinInputDialog
            pinValue={pinValue}
            onPinValueChange={(value) => setPinValue((prevValue) => prevValue + value)}
            onSubmit={handlePinSubmit}
            onClose={handlePinInputDialogClose}
            onBackspace={() => setPinValue((prevValue) => prevValue.slice(0, -1))}
            onClear={() => setPinValue('')}
            pinPrompt={pinPrompt}
            animate={animate}
          />
        )}

        {openLookupResultDialog && lookupResult && (
          <LookupResultDialog
            total={total}
            lookupResult={lookupResult}
            pointsDisplayed={pointsDisplayed}
            displayPoints={displayPoints}
            handleClose={handleResultClose}
            handleContinue={handleResultContinue}
            onRedeemComp={handleRedeemComp}
            onRedeemSlot={handleRedeemSlot}
            onRedeemVoucher={handleRedeemVoucher}
            playerResultOrderCompletePrompt={playerResultOrderCompletePrompt}
            playerResultEnoughCompSlot={playerResultEnoughCompSlot}
            playerResultEnoughComp={playerResultEnoughComp}
            playerResultEnoughSlot={playerResultEnoughSlot}
            playerResultNotEnough={playerResultNotEnough}
            playerResultPaymentPrompt={playerResultPaymentPrompt}
            playerResultRedeemCompButton={playerResultRedeemCompButton}
            playerResultRedeemSlotButton={playerResultRedeemSlotButton}
            playerResultRedeemVoucherButton={playerResultRedeemVoucherButton}
            playerResultRevealButton={playerResultRevealButton}
            playerResultBackButton={playerResultBackButton}
            playerResultContinueButton={playerResultContinueButton}
            animate={animate}
          />
        )}

        {openErrorDialog && (
          <ErrorDialog
            lookupType={lookupType}
            lookupValue={lookupValue}
            errorMessage={errorMessage}
            onRetry={() => {
              setPinValue('');
              setOpenLookupInputDialog(true);
              setOpenErrorDialog(false);
            }}
            onClose={handleErrorDialogClose}
            errorHelpPrompt={errorHelpPrompt}
            animate={animate}
          />
        )}

        {openTimeoutDialog && <TimeoutDialog animate={animate} onTimeout={() => onTimeout()} onContinue={() => onTimeoutContinue()} timeoutPrompt={timeoutPrompt} timeoutTitle={timeoutTitle} />}

        {/* Dialog buttons */}

        <button className="dialog-button full" style={{ display: 'none' }} onClick={handleChargeAccountClick}>
          Charge Account
        </button>
      </div>
    ) : (
      <div className="oj-gbu-suspense-backdrop">
        <div className="oj-gbu-suspense">
          <div className="oj-gbu-suspense-content">
            <div className="oj-gbu-suspense-logo"></div>
            <div className="oj-gbu-suspense-message">Loading...</div>
          </div>
        </div>
      </div>
    )
  );
};

export default KonamiPayment;
