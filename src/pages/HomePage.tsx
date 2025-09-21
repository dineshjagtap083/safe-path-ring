import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Phone, 
  Battery, 
  Wifi, 
  MapPin, 
  User, 
  BarChart3,
  AlertTriangle,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface RingStatus {
  connected: boolean;
  battery: number;
  lastSync: string;
  location: { lat: number; lng: number; address: string };
}

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [ringStatus, setRingStatus] = useState<RingStatus>({
    connected: true,
    battery: 85,
    lastSync: new Date().toLocaleTimeString(),
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: "Manhattan, NY"
    }
  });
  const [isSOSActive, setIsSOSActive] = useState(false);

  useEffect(() => {
    // Simulate ring status updates
    const interval = setInterval(() => {
      setRingStatus(prev => ({
        ...prev,
        battery: Math.max(20, prev.battery - Math.random() * 2),
        lastSync: new Date().toLocaleTimeString(),
        connected: Math.random() > 0.1 // 90% chance of being connected
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSOS = async () => {
    setIsSOSActive(true);
    
    try {
      // Simulate SOS alert sending
      toast.success('🚨 SOS Alert Sent! Guardians notified.');
      
      // Simulate backend API call
      const alertData = {
        userId: user?.id,
        location: ringStatus.location,
        timestamp: new Date().toISOString(),
        type: 'manual_sos',
        status: 'active'
      };
      
      console.log('SOS Alert:', alertData);
      
      // Reset SOS state after 3 seconds
      setTimeout(() => {
        setIsSOSActive(false);
        toast.info('Emergency services have been notified');
      }, 3000);
      
    } catch (error) {
      toast.error('Failed to send SOS. Please try again.');
      setIsSOSActive(false);
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-success';
    if (battery > 20) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container max-w-md mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pt-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name?.split(' ')[0]}</h1>
            <p className="text-muted-foreground">Stay safe today</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/profile')}
            >
              <User className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* SOS Button */}
        <Card className="p-8 text-center border-0 shadow-emergency">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleSOS}
              disabled={isSOSActive}
              className={`w-40 h-40 rounded-full text-2xl font-bold shadow-glow transition-all duration-300 ${
                isSOSActive 
                  ? 'bg-destructive animate-pulse' 
                  : 'bg-gradient-emergency hover:shadow-emergency'
              }`}
            >
              {isSOSActive ? (
                <div className="flex flex-col items-center">
                  <AlertTriangle className="w-12 h-12 mb-2 animate-bounce" />
                  <span className="text-sm">SENDING...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Shield className="w-12 h-12 mb-2" />
                  <span>SOS</span>
                </div>
              )}
            </Button>
          </motion.div>
          <p className="text-muted-foreground mt-4">
            Press and hold for emergency assistance
          </p>
        </Card>

        {/* Ring Status */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Smart Ring Status
            </h3>
            <Badge variant={ringStatus.connected ? "default" : "destructive"}>
              {ringStatus.connected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Battery className={`w-4 h-4 ${getBatteryColor(ringStatus.battery)}`} />
              <span className="text-sm">{Math.round(ringStatus.battery)}%</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Wifi className={`w-4 h-4 ${ringStatus.connected ? 'text-success' : 'text-muted-foreground'}`} />
              <span className="text-sm">
                {ringStatus.connected ? 'Online' : 'Offline'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{ringStatus.lastSync}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-sm">{ringStatus.location.address}</span>
            </div>
          </div>
        </Card>

        {/* Guardian Contacts */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-accent" />
            Guardian Contacts
          </h3>
          <div className="space-y-2">
            {user?.guardianContacts?.slice(0, 2).map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                </div>
                <Badge variant="outline">{contact.phone}</Badge>
              </div>
            )) || (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-2">No guardian contacts added</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/profile')}
                >
                  Add Contacts
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/map')}
            className="h-16 flex flex-col items-center gap-2"
          >
            <MapPin className="w-6 h-6" />
            <span>Track Location</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/admin')}
            className="h-16 flex flex-col items-center gap-2"
          >
            <BarChart3 className="w-6 h-6" />
            <span>Safety Analytics</span>
          </Button>
        </div>

        {/* Safety Status */}
        <Card className="p-4 bg-gradient-safe text-success-foreground">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8" />
            <div>
              <h4 className="font-semibold">You're Protected</h4>
              <p className="text-sm opacity-90">All safety systems active</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;