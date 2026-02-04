import React, { useState } from 'react';
import './ConceptualScript.css';

const ConceptualScript = ({ scriptData }) => {
  const [checkedBullets, setCheckedBullets] = useState(new Set());

  const toggleBullet = (bulletId) => {
    setCheckedBullets((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(bulletId)) {
        newSet.delete(bulletId);
      } else {
        newSet.add(bulletId);
      }
      return newSet;
    });
  };

  const totalChecked = checkedBullets.size;
  const totalBullets = scriptData.bullets.length;
  const progress = (totalChecked / totalBullets) * 100;

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${mins}m`;
  };

  return (
    <div className="conceptual-script">
      <div className="script-header">
        <h2>{scriptData.title}</h2>
        <div className="script-meta">
          <span className="total-duration">
            Total: {formatDuration(scriptData.totalDuration)}
          </span>
          <span className="progress-text">
            {totalChecked} / {totalBullets} complete
          </span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="bullets-list">
        {scriptData.bullets.map((bullet) => {
          const isChecked = checkedBullets.has(bullet.id);
          
          return (
            <div
              key={bullet.id}
              className={`bullet-item ${isChecked ? 'checked' : ''}`}
              onClick={() => toggleBullet(bullet.id)}
            >
              <div className="bullet-header">
                <div className="checkbox">
                  {isChecked && <span className="checkmark">✓</span>}
                </div>
                <div className="bullet-main">
                  <div className="bullet-text">{bullet.text}</div>
                  <div className="bullet-duration">
                    {formatDuration(bullet.duration)}
                  </div>
                </div>
              </div>
              <div className="bullet-details">
                {bullet.details}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConceptualScript;
