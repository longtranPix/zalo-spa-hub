
import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import ServiceCard from '@/components/services/ServiceCard';

// Dữ liệu dịch vụ theo danh mục
const categoryServices = {
  'cut-men': [
    {
      id: '1',
      name: 'Cắt Tóc Nam Thời Trang',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 150000,
      duration: '45 phút',
      category: 'Cắt Tóc Nam',
      rating: 4.9
    },
    {
      id: '6',
      name: 'Cắt Tóc Nam Undercut',
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 180000,
      duration: '50 phút',
      category: 'Cắt Tóc Nam',
      rating: 4.8
    }
  ],
  'cut-women': [
    {
      id: '7',
      name: 'Cắt Tóc Nữ Bob',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 200000,
      duration: '60 phút',
      category: 'Cắt Tóc Nữ',
      rating: 4.7
    }
  ],
  'coloring': [
    {
      id: '3',
      name: 'Nhuộm Tóc Balayage',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 1200000,
      duration: '3 giờ',
      category: 'Nhuộm Tóc',
      rating: 4.9
    }
  ],
  'perm': [
    {
      id: '2',
      name: 'Uốn Tóc Nữ Hàn Quốc',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 800000,
      duration: '2.5 giờ',
      category: 'Uốn Tóc',
      rating: 4.8
    }
  ],
  'wash': [
    {
      id: '4',
      name: 'Gội Đầu Massage',
      image: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 80000,
      duration: '30 phút',
      category: 'Chăm Sóc',
      rating: 4.7
    }
  ]
};

const categoryNames = {
  'cut-men': 'Cắt Tóc Nam',
  'cut-women': 'Cắt Tóc Nữ',
  'coloring': 'Nhuộm Tóc',
  'perm': 'Uốn Tóc',
  'treatment': 'Điều Trị Tóc',
  'styling': 'Tạo Kiểu',
  'wash': 'Gội Đầu',
  'keratin': 'Phục Hồi Keratin',
  'appointment': 'Đặt Lịch',
  'stylist': 'Hair Stylist',
  'promotion': 'Khuyến Mãi',
  'feedback': 'Đánh Giá',
  'news': 'Tin Tức'
};

const CategoryServices = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const services = categoryServices[categoryId as keyof typeof categoryServices] || [];
  const categoryName = categoryNames[categoryId as keyof typeof categoryNames] || 'Dịch vụ';

  return (
    <PageLayout title={categoryName} showBackButton>
      <div className="animate-fade-in">
        {services.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400">
                <path d="m21 21-4.35-4.35" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Chưa có dịch vụ</h3>
            <p className="text-gray-500">Danh mục này đang được cập nhật. Vui lòng quay lại sau!</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CategoryServices;
