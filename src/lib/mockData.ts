// Mock data for Women Safety Analytics Dashboard

export const mockLocationHistory = [
  { lat: 40.7128, lng: -74.0060, timestamp: new Date(Date.now() - 3600000), address: "Manhattan, NY" },
  { lat: 40.7589, lng: -73.9851, timestamp: new Date(Date.now() - 2400000), address: "Times Square, NY" },
  { lat: 40.7812, lng: -73.9665, timestamp: new Date(Date.now() - 1800000), address: "Central Park, NY" },
  { lat: 40.7505, lng: -73.9934, timestamp: new Date(Date.now() - 900000), address: "Herald Square, NY" },
  { lat: 40.7282, lng: -74.0776, timestamp: new Date(), address: "Current Location" }
];

export const mockAlerts = [
  {
    id: '001',
    userId: 'user_001',
    userName: 'Sarah J.',
    location: 'Manhattan, NY',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    type: 'SOS Button',
    timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    status: 'Active',
    severity: 'Critical'
  },
  {
    id: '002',
    userId: 'user_002',
    userName: 'Emily R.',
    location: 'Brooklyn, NY',
    coordinates: { lat: 40.6782, lng: -73.9442 },
    type: 'Ring Gesture',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    status: 'Resolved',
    severity: 'High'
  },
  {
    id: '003',
    userId: 'user_003',
    userName: 'Maria L.',
    location: 'Queens, NY',
    coordinates: { lat: 40.7282, lng: -73.7949 },
    type: 'Lone Detection',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    status: 'Monitoring',
    severity: 'Medium'
  }
];

export const analyticsData = {
  genderDistribution: [
    { name: 'Women', value: 78, color: '#DC2626' },
    { name: 'Men', value: 22, color: '#3B82F6' }
  ],
  
  alertsByHour: [
    { hour: '00:00', alerts: 2 },
    { hour: '06:00', alerts: 1 },
    { hour: '12:00', alerts: 5 },
    { hour: '18:00', alerts: 8 },
    { hour: '20:00', alerts: 12 },
    { hour: '22:00', alerts: 15 },
    { hour: '23:00', alerts: 8 }
  ],
  
  hotspotData: [
    { area: 'Downtown', alerts: 25, riskLevel: 'High', color: '#DC2626' },
    { area: 'University District', alerts: 18, riskLevel: 'Medium', color: '#F59E0B' },
    { area: 'Park Avenue', alerts: 12, riskLevel: 'Medium', color: '#F59E0B' },
    { area: 'Shopping Mall', alerts: 8, riskLevel: 'Low', color: '#10B981' },
    { area: 'Residential Area', alerts: 3, riskLevel: 'Low', color: '#10B981' }
  ],
  
  weeklyTrends: [
    { day: 'Mon', alerts: 15 },
    { day: 'Tue', alerts: 18 },
    { day: 'Wed', alerts: 12 },
    { day: 'Thu', alerts: 22 },
    { day: 'Fri', alerts: 28 },
    { day: 'Sat', alerts: 35 },
    { day: 'Sun', alerts: 20 }
  ]
};

export const ringStatuses = {
  totalRings: 1247,
  activeRings: 1180,
  lowBattery: 67,
  offline: 23,
  averageBattery: 78
};

export const mockCCTVDetections = [
  {
    id: 'cctv_001',
    cameraId: 'CAM_DOWNTOWN_01',
    location: 'Downtown Plaza',
    detectionType: 'lone_woman_night',
    confidence: 0.89,
    timestamp: new Date(Date.now() - 300000),
    imageUrl: null,
    resolved: false
  },
  {
    id: 'cctv_002',
    cameraId: 'CAM_PARK_05',
    location: 'Central Park East',
    detectionType: 'surrounded_woman',
    confidence: 0.92,
    timestamp: new Date(Date.now() - 600000),
    imageUrl: null,
    resolved: true
  },
  {
    id: 'cctv_003',
    cameraId: 'CAM_STATION_12',
    location: 'Penn Station',
    detectionType: 'sos_gesture',
    confidence: 0.76,
    timestamp: new Date(Date.now() - 1200000),
    imageUrl: null,
    resolved: false
  }
];

// Simulated real-time data updates
export const generateRealtimeUpdate = () => {
  return {
    activeAlerts: Math.floor(Math.random() * 15) + 5,
    activeUsers: 1247 + Math.floor(Math.random() * 20) - 10,
    avgResponseTime: (2.1 + Math.random() * 0.8).toFixed(1),
    systemStatus: Math.random() > 0.1 ? 'operational' : 'warning'
  };
};