
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  icon,
  count,
  color,
}) => {
  return (
    <Link to={`/categories/${id}`}>
      <div className="flex flex-col items-center justify-center">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <p className="text-xs text-center font-medium mt-1">{name}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
