import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Clock, 
  Zap,
  RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration
const mockLocationHistory = [
  { lat: 40.7128, lng: -74.0060, timestamp: new Date(Date.now() - 3600000), address: "Manhattan, NY" },
  { lat: 40.7589, lng: -73.9851, timestamp: new Date(Date.now() - 2400000), address: "Times Square, NY" },
  { lat: 40.7812, lng: -73.9665, timestamp: new Date(Date.now() - 1800000), address: "Central Park, NY" },
  { lat: 40.7505, lng: -73.9934, timestamp: new Date(Date.now() - 900000), address: "Herald Square, NY" },
  { lat: 40.7282, lng: -74.0776, timestamp: new Date(), address: "Current Location" }
];

const MapPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [currentLocation, setCurrentLocation] = useState(mockLocationHistory[mockLocationHistory.length - 1]);
  const [isTracking, setIsTracking] = useState(true);
  const [routeDistance, setRouteDistance] = useState("2.4 km");
  const [travelTime, setTravelTime] = useState("1h 15m");

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, we'll create a simple map visualization
    // In a real app, you would integrate with Mapbox or Google Maps
    const mapElement = mapContainer.current;
    mapElement.style.background = `
      linear-gradient(135deg, 
        hsl(var(--accent)) 0%, 
        hsl(var(--accent) / 0.8) 50%, 
        hsl(var(--accent) / 0.6) 100%
      )
    `;

    // Simulate real-time location updates
    const locationUpdateInterval = setInterval(() => {
      if (isTracking) {
        // Simulate slight location changes
        setCurrentLocation(prev => ({
          ...prev,
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
          timestamp: new Date()
        }));
      }
    }, 5000);

    return () => clearInterval(locationUpdateInterval);
  }, [isTracking]);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  const centerOnCurrentLocation = () => {
    // In a real implementation, this would center the map on current location
    console.log('Centering on current location:', currentLocation);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/home')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-bold">Live Tracking</h1>
          <Badge variant={isTracking ? "default" : "secondary"}>
            {isTracking ? 'Active' : 'Paused'}
          </Badge>
        </div>

        {/* Map Container */}
        <div className="relative">
          <div 
            ref={mapContainer}
            className="h-80 mx-4 rounded-lg shadow-lg relative overflow-hidden"
          >
            {/* Simulated Map View */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="w-12 h-12 mx-auto mb-2 animate-bounce" />
                <p className="text-lg font-semibold">Live GPS Tracking</p>
                <p className="text-sm opacity-90">{currentLocation.address}</p>
              </div>
            </div>

            {/* Route Polyline Visualization */}
            <svg className="absolute inset-0 w-full h-full">
              <polyline
                points="50,300 100,250 150,200 200,150 250,100"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
              {/* Location markers */}
              {[1, 2, 3, 4, 5].map((i) => (
                <circle
                  key={i}
                  cx={50 * i}
                  cy={350 - 50 * i}
                  r="4"
                  fill="white"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
              ))}
            </svg>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 space-y-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={centerOnCurrentLocation}
              >
                <Navigation className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={toggleTracking}
              >
                {isTracking ? <Zap className="w-4 h-4 text-success" /> : <RotateCcw className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="p-4 space-y-4">
          <Card className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">Current Location</h3>
                <p className="text-sm text-muted-foreground">{currentLocation.address}</p>
              </div>
              <Badge variant="outline" className="text-xs">Live</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Coordinates</p>
                <p className="font-mono">
                  {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Update</p>
                <p>{currentLocation.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          </Card>

          {/* Route Statistics */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Today's Journey</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{routeDistance}</div>
                <div className="text-sm text-muted-foreground">Distance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{travelTime}</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
            </div>
          </Card>

          {/* Location History */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Locations
            </h3>
            <div className="space-y-3">
              {mockLocationHistory.slice(-4).reverse().map((location, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{location.address}</p>
                    <p className="text-xs text-muted-foreground">
                      {location.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </Card>

          {/* Safety Status */}
          <Card className="p-4 bg-gradient-safe text-success-foreground">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">GPS Tracking Active</h4>
                <p className="text-sm opacity-90">Your location is being monitored</p>
              </div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapPage;