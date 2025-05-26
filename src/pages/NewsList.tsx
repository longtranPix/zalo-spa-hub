
import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye } from 'lucide-react';

const newsData = [
  {
    id: 'news1',
    title: 'Xu hướng tóc nữ mùa hè 2025',
    excerpt: 'Khám phá những kiểu tóc hot nhất cho mùa hè này với phong cách trẻ trung và năng động.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    date: '2025-05-25',
    views: 1250,
    category: 'Xu hướng',
    featured: true
  },
  {
    id: 'news2',
    title: 'Cách chăm sóc tóc nhuộm hiệu quả',
    excerpt: 'Bí quyết giữ màu tóc nhuộm lâu bền và không bị hư tổn.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    date: '2025-05-23',
    views: 980,
    category: 'Chăm sóc',
    featured: false
  },
  {
    id: 'news3',
    title: 'Top 5 kiểu tóc nam được yêu thích nhất',
    excerpt: 'Những kiểu tóc nam đang thịnh hành và được các chàng trai lựa chọn nhiều nhất.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    date: '2025-05-20',
    views: 1450,
    category: 'Xu hướng',
    featured: true
  }
];

const NewsList = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <PageLayout title="Tin tức" showBackButton>
      <div className="space-y-4 animate-fade-in">
        {newsData.map((news) => (
          <Card key={news.id} className="overflow-hidden">
            <Link to={`/news/${news.id}`}>
              <div className="relative">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                {news.featured && (
                  <Badge className="absolute top-2 right-2 bg-violet-500">
                    Nổi bật
                  </Badge>
                )}
                <Badge className="absolute bottom-2 left-2 bg-black/70 text-white">
                  {news.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {news.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formatDate(news.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{news.views}</span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default NewsList;
