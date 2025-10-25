import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface SocialNotification {
  id: string;
  name: string;
  location: string;
  action: string;
  icon: string;
}

export const SocialProofNotification = () => {
  const [notifications, setNotifications] = useState<SocialNotification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Mock data - in production, fetch from social_notifications table
    const mockNotifications: SocialNotification[] = [
      { id: '1', name: 'Sarah M.', location: 'New York, USA', action: 'just created a buying guide', icon: '📝' },
      { id: '2', name: 'James K.', location: 'London, UK', action: 'published a product review', icon: '⭐' },
      { id: '3', name: 'Emily R.', location: 'Toronto, Canada', action: 'generated a how-to article', icon: '✨' },
      { id: '4', name: 'Michael L.', location: 'Sydney, Australia', action: 'completed a product comparison', icon: '🎯' },
      { id: '5', name: 'Lisa W.', location: 'Berlin, Germany', action: 'created a product roundup', icon: '🚀' },
    ];
    setNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    if (notifications.length === 0 || isDismissed) return;

    // Show first notification after 3 seconds
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, [notifications, isDismissed]);

  useEffect(() => {
    if (!isVisible || notifications.length === 0) return;

    // Auto-dismiss and show next notification every 8 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500); // Wait for fade out animation
    }, 8000);

    return () => clearInterval(interval);
  }, [isVisible, notifications.length]);

  if (notifications.length === 0 || isDismissed) return null;

  const current = notifications[currentIndex];

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } max-w-sm md:left-4 md:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:bottom-4`}
    >
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl flex-shrink-0">{current.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                <span className="font-semibold">{current.name}</span> from {current.location}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {current.action}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 flex-shrink-0"
              onClick={() => setIsDismissed(true)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
