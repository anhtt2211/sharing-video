import { IVideo } from '@/interfaces/video.interface';
import VideoCard from './VideoItem';

function VideoList({ videos }: { videos: IVideo[] }) {
  console.log('🚀 ~ VideoList ~ videos:', videos);
  return (
    <div className='flex flex-col items-center'>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoList;
