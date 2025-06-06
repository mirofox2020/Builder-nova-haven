import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings,
  Key,
  Mail,
  Smartphone,
  Database,
  Globe,
  Shield,
  Bell,
  Clock,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Upload,
  Download,
  Server,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("api-keys");
  const [showPasswords, setShowPasswords] = useState<string[]>([]);
  const [settings, setSettings] = useState({
    apiKeys: {
      openai: "sk-••••••••••••••••���•••••••••••••••",
      amazon: "AKIA••••••••••••••••",
      walmart: "WMT_••••••••••••••••",
      bestbuy: "BBY_••••••••••••••••",
      email_service: "SG.••••••••••••••••••••",
    },
    notifications: {
      emailEnabled: true,
      pushEnabled: true,
      smsEnabled: false,
      emailProvider: "sendgrid",
      pushProvider: "firebase",
      dailyDigest: true,
      realTimeAlerts: true,
    },
    dealSettings: {
      defaultExpiration: 30,
      autoApproval: false,
      maxSubmissionsPerUser: 5,
      minDiscountPercent: 10,
      duplicateCheckDays: 7,
      featuredDealsLimit: 20,
    },
    database: {
      backupFrequency: "daily",
      retentionDays: 90,
      compression: true,
      encryptionEnabled: true,
      lastBackup: "2024-01-22 02:00:00",
      dbSize: "2.4 GB",
    },
    performance: {
      cacheEnabled: true,
      cacheTTL: 3600,
      apiRateLimit: 1000,
      sessionTimeout: 30,
      cdnEnabled: true,
      compressionEnabled: true,
    },
    security: {
      twoFactorEnabled: true,
      passwordComplexity: "high",
      sessionSecurity: "strict",
      ipWhitelisting: false,
      auditLogging: true,
      encryptionLevel: "AES-256",
    },
  });

  const tabs = [
    { id: "api-keys", label: "API Keys", icon: Key },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "deals", label: "Deal Settings", icon: Settings },
    { id: "database", label: "Database", icon: Database },
    { id: "performance", label: "Performance", icon: Zap },
    { id: "security", label: "Security", icon: Shield },
  ];

  const togglePasswordVisibility = (keyName: string) => {
    setShowPasswords((prev) =>
      prev.includes(keyName)
        ? prev.filter((key) => key !== keyName)
        : [...prev, keyName],
    );
  };

  const handleSave = (section: string) => {
    console.log(
      `Saving ${section} settings:`,
      settings[section as keyof typeof settings],
    );
  };

  const handleTestConnection = (service: string) => {
    console.log(`Testing connection for ${service}`);
  };

  const renderAPIKeys = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OpenAI API */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              OpenAI API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                API Key
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.includes("openai") ? "text" : "password"}
                  value={settings.apiKeys.openai}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      apiKeys: { ...prev.apiKeys, openai: e.target.value },
                    }))
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => togglePasswordVisibility("openai")}
                >
                  {showPasswords.includes("openai") ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-green-600">
                Connected
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTestConnection("openai")}
              >
                Test Connection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Amazon API */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-orange-500" />
              Amazon Affiliate API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Access Key
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.includes("amazon") ? "text" : "password"}
                  value={settings.apiKeys.amazon}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      apiKeys: { ...prev.apiKeys, amazon: e.target.value },
                    }))
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => togglePasswordVisibility("amazon")}
                >
                  {showPasswords.includes("amazon") ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-green-600">
                Connected
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTestConnection("amazon")}
              >
                Test Connection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Walmart API */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              Walmart API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                API Key
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.includes("walmart") ? "text" : "password"}
                  value={settings.apiKeys.walmart}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      apiKeys: { ...prev.apiKeys, walmart: e.target.value },
                    }))
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => togglePasswordVisibility("walmart")}
                >
                  {showPasswords.includes("walmart") ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-yellow-600">
                Testing
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTestConnection("walmart")}
              >
                Test Connection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Service */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-red-500" />
              Email Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                SendGrid API Key
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.includes("email") ? "text" : "password"}
                  value={settings.apiKeys.email_service}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      apiKeys: {
                        ...prev.apiKeys,
                        email_service: e.target.value,
                      },
                    }))
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => togglePasswordVisibility("email")}
                >
                  {showPasswords.includes("email") ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-green-600">
                Connected
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTestConnection("email")}
              >
                Test Connection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handleSave("apiKeys")}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save API Keys
        </Button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-500" />
              Email Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">
                  Enable Email Alerts
                </h4>
                <p className="text-sm text-gray-500">
                  Send price alerts via email
                </p>
              </div>
              <Button
                variant={
                  settings.notifications.emailEnabled ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      emailEnabled: !prev.notifications.emailEnabled,
                    },
                  }))
                }
              >
                {settings.notifications.emailEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Daily Digest</h4>
                <p className="text-sm text-gray-500">
                  Send daily summary emails
                </p>
              </div>
              <Button
                variant={
                  settings.notifications.dailyDigest ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      dailyDigest: !prev.notifications.dailyDigest,
                    },
                  }))
                }
              >
                {settings.notifications.dailyDigest ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Push Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-green-500" />
              Push Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">
                  Enable Push Alerts
                </h4>
                <p className="text-sm text-gray-500">
                  Send real-time push notifications
                </p>
              </div>
              <Button
                variant={
                  settings.notifications.pushEnabled ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      pushEnabled: !prev.notifications.pushEnabled,
                    },
                  }))
                }
              >
                {settings.notifications.pushEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Real-time Alerts</h4>
                <p className="text-sm text-gray-500">
                  Instant notifications for price drops
                </p>
              </div>
              <Button
                variant={
                  settings.notifications.realTimeAlerts ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      realTimeAlerts: !prev.notifications.realTimeAlerts,
                    },
                  }))
                }
              >
                {settings.notifications.realTimeAlerts ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handleSave("notifications")}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Notification Settings
        </Button>
      </div>
    </div>
  );

  const renderDealSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deal Expiration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Default Expiration (days)
              </label>
              <Input
                type="number"
                value={settings.dealSettings.defaultExpiration}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    dealSettings: {
                      ...prev.dealSettings,
                      defaultExpiration: parseInt(e.target.value),
                    },
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Minimum Discount (%)
              </label>
              <Input
                type="number"
                value={settings.dealSettings.minDiscountPercent}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    dealSettings: {
                      ...prev.dealSettings,
                      minDiscountPercent: parseInt(e.target.value),
                    },
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Max Submissions per User
              </label>
              <Input
                type="number"
                value={settings.dealSettings.maxSubmissionsPerUser}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    dealSettings: {
                      ...prev.dealSettings,
                      maxSubmissionsPerUser: parseInt(e.target.value),
                    },
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Duplicate Check Period (days)
              </label>
              <Input
                type="number"
                value={settings.dealSettings.duplicateCheckDays}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    dealSettings: {
                      ...prev.dealSettings,
                      duplicateCheckDays: parseInt(e.target.value),
                    },
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handleSave("dealSettings")}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Deal Settings
        </Button>
      </div>
    </div>
  );

  const renderDatabase = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-500" />
              Backup Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Backup Frequency
              </label>
              <select
                value={settings.database.backupFrequency}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    database: {
                      ...prev.database,
                      backupFrequency: e.target.value,
                    },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Retention Period (days)
              </label>
              <Input
                type="number"
                value={settings.database.retentionDays}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    database: {
                      ...prev.database,
                      retentionDays: parseInt(e.target.value),
                    },
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Compression</h4>
                <p className="text-sm text-gray-500">Compress backup files</p>
              </div>
              <Button
                variant={settings.database.compression ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    database: {
                      ...prev.database,
                      compression: !prev.database.compression,
                    },
                  }))
                }
              >
                {settings.database.compression ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-green-500" />
              Database Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Database Size</span>
                <Badge variant="outline">{settings.database.dbSize}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Backup</span>
                <Badge variant="outline" className="text-green-600">
                  {settings.database.lastBackup}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Encryption</span>
                <Badge variant="outline" className="text-blue-600">
                  {settings.database.encryptionEnabled ? "AES-256" : "Disabled"}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Backup
              </Button>
              <Button variant="outline" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Create Backup Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handleSave("database")}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Database Settings
        </Button>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Cache Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Enable Caching</h4>
                <p className="text-sm text-gray-500">
                  Cache API responses and database queries
                </p>
              </div>
              <Button
                variant={
                  settings.performance.cacheEnabled ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    performance: {
                      ...prev.performance,
                      cacheEnabled: !prev.performance.cacheEnabled,
                    },
                  }))
                }
              >
                {settings.performance.cacheEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Cache TTL (seconds)
              </label>
              <Input
                type="number"
                value={settings.performance.cacheTTL}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    performance: {
                      ...prev.performance,
                      cacheTTL: parseInt(e.target.value),
                    },
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-500" />
              API & CDN
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                API Rate Limit (per hour)
              </label>
              <Input
                type="number"
                value={settings.performance.apiRateLimit}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    performance: {
                      ...prev.performance,
                      apiRateLimit: parseInt(e.target.value),
                    },
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">CDN</h4>
                <p className="text-sm text-gray-500">
                  Use CDN for static assets
                </p>
              </div>
              <Button
                variant={
                  settings.performance.cdnEnabled ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    performance: {
                      ...prev.performance,
                      cdnEnabled: !prev.performance.cdnEnabled,
                    },
                  }))
                }
              >
                {settings.performance.cdnEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handleSave("performance")}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Performance Settings
        </Button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-500">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Button
                variant={
                  settings.security.twoFactorEnabled ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    security: {
                      ...prev.security,
                      twoFactorEnabled: !prev.security.twoFactorEnabled,
                    },
                  }))
                }
              >
                {settings.security.twoFactorEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password Complexity
              </label>
              <select
                value={settings.security.passwordComplexity}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    security: {
                      ...prev.security,
                      passwordComplexity: e.target.value,
                    },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-blue-500" />
              Encryption & Logging
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Audit Logging</h4>
                <p className="text-sm text-gray-500">Log all admin actions</p>
              </div>
              <Button
                variant={settings.security.auditLogging ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    security: {
                      ...prev.security,
                      auditLogging: !prev.security.auditLogging,
                    },
                  }))
                }
              >
                {settings.security.auditLogging ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Encryption Level
              </label>
              <select
                value={settings.security.encryptionLevel}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    security: {
                      ...prev.security,
                      encryptionLevel: e.target.value,
                    },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="AES-128">AES-128</option>
                <option value="AES-256">AES-256</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handleSave("security")}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Security Settings
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "api-keys":
        return renderAPIKeys();
      case "notifications":
        return renderNotifications();
      case "deals":
        return renderDealSettings();
      case "database":
        return renderDatabase();
      case "performance":
        return renderPerformance();
      case "security":
        return renderSecurity();
      default:
        return renderAPIKeys();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            System Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Configure system-wide settings and integrations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-green-600">
            All systems operational
          </Badge>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All
          </Button>
        </div>
      </div>

      {/* Settings Navigation */}
      <Card>
        <CardContent className="p-4">
          <nav className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </CardContent>
      </Card>

      {/* Settings Content */}
      <Card>
        <CardContent className="p-6">{renderContent()}</CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="font-medium text-gray-900">API Services</p>
              <p className="text-sm text-green-600">All Connected</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Database</p>
              <p className="text-sm text-green-600">Healthy</p>
            </div>
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Email Service</p>
              <p className="text-sm text-yellow-600">Rate Limited</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="font-medium text-gray-900">CDN</p>
              <p className="text-sm text-green-600">Operational</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
