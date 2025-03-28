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
import CompleteEmpathize from './pages/Empathize/CompleteEmpathize';
import CompleteDefine from './pages/Define/CompleteDefine';
import CompleteIdeate from './pages/Ideate/CompleteIdeate';
import CompletePrototype from './pages/Prototype/CompletePrototype';
import CompleteTest from './pages/Test/CompleteTest';
import TestInfo from './pages/Test/TestInfo';
import ReflectEmpathize from './pages/Empathize/ReflectEmpathize';

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
      <div className="min-h-screen w-screen flex flex-col bg-pattern bg-cover">
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
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
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
              <Route path="/empathize/reflect" element={<ReflectEmpathize />} />
              <Route
                path="/empathize/complete"
                element={<CompleteEmpathize />}
              />
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
              <Route path="/define/complete" element={<CompleteDefine />} />
              <Route path="/ideate" element={<Ideate />} />
              <Route path="/ideate/checklist" element={<Checklist />} />
              <Route path="/ideate/complete" element={<CompleteIdeate />} />
              <Route path="/prototype" element={<Prototype />} />
              <Route path="/prototype/gearsbot" element={<GearsBot />} />
              <Route
                path="/prototype/complete"
                element={<CompletePrototype />}
              />
              <Route path="/test" element={<Test />} />
              <Route path="/test/info" element={<TestInfo />} />
              <Route path="/test/checklist" element={<TestChecklist />} />
              <Route path="/test/complete" element={<CompleteTest />} />
              <Route path="/conclusion" element={<Conclusion />} />
            </Routes>
          </>
        )}
      </div>
    </TaskProgressProvider>
  );
}
export default App;
