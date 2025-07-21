import React, { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar";
import EmojiModal from "./components/EmojiModal";
import EditModal from "./components/EditModal";
import clap from "./assets/clap.mp3";

interface Lesson {
  name: string;
  completed: boolean;
  emoji?: string;
  description?: string;
}

const App: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem("lessons");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");

  const clapAudio = new Audio(clap);

  useEffect(() => {
    localStorage.setItem("lessons", JSON.stringify(lessons));
  }, [lessons]);

  const handleAdd = () => {
    if (input.trim() !== "") {
      setLessons([...lessons, { name: input, completed: false }]);
      setInput("");
      setMessage("");
    }
  };

  const handleToggle = (index: number) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleSaveEmoji = (emoji: string) => {
    if (currentIndex !== null) {
      const newLessons = [...lessons];
      newLessons[currentIndex].completed = true;
      newLessons[currentIndex].emoji = emoji;
      setLessons(newLessons);
      setShowModal(false);
    }
  };

  const handleDelete = (index: number) => {
    const newLessons = lessons.filter((_, i) => i !== index);
    setLessons(newLessons);
  };

  const toggleAccordion = (index: number) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditName(lessons[index].name);
    setShowEditModal(true);
  };

  const handleSaveEdit = (newName: string) => {
    if (editIndex !== null) {
      const newLessons = [...lessons];
      newLessons[editIndex].name = newName;
      setLessons(newLessons);
      setShowEditModal(false);
    }
  };

  const completedCount = lessons.filter((l) => l.completed).length;
  const percent =
    lessons.length === 0 ? 0 : Math.round((completedCount / lessons.length) * 100);

  useEffect(() => {
    if (percent === 100 && lessons.length !== 0) {
      setMessage("🎉 Congratulations! You've completed all tasks. Keep growing! 🌱");
      clapAudio.play();
    }
  }, [percent, lessons.length]);

  return (
    <div className="container">
      <div className="learn">
        <h1>LearnTracker 📚</h1>
      </div>

      <div className="input-group">
        <input
          type="text"
          value={input}
          placeholder="New lesson name"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ProgressBar percent={percent} />

      {message && <div className="message">{message}</div>}

      <ul>
        {lessons.map((lesson, index) => (
          <li key={index} className={lesson.completed ? "completed-item flex" : "flex"}>
            <div onClick={() => toggleAccordion(index)} style={{ cursor: "pointer" }}>
              <span>{lesson.name}</span>
              {lesson.completed && lesson.emoji && <span> {lesson.emoji}</span>}
            </div>

            {openAccordion === index && (
              <div className="accordion-content">
                <p>Description: {lesson.description || "No description added yet."}</p>
              </div>
            )}

            <div className="actions">
              {!lesson.completed && (
                <>
                  <button onClick={() => handleToggle(index)}>Complete</button>
                  <button onClick={() => handleEditClick(index)}>✏️</button>
                </>
              )}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <EmojiModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveEmoji}
      />

      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
        currentName={editName}
      />
    </div>
  );
};

export default App;
