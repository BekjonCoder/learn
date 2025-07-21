import React from "react";

interface EmojiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (emoji: string) => void;
}

const EmojiModal: React.FC<EmojiModalProps> = ({ isOpen, onClose, onSave }) => {
  const [input, setInput] = React.useState<string>("");

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>How did this task make you feel? 😊</h3>
        <input
          type="text"
          placeholder="Add emojis (max 200)"
          maxLength={200}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={() => { onSave(input); setInput(""); }}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EmojiModal;
