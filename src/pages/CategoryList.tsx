
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import CategoryCard from '@/components/CategoryCard';

// Mock data
const allCategories = [
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
  {
    id: 'wellness',
    name: 'Wellness & Spa',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2v8" />
        <path d="m16.24 7.76-5.9 5.9" />
        <path d="m19 12-5 5" />
        <path d="m12 19-7-7c-1.1-1.1-1.1-2.9 0-4l7 7Z" />
      </svg>
    ),
    count: 9,
    color: '#0068FF'
  },
  {
    id: 'packages',
    name: 'Spa Packages',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M20 6v14H6a2 2 0 0 1-2-2V6m16 0a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2m16 0H4" />
      </svg>
    ),
    count: 5,
    color: '#F06292'
  },
  {
    id: 'sauna',
    name: 'Sauna & Bath',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M7 2v11m0 3v6" />
        <path d="M20.83 14.83c-.3.3-.74.38-1.12.2a1.2 1.2 0 0 0-1.5.3 1.2 1.2 0 0 1-1.71 0 1.2 1.2 0 0 0-1.7 0 1.2 1.2 0 0 1-1.7 0 1.2 1.2 0 0 0-1.7 0 1.2 1.2 0 0 1-1.7 0 1.2 1.2 0 0 0-1.59-.21c-.38.18-.82.1-1.12-.2a1.2 1.2 0 0 1 0-1.7l10-10a1.2 1.2 0 0 1 1.7 0c.3.3.38.74.2 1.12a1.2 1.2 0 0 0 .3 1.5 1.2 1.2 0 0 1 0 1.71 1.2 1.2 0 0 0 0 1.7 1.2 1.2 0 0 1 0 1.7 1.2 1.2 0 0 0 0 1.7 1.2 1.2 0 0 1 0 1.7 1.2 1.2 0 0 0 0 1.7 1.2 1.2 0 0 1 0 1.7Z" />
      </svg>
    ),
    count: 4,
    color: '#FFA726'
  },
  {
    id: 'ayurveda',
    name: 'Ayurveda',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5a4 4 0 0 0 0 7 4 4 0 0 0 7-7" />
        <path d="M12 12h.01" />
      </svg>
    ),
    count: 7,
    color: '#7E57C2'
  }
];

const CategoryList = () => {
  return (
    <PageLayout title="Categories" showBackButton>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
        {allCategories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </PageLayout>
  );
};

export default CategoryList;
