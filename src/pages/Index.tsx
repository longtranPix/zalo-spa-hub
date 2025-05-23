import { useState, useEffect } from 'react';
import { useZalo } from '@/contexts/ZaloContext';
import PageLayout from '@/components/layout/PageLayout';
import ServiceCard from '@/components/ServiceCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

// Mock data
const featuredServices = [
  {
    id: '1',
    name: 'Deep Tissue Massage',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 79,
    duration: '60 min',
    category: 'Massage',
    rating: 4.8,
    featured: true
  },
  {
    id: '2',
    name: 'Aromatherapy Facial',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 89,
    duration: '45 min',
    category: 'Facial',
    rating: 4.7,
    featured: true
  },
  {
    id: '3',
    name: 'Hot Stone Therapy',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 99,
    duration: '75 min',
    category: 'Therapy',
    rating: 4.9,
    featured: true
  }
];

const categories = [
  {
    id: 'appointment',
    name: 'Đặt hẹn',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    count: 5,
    color: '#7367F0'
  },
  {
    id: 'bills',
    name: 'Hóa đơn',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
    count: 8,
    color: '#28C76F'
  },
  {
    id: 'treatment',
    name: 'Liệu trình',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M20 21v-8a2 2 0 0 0-2-2h-1" />
        <path d="M13 13V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2" />
        <path d="m5 18 14-7" />
      </svg>
    ),
    count: 6,
    color: '#9F86C0'
  },
  {
    id: 'feedback',
    name: 'Feedback',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
      </svg>
    ),
    count: 4,
    color: '#EA5455'
  },
  {
    id: 'news',
    name: 'Tin tức',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
      </svg>
    ),
    count: 7,
    color: '#00CFE8'
  },
];

// Spa service categories
const spaCategories = [
  {
    id: 'skin',
    name: 'Điều trị da',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      </svg>
    ),
    count: 12,
    color: '#A162F7'
  },
  {
    id: 'skincare',
    name: 'Chăm sóc da',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10" />
      </svg>
    ),
    count: 8,
    color: '#325795'
  },
  {
    id: 'tech',
    name: 'Công nghệ cao',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
    count: 5,
    color: '#D64A4A'
  },
  {
    id: 'waxing',
    name: 'Triệt lông',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    count: 6,
    color: '#A162F7'
  },
  {
    id: 'whitening',
    name: 'Tắm trắng',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 14.14 14.14" />
      </svg>
    ),
    count: 4,
    color: '#D64A4A'
  },
];

const popularServices = [
  {
    id: '4',
    name: 'Swedish Massage',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 69,
    duration: '50 min',
    category: 'Massage',
    rating: 4.6
  },
  {
    id: '5',
    name: 'Anti-Aging Facial',
    image: 'https://images.unsplash.com/photo-1614659678526-2d0977ba3928?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 95,
    duration: '60 min',
    category: 'Facial',
    rating: 4.8
  }
];

const Index = () => {
  const { userInfo, showToast } = useZalo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout title="Serene Spa">
      {/* Search Bar */}
      <div className="mb-6 animate-slide-up">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            type="search"
            placeholder="Tìm kiếm"
            className="pl-10 bg-muted/40 border-none"
          />
        </div>
      </div>

      {/* Main Categories */}
      <div className="mb-8 animate-slide-up">
        <div className="grid grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>

      {/* Spa Categories */}
      <section className="mb-8 bg-white rounded-lg p-4 shadow-sm animate-slide-up">
        <h2 className="text-lg font-semibold mb-4">Dịch vụ spa</h2>
        <div className="grid grid-cols-5 gap-x-2 gap-y-4">
          {spaCategories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </section>

      {/* Featured Services */}
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
    </PageLayout>
  );
};

export default Index;
