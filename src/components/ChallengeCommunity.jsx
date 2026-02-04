import React from 'react';
import './ChallengeCommunity.css';

const ChallengeCommunity = ({ challenge, community, weekNum }) => {
  return (
    <div className="challenge-community">
      {/* Challenge Section */}
      <div className="section challenge-section">
        <div className="section-header">
          <h3>{challenge.title}</h3>
        </div>
        <div className="challenge-description">
          {challenge.description}
        </div>
        <div className="challenge-tasks">
          <h4>Tasks:</h4>
          <ul>
            {challenge.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Community Links Section */}
      <div className="section community-section">
        <div className="section-header">
          <h3>Community & Resources</h3>
        </div>
        <div className="community-links">
          <a
            href={community.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button discord"
          >
            <span className="icon">💬</span>
            <span className="link-text">
              <strong>Join Discord</strong>
              <small>Share your results & discuss</small>
            </span>
          </a>
          <a
            href={community.vod}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button vod"
          >
            <span className="icon">📺</span>
            <span className="link-text">
              <strong>Watch VOD</strong>
              <small>Week {weekNum} archive</small>
            </span>
          </a>
        </div>
      </div>

      {/* Next Week Preview */}
      <div className="section next-week-section">
        <div className="section-header">
          <h3>Next Week Preview</h3>
        </div>
        <div className="next-week-content">
          <div className="next-week-number">Week {community.nextWeek.num}</div>
          <div className="next-week-title">{community.nextWeek.title}</div>
          <div className="next-week-preview">{community.nextWeek.preview}</div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCommunity;
