function Toast({ text, color }) {
  return (
    <div className="fixed top-20 right-4 z-50">
      <div
        id="toast-simple"
        role="alert"
        className={`flex items-center w-full max-w-sm p-4 ${color} rounded-lg shadow-lg border`}
      >
        <div className="text-sm font-medium">{text}</div>

        <button
          type="button"
          className="ms-auto ml-4 text-black hover:opacity-70"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Toast;
