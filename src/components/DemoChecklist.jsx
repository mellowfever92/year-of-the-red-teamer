import React, { useState } from 'react';
import './DemoChecklist.css';

const DemoChecklist = ({ preProductionChecklist, demoSteps }) => {
  const [checklist, setChecklist] = useState(preProductionChecklist);
  const [steps, setSteps] = useState(demoSteps);

  const toggleChecklistItem = (itemId) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleDemoStep = (stepId) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const checklistComplete = checklist.every((item) => item.checked);
  const completedSteps = steps.filter((step) => step.completed).length;
  const totalSteps = steps.length;

  return (
    <div className="demo-checklist">
      {/* Pre-Production Checklist Section */}
      <div className="section">
        <div className="section-header">
          <h3>Pre-Production Checklist</h3>
          {checklistComplete && (
            <span className="status-badge complete">✓ Ready to Go Live</span>
          )}
        </div>
        <div className="checklist-items">
          {checklist.map((item) => (
            <div
              key={item.id}
              className={`checklist-item ${item.checked ? 'checked' : ''}`}
              onClick={() => toggleChecklistItem(item.id)}
            >
              <div className="checkbox">
                {item.checked && <span className="checkmark">✓</span>}
              </div>
              <span className="item-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Steps Section */}
      <div className="section">
        <div className="section-header">
          <h3>Demo Flow</h3>
          <span className="progress-badge">
            {completedSteps} / {totalSteps} Steps
          </span>
        </div>
        <div className="demo-steps">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`demo-step ${step.completed ? 'completed' : ''}`}
              onClick={() => toggleDemoStep(step.id)}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
              <div className="step-status">
                {step.completed && <span className="checkmark-large">✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoChecklist;
