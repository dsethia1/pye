import { useCallback } from "react";
import { Progress, Button, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./VoiceAnalysis.css";
import { useReactMediaRecorder } from "react-media-recorder";

const VoiceAnalysis = () => {
  const navigate = useNavigate();
  const {status, startRecording, stopRecording, mediaBlobUrl} = useReactMediaRecorder({
    audio:true})
  const onBackTextClick = useCallback(() => {
    // Please sync "Detection Launch" to the project
  }, []);
  const uploadAudio = async () => {
    if(!mediaBlobUrl) return;
    const response = await fetch(mediaBlobUrl);
    const audioBlob = await response.blob();
    console.log(mediaBlobUrl.type);
    console.log(audioBlob.type);
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    try{
      const uploadResponse = await fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      if(!uploadResponse.ok){
        throw new Error('Network response not ok');
      }
      const data = await uploadResponse.json();
      console.log(data.message);
      navigate("/final-reports");
    } catch(error){
      console.error('Error uploading audio:', error);
    }
  };

  return (
    <div className="voice-analysis">
      <div className="voice-check-parent">
        <b className="voice-check">Voice Check</b>
        <div className="how-was-your-container">
          <p className="how-was-your">How was your day?</p>
          <p className="how-was-your">
            Press the Start/Stop buttons to record an auditory clip (15-60
            seconds)
          </p>
        </div>
        <div className="ellipse-parent">
          <div className="group-item" />
          <img
            className="microphone-3-icon"
            alt=""
            src="/microphone-3@2x.png"
          />
        </div>
        <Progress
          className="frame-inner"
          colorScheme="blue2"
          size="sm"
          isIndeterminate
        />
        <audio src={mediaBlobUrl} controls/>
        <div className="frame-group">
          <Button
            onClick = {startRecording}
            className="frame-button"
            colorScheme="blue2"
            variant="solid"
            w="123px"
          >
            Start
          </Button>
          <Button
            onClick = {stopRecording}
            className="frame-child1"
            colorScheme="blue2"
            variant="solid"
            w="123px"
          >
            Stop
          </Button>
        </div>
      </div>
      <div className="back-parent">
        <div className="back" onClick={onBackTextClick}>
          Back
        </div>
        <div className="group-inner" />
        <img
          className="screenshot-2023-12-20-at-9303"
          alt=""
          src="/screenshot-20231220-at-930-3@2x.png"
        />
      </div>
      <Button
        className="voice-analysis-child"
        colorScheme="blue2"
        variant="ghost"
        onClick={uploadAudio}
      >
        Continue
      </Button>
    </div>
  );
};

export default VoiceAnalysis;
