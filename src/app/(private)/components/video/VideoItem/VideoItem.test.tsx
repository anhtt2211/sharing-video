import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoCard from './VideoItem';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react';

describe('VideoCard', () => {
  const mockVideo = {
    id: 'c9747103-1c5e-43fc-ae97-97ca2515ce7e',
    videoId: 'lT42tHfrP7c',
    title:
      'Tại sao ngày 2/9/1945 - Bác Hồ nhất định phải đọc tuyên ngôn độc lập?',
    description:
      'Tại sao ngày 2/9/1945 - Bác Hồ nhất định phải đọc tuyên ngôn độc lập?\n\nThông tin liên hệ:\nĐịa chỉ: V6B, ô số 03, khu Văn Phú, phường Phú La, quận Hà Đông, tp Hà Nội.\nHotline: 0786 457 222\n\nBell Home cam kết:\n- Sản phẩm được sản xuất trên dây chuyền chuẩn Đức 100% \n- Sản phẩm an toàn, giá tận gốc từ nhà máy\n- Chính sách, dịch vụ chăm sóc khách hàng sau mua chuyên nghiệp\nWebsite: https://bellhome.vn/\n\n■ Gmail: phianhtuan1993@gmail.com\n■ Spotify: https://canvato.net/sl/0g2Zw\n■ Facebook : https://www.facebook.com/phianhtuan2911\n■ Instagram: https://www.instagram.com/phianhtuan2911\n\nNhạc nền bản tin - Sơn Beat\n#tuantienti\n------------------------------------------------------------------------------\nTags: tuấn tiền tỉ, tổ buôn 247, vlog tuấn tiền tỉ, tuấn tiền tỉ chém gió, tuấn tiền tỉ tin tức, tổ buôn, tin tức 247, tuấn tiền tỉ bản tin, đàm đạo lịch sử, tuấn tiền tỉ mới nhất, tuấn tiền tỉ bình luận bóng đá, tuấn tiền tỉ putin, tuấn tiền tỉ hải dớ, tuấn tiền tỉ lịch sử việt nam, tuấn tiền tỉ tin mới nhất, tuấn tiền tỉ lịch sử, lê đức thọ tuấn tiền tỉ, tổng hợp tuấn tiền tỉ, tuấn tiền tỉ mới nhất hôm nay, bản tin 247 tuấn tiền tỉ',
    url: 'https://www.youtube.com/watch?v=lT42tHfrP7c',
    thumbnailUrl: 'https://i.ytimg.com/vi/lT42tHfrP7c/default.jpg',
    createdAt: '2024-09-01T03:45:50.077Z',
    updatedAt: '2024-09-01T03:45:50.077Z',
    user: {
      id: '44288c37-85a1-4f49-8111-3ae3b9c83fb9',
      username: 'admin',
      email: 'trananh22112001@gmail.com',
      password: '$2b$10$ss5rT.E1qUn07i7itQt3Ye9GUq3VPlikmZtnjd7wozBQk5LdmxjIa',
    },
  };

  it('renders correctly', () => {
    act(() => {
      render(<VideoCard video={mockVideo} />);
    });

    // Check if the iframe is rendered
    const iframe = screen.getByTitle(mockVideo.title);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      `https://www.youtube.com/embed/${mockVideo.videoId}`
    );

    // Check the displayed title
    const title = screen.getByText(mockVideo.title);
    expect(title).toBeInTheDocument();

    // Check the displayed username
    const usernameDisplay = screen.getByText(
      `Shared by: ${mockVideo.user.username}`
    );
    expect(usernameDisplay).toBeInTheDocument();
  });
});
