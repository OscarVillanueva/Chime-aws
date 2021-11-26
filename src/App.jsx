import React from 'react'
import config from './config.json'
import { 
  useMeetingManager, 
  useLocalVideo,
  useLocalAudioOutput,
  LocalVideo,
  RemoteVideos,
  VideoGrid
} from 'amazon-chime-sdk-component-library-react';

function App() {

  const meetingManager = useMeetingManager();
  const { tileId, isVideoEnabled, setIsVideoEnabled, toggleVideo } = useLocalVideo();
  const { isAudioOn, toggleAudio } = useLocalAudioOutput()

  const joinMeeting = async () => {

    const joinData = {
      meetingInfo: config.meeting.Meeting,
      attendeeInfo: config.attendee.Attendee,
    };

    await meetingManager.join(joinData)

    await meetingManager.start()

    console.log(`meetingManager`, meetingManager)

  }

  return (
    <div className="App">
      <button
        onClick = { joinMeeting }
      >
        btn
      </button>

      <LocalVideo />

      <VideoGrid>
        <RemoteVideos />
      </VideoGrid>

      <p>Tile ID: {tileId}</p>

      <p>
        {setIsVideoEnabled ? 'LocalVideo is enabled' : 'LocalVideo is disabled'}
      </p>

      <button onClick={() => setIsVideoEnabled(true)}>
        Set isVideoEnabled to true
      </button>
      
      <button onClick={toggleVideo}>
        {isVideoEnabled ? 'Stop your video' : 'Start your video'}
      </button>
      <button onClick={toggleAudio}>
        { isAudioOn ? 'Stop Audio' : 'Start Audio' }
      </button>
    </div>
  )
}

export default App
