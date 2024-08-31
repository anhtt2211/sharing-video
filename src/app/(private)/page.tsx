'use client';

import { getFeedsApi } from '@/apis/video.api';
import VideoList from '@/app/(private)/components/video/VideoList';
import { IVideo } from '@/interfaces/video.interface';
import '@/lib/env';
import { Fragment, useEffect, useState } from 'react';

export default function HomePage() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const videos = await getFeedsApi();
      setVideos(videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <Fragment>
      <VideoList videos={videos} />
    </Fragment>
  );
}
