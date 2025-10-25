import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface ExitIntentConfig {
  enabled: boolean;
  title: string;
  description: string;
  cta_text: string;
  cta_url: string;
  trigger_delay: number;
  display_once: boolean;
}

export const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ExitIntentConfig | null>(null);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    const shownThisSession = sessionStorage.getItem('exit-intent-shown');
    if (shownThisSession) {
      setHasShown(true);
      return;
    }

    // Load config (in a real app, fetch from popup_config table)
    const mockConfig: ExitIntentConfig = {
      enabled: true,
      title: "Wait! Before You Go...",
      description: "Get 20% off your first month when you upgrade to Pro today!",
      cta_text: "Claim Your Discount",
      cta_url: "/pricing",
      trigger_delay: 3000,
      display_once: true,
    };
    setConfig(mockConfig);

    if (!mockConfig.enabled) return;

    let timeoutId: NodeJS.Timeout;
    let isTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top
      if (e.clientY < 10 && !isTriggered && !hasShown) {
        isTriggered = true;
        timeoutId = setTimeout(() => {
          setIsOpen(true);
          if (mockConfig.display_once) {
            sessionStorage.setItem('exit-intent-shown', 'true');
            setHasShown(true);
          }
        }, mockConfig.trigger_delay);
      }
    };

    // Mobile: detect fast scroll up
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = lastScrollY - currentScrollY;
      
      // Fast scroll up detected (at least 50px in one frame)
      if (scrollDiff > 50 && !isTriggered && !hasShown) {
        isTriggered = true;
        timeoutId = setTimeout(() => {
          setIsOpen(true);
          if (mockConfig.display_once) {
            sessionStorage.setItem('exit-intent-shown', 'true');
            setHasShown(true);
          }
        }, mockConfig.trigger_delay);
      }
      
      lastScrollY = currentScrollY;
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasShown]);

  if (!config || !config.enabled) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{config.title}</DialogTitle>
          <DialogDescription className="text-base pt-2">
            {config.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button 
            size="lg" 
            className="w-full"
            onClick={() => {
              window.location.href = config.cta_url;
            }}
          >
            {config.cta_text}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
