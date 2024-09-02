import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { VideoList } from './VideoList';
import { IVideo } from '@/interfaces/video.interface';
import { act } from 'react';

// Define a simple mock for testing
class IntersectionObserverMock {
  readonly root: Element | null = null;
  readonly rootMargin: string = '0px';
  readonly thresholds: ReadonlyArray<number> = [];

  // Simulate the callback and options properties the constructor receives
  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {}

  // Mimic the method to simulate intersection changing
  observe(target: Element): void {
    // Trigger a fake intersection change
    const entries: IntersectionObserverEntry[] = [
      {
        boundingClientRect: target.getBoundingClientRect(),
        intersectionRatio: 1,
        intersectionRect: target.getBoundingClientRect(),
        isIntersecting: true,
        rootBounds: this.root?.getBoundingClientRect() || null,
        target,
        time: Date.now(),
      },
    ];
    this.callback(entries, this);
  }

  unobserve(target: Element): void {
    // Optional for cleanup in tests
  }

  disconnect(): void {
    // Optional for cleanup in tests
  }

  takeRecords(): IntersectionObserverEntry[] {
    return []; // Implement based on testing needs
  }
}

// In your test setup file or before unit tests:

beforeEach(() => {
  // Assign the mock to global.IntersectionObserver
  global.IntersectionObserver = IntersectionObserverMock as any;
});

afterEach(() => {
  // Clean up after each test
  jest.clearAllMocks();
});

