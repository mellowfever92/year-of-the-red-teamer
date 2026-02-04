import React, { useState, useEffect, useRef } from 'react';
import './TimerSegmentTracker.css';

const TimerSegmentTracker = ({ segments, onSegmentChange }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [autoTransition, setAutoTransition] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [expandedView, setExpandedView] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const audioContextRef = useRef(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          isRunning ? handlePause() : handleStart();
          break;
        case 'r':
          e.preventDefault();
          handleReset();
          break;
        case 'n':
          e.preventDefault();
          handleNextSegment();
          break;
        case 'p':
          e.preventDefault();
          handlePreviousSegment();
          break;
        case '+':
        case '=':
          e.preventDefault();
          handleAdjustTime(60);
          break;
        case '-':
          e.preventDefault();
          handleAdjustTime(-60);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, currentSegmentIndex]);

  // Play sound alert
  const playAlert = (frequency = 800, duration = 200) => {
    if (!soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
    } catch (error) {
      console.warn('Audio not supported:', error);
    }
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          const newTime = prev + 1;
          
          // Calculate cumulative segment times
          let cumulativeTime = 0;
          for (let i = 0; i <= currentSegmentIndex; i++) {
            cumulativeTime += segments[i].duration;
          }
          
          // Check for warnings
          const remaining = cumulativeTime - newTime;
          if (remaining === 300 || remaining === 120) {
            playAlert(remaining === 300 ? 600 : 900, 150);
          }
          
          // Auto-transition to next segment
          if (autoTransition && newTime >= cumulativeTime && currentSegmentIndex < segments.length - 1) {
            playAlert(1000, 300);
            setCurrentSegmentIndex((prevIndex) => {
              const nextIndex = prevIndex + 1;
              onSegmentChange?.(segments[nextIndex]);
              return nextIndex;
            });
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentSegmentIndex, segments, onSegmentChange, autoTransition, soundEnabled]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentSegmentElapsed = () => {
    let cumulativeTime = 0;
    for (let i = 0; i < currentSegmentIndex; i++) {
      cumulativeTime += segments[i].duration;
    }
    return elapsedTime - cumulativeTime;
  };

  const getCurrentSegmentRemaining = () => {
    const currentSegment = segments[currentSegmentIndex];
    return currentSegment.duration - getCurrentSegmentElapsed();
  };

  const getWarningLevel = () => {
    const remaining = getCurrentSegmentRemaining();
    if (remaining <= 120) return 'critical'; // 2 min
    if (remaining <= 300) return 'warning'; // 5 min
    return 'normal';
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setCurrentSegmentIndex(0);
  };

  const handleNextSegment = () => {
    if (currentSegmentIndex < segments.length - 1) {
      // Jump to start of next segment
      let cumulativeTime = 0;
      for (let i = 0; i <= currentSegmentIndex; i++) {
        cumulativeTime += segments[i].duration;
      }
      setElapsedTime(cumulativeTime);
      setCurrentSegmentIndex(currentSegmentIndex + 1);
      onSegmentChange?.(segments[currentSegmentIndex + 1]);
    }
  };

  const handlePreviousSegment = () => {
    if (currentSegmentIndex > 0) {
      // Jump to start of previous segment
      let cumulativeTime = 0;
      for (let i = 0; i < currentSegmentIndex - 1; i++) {
        cumulativeTime += segments[i].duration;
      }
      setElapsedTime(cumulativeTime);
      setCurrentSegmentIndex(currentSegmentIndex - 1);
      onSegmentChange?.(segments[currentSegmentIndex - 1]);
    }
  };

  const handleJumpToSegment = (index) => {
    if (index >= 0 && index < segments.length) {
      let cumulativeTime = 0;
      for (let i = 0; i < index; i++) {
        cumulativeTime += segments[i].duration;
      }
      setElapsedTime(cumulativeTime);
      setCurrentSegmentIndex(index);
      onSegmentChange?.(segments[index]);
    }
  };

  const handleAdjustTime = (seconds) => {
    setElapsedTime((prev) => Math.max(0, prev + seconds));
  };

  const handleExportTimings = () => {
    const data = {
      totalTime: elapsedTime,
      currentSegment: currentSegment.name,
      segments: segments.map((seg, idx) => ({
        name: seg.name,
        duration: seg.duration,
        active: idx === currentSegmentIndex
      }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stream-timings-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentSegment = segments[currentSegmentIndex];
  const warningLevel = getWarningLevel();

  return (
    <div className="timer-segment-tracker">
      <div className="tracker-header">
        <h2>Timer & Segment Tracker</h2>
        <div className="header-controls">
          <button 
            className={`toggle-btn ${showControls ? 'active' : ''}`}
            onClick={() => setShowControls(!showControls)}
            title="Toggle Controls"
          >
            ⚙️
          </button>
          <button 
            className={`toggle-btn ${expandedView ? 'active' : ''}`}
            onClick={() => setExpandedView(!expandedView)}
            title="Toggle View Mode"
          >
            {expandedView ? '📋' : '📊'}
          </button>
        </div>
      </div>

      <div className={`current-segment ${warningLevel}`}>
        <div className="segment-name" style={{ borderLeftColor: currentSegment.color }}>
          {currentSegment.name}
        </div>
        <div className="segment-time">
          {formatTime(getCurrentSegmentElapsed())} / {formatTime(currentSegment.duration)}
        </div>
        <div className="segment-remaining">
          -{formatTime(getCurrentSegmentRemaining())} remaining
        </div>
        {warningLevel !== 'normal' && (
          <div className="warning-indicator">
            {warningLevel === 'critical' ? '⚠️ 2 MIN LEFT' : '⚡ 5 MIN WARNING'}
          </div>
        )}
      </div>

      <div className="total-time">
        <div className="label">Total Elapsed</div>
        <div className="time">{formatTime(elapsedTime)}</div>
      </div>

      {showControls && (
        <>
          <div className="controls">
            {!isRunning ? (
              <button className="btn btn-start" onClick={handleStart} title="Space">
                {elapsedTime === 0 ? 'Start Timer' : 'Resume'}
              </button>
            ) : (
              <button className="btn btn-pause" onClick={handlePause} title="Space">
                Pause
              </button>
            )}
            <button className="btn btn-reset" onClick={handleReset} title="R">
              Reset
            </button>
          </div>

          <div className="segment-navigation">
            <button 
              className="btn btn-nav" 
              onClick={handlePreviousSegment}
              disabled={currentSegmentIndex === 0}
              title="Previous Segment (P)"
            >
              ⏮ Prev
            </button>
            <div className="segment-selector">
              <select 
                value={currentSegmentIndex} 
                onChange={(e) => handleJumpToSegment(Number(e.target.value))}
                title="Jump to Segment"
              >
                {segments.map((seg, idx) => (
                  <option key={idx} value={idx}>
                    {seg.name}
                  </option>
                ))}
              </select>
            </div>
            <button 
              className="btn btn-nav" 
              onClick={handleNextSegment}
              disabled={currentSegmentIndex === segments.length - 1}
              title="Next Segment (N)"
            >
              Next ⏭
            </button>
          </div>

          <div className="time-adjustments">
            <div className="adjustment-label">Quick Adjust:</div>
            <button className="btn btn-adjust" onClick={() => handleAdjustTime(-300)}>-5m</button>
            <button className="btn btn-adjust" onClick={() => handleAdjustTime(-60)} title="-">-1m</button>
            <button className="btn btn-adjust" onClick={() => handleAdjustTime(-30)}>-30s</button>
            <button className="btn btn-adjust" onClick={() => handleAdjustTime(30)}>+30s</button>
            <button className="btn btn-adjust" onClick={() => handleAdjustTime(60)} title="+">+1m</button>
            <button className="btn btn-adjust" onClick={() => handleAdjustTime(300)}>+5m</button>
          </div>

          <div className="timer-options">
            <label className="option-checkbox">
              <input 
                type="checkbox" 
                checked={autoTransition}
                onChange={(e) => setAutoTransition(e.target.checked)}
              />
              <span>Auto-transition segments</span>
            </label>
            <label className="option-checkbox">
              <input 
                type="checkbox" 
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
              />
              <span>Sound alerts</span>
            </label>
          </div>

          <div className="export-controls">
            <button className="btn btn-export" onClick={handleExportTimings}>
              📥 Export Timings
            </button>
          </div>
        </>
      )}

      {expandedView && (
        <div className="segments-timeline">
          {segments.map((segment, index) => {
            const isActive = index === currentSegmentIndex;
            const isPast = index < currentSegmentIndex;
            
            return (
              <div
                key={index}
                className={`segment-bar ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                style={{ backgroundColor: segment.color }}
                onClick={() => handleJumpToSegment(index)}
                title={`Jump to ${segment.name}`}
              >
                <span className="segment-label">{segment.name}</span>
                <span className="segment-duration">{formatTime(segment.duration)}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="keyboard-shortcuts-hint">
        💡 Shortcuts: Space=Play/Pause | R=Reset | N=Next | P=Prev | +/-=Adjust Time
      </div>
    </div>
  );
};

export default TimerSegmentTracker;
