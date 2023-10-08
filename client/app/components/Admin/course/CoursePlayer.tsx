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
      .post('http://localhost:8000/api/v1/getVdoCipherOTP', {
        videoId: videoUrl,
      })
      .then((res) => setVideoData(res.data));
  }, [videoUrl]);

  console.log(videoData);

  return (
    <div style={{ paddingTop: '41%', position: 'relative' }}>
      {videoData.otp && videoData.playbackInfo !== '' && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}$player=QdBu8SBfu1N967gf`}
          style={{
            border: 0,
            width: '90%',
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
