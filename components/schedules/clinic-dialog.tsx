'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Clinic } from './clinic-card';

interface ClinicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clinic: Clinic | null;
  onSave: (clinic: Omit<Clinic, 'id'>) => void;
}

const ROLES = ['Senior Consultant', 'Visiting Consultant', 'Consultant', 'Associate'];

// export function is a named export, when importing use curly brace
export function ClinicDialog({ open, onOpenChange, clinic, onSave }: ClinicDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    days: '',
    hours: ''
  });

  useEffect(() => {
    if (clinic) {
      setFormData({
        name: clinic.name,
        role: clinic.role,
        days: clinic.days,
        hours: clinic.hours
      });
    } else {
      setFormData({
        name: '',
        role: '',
        days: '',
        hours: ''
      });
    }
  }, [clinic, open]);

  const handleSave = () => {
    if (formData.name && formData.role && formData.days && formData.hours) {
      onSave(formData);
    }
  };

  const isValid = formData.name && formData.role && formData.days && formData.hours;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {clinic ? 'Edit Clinic Affiliation' : 'Add Clinic Affiliation'}
          </DialogTitle>
          <DialogDescription>
            Configure the doctor&apos;s role and schedule at a clinic.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="clinicName">Clinic Name</Label>
            <Input
              id="clinicName"
              placeholder="Enter clinic name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="days">Days</Label>
            <Input
              id="days"
              placeholder="e.g., Mon, Wed, Fri"
              value={formData.days}
              onChange={(e) => setFormData(prev => ({ ...prev, days: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hours">Hours</Label>
            <Input
              id="hours"
              placeholder="e.g., 09:00-17:00"
              value={formData.hours}
              onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            {clinic ? 'Update Affiliation' : 'Add Affiliation'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}