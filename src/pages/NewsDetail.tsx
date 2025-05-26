
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Eye, Share2 } from 'lucide-react';

const newsData = {
  news1: {
    id: 'news1',
    title: 'Xu hướng tóc nữ mùa hè 2025',
    content: `
      Mùa hè 2025 đang đến gần và cùng với đó là những xu hướng tóc mới đầy thú vị cho phái đẹp. Từ những kiểu tóc ngắn năng động đến những lọn tóc dài quyến rũ, hãy cùng khám phá những phong cách đang làm mưa làm gió trong giới thời trang tóc.

      ## 1. Tóc Bob ngắn với phần mái thẳng

      Kiểu tóc bob ngắn với phần mái thẳng đang trở thành lựa chọn hàng đầu của nhiều cô gái. Phong cách này không chỉ tạo cảm giác tươi mát mà còn giúp khuôn mặt trông thon gọn hơn.

      ## 2. Tóc lob (long bob) với lớp

      Tóc lob với nhiều lớp tạo độ phồng tự nhiên, phù hợp với những cô nàng yêu thích sự nữ tính nhưng vẫn muốn có chút cá tính.

      ## 3. Tóc xoăn tự nhiên

      Xu hướng tóc xoăn tự nhiên đang quay trở lại mạnh mẽ, tạo vẻ ngoài tự do và phóng khoáng cho phái đẹp.
    `,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    date: '2025-05-25',
    views: 1250,
    category: 'Xu hướng',
    author: 'Thu Hà',
    readTime: '5 phút'
  }
};

const relatedNews = [
  {
    id: 'news2',
    title: 'Cách chăm sóc tóc nhuộm hiệu quả',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60'
  },
  {
    id: 'news3',
    title: 'Top 5 kiểu tóc nam được yêu thích nhất',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60'
  }
];

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const news = newsData[id as keyof typeof newsData];

  if (!news) {
    return (
      <PageLayout title="Không tìm thấy" showBackButton>
        <div className="text-center py-8">
          <p>Không tìm thấy bài viết</p>
        </div>
      </PageLayout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <PageLayout title="Chi tiết tin tức" showBackButton hideBottomNav>
      <div className="space-y-4 animate-fade-in">
        {/* Hero Image */}
        <div className="-mx-4 -mt-4">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Article Header */}
        <div className="space-y-3">
          <Badge className="bg-violet-500">{news.category}</Badge>
          <h1 className="text-2xl font-bold">{news.title}</h1>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDate(news.date)}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{news.views} lượt xem</span>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Article Content */}
        <Card>
          <CardContent className="p-4">
            <div className="prose prose-sm max-w-none">
              {news.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h3 key={index} className="text-lg font-semibold mt-6 mb-3">
                      {paragraph.replace('## ', '')}
                    </h3>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </CardContent>
        </Card>

        {/* Related News */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Bài viết liên quan</h3>
            <div className="space-y-3">
              {relatedNews.map((item) => (
                <Link key={item.id} to={`/news/${item.id}`}>
                  <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default NewsDetail;
