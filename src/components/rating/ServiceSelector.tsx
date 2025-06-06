
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scissors } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface ServiceSelectorProps {
  selectedService: string;
  onServiceChange: (serviceId: string) => void;
  services: Service[];
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  selectedService,
  onServiceChange,
  services
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Scissors className="w-5 h-5" />
          <span>Select Service</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedService} onValueChange={onServiceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a service to rate" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-muted-foreground">{service.category}</div>
                  </div>
                  <div className="text-sm font-medium">
                    {formatPrice(service.price)}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default ServiceSelector;
