import {
  Mail,
  Trash2,
  Check,
  CheckCircle2,
  Reply,
  X,
  Send,
} from "lucide-react";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function InboxDropdown() {
  const [open, setOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const messages = [
    {
      id: 1,
      sender: "Vista Admin",
      subject: "Welcome to DzTech Client Portal",
      preview: "Hey Joshua, glad to have you onboard our platform 🚀",
      time: "2h ago",
    },
    {
      id: 2,
      sender: "Support Team",
      subject: "Your payment profile was verified",
      preview:
        "Everything checks out! You're ready to start accepting payments.",
      time: "5h ago",
    },
    {
      id: 3,
      sender: "System Bot",
      subject: "Store approval required",
      preview: "Your new store 'UrbanCafe' is pending review.",
      time: "Yesterday",
    },
  ];

  const handleReplySend = () => {
    if (replyText.trim() === "") return;
    alert(`Reply sent: ${replyText}`);
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="relative">
      {/* Button to open dropdown */}
      <div className="rounded-full size-10 bg-white/60 text-black/60 flex items-center justify-center">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <Mail className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <>
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-10"
            ></div>

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20 backdrop-blur-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-white to-emerald-50">
                <h2 className="font-semibold text-gray-800 text-lg">Inbox</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <Check className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Message List */}
              <div className="max-h-96 overflow-y-auto">
                {messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setActiveMessage(msg)}
                    className="flex flex-col items-start w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 transition-all border-b border-gray-50"
                  >
                    <div className="flex justify-between w-full items-center mb-1">
                      <span className="font-medium text-gray-800">
                        {msg.sender}
                      </span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {msg.subject}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {msg.preview}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fullscreen Message Dialog */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white w-[90%] max-w-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-white to-emerald-50">
                <div>
                  <h2 className="font-semibold text-gray-800 text-lg">
                    {activeMessage.subject}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {activeMessage.sender}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveMessage(null);
                    setShowReply(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Message Body */}
              <div className="p-6 text-gray-700 space-y-4">
                <p>
                  {activeMessage.preview}
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque ultricies, magna in facilisis elementum, enim elit
                  gravida arcu, eget ullamcorper justo nibh nec sem. 🌌
                </p>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                {!showReply ? (
                  <button
                    onClick={() => setShowReply(true)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Reply className="w-4 h-4" /> Reply
                  </button>
                ) : (
                  <div className="w-full flex flex-col gap-2">
                    <textarea
                      rows="3"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="w-full p-3 text-sm border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowReply(false)}
                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleReplySend}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" /> Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
