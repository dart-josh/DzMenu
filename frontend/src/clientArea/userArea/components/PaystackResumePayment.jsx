import { useEffect, useRef } from "react";
import { getPaymentStatus } from "../../../helpers/serverHelpers";

import Paystack from '@paystack/inline-js';

export default function PaystackResumePayment({
  accessCode,
  reference,
  onSuccess,
  onFail,
}) {
  const popupRef = useRef(null);
  // const [scriptLoaded, setScriptLoaded] = useState(false);
  const paymentDoneRef = useRef(false); // prevent double execution
  const pollingRef = useRef(null);

  // Unified success handler
  const handleSuccess = (ref) => {
    if (paymentDoneRef.current) return;
    paymentDoneRef.current = true;

    // stop polling
    clearInterval(pollingRef.current);

    // close popup safely
    try {
      if (popupRef.current) popupRef.current.close();
    } catch (e) {
      console.log(e);
    }

    // run success callback
    if (onSuccess) onSuccess(ref);
  };

  const handleFail = (ref) => {
    if (paymentDoneRef.current) return;
    paymentDoneRef.current = true;

    // stop polling
    clearInterval(pollingRef.current);

    // close popup safely
    try {
      if (popupRef.current) popupRef.current.close();
    } catch (e) {
      console.log(e);
    }

    // run success callback
    if (onFail) onFail(ref);
  };

  // Start popup + polling
  useEffect(() => {
    // if (!scriptLoaded || !window.PaystackPop) return;
    if (!accessCode) return;

    // Create popup instance
    const popup =  new Paystack();

    // Resume the transaction created from backend
    popup.resumeTransaction(accessCode);
    popupRef.current = popup;

    // Start polling backend
    pollingRef.current = setInterval(async () => {
      if (paymentDoneRef.current) return;

      const res = await getPaymentStatus(reference);
      const status = res?.status || "";

      if (status === "paid") {
        handleSuccess(reference);
      }

      if (status === "failed") {
        handleFail(reference);
      }
    }, 2000);

    return () => {
      clearInterval(pollingRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessCode]);

  return null; // Component renders nothing
}
