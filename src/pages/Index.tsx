
import { useState, useEffect } from 'react';
import { useZalo } from '@/contexts/ZaloContext';
import PageLayout from '@/components/layout/PageLayout';
import ServiceCard from '@/components/ServiceCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
    id: 'massage',
    name: 'Massage',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
      </svg>
    ),
    count: 12,
    color: '#4ECDC4'
  },
  {
    id: 'facial',
    name: 'Facial',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    ),
    count: 8,
    color: '#9F86C0'
  },
  {
    id: 'body',
    name: 'Body Treatment',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="m8 2 4 10 4-10" />
        <path d="M12 12v10" />
      </svg>
    ),
    count: 10,
    color: '#F8B195'
  },
  {
    id: 'hair',
    name: 'Hair & Nails',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M5.2 18H20" />
        <path d="M5.2 18a2 2 0 1 0 0 4H20v-4" />
        <path d="M15 10v4" />
        <path d="M8 10v4" />
        <path d="M12 10v4" />
        <path d="M2 10v4" />
        <path d="M20 10v4" />
        <path d="M2 14h20" />
      </svg>
    ),
    count: 6,
    color: '#2CAE66'
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
      {/* Greeting Section */}
      <section className="mb-6 animate-slide-up">
        <h2 className="text-2xl font-semibold mb-2">
          Hello, {userInfo?.name || 'Guest'}
        </h2>
        <p className="text-muted-foreground">
          Find your perfect spa service today
        </p>
      </section>

      {/* Featured Services */}
      <section className="mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Featured Services</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/categories">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/categories">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </section>

      {/* Popular Services */}
      <section className="animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Popular Services</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/categories">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {popularServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
