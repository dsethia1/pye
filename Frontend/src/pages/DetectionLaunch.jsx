import { useCallback } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./DetectionLaunch.css";

const DetectionLaunch = () => {
  const navigate = useNavigate();

  const onFrameButtonClick = useCallback(() => {
    navigate("/voice-analysis");
  }, [navigate]);

  return (
    <div className="detection-launch">
      <img
        className="screenshot-2023-12-20-at-930"
        alt=""
        src="/screenshot-20231220-at-930-1@2x.png"
      />
      <div className="autism-detection-and">Autism Detection and Analysis</div>
      <Button
        className="detection-launch-child"
        colorScheme="blue2"
        variant="ghost"
        onClick={onFrameButtonClick}
      >
        Begin Evaluation
      </Button>
      <div className="detection-launch-item" />
      <div className="screenshot-2023-12-20-at-930-parent">
        <img
          className="screenshot-2023-12-20-at-9301"
          alt=""
          src="/screenshot-20231220-at-930-4@2x.png"
        />
        <div className="frame-child" />
      </div>
    </div>
  );
};

export default DetectionLaunch;