describe('VideoList Component', () => {
  const mockVideos: IVideo[] = [
    {
      id: 'c9747103-1c5e-43fc-ae97-97ca2515ce7e',
      videoId: 'lT42tHfrP7c',
      title:
        'Tại sao ngày 2/9/1945 - Bác Hồ nhất định phải đọc tuyên ngôn độc lập?',
      description:
        'Tại sao ngày 2/9/1945 - Bác Hồ nhất định phải đọc tuyên ngôn độc lập?\n\nThông tin liên hệ:\nĐịa chỉ: V6B, ô số 03, khu Văn Phú, phường Phú La, quận Hà Đông, tp Hà Nội.\nHotline: 0786 457 222\n\nBell Home cam kết:\n- Sản phẩm được sản xuất trên dây chuyền chuẩn Đức 100% \n- Sản phẩm an toàn, giá tận gốc từ nhà máy\n- Chính sách, dịch vụ chăm sóc khách hàng sau mua chuyên nghiệp\nWebsite: https://bellhome.vn/\n\n■ Gmail: phianhtuan1993@gmail.com\n■ Spotify: https://canvato.net/sl/0g2Zw\n■ Facebook : https://www.facebook.com/phianhtuan2911\n■ Instagram: https://www.instagram.com/phianhtuan2911\n\nNhạc nền bản tin - Sơn Beat\n#tuantienti\n------------------------------------------------------------------------------\nTags: tuấn tiền tỉ, tổ buôn 247, vlog tuấn tiền tỉ, tuấn tiền tỉ chém gió, tuấn tiền tỉ tin tức, tổ buôn, tin tức 247, tuấn tiền tỉ bản tin, đàm đạo lịch sử, tuấn tiền tỉ mới nhất, tuấn tiền tỉ bình luận bóng đá, tuấn tiền tỉ putin, tuấn tiền tỉ hải dớ, tuấn tiền tỉ lịch sử việt nam, tuấn tiền tỉ tin mới nhất, tuấn tiền tỉ lịch sử, lê đức thọ tuấn tiền tỉ, tổng hợp tuấn tiền tỉ, tuấn tiền tỉ mới nhất hôm nay, bản tin 247 tuấn tiền tỉ',
      url: 'https://www.youtube.com/watch?v=lT42tHfrP7c',
      thumbnailUrl: 'https://i.ytimg.com/vi/lT42tHfrP7c/default.jpg',
      user: {
        id: '44288c37-85a1-4f49-8111-3ae3b9c83fb9',
        username: 'admin',
        email: 'trananh22112001@gmail.com',
      },
    },
    {
      id: '651f7b82-9f60-4cc9-a494-73b7b130e1b6',
      videoId: 'cG_2ZSvaE0Y',
      title:
        '퇴근길 노래와 노을지는 도시 ✨ 저녁에 듣기좋은 잔잔한 감성 팝송 | Design making tutorial',
      description:
        "해당 영상은 제작과정과 설명 자막을 포함하고 있습니다.\n03:16 부터 Design making tutorial 영상이 시작됩니다.\n\n제 채널의 이미지 배경화면과 영상물은 \n상업적으로 100% 사용 가능한 이미지를 직접 2차 가공, 디자인한 것입니다.\n\n저는 어도비 포토샵, 일러스트, 에프터이펙트, 프리미어를 사용해서\n영상을 제작합니다.\n\nBlue rain 채널에서는 원저작물에 새로운 창작성을 가한 2차 창작물의 경우, \n라이센스를 해소한 음원과 영상을 통해 변형·각색하여 제작하고 있습니다. \n이는 '공정 이용'의 범위에 속하며 저작권법에 위배되지 않습니다.",
      url: 'https://www.youtube.com/watch?v=cG_2ZSvaE0Y',
      thumbnailUrl: 'https://i.ytimg.com/vi/cG_2ZSvaE0Y/default.jpg',
      createdAt: '2024-08-31T20:28:31.265Z',
      updatedAt: '2024-08-31T20:28:31.265Z',
      user: {
        id: '44288c37-85a1-4f49-8111-3ae3b9c83fb9',
        email: 'trananh22112001@gmail.com',
        username: 'admin',
      },
    },
  ];

  it('renders the video list', () => {
    act(() => {
      render(
        <VideoList
          videos={mockVideos}
          fetchNextPage={jest.fn()}
          hasNextPage={false}
          isFetchingNextPage={false}
        />
      );
    });

    // Check that the videos are rendered
    expect(
      screen.getByText(
        'Tại sao ngày 2/9/1945 - Bác Hồ nhất định phải đọc tuyên ngôn độc lập?'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '퇴근길 노래와 노을지는 도시 ✨ 저녁에 듣기좋은 잔잔한 감성 팝송 | Design making tutorial'
      )
    ).toBeInTheDocument();
  });

  it('calls fetchNextPage when loader is intersecting', () => {
    const fetchNextPage = jest.fn();

    act(() => {
      render(
        <VideoList
          videos={mockVideos}
          fetchNextPage={fetchNextPage}
          hasNextPage={true}
          isFetchingNextPage={false}
        />
      );
    });

    // The observer should trigger fetchNextPage when the loader div is observed
    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('does not call fetchNextPage if isFetchingNextPage is true', () => {
    const fetchNextPage = jest.fn();

    act(() => {
      render(
        <VideoList
          videos={mockVideos}
          fetchNextPage={fetchNextPage}
          hasNextPage={true}
          isFetchingNextPage={true}
        />
      );
    });

    // The observer should not trigger fetchNextPage since isFetchingNextPage is true
    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it('does not render the loader if hasNextPage is false', () => {
    act(() => {
      render(
        <VideoList
          videos={mockVideos}
          fetchNextPage={jest.fn()}
          hasNextPage={false}
          isFetchingNextPage={false}
        />
      );
    });

    // The loader div should not be rendered
    expect(screen.queryByText('Loading more...')).not.toBeInTheDocument();
  });

  it('renders the loader if hasNextPage is true', () => {
    act(() => {
      render(
        <VideoList
          videos={mockVideos}
          fetchNextPage={jest.fn()}
          hasNextPage={true}
          isFetchingNextPage={false}
        />
      );
    });

    // The loader div should be rendered
    expect(screen.getByText('Loading more...')).toBeInTheDocument();
  });
});
