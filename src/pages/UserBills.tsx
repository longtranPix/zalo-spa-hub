
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Mock data for bills
const userBills = [
  {
    id: 'B001',
    serviceName: 'Deep Tissue Massage',
    date: '2025-05-20',
    time: '14:30',
    price: 79,
    status: 'completed'
  },
  {
    id: 'B002',
    serviceName: 'Aromatherapy Facial',
    date: '2025-05-18',
    time: '10:00',
    price: 89,
    status: 'completed'
  },
  {
    id: 'B003',
    serviceName: 'Hot Stone Therapy',
    date: '2025-05-25',
    time: '16:00',
    price: 99,
    status: 'upcoming'
  }
];

const UserBills = () => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-zalo-blue';
      case 'canceled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <PageLayout title="My Bills" showBackButton>
      <div className="space-y-4 animate-fade-in">
        {userBills.map((bill) => (
          <Card key={bill.id} className="spa-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{bill.serviceName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(bill.date)} • {bill.time}
                  </p>
                </div>
                <Badge className={`${getStatusColor(bill.status)}`}>
                  {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bill ID</span>
                  <span className="font-medium">{bill.id}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold text-zalo-blue">${bill.price}</span>
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
