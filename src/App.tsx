import { useUserStore } from './store/userStore';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PhishingAwareness from './pages/PhishingAwareness';
import DesignThinkingPhases from './pages/DTPhases';
import Define from './pages/Define/Define';
import SpotScam from './pages/Define/SpotScam';
import ProblemUnderstanding from './pages/Define/ProblemUnderstanding';
import ProblemStatement from './pages/Define/ProblemStatement';
import Ideate from './pages/Ideate/Ideate';
import Prototype from './pages/Prototype/Prototype';
import GearsBot from './pages/Prototype/GearsBot';
import Test from './pages/Test/Test';
import TestChecklist from './pages/Test/TestChecklist';
import NavbarBottom from './components/layout/NavbarBottom';
import Persona from './pages/Empathize/Persona';
import Empathize from './pages/Empathize/Empathize';
import SelectPersona from './pages/Empathize/SelectPersona';
import PersonaInfo from './pages/Empathize/PersonaInfo';
import StoryboardInfo from './pages/Empathize/StoryboardInfo';
import Storyboard from './pages/Empathize/Storyboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Conclusion from './pages/Conclusion';
import { TaskProgressProvider } from './context/TaskProgressContext';
import NavbarTop from './components/layout/NavbarTop';
import NotFoundPage from './pages/NotFoundPage';
import Checklist from './pages/Ideate/Checklist';

function App() {
  const { token } = useUserStore();
  const location = useLocation();
  const hideNavbar =
    location.pathname === '/' ||
    location.pathname === '/phishing-activity' ||
    location.pathname === '/not-found' ||
    location.pathname === '/design-thinking' ||
    location.pathname === '/conclusion';
  return (
    <TaskProgressProvider>
      <div className="h-screen w-screen flex flex-col">
        {!token ? (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <>
            {!hideNavbar && <NavbarBottom />}
            <NavbarTop />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/not-found" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
              {/* <Route path="/introduction" element={<Introduction />} /> */}
              <Route
                path="/phishing-activity"
                element={<PhishingAwareness />}
              />
              <Route
                path="/design-thinking"
                element={<DesignThinkingPhases />}
              />
              <Route path="/empathize" element={<Empathize />} />
              <Route
                path="/empathize/select-persona"
                element={<SelectPersona />}
              />
              <Route path="/empathize/persona-info" element={<PersonaInfo />} />
              <Route path="/empathize/persona" element={<Persona />} />
              <Route
                path="/empathize/storyboard-info"
                element={<StoryboardInfo />}
              />
              <Route path="/empathize/storyboard" element={<Storyboard />} />
              <Route path="/define" element={<Define />} />
              <Route path="/define/spot-scam" element={<SpotScam />} />
              <Route
                path="/define/problem-understanding"
                element={<ProblemUnderstanding />}
              />
              <Route
                path="/define/problem-statement"
                element={<ProblemStatement />}
              />
              <Route path="/ideate" element={<Ideate />} />
              <Route path="/ideate/checklist" element={<Checklist />} />
              <Route path="/prototype" element={<Prototype />} />
              <Route path="/prototype/gearsbot" element={<GearsBot />} />
              <Route path="/test" element={<Test />} />
              {/* TODO: update url */}
              <Route path="/test/checklist" element={<TestChecklist />} />
              <Route path="/conclusion" element={<Conclusion />} />
            </Routes>
          </>
        )}
      </div>
    </TaskProgressProvider>
  );
}
export default App;
