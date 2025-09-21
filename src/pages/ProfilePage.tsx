import React, { useState } from 'react';
import { useAuth, GuardianContact } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Phone, 
  Mail, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Shield,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingGuardian, setIsAddingGuardian] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [newGuardian, setNewGuardian] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: ''
  });

  const handleProfileUpdate = () => {
    updateProfile(profileData);
    setIsEditingProfile(false);
    toast.success('Profile updated successfully');
  };

  const handleAddGuardian = () => {
    if (!newGuardian.name || !newGuardian.phone) {
      toast.error('Please fill in required fields');
      return;
    }

    const guardian: GuardianContact = {
      id: Math.random().toString(36).substr(2, 9),
      ...newGuardian
    };

    const updatedContacts = [...(user?.guardianContacts || []), guardian];
    updateProfile({ guardianContacts: updatedContacts });
    
    setNewGuardian({ name: '', phone: '', email: '', relationship: '' });
    setIsAddingGuardian(false);
    toast.success('Guardian contact added successfully');
  };

  const handleRemoveGuardian = (id: string) => {
    const updatedContacts = user?.guardianContacts?.filter(contact => contact.id !== id) || [];
    updateProfile({ guardianContacts: updatedContacts });
    toast.success('Guardian contact removed');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container max-w-md mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/home')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-bold">Profile Settings</h1>
          <div></div>
        </div>

        {/* Profile Information */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          {isEditingProfile ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleProfileUpdate} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{user?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{user?.phone}</span>
              </div>
            </div>
          )}
        </Card>

        {/* Guardian Contacts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Guardian Contacts
            </h2>
            <Dialog open={isAddingGuardian} onOpenChange={setIsAddingGuardian}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Guardian Contact</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="guardian-name">Name *</Label>
                    <Input
                      id="guardian-name"
                      placeholder="Guardian's full name"
                      value={newGuardian.name}
                      onChange={(e) => setNewGuardian({ ...newGuardian, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardian-phone">Phone *</Label>
                    <Input
                      id="guardian-phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={newGuardian.phone}
                      onChange={(e) => setNewGuardian({ ...newGuardian, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardian-email">Email</Label>
                    <Input
                      id="guardian-email"
                      type="email"
                      placeholder="guardian@example.com"
                      value={newGuardian.email}
                      onChange={(e) => setNewGuardian({ ...newGuardian, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship">Relationship</Label>
                    <Select
                      value={newGuardian.relationship}
                      onValueChange={(value) => setNewGuardian({ ...newGuardian, relationship: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="colleague">Colleague</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddGuardian} className="flex-1">
                      Add Guardian
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingGuardian(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {user?.guardianContacts?.length ? (
              user.guardianContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    {contact.email && (
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{contact.relationship}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveGuardian(contact.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">No guardian contacts added yet</p>
                <p className="text-sm text-muted-foreground">
                  Add trusted contacts who will be notified in case of an emergency
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Safety Features */}
        <Card className="p-6 bg-gradient-safe text-success-foreground">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5" />
            Safety Features Active
          </h2>
          <div className="space-y-2 text-sm opacity-90">
            <div className="flex items-center justify-between">
              <span>Smart Ring Integration</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>GPS Tracking</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Guardian Notifications</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Emergency Services</span>
              <Badge variant="secondary">Active</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;