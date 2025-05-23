
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
      <Card className="spa-card h-full transition-all hover:shadow-md">
        <CardContent className="p-4 flex items-center">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{count} services</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
