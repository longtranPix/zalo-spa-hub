
import { useState, useEffect } from 'react';
import { useZalo } from '@/contexts/ZaloContext';
import PageLayout from '@/components/layout/PageLayout';
import ServiceCard from '@/components/ServiceCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

// Dịch vụ nổi bật
const featuredServices = [
  {
    id: '1',
    name: 'Cắt Tóc Nam Thời Trang',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 150000,
    duration: '45 phút',
    category: 'Cắt Tóc Nam',
    rating: 4.9,
    featured: true
  },
  {
    id: '2',
    name: 'Uốn Tóc Nữ Hàn Quốc',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 800000,
    duration: '2.5 giờ',
    category: 'Uốn Tóc',
    rating: 4.8,
    featured: true
  },
  {
    id: '3',
    name: 'Nhuộm Tóc Balayage',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 1200000,
    duration: '3 giờ',
    category: 'Nhuộm Tóc',
    rating: 4.9,
    featured: true
  }
];

// Danh mục chính
const categories = [
  {
    id: 'appointment',
    name: 'Đặt Lịch',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    count: 8,
    color: '#7367F0'
  },
  {
    id: 'stylist',
    name: 'Hair Stylist',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    ),
    count: 12,
    color: '#28C76F'
  },
  {
    id: 'promotion',
    name: 'Khuyến Mãi',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    count: 5,
    color: '#9F86C0'
  },
  {
    id: 'feedback',
    name: 'Đánh Giá',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
      </svg>
    ),
    count: 15,
    color: '#EA5455'
  }
];

// Danh mục dịch vụ tóc
const hairCategories = [
  {
    id: 'cut-men',
    name: 'Cắt Tóc Nam',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2v8" />
        <path d="m16.24 7.76-5.9 5.9" />
      </svg>
    ),
    count: 8,
    color: '#A162F7'
  },
  {
    id: 'cut-women',
    name: 'Cắt Tóc Nữ',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    ),
    count: 12,
    color: '#325795'
  },
  {
    id: 'coloring',
    name: 'Nhuộm Tóc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
      </svg>
    ),
    count: 10,
    color: '#D64A4A'
  },
  {
    id: 'perm',
    name: 'Uốn Tóc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M20.83 14.83c-.3.3-.74.38-1.12.2a1.2 1.2 0 0 0-1.5.3" />
        <path d="M15.83 19.83c-.3.3-.74.38-1.12.2a1.2 1.2 0 0 0-1.5.3" />
      </svg>
    ),
    count: 6,
    color: '#A162F7'
  },
  {
    id: 'treatment',
    name: 'Điều Trị Tóc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10" />
      </svg>
    ),
    count: 9,
    color: '#D64A4A'
  }
];

const popularServices = [
  {
    id: '4',
    name: 'Gội Đầu Massage',
    image: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 80000,
    duration: '30 phút',
    category: 'Chăm Sóc',
    rating: 4.7
  },
  {
    id: '5',
    name: 'Tạo Kiểu Tóc Cưới',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 500000,
    duration: '2 giờ',
    category: 'Tạo Kiểu',
    rating: 4.9
  }
];

const Index = () => {
  const { userInfo, showToast } = useZalo();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout title="Hair Studio Pro">
      {/* Thanh tìm kiếm */}
      <div className="mb-6 animate-slide-up">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            type="search"
            placeholder="Tìm kiếm dịch vụ..."
            className="pl-10 bg-muted/40 border-none"
          />
        </div>
      </div>

      {/* Danh mục chính */}
      <div className="mb-8 animate-slide-up">
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>

      {/* Danh mục dịch vụ tóc */}
      <section className="mb-8 bg-white rounded-lg p-4 shadow-sm animate-slide-up">
        <h2 className="text-lg font-semibold mb-4">Dịch vụ tóc</h2>
        <div className="grid grid-cols-5 gap-x-2 gap-y-4">
          {hairCategories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </section>

      {/* Dịch vụ nổi bật */}
      <section className="mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Dịch vụ nổi bật</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/categories">Xem thêm</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      {/* Dịch vụ phổ biến */}
      <section className="mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Dịch vụ phổ biến</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {popularServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
