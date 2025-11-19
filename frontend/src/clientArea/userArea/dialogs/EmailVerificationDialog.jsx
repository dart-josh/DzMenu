import { useState } from "react";
import { Mail, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import {
  startEmailVerification,
  verifyEmail,
} from "../../../helpers/serverHelpers";
import toast from "react-hot-toast";
import { useUserStore } from "../store/useUserStore";
import { useEffect } from "react";

const EmailVerificationDialog = ({ isOpen, onClose, email }) => {
  const { updateUser } = useUserStore();

  const [step, setStep] = useState(1);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCodeChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance to next input
    if (value && index < 5) {
      const next = document.getElementById(`pin-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prev = document.getElementById(`pin-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  const sendCode = async () => {
    setLoadingSend(true);
    const res = await startEmailVerification();
    setLoadingSend(false);

    if (res.success) {
      toast.success(res.message, { id: "success1" });
      setStep(2);
    } else toast.error(res.message, { id: "error1" });
  };

  const verifyCode = async () => {
    if (code.some((digit) => digit === "")) {
      toast.error("Please enter all 6 digits.", { id: "error1" });
      return;
    }

    setLoadingVerify(true);
    const res = await verifyEmail(code.join(""));
    setLoadingVerify(false);

    if (res.success) {
      toast.success(res.message, { id: "success1" });
      if (res.user) updateUser(res.user);
      setStep(3);
    } else toast.error(res.message, { id: "error1" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-sm scale-95 bg-white/70 backdrop-blur-xl border border-white/40 
                      shadow-lg rounded-2xl p-4 sm:p-6 animate-fadeIn"
      >
        {/* STEP WRAPPER */}
        {step === 1 && (
          <StepInfo
            email={email}
            onSend={sendCode}
            onClose={onClose}
            loadingSend={loadingSend}
          />
        )}

        {step === 2 && (
          <StepCode
            code={code}
            handleCodeChange={handleCodeChange}
            handleKeyDown={handleKeyDown}
            loadingVerify={loadingVerify}
            onVerify={verifyCode}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && <StepSuccess onClose={onClose} />}
      </div>
    </div>
  );
};

const StepInfo = ({ email, onSend, onClose, loadingSend }) => (
  <div className="space-y-5">
    <div className="flex items-center gap-3">
      <Mail className="w-8 h-8 text-indigo-600" />
      <h2 className="text-xl font-semibold text-slate-900">
        Verify Your Email
      </h2>
    </div>

    <p className="text-sm text-slate-600 leading-relaxed">
      To keep your account secure and enable store publishing, pages, and
      advanced features, we need to verify your email.
    </p>

    <div className="text-sm bg-slate-100/60 border border-white/50 rounded-lg p-3">
      <span className="text-slate-500">Verification email: </span>
      <span className="font-medium text-indigo-600">{email}</span>
    </div>

    <button
      onClick={onSend}
      disabled={loadingSend}
      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
             font-medium shadow hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {loadingSend ? (
        <div className="size-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
      ) : (
        <>
          Send Verification Code
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>

    <button
      onClick={onClose}
      className="w-full text-sm text-slate-500 hover:text-slate-700 transition"
    >
      Cancel
    </button>
  </div>
);

const StepCode = ({
  code,
  handleCodeChange,
  handleKeyDown,
  onVerify,
  loadingVerify,
  onBack,
}) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <ShieldCheck className="w-8 h-8 text-indigo-600" />
      <h2 className="text-xl font-semibold text-slate-900">
        Enter Verification Code
      </h2>
    </div>

    <p className="text-sm text-slate-600">
      Enter the 6-digit verification code sent to your email.
    </p>

    {/* PIN INPUT */}
    <div className="flex justify-center xs:justify-between gap-2">
      {code.map((digit, i) => (
        <input
          key={i}
          id={`pin-${i}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleCodeChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          autoFocus={i === 0}
          className="size-11 xs:size-12 text-center text-xl font-semibold
                     bg-white/70 backdrop-blur-sm border border-white/60
                     rounded-xl shadow focus:outline-none
                     focus:ring-2 focus:ring-indigo-500 transition"
        />
      ))}
    </div>

    {/* VERIFY BUTTON */}
    <button
      onClick={onVerify}
      disabled={loadingVerify}
      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                 font-medium shadow hover:opacity-90 transition flex items-center justify-center disabled:opacity-50"
    >
      {loadingVerify ? (
        <div className="size-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
      ) : (
        "Verify Email"
      )}
    </button>

    <button
      onClick={onBack}
      className="w-full text-sm text-slate-500 hover:text-slate-700 transition"
    >
      Go Back
    </button>
  </div>
);

const StepSuccess = ({ onClose }) => (
  <div className="space-y-6 text-center">
    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />

    <h2 className="text-2xl font-semibold text-slate-900">Email Verified!</h2>

    <p className="text-sm text-slate-600">
      Your email has been successfully verified. You now have full access to all
      features.
    </p>

    <button
      onClick={onClose}
      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 
                 text-white font-medium shadow hover:opacity-90 transition"
    >
      Continue
    </button>
  </div>
);

export default EmailVerificationDialog;
