import { useEffect, useRef } from 'react';

import { IVideo } from '@/interfaces/video.interface';

import VideoCard from '../VideoItem/VideoItem';

interface VideoListProps {
  videos: IVideo[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

export function VideoList({
  videos,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: VideoListProps) {
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='flex flex-col items-center'>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
      {hasNextPage && (
        <div ref={loader} className='loading'>
          Loading more...
        </div>
      )}
    </div>
  );
}
