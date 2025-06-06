
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useZalo } from '@/contexts/ZaloContext';

const stores = [
  { id: 'store1', name: 'Hair Studio Pro - Quận 1' },
  { id: 'store2', name: 'Hair Studio Pro - Quận 3' },
  { id: 'store3', name: 'Hair Studio Pro - Quận 7' }
];

const services = [
  { id: 'service1', name: 'Cắt tóc nam', price: 150000, duration: 45 },
  { id: 'service2', name: 'Cắt tóc nữ', price: 200000, duration: 60 },
  { id: 'service3', name: 'Nhuộm tóc', price: 800000, duration: 150 },
  { id: 'service4', name: 'Uốn tóc', price: 1000000, duration: 180 }
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30'
];

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast, showConfirm } = useZalo();
  
  const [selectedStore, setSelectedStore] = useState(searchParams.get('store') || '');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedStoreData = stores.find(s => s.id === selectedStore);

  const handleSubmit = async () => {
    if (!selectedStore || !selectedService || !selectedDate || !selectedTime) {
      showToast('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const confirmed = await showConfirm(
      `Xác nhận đặt lịch ${selectedServiceData?.name} vào ${format(selectedDate, 'dd/MM/yyyy')} lúc ${selectedTime}?`
    );

    if (confirmed) {
      showToast('Đặt lịch thành công!');
      navigate('/bookings');
    }
  };

  return (
    // <PageLayout title="Đặt lịch" showBackButton hideBottomNav>
      <div className="space-y-4 animate-fade-in mb-6">
        {/* Store Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chọn cửa hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className={cn(
                    "p-3 border rounded-lg cursor-pointer transition-colors",
                    selectedStore === store.id
                      ? "border-violet-500 bg-violet-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => setSelectedStore(store.id)}
                >
                  <p className="font-medium">{store.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chọn dịch vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={cn(
                    "p-3 border rounded-lg cursor-pointer transition-colors",
                    selectedService === service.id
                      ? "border-violet-500 bg-violet-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.duration} phút</p>
                    </div>
                    <span className="font-semibold text-violet-500">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chọn ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {/* Time Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chọn giờ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    selectedTime === time && "bg-violet-500 hover:bg-violet-600"
                  )}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        {selectedStoreData && selectedServiceData && selectedDate && selectedTime && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin đặt lịch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Cửa hàng:</span>
                  <span className="font-medium">{selectedStoreData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dịch vụ:</span>
                  <span className="font-medium">{selectedServiceData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ngày giờ:</span>
                  <span className="font-medium">
                    {format(selectedDate, 'dd/MM/yyyy')} - {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Thời gian:</span>
                  <span className="font-medium">{selectedServiceData.duration} phút</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng tiền:</span>
                  <span className="text-violet-500">
                    {formatPrice(selectedServiceData.price)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            className="w-full bg-violet-500 hover:bg-violet-600"
            onClick={handleSubmit}
            disabled={!selectedStore || !selectedService || !selectedDate || !selectedTime}
          >
            Xác nhận đặt lịch
          </Button>
        </div>
      </div>
    // </PageLayout>
  );
};

export default BookingForm;
