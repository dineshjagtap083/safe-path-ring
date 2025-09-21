import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SimplePieChart, SimpleLineChart } from '@/components/SimpleChart';
import { analyticsData, mockAlerts } from '@/lib/mockData';
import { 
  AlertTriangle, 
  Users, 
  MapPin, 
  TrendingUp, 
  Clock, 
  Shield,
  Activity,
  Bell,
  Eye,
  Navigation
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-destructive';
      case 'High': return 'text-warning';
      case 'Medium': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Safety Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and insights for women's safety</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-foreground">1,247</p>
              </div>
              <Users className="w-8 h-8 text-accent" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-success">+12%</span>
              <span className="text-muted-foreground ml-1">from last week</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-destructive">8</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground mr-1" />
              <span className="text-muted-foreground">2 critical</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold text-success">2.3s</p>
              </div>
              <Activity className="w-8 h-8 text-success" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Shield className="w-4 h-4 text-success mr-1" />
              <span className="text-success">Excellent</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Coverage Areas</p>
                <p className="text-2xl font-bold text-accent">15</p>
              </div>
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Navigation className="w-4 h-4 text-accent mr-1" />
              <span className="text-muted-foreground">NYC Metro</span>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
            <TabsTrigger value="monitoring">AI Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-destructive" />
                Recent Alerts
              </h3>
              <div className="space-y-3">
                {mockAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAlert === alert.id ? 'bg-secondary' : 'hover:bg-secondary/50'
                    }`}
                    onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{alert.userName}</h4>
                          <Badge variant={alert.status === 'Active' ? 'destructive' : 'secondary'}>
                            {alert.status}
                          </Badge>
                          <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{alert.type} • {alert.location}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MapPin className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {selectedAlert === alert.id && (
                      <div className="mt-4 pt-4 border-t space-y-2">
                        <p className="text-sm"><strong>Alert Type:</strong> {alert.type}</p>
                        <p className="text-sm"><strong>Location:</strong> {alert.location}</p>
                        <p className="text-sm"><strong>Time:</strong> {alert.timestamp.toLocaleString()}</p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="bg-gradient-emergency">
                            Dispatch Emergency
                          </Button>
                          <Button size="sm" variant="outline">
                            Contact Guardian
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Gender Distribution (CCTV Analysis)</h3>
                <SimplePieChart data={analyticsData.genderDistribution} />
                <div className="flex justify-center gap-4 mt-2">
                  {analyticsData.genderDistribution.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm">{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Alerts by Time of Day</h3>
                <SimpleLineChart data={analyticsData.alertsByHour} dataKey="alerts" />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hotspots" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Risk Hotspots</h3>
              <div className="space-y-3">
                {analyticsData.hotspotData.map((hotspot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{hotspot.area}</h4>
                      <p className="text-sm text-muted-foreground">{hotspot.alerts} alerts this week</p>
                    </div>
                    <Badge variant={getRiskColor(hotspot.riskLevel)}>
                      {hotspot.riskLevel} Risk
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">AI Detection Systems</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Lone Woman Detection</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Surrounded Detection</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SOS Gesture Recognition</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Unusual Behavior</span>
                    <Badge variant="secondary">Training</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Camera Network Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Cameras</span>
                    <span className="font-medium">247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Online</span>
                    <span className="font-medium text-success">239</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Offline</span>
                    <span className="font-medium text-destructive">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Coverage</span>
                    <span className="font-medium">96.8%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;