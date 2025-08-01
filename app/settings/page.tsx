'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralSettings } from '@/components/settings/general-settings';
import { UserRoleManagement } from '@/components/settings/user-role-management';
import { ClinicSpecificSettings } from '@/components/settings/clinic-specific-settings';
import { MedicalServicesCatalogs } from '@/components/settings/medical-services-catalogs';
import { DataAudit } from '@/components/settings/data-audit';
import {
  Settings as SettingsIcon,
  Users,
  Building,
  FileText,
  Database,
  Shield
} from 'lucide-react';

// Mock user role for demonstration
const currentUserRole = 'superadmin'; // Can be 'superadmin', 'admin', 'clinic_admin'

const settingsCategories = [
  {
    id: 'general',
    label: 'General Settings',
    icon: SettingsIcon,
    description: 'Configure global system parameters',
    allowedRoles: ['superadmin', 'admin']
  },
  {
    id: 'users',
    label: 'User & Role Management',
    icon: Users,
    description: 'Manage admin users and permissions',
    allowedRoles: ['superadmin']
  },
  {
    id: 'clinics',
    label: 'Clinic-Specific Settings',
    icon: Building,
    description: 'Configure individual clinic operations',
    allowedRoles: ['superadmin', 'clinic_admin']
  },
  {
    id: 'services',
    label: 'Medical Services & Catalogs',
    icon: FileText,
    description: 'Manage medical specialties and services',
    allowedRoles: ['superadmin', 'admin']
  },
  {
    id: 'data',
    label: 'Data & Audit',
    icon: Database,
    description: 'System logs and data management',
    allowedRoles: ['superadmin']
  }
];

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const filteredCategories = settingsCategories.filter(category =>
    category.allowedRoles.includes(currentUserRole)
  );

  const handleCategoryChange = (categoryId: string) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave this section?'
      );
      if (!confirmLeave) return;
    }
    setActiveCategory(categoryId);
    setHasUnsavedChanges(false);
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'general':
        return <GeneralSettings onUnsavedChanges={setHasUnsavedChanges} />;
      case 'users':
        return <UserRoleManagement onUnsavedChanges={setHasUnsavedChanges} />;
      case 'clinics':
        return <ClinicSpecificSettings onUnsavedChanges={setHasUnsavedChanges} />;
      case 'services':
        return <MedicalServicesCatalogs onUnsavedChanges={setHasUnsavedChanges} />;
      case 'data':
        return <DataAudit onUnsavedChanges={setHasUnsavedChanges} />;
      default:
        return <GeneralSettings onUnsavedChanges={setHasUnsavedChanges} />;
    }
  };

  const activeItem = filteredCategories.find(cat => cat.id === activeCategory);

  return (
    <DashboardLayout title="">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              System Settings
            </h2>
            <p className="text-muted-foreground">
              Configure and manage UniHealth system parameters
            </p>
          </div>
          {hasUnsavedChanges && (
            <div className="flex items-center space-x-2 text-amber-600">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Unsaved changes</span>
            </div>
          )}
        </div>

        {/* Settings Layout */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Left Navigation */}
          <Card className="card-shadow h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Settings Categories</CardTitle>
              <CardDescription>
                Select a category to configure
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {filteredCategories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${
                        isActive 
                          ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm">{category.label}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {category.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Right Content Area */}
          <div className="space-y-6">
            {/* Active Category Header */}
            {activeItem && (
              <Card className="card-shadow bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <activeItem.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{activeItem.label}</h3>
                      <p className="text-muted-foreground">{activeItem.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dynamic Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}