import { useState } from 'react';
import TimerSegmentTracker from './components/TimerSegmentTracker';
import DemoChecklist from './components/DemoChecklist';
import HtmlContentViewer from './components/HtmlContentViewer';
import weeksConfig from './config/weeksConfig';
import './App.css';

function App() {
  const [selectedWeek, setSelectedWeek] = useState(2);
  const weekData = weeksConfig[selectedWeek];

  const handleWeekChange = (e) => {
    setSelectedWeek(Number(e.target.value));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📺 Livestream Production Kit</h1>
          <div className="week-selector">
            <label htmlFor="week-select">Week:</label>
            <select
              id="week-select"
              value={selectedWeek}
              onChange={handleWeekChange}
            >
              {Object.keys(weeksConfig).map((weekNum) => (
                <option key={weekNum} value={weekNum}>
                  Week {weekNum} - {weeksConfig[weekNum].title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="week-info">
          <span className="week-date">{weekData.date}</span>
          <span className="week-duration">30 minutes</span>
        </div>
      </header>

      <main className="app-main">
        <div className="production-layout">
          <div className="production-controls">
            <TimerSegmentTracker segments={weekData.segments} />
            <DemoChecklist
              preProductionChecklist={weekData.preProductionChecklist}
              demoSteps={weekData.demoSteps}
            />
          </div>
          <div className="content-area">
            <HtmlContentViewer 
              htmlFile={weekData.htmlFile} 
              weekTitle={weekData.title}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

