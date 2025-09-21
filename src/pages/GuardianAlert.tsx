import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Clock, 
  Navigation,
  Shield,
  User
} from 'lucide-react';

// Mock alert data
const mockAlert = {
  id: '1',
  user: {
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    photo: null
  },
  location: {
    lat: 40.7128,
    lng: -74.0060,
    address: '350 5th Ave, New York, NY 10118',
    accuracy: '5 meters'
  },
  timestamp: new Date(Date.now() - 120000), // 2 minutes ago
  type: 'SOS Button Press',
  status: 'Active',
  severity: 'Critical',
  guardianName: 'John Johnson',
  relationship: 'Husband'
};

const GuardianAlert = () => {
  const { alertId } = useParams();
  const [alert, setAlert] = useState(mockAlert);
  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    const updateTimeElapsed = () => {
      const now = new Date();
      const diff = now.getTime() - alert.timestamp.getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      
      if (minutes > 0) {
        setTimeElapsed(`${minutes}m ${seconds}s ago`);
      } else {
        setTimeElapsed(`${seconds}s ago`);
      }
    };

    updateTimeElapsed();
    const interval = setInterval(updateTimeElapsed, 1000);
    return () => clearInterval(interval);
  }, [alert.timestamp]);

  const handleCallUser = () => {
    window.location.href = `tel:${alert.user.phone}`;
  };

  const handleCall911 = () => {
    window.location.href = 'tel:911';
  };

  const handleGetDirections = () => {
    const url = `https://maps.google.com/maps?q=${alert.location.lat},${alert.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/5 to-background">
      <div className="container max-w-md mx-auto p-4">
        {/* Emergency Header */}
        <div className="text-center mb-6 pt-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-emergency rounded-full mb-3 shadow-emergency animate-pulse">
            <AlertTriangle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-destructive mb-1">EMERGENCY ALERT</h1>
          <p className="text-muted-foreground">Immediate attention required</p>
        </div>

        {/* Alert Details */}
        <Card className="p-6 mb-4 border-destructive/20 shadow-emergency">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">{alert.user.name}</h2>
              <p className="text-muted-foreground">needs your help</p>
            </div>
            <div className="text-right">
              <Badge variant="destructive" className="mb-2">
                {alert.severity}
              </Badge>
              <p className="text-sm text-muted-foreground">{timeElapsed}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
              <div>
                <p className="font-medium">Alert Type</p>
                <p className="text-sm text-muted-foreground">{alert.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{alert.location.address}</p>
                <p className="text-xs text-muted-foreground">Accuracy: {alert.location.accuracy}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-sm text-muted-foreground">
                  {alert.timestamp.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium">Guardian</p>
                <p className="text-sm text-muted-foreground">
                  {alert.guardianName} ({alert.relationship})
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3 mb-6">
          <Button
            onClick={handleCall911}
            className="w-full h-14 text-lg bg-gradient-emergency shadow-emergency"
          >
            <Phone className="w-6 h-6 mr-3" />
            Call Emergency Services (911)
          </Button>

          <Button
            onClick={handleCallUser}
            variant="outline"
            className="w-full h-12"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call {alert.user.name.split(' ')[0]}
          </Button>

          <Button
            onClick={handleGetDirections}
            variant="outline"
            className="w-full h-12"
          >
            <Navigation className="w-5 h-5 mr-2" />
            Get Directions to Location
          </Button>
        </div>

        {/* Map Preview */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            Live Location
          </h3>
          <div className="h-40 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Simulated Map */}
            <div className="text-center">
              <MapPin className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-sm font-medium">{alert.user.name}</p>
              <p className="text-xs text-muted-foreground">Current Location</p>
            </div>
            
            {/* Pulsing indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-accent rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
          <Button
            onClick={handleGetDirections}
            variant="outline"
            className="w-full mt-3"
          >
            Open in Maps App
          </Button>
        </Card>

        {/* Safety Instructions */}
        <Card className="p-4 bg-gradient-safe text-success-foreground">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            What to do next
          </h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Try calling {alert.user.name.split(' ')[0]} immediately</li>
            <li>• If no response, call emergency services (911)</li>
            <li>• Head to the location if it's safe to do so</li>
            <li>• Keep this page open for live updates</li>
          </ul>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 pb-4">
          <p className="text-xs text-muted-foreground">
            This alert was sent via Women Safety Ring System
          </p>
          <p className="text-xs text-muted-foreground">
            Alert ID: #{alertId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuardianAlert;