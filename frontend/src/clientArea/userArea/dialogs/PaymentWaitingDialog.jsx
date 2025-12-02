const PaymentWaitingDialog = ({ onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl shadow-xl w-[350px] text-center">
        <h3 className="font-semibold text-lg">Processing Payment…</h3>
        <p className="text-gray-600 mt-2">
          Please wait while we confirm your payment.
        </p>

        <button
          onClick={onCancel}
          className="mt-6 px-4 py-2 rounded-lg bg-red-500 text-white w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PaymentWaitingDialog;
