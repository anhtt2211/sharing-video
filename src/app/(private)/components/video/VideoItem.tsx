import { IVideo } from '@/interfaces/video.interface';

const VideoCard = ({ video }: { video: IVideo }) => {
  return (
    <div className='flex justify-between items-start p-4 bg-white shadow-lg rounded-lg mb-4 max-w-screen-md'>
      <div className='w-1/2'>
        <iframe
          width='100%'
          height='250'
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={video.title}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
      <div className='w-1/2 pl-4'>
        <h2 className='text-xl font-bold mb-2'>{video.title}</h2>
        <p className='text-gray-600'>Shared by: {video.user.username}</p>
        <div className='flex items-center mt-2'></div>
      </div>
    </div>
  );
};

export default VideoCard;
