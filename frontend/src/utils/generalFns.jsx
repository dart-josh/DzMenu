import toast from "react-hot-toast";

export const copyToClipboard = (text) => {
  if (!text) return;

  toast('Copied to clipboard', {id: 'copy1'});
  // Modern async clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
    document.body.removeChild(textArea);
  }
}

export const getBaseUrl = () => {
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

