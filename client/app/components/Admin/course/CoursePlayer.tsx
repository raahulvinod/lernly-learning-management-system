import { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  title: string;
  videoUrl: string;
};

const CoursePlayer: React.FC<Props> = ({ title, videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: '',
    playbackInfo: '',
  });

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => setVideoData(res.data));
  }, [videoUrl]);

  return (
    <div
      style={{ paddingTop: '45%', position: 'relative', overflow: 'hidden' }}
    >
      {videoData.otp && videoData.playbackInfo !== '' && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=${process.env.COURSE_PLAYER_ID}`}
          style={{
            border: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
