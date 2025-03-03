import { useUserStore } from './store/userStore';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Define from './pages/Define/Define';
import ProblemStatement from './pages/Define/ProblemStatement';
import Ideate from './pages/Ideate/Ideate';
import SelectIdeas from './pages/Ideate/SelectIdeas';
import Prototype from './pages/Prototype';
import Test from './pages/Test';
import NavbarBottom from './components/layout/NavbarBottom';
import Persona from './pages/Empathize/Persona';
import Empathize from './pages/Empathize/Empathize';
import SelectPersona from './pages/Empathize/SelectPersona';
import SelectedPersonaInfo from './pages/Empathize/SelectedPersonaInfo';
import StoryboardInfo from './pages/Empathize/StoryboardInfo';
import Storyboard from './pages/Empathize/Storyboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import { TaskProgressProvider } from './context/TaskProgressContext';
import NavbarTop from './components/layout/NavbarTop';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { token } = useUserStore();
  const location = useLocation();
  const hideNavbar =
    location.pathname === '/' || location.pathname === '/not-found';

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
              <Route path="/empathize" element={<Empathize />} />
              <Route
                path="/empathize/select-persona"
                element={<SelectPersona />}
              />
              <Route
                path="/empathize/selected-persona-info"
                element={<SelectedPersonaInfo />}
              />
              <Route path="/empathize/persona" element={<Persona />} />
              <Route
                path="/empathize/storyboard-info"
                element={<StoryboardInfo />}
              />
              <Route path="/empathize/storyboard" element={<Storyboard />} />
              <Route path="/define" element={<Define />} />
              <Route
                path="/define/problem-statement"
                element={<ProblemStatement />}
              />
              <Route path="/ideate" element={<Ideate />} />
              <Route path="/ideate/select-ideas" element={<SelectIdeas />} />
              <Route path="/prototype" element={<Prototype />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </>
        )}
      </div>
    </TaskProgressProvider>
  );
}
export default App;
