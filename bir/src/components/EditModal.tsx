import React from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
  currentName: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, currentName }) => {
  const [input, setInput] = React.useState<string>(currentName);

  React.useEffect(() => {
    setInput(currentName);
  }, [currentName]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Edit Task Name ✏️</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={() => { onSave(input); }}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
