import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WorkspaceLayout from './pages/workspace/WorkspaceLayout';
import WorkspaceOverview from './pages/workspace/WorkspaceOverview';
import JobsPage from './pages/workspace/JobsPage';
import JobDetailsPage from './pages/workspace/JobDetailsPage';
import CandidatePage from './pages/workspace/CandidatePage';
import VideoScreeningPage from './pages/workspace/VideoScreeningPage';
import AssistantWidget from './components/assistant/AssistantWidget';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Marketing Website */}
          <Route path="/" element={<HomePage />} />

          {/* Workspace */}
          <Route path="/workspace" element={<WorkspaceLayout />}>
            <Route index element={<WorkspaceOverview />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="jobs/:jobId" element={<JobDetailsPage />} />
            <Route path="screenings" element={<VideoScreeningPage />} />
            <Route path="candidates/:candidateId" element={<CandidatePage />} />
          </Route>
        </Routes>

        {/* AI Assistant Widget - Available on all pages */}
        <AssistantWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
