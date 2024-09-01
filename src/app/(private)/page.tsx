'use client';

import { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';

import { getFeedsApi } from '@/apis/video.api';
import VideoList from '@/app/(private)/components/video/VideoList';

export default function HomePage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(
    'videos',
    ({ pageParam = 1 }) => getFeedsApi({ page: pageParam, pageSize: 10 }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
    }
  );

  const videos = data ? data.pages.flatMap((page) => page.items) : [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: unknown error</div>;

  return (
    <Fragment>
      <VideoList
        videos={videos}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </Fragment>
  );
}
