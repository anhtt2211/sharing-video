import { render, screen } from '@testing-library/react';
import React from 'react';
import { useInfiniteQuery } from 'react-query';
import '@testing-library/jest-dom/extend-expect';

import { VideoList } from '@/app/(private)/components/video/VideoList';

import HomePage from './page';

jest.mock('react-query');
jest.mock('@/app/(private)/components/video/VideoList');

describe('HomePage', () => {
  beforeEach(() => {
    (useInfiniteQuery as jest.Mock).mockClear();
  });

  it('should display loading state initially', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<HomePage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display error message if error occurs', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<HomePage />);
    expect(screen.getByText('Error: unknown error')).toBeInTheDocument();
  });

  it('should render video list when data is loaded', () => {
    const mockData = {
      pages: [
        {
          items: [
            { id: 1, title: 'Video 1' },
            { id: 2, title: 'Video 2' },
          ],
          currentPage: 1,
          totalPages: 2,
        },
      ],
    };

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    (VideoList as jest.Mock).mockImplementation(({ videos }) => (
      <div>
        {videos.map((video: any) => (
          <div key={video.id}>{video.title}</div>
        ))}
      </div>
    ));

    render(<HomePage />);
    expect(screen.getByText('Video 1')).toBeInTheDocument();
    expect(screen.getByText('Video 2')).toBeInTheDocument();
  });

  it('should call fetchNextPage when the next page is available', () => {
    const mockFetchNextPage = jest.fn();

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            items: [{ id: 1, title: 'Video 1' }],
            currentPage: 1,
            totalPages: 2,
          },
        ],
      },
      isLoading: false,
      isError: false,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    render(<HomePage />);
    // Here you can add logic to simulate a button click or any other event
    // that triggers fetchNextPage if your VideoList component supports it.

    expect(mockFetchNextPage).not.toHaveBeenCalled();
    // Simulate an event that would call fetchNextPage here
    // Example: screen.getByText('Load More').click();
  });
});
