
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import CategoryCard from '@/components/categories/CategoryCard';

// Tất cả danh mục dịch vụ tóc
const allCategories = [
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
    color: '#4ECDC4'
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
    color: '#9F86C0'
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
    color: '#F8B195'
  },
  {
    id: 'perm',
    name: 'Uốn Tóc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M20.83 14.83c-.3.3-.74.38-1.12.2a1.2 1.2 0 0 0-1.5.3" />
      </svg>
    ),
    count: 6,
    color: '#2CAE66'
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
    color: '#0068FF'
  },
  {
    id: 'styling',
    name: 'Tạo Kiểu',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
    count: 7,
    color: '#F06292'
  },
  {
    id: 'wash',
    name: 'Gội Đầu',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 14.14 14.14" />
      </svg>
    ),
    count: 4,
    color: '#FFA726'
  },
  {
    id: 'keratin',
    name: 'Phục Hồi Keratin',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="m8 2 4 10 4-10" />
        <path d="M12 12v10" />
      </svg>
    ),
    count: 5,
    color: '#7E57C2'
  }
];

const CategoryList = () => {
  return (
    <PageLayout title="Danh mục dịch vụ" showBackButton>
      <div className="grid grid-cols-3 gap-4 animate-fade-in">
        {allCategories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </PageLayout>
  );
};

export default CategoryList;
