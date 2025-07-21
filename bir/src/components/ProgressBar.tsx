import React from "react";

interface Props {
  percent: number;
}

const ProgressBar: React.FC<Props> = ({ percent }) => {
  return (
    <div className="progress-container">
      <div className="progress" style={{ width: `${percent}%` }}>
        <span>{percent}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
