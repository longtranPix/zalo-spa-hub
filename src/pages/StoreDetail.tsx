
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, Phone, Star, Camera } from 'lucide-react';

const storeData = {
  store1: {
    id: 'store1',
    name: 'Hair Studio Pro - Quận 1',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '0901 234 567',
    rating: 4.9,
    reviewCount: 127,
    hours: '8:00 - 20:00',
    description: 'Salon tóc hàng đầu tại Quận 1 với đội ngũ stylist chuyên nghiệp và trang thiết bị hiện đại.',
    services: [
      { name: 'Cắt tóc nam', price: 150000 },
      { name: 'Cắt tóc nữ', price: 200000 },
      { name: 'Nhuộm tóc', price: 800000 },
      { name: 'Uốn tóc', price: 1000000 }
    ],
    stylists: [
      { name: 'Minh Tuấn', experience: '5 năm', specialty: 'Cắt tóc nam' },
      { name: 'Thu Hà', experience: '7 năm', specialty: 'Nhuộm tóc' },
      { name: 'Linh Chi', experience: '6 năm', specialty: 'Uốn tóc' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ]
  }
};

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const store = storeData[id as keyof typeof storeData];

  if (!store) {
    return (
      <PageLayout title="Không tìm thấy" showBackButton>
        <div className="text-center py-8">
          <p>Không tìm thấy cửa hàng</p>
        </div>
      </PageLayout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <PageLayout title={store.name} showBackButton hideBottomNav>
      <div className="space-y-4 animate-fade-in">
        {/* Gallery */}
        <div className="grid grid-cols-3 gap-2">
          {store.gallery.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img 
                src={image} 
                alt={`${store.name} ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              {index === 2 && (
                <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Store Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h1 className="text-xl font-bold">{store.name}</h1>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-semibold">{store.rating}</span>
                <span className="text-muted-foreground text-sm ml-1">({store.reviewCount})</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-3">{store.description}</p>

            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                <span className="text-sm">{store.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm">{store.phone}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm">{store.hours}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Dịch vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {store.services.map((service, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{service.name}</span>
                  <span className="font-semibold text-violet-500">
                    {formatPrice(service.price)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stylists */}
        <Card>
          <CardHeader>
            <CardTitle>Hair Stylists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {store.stylists.map((stylist, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{stylist.name}</p>
                    <p className="text-sm text-muted-foreground">{stylist.specialty}</p>
                  </div>
                  <Badge variant="secondary">{stylist.experience}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Book Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <Button asChild className="w-full bg-violet-500 hover:bg-violet-600">
            <Link to={`/booking?store=${store.id}`}>
              Đặt lịch ngay
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default StoreDetail;
