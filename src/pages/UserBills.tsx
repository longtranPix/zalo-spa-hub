
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Dữ liệu hóa đơn khách hàng
const userBills = [
  {
    id: 'HD001',
    serviceName: 'Cắt Tóc Nam Thời Trang',
    date: '2025-05-20',
    time: '14:30',
    price: 150000,
    status: 'completed',
    stylist: 'Minh Tuấn'
  },
  {
    id: 'HD002',
    serviceName: 'Uốn Tóc Nữ Hàn Quốc',
    date: '2025-05-18',
    time: '10:00',
    price: 800000,
    status: 'completed',
    stylist: 'Thu Hà'
  },
  {
    id: 'HD003',
    serviceName: 'Nhuộm Tóc Balayage',
    date: '2025-05-25',
    time: '16:00',
    price: 1200000,
    status: 'upcoming',
    stylist: 'Linh Chi'
  },
  {
    id: 'HD004',
    serviceName: 'Gội Đầu Massage',
    date: '2025-05-15',
    time: '09:00',
    price: 80000,
    status: 'completed',
    stylist: 'Hoàng Nam'
  }
];

const UserBills = () => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
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

  const totalAmount = userBills
    .filter(bill => bill.status === 'completed')
    .reduce((sum, bill) => sum + bill.price, 0);

  return (
    <PageLayout title="Hóa đơn của tôi" showBackButton>
      <div className="space-y-4 animate-fade-in">
        {/* Thống kê tổng quan */}
        <Card className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm">Tổng chi tiêu</p>
                <p className="text-2xl font-bold">{formatPrice(totalAmount)}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">Số lần sử dụng</p>
                <p className="text-2xl font-bold">{userBills.filter(b => b.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danh sách hóa đơn */}
        {userBills.map((bill) => (
          <Card key={bill.id} className="spa-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{bill.serviceName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(bill.date)} • {bill.time}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Hair Stylist: {bill.stylist}
                  </p>
                </div>
                <Badge className={`${getStatusColor(bill.status)}`}>
                  {getStatusText(bill.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mã hóa đơn</span>
                  <span className="font-medium">{bill.id}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Thành tiền</span>
                  <span className="font-semibold text-violet-500">{formatPrice(bill.price)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default UserBills;
