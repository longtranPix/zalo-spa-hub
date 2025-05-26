
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useZalo } from '@/contexts/ZaloContext';

// Dữ liệu dịch vụ tóc
const services = [
  {
    id: '1',
    name: 'Cắt Tóc Nam Thời Trang',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 150000,
    duration: '45 phút',
    category: 'Cắt Tóc Nam',
    rating: 4.9,
    featured: true,
    description: 'Dịch vụ cắt tóc nam theo xu hướng thời trang hiện đại. Với đội ngũ hair stylist chuyên nghiệp, chúng tôi sẽ tư vấn và tạo nên kiểu tóc phù hợp với khuôn mặt và phong cách của bạn.',
    benefits: [
      'Tư vấn kiểu tóc phù hợp',
      'Sử dụng dụng cụ chuyên nghiệp',
      'Gội đầu massage thư giãn',
      'Tạo kiểu hoàn thiện',
      'Bảo hành kiểu tóc 7 ngày'
    ],
    stylists: [
      { name: 'Minh Tuấn', image: 'https://randomuser.me/api/portraits/men/44.jpg' },
      { name: 'Hoàng Nam', image: 'https://randomuser.me/api/portraits/men/32.jpg' }
    ]
  },
  {
    id: '2',
    name: 'Uốn Tóc Nữ Hàn Quốc',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 800000,
    duration: '2.5 giờ',
    category: 'Uốn Tóc',
    rating: 4.8,
    featured: true,
    description: 'Dịch vụ uốn tóc theo phong cách Hàn Quốc với công nghệ hiện đại, tạo nên những lọn tóc tự nhiên, bồng bềnh và quyến rũ.',
    benefits: [
      'Công nghệ uốn tóc tiên tiến',
      'Sản phẩm chăm sóc cao cấp',
      'Kiểu dáng tự nhiên, bền lâu',
      'Tư vấn chăm sóc tại nhà',
      'Bảo hành 30 ngày'
    ],
    stylists: [
      { name: 'Thu Hà', image: 'https://randomuser.me/api/portraits/women/67.jpg' },
      { name: 'Linh Chi', image: 'https://randomuser.me/api/portraits/women/75.jpg' }
    ]
  },
];

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast, showConfirm } = useZalo();
  const [activeTab, setActiveTab] = useState('details');

  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <PageLayout title="Không tìm thấy" showBackButton>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-4">Không tìm thấy dịch vụ</h2>
          <Button onClick={() => navigate('/')}>Về trang chủ</Button>
        </div>
      </PageLayout>
    );
  }

  const handleBooking = async () => {
    const confirmed = await showConfirm(`Đặt lịch ${service.name} với giá ${formatPrice(service.price)}?`);
    if (confirmed) {
      showToast('Đặt lịch thành công!');
      navigate('/bookings');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <PageLayout title={service.name} showBackButton hideBottomNav>
      <div className="animate-fade-in">
        {/* Hình ảnh dịch vụ */}
        <div className="-mx-4 -mt-4 mb-4">
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-16 right-4">
            {service.featured && (
              <Badge className="bg-violet-500">
                Nổi bật
              </Badge>
            )}
          </div>
        </div>

        {/* Thông tin dịch vụ */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{service.name}</h1>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFB400" className="w-5 h-5 mr-1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="font-semibold">{service.rating}</span>
            </div>
          </div>
          <p className="text-muted-foreground">{service.category}</p>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground mr-1">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-muted-foreground">{service.duration}</span>
            </div>
            <div className="text-xl font-bold text-violet-500">
              {formatPrice(service.price)}
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />

        {/* Tabs thông tin */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Chi tiết</TabsTrigger>
            <TabsTrigger value="benefits">Lợi ích</TabsTrigger>
            <TabsTrigger value="stylists">Hair Stylist</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="animate-fade-in">
            <p className="text-muted-foreground">{service.description}</p>
          </TabsContent>
          <TabsContent value="benefits" className="animate-fade-in">
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500 mr-2 mt-0.5">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="stylists" className="animate-fade-in">
            <div className="space-y-3">
              {service.stylists.map((stylist, index) => (
                <Card key={index}>
                  <CardContent className="p-3 flex items-center">
                    <img 
                      src={stylist.image} 
                      alt={stylist.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{stylist.name}</h3>
                      <p className="text-sm text-muted-foreground">Hair Stylist Chuyên Nghiệp</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Nút đặt lịch */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <Button 
            className="w-full bg-violet-500 hover:bg-violet-600 text-white py-6"
            onClick={handleBooking}
          >
            Đặt lịch ngay
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServiceDetail;
