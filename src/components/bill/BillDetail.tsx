
import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const billData = {
  HD001: {
    id: 'HD001',
    serviceName: 'Cắt Tóc Nam Thời Trang',
    date: '2025-05-20',
    time: '14:30',
    status: 'completed',
    stylist: 'Minh Tuấn',
    store: 'Hair Studio Pro - Quận 1',
    items: [
      { name: 'Cắt tóc nam', quantity: 1, price: 150000 },
      { name: 'Gội đầu massage', quantity: 1, price: 30000 }
    ],
    subtotal: 180000,
    discount: 18000,
    total: 162000,
    paymentMethod: 'Tiền mặt'
  }
};

const BillDetail = () => {
  const { id } = useParams<{ id: string }>();
  const bill = billData[id as keyof typeof billData];

  if (!bill) {
    return (
      <PageLayout title="Không tìm thấy" showBackButton>
        <div className="text-center py-8">
          <p>Không tìm thấy hóa đơn</p>
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-violet-500';
      case 'canceled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'completed':
        return 'Hoàn thành';
      case 'upcoming':
        return 'Sắp tới';
      case 'canceled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  return (
    <PageLayout title="Chi tiết hóa đơn" showBackButton hideBottomNav>
      <div className="space-y-4 animate-fade-in">
        {/* Bill Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{bill.serviceName}</CardTitle>
                <p className="text-muted-foreground">Hóa đơn #{bill.id}</p>
              </div>
              <Badge className={getStatusColor(bill.status)}>
                {getStatusText(bill.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngày:</span>
                <span>{formatDate(bill.date)} • {bill.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hair Stylist:</span>
                <span>{bill.stylist}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cửa hàng:</span>
                <span>{bill.store}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Thanh toán:</span>
                <span>{bill.paymentMethod}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bill Items */}
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết dịch vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bill.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">{formatPrice(item.price)}</span>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(bill.subtotal)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá (10%):</span>
                  <span>-{formatPrice(bill.discount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-violet-500">{formatPrice(bill.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          <Button className="w-full" variant="outline">
            In hóa đơn
          </Button>
          <Button className="w-full bg-violet-500 hover:bg-violet-600">
            Đặt lại dịch vụ
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default BillDetail;
