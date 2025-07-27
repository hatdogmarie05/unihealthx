'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Schedule } from './schedule-card';

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: Schedule | null;
  onSave: (schedule: Omit<Schedule, 'id'>) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CLINICS = ['Cebu Medical Center', 'Metro Cebu Hospital', 'Skin Care Clinic'];

export function ScheduleDialog({ open, onOpenChange, schedule, onSave }: ScheduleDialogProps) {
  const [formData, setFormData] = useState({
    day: '',
    clinic: '',
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    if (schedule) {
      setFormData({
        day: schedule.day,
        clinic: schedule.clinic,
        startTime: schedule.startTime,
        endTime: schedule.endTime
      });
    } else {
      setFormData({
        day: '',
        clinic: '',
        startTime: '',
        endTime: ''
      });
    }
  }, [schedule, open]);

  const handleSave = () => {
    if (formData.day && formData.clinic && formData.startTime && formData.endTime) {
      onSave(formData);
    }
  };

  const isValid = formData.day && formData.clinic && formData.startTime && formData.endTime;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {schedule ? 'Edit Schedule Block' : 'Add Schedule Block'}
          </DialogTitle>
          <DialogDescription>
            Configure the doctor&apos;s availability for a specific day and clinic.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="day">Day of Week</Label>
            <Select value={formData.day} onValueChange={(value) => setFormData(prev => ({ ...prev, day: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((day) => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clinic">Clinic</Label>
            <Select value={formData.clinic} onValueChange={(value) => setFormData(prev => ({ ...prev, clinic: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select clinic" />
              </SelectTrigger>
              <SelectContent>
                {CLINICS.map((clinic) => (
                  <SelectItem key={clinic} value={clinic}>{clinic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            {schedule ? 'Update Schedule' : 'Add Schedule'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}