
import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star } from 'lucide-react';

const stores = [
  {
    id: 'store1',
    name: 'Hair Studio Pro - Quận 1',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '0901 234 567',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    hours: '8:00 - 20:00',
    services: ['Cắt tóc', 'Nhuộm tóc', 'Uốn tóc'],
    featured: true
  },
  {
    id: 'store2',
    name: 'Hair Studio Pro - Quận 3',
    address: '456 Võ Văn Tần, Quận 3, TP.HCM',
    phone: '0902 345 678',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    hours: '8:00 - 20:00',
    services: ['Cắt tóc', 'Tạo kiểu', 'Chăm sóc'],
    featured: false
  },
  {
    id: 'store3',
    name: 'Hair Studio Pro - Quận 7',
    address: '789 Nguyễn Thị Thập, Quận 7, TP.HCM',
    phone: '0903 456 789',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    hours: '8:00 - 20:00',
    services: ['Cắt tóc', 'Nhuộm tóc', 'Điều trị'],
    featured: false
  }
];

const StoreList = () => {
  return (
    <PageLayout title="Cửa hàng" showBackButton>
      <div className="space-y-4 animate-fade-in">
        {stores.map((store) => (
          <Card key={store.id} className="overflow-hidden">
            <div className="relative">
              <img 
                src={store.image} 
                alt={store.name} 
                className="w-full h-48 object-cover"
              />
              {store.featured && (
                <Badge className="absolute top-2 right-2 bg-violet-500">
                  Nổi bật
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{store.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{store.rating}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{store.address}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">{store.hours}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {store.services.map((service, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link to={`/stores/${store.id}`}>
                    Xem chi tiết
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to={`/booking?store=${store.id}`}>
                    Đặt lịch
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default StoreList;
