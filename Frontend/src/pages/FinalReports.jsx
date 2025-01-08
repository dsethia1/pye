import { useCallback } from "react";
import "./FinalReports.css";
import MessagePage from '../components/MessagePage';
import ConfidencePage from "../components/ConfidencePage";

const FinalReports = () => {
  const onYourReportsTextClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='yourReportsText']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long', // e.g., Monday
    year: 'numeric', // e.g., 2024
    month: 'long',   // e.g., October
    day: 'numeric'   // e.g., 13
  });
  const formattedTime = today.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const onGroupButtonClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <div className="final-reports">
      <b className="your-reports" onClick={onYourReportsTextClick}>
        Your reports
        <div className="anchor-your-reports" data-scroll-to="yourReportsText" />
      </b>
      <div className="final-reports-inner">
        <div className="date-23rd-april-325pm-parent">
          <div className="date-23rd-april">Date: {formattedDate} {formattedTime}</div>
          <b className="vocal-diagnosis">Vocal Diagnosis</b>
          <div className="frame-wrapper">
            <div className="your-diagnosis-is-parent">
              <div className="your-diagnosis-is">Your diagnosis is:</div>
              <b className="autism-negative"><MessagePage/></b>
              <div className="your-diagnosis-is">{`Confidence Score: `}</div>
              <b className="autism-negative"><ConfidencePage/></b>
            </div>
          </div>
          {/*<div className="frame-parent">
            <div className="get-detailed-results-parent">
              <div className="get-detailed-results">{`Get Detailed Results: `}</div>
              <div className="we-will-email">{`We will email you detailed Ege_Maps. `}</div>
              <button className="rectangle-parent" onClick={onGroupButtonClick}>
                <button className="group-child" />
                <div className="submit">Submit</div>
              </button>
            </div>
            <input className="email" placeholder="Email:" type="email" />
            <input className="name" placeholder="Name: " type="email" />
          </div> */}
        </div>
      </div>
      <a
        className="learn-more-wrapper"
        href="https://www.autism.org.uk/advice-and-guidance/topics/diagnosis/post-diagnosis-support"
      >
        <div className="learn-more">Learn more</div>
      </a>
      <div
        className="screenshot-2023-12-20-at-930-group"
        data-scroll-to="frameContainer"
      >
        <img
          className="screenshot-2023-12-20-at-9302"
          alt=""
          src="/screenshot-20231220-at-930-4@2x.png"
        />
        <div className="frame-item" />
      </div>
    </div>
  );
};

export default FinalReports;
