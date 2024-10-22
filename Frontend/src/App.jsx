import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import DetectionLaunch from "./pages/DetectionLaunch";
import FinalReports from "./pages/FinalReports";
import VoiceAnalysis from "./pages/VoiceAnalysis";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/final-reports":
        title = "";
        metaDescription = "";
        break;
      case "/voice-analysis":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<DetectionLaunch />} />
      <Route path="/final-reports" element={<FinalReports />} />
      <Route path="/voice-analysis" element={<VoiceAnalysis />} />
    </Routes>
  );
}
export default App;
