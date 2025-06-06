
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  duration: string;
  category: string;
  rating?: number;
  featured?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  image,
  price,
  duration,
  category,
  rating,
  featured,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Link to={`/service/${id}`}>
      <Card className="spa-card h-full overflow-hidden animate-fade-in transition-all hover:shadow-md">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover"
          />
          {featured && (
            <Badge className="absolute top-2 left-2 bg-violet-500">
              Nổi bật
            </Badge>
          )}
          {rating && (
            <div className="absolute bottom-2 right-2 bg-white/90 text-zalo-darkGray text-xs px-2 py-1 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-yellow-400 mr-1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <CardContent className="pt-3 pb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          <p className="text-muted-foreground text-sm">{category}</p>
        </CardContent>
        <CardFooter className="py-2 flex justify-between border-t border-gray-100">
          <div className="flex items-center">
            <span className="font-semibold text-zalo-darkGray">
              {formatPrice(price)}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {duration}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ServiceCard;
