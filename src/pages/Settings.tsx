import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Database,
  Globe,
  Palette,
  Mail,
  Smartphone,
} from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { toasts, removeToast, showSuccess } = useToast();

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);
  const [isToggling2FA, setIsToggling2FA] = useState(false);
  const [togglingIntegration, setTogglingIntegration] = useState<string | null>(
    null
  );
  // Profile state
  const [firstName, setFirstName] = useState('Danish');
  const [lastName, setLastName] = useState('Developer');
  const [email, setEmail] = useState('danish@cloudpulse.io');

  // Notification state
  const [emailNotifications, setEmailNotifications] = useState({
    serviceAlerts: true,
    deployments: true,
    weeklyReports: false,
    securityUpdates: true,
  });

  const [pushNotifications, setPushNotifications] = useState({
    critical: true,
    warning: true,
    info: false,
  });

  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Preferences state
  const [theme, setTheme] = useState('Dark');
  const [timezone, setTimezone] = useState(
    'UTC+05:00 - Pakistan Standard Time'
  );
  const [logsRetention, setLogsRetention] = useState('7 days');
  const [metricsRetention, setMetricsRetention] = useState('30 days');

  // Integrations state
  const [integrations, setIntegrations] = useState({
    Slack: true,
    PagerDuty: true,
    Datadog: false,
    Jira: false,
    GitHub: true,
    Webhooks: false,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ];

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      showSuccess('Profile updated successfully');
      setIsSavingProfile(false);
    }, 1000);
  };

  const handleNotificationsSave = () => {
    setIsSavingNotifications(true);
    setTimeout(() => {
      showSuccess('Notification preferences saved');
      setIsSavingNotifications(false);
    }, 1000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return;
    }
    setIsSavingPassword(true);
    setTimeout(() => {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showSuccess('Password updated successfully');
      setIsSavingPassword(false);
    }, 1000);
  };

  const handlePreferencesSave = () => {
    setIsSavingPreferences(true);
    setTimeout(() => {
      showSuccess('Preferences saved successfully');
      setIsSavingPreferences(false);
    }, 1000);
  };

  const handleToggle2FA = () => {
    setIsToggling2FA(true);
    setTimeout(() => {
      setTwoFactorEnabled(!twoFactorEnabled);
      showSuccess(twoFactorEnabled ? '2FA disabled' : '2FA enabled');
      setIsToggling2FA(false);
    }, 1000);
  };

  const handleToggleIntegration = (name: string) => {
    setTogglingIntegration(name);
    setTimeout(() => {
      setIntegrations((prev) => ({
        ...prev,
        [name]: !prev[name as keyof typeof prev],
      }));
      showSuccess(
        `${name} ${
          integrations[name as keyof typeof integrations]
            ? 'disconnected'
            : 'connected'
        }`
      );
      setTogglingIntegration(null);
    }, 1000);
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 w-full overflow-x-hidden">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="max-w-[1400px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Settings</h1>
          <p className="text-[#8b93a7]">
            Manage your account and application preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                        activeTab === tab.id
                          ? 'bg-[#1e90ff]/10 text-[#1e90ff]'
                          : 'text-[#e4e6eb] hover:bg-[#242933]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Profile Information
                  </h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-[#1e90ff] rounded-full flex items-center justify-center text-2xl font-medium">
                      D
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-[#242933] hover:bg-[#2d3540] rounded-lg text-sm transition-colors">
                        Change Avatar
                      </button>
                      <p className="text-xs text-[#8b93a7] mt-2">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleProfileSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        defaultValue="Admin"
                        disabled
                        className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm opacity-50 cursor-not-allowed"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSavingProfile}
                        className="px-6 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSavingProfile ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Mail className="w-5 h-5 text-[#1e90ff]" />
                        <h3 className="font-medium">Email Notifications</h3>
                      </div>
                      <div className="space-y-3 ml-8">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailNotifications.serviceAlerts}
                            onChange={(e) =>
                              setEmailNotifications({
                                ...emailNotifications,
                                serviceAlerts: e.target.checked,
                              })
                            }
                            className="w-4 h-4 rounded border-[#2d3540] bg-[#242933] text-[#1e90ff] focus:ring-[#1e90ff]/50"
                          />
                          <span className="text-sm">Service alerts</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailNotifications.deployments}
                            onChange={(e) =>
                              setEmailNotifications({
                                ...emailNotifications,
                                deployments: e.target.checked,
                              })
                            }
                            className="w-4 h-4 rounded border-[#2d3540] bg-[#242933] text-[#1e90ff] focus:ring-[#1e90ff]/50"
                          />
                          <span className="text-sm">
                            Deployment notifications
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailNotifications.weeklyReports}
                            onChange={(e) =>
                              setEmailNotifications({
                                ...emailNotifications,
                                weeklyReports: e.target.checked,
                              })
                            }
                            className="w-4 h-4 rounded border-[#2d3540] bg-[#242933] text-[#1e90ff] focus:ring-[#1e90ff]/50"
                          />
                          <span className="text-sm">Weekly reports</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailNotifications.securityUpdates}
                            onChange={(e) =>
                              setEmailNotifications({
                                ...emailNotifications,
                                securityUpdates: e.target.checked,
                              })
                            }
                            className="w-4 h-4 rounded border-[#2d3540] bg-[#242933] text-[#1e90ff] focus:ring-[#1e90ff]/50"
                          />
                          <span className="text-sm">Security updates</span>
                        </label>
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div className="pt-6 border-t border-[#2d3540]/40">
                      <div className="flex items-center gap-3 mb-4">
                        <Smartphone className="w-5 h-5 text-[#1e90ff]" />
                        <h3 className="font-medium">Push Notifications</h3>
                      </div>
                      <div className="space-y-3 ml-8">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pushNotifications.critical}
                            onChange={(e) =>
                              setPushNotifications({
                                ...pushNotifications,
                                critical: e.target.checked,
                              })
                            }
                            className="w-4 h-4 rounded border-[#2d3540] bg-[#242933] text-[#1e90ff] focus:ring-[#1e90ff]/50"
                          />
                          <span className="text-sm">Critical alerts</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pushNotifications.warning}
                            onChange={(e) =>
                              setPushNotifications({
                                ...pushNotifications,
                                warning: e.target.checked,
                              })
                            }
                            className="w-4 h-4 rounded border-[#2d3540] bg-[#242933] text-[#1e90ff] focus:ring-[#1e90ff]/50"
                          />
                          <span className="text-sm">Warning alerts</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pushNotifications.info}
                            onChange={(e) =>
                              setPushNotifications({
                                ...pushNotifications,
                                info: e.target.checked,
                              })
                            }
                            className="w-4 h-4 rounded border-[#2d3540] bg-[#242933] text-[#1e90ff] focus:ring-[#1e90ff]/50"
                          />
                          <span className="text-sm">Info alerts</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleNotificationsSave}
                        disabled={isSavingNotifications}
                        className="px-6 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSavingNotifications
                          ? 'Saving...'
                          : 'Save Preferences'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    {/* Change Password */}
                    <div>
                      <h3 className="font-medium mb-4">Change Password</h3>
                      <form
                        onSubmit={handlePasswordChange}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSavingPassword}
                          className="px-6 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSavingPassword ? 'Updating...' : 'Update Password'}
                        </button>
                      </form>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="pt-6 border-t border-[#2d3540]/40">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-[#8b93a7] mt-1">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <button
                          onClick={handleToggle2FA}
                          disabled={isToggling2FA}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            twoFactorEnabled
                              ? 'bg-[#ff4757] hover:bg-[#ff4757]/90'
                              : 'bg-[#00d084] hover:bg-[#00d084]/90'
                          }`}
                        >
                          {isToggling2FA
                            ? 'Processing...'
                            : twoFactorEnabled
                            ? 'Disable'
                            : 'Enable'}
                        </button>
                      </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="pt-6 border-t border-[#2d3540]/40">
                      <h3 className="font-medium mb-4">Active Sessions</h3>
                      <div className="space-y-3">
                        {[
                          {
                            device: 'Chrome on MacOS',
                            location: 'Karachi, Pakistan',
                            time: 'Current session',
                          },
                          {
                            device: 'Safari on iPhone',
                            location: 'Karachi, Pakistan',
                            time: '2 hours ago',
                          },
                        ].map((session, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 bg-[#242933] rounded-lg"
                          >
                            <div>
                              <div className="text-sm font-medium">
                                {session.device}
                              </div>
                              <div className="text-xs text-[#8b93a7] mt-1">
                                {session.location} • {session.time}
                              </div>
                            </div>
                            {idx !== 0 && (
                              <button className="text-sm text-[#ff4757] hover:underline">
                                Revoke
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6">
                  <h2 className="text-xl font-semibold mb-6">Integrations</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        name: 'Slack',
                        description: 'Send alerts to Slack channels',
                        icon: '💬',
                      },
                      {
                        name: 'PagerDuty',
                        description: 'Incident management integration',
                        icon: '🚨',
                      },
                      {
                        name: 'Datadog',
                        description: 'Advanced monitoring and analytics',
                        icon: '📊',
                      },
                      {
                        name: 'Jira',
                        description: 'Create issues from alerts',
                        icon: '📋',
                      },
                      {
                        name: 'GitHub',
                        description: 'Link deployments to commits',
                        icon: '🐙',
                      },
                      {
                        name: 'Webhooks',
                        description: 'Custom webhook endpoints',
                        icon: '🔗',
                      },
                    ].map((integration) => (
                      <div
                        key={integration.name}
                        className="p-4 bg-[#242933] rounded-lg border border-[#2d3540]/40 hover:border-[#1e90ff]/40 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{integration.icon}</div>
                            <div>
                              <h3 className="font-medium">
                                {integration.name}
                              </h3>
                              <p className="text-xs text-[#8b93a7] mt-1">
                                {integration.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            handleToggleIntegration(integration.name)
                          }
                          disabled={togglingIntegration === integration.name}
                          className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            integrations[
                              integration.name as keyof typeof integrations
                            ]
                              ? 'bg-[#00d084]/10 text-[#00d084] hover:bg-[#00d084]/20'
                              : 'bg-[#1e90ff] text-white hover:bg-[#1e90ff]/90'
                          }`}
                        >
                          {togglingIntegration === integration.name
                            ? 'Processing...'
                            : integrations[
                                integration.name as keyof typeof integrations
                              ]
                            ? 'Connected'
                            : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="bg-[#1a1f29] rounded-lg border border-[#2d3540]/40 p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Application Preferences
                  </h2>

                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <h3 className="font-medium mb-4">Theme</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {['Dark', 'Light', 'Auto'].map((themeOption) => (
                          <button
                            key={themeOption}
                            onClick={() => setTheme(themeOption)}
                            className={`p-4 rounded-lg border transition-colors ${
                              theme === themeOption
                                ? 'border-[#1e90ff] bg-[#1e90ff]/10'
                                : 'border-[#2d3540]/40 bg-[#242933] hover:border-[#1e90ff]/40'
                            }`}
                          >
                            <div className="text-sm font-medium">
                              {themeOption}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Zone */}
                    <div className="pt-6 border-t border-[#2d3540]/40">
                      <h3 className="font-medium mb-4">Time Zone</h3>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full bg-[#242933] border border-[#2d3540]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff]"
                      >
                        <option>UTC+05:00 - Pakistan Standard Time</option>
                        <option>UTC+00:00 - Coordinated Universal Time</option>
                        <option>UTC-05:00 - Eastern Standard Time</option>
                        <option>UTC-08:00 - Pacific Standard Time</option>
                      </select>
                    </div>

                    {/* Data Retention */}
                    <div className="pt-6 border-t border-[#2d3540]/40">
                      <h3 className="font-medium mb-4">Data Retention</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Logs retention period</span>
                          <select
                            value={logsRetention}
                            onChange={(e) => setLogsRetention(e.target.value)}
                            className="bg-[#242933] border border-[#2d3540]/40 rounded-lg px-3 py-1.5 text-sm"
                          >
                            <option>7 days</option>
                            <option>30 days</option>
                            <option>90 days</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            Metrics retention period
                          </span>
                          <select
                            value={metricsRetention}
                            onChange={(e) =>
                              setMetricsRetention(e.target.value)
                            }
                            className="bg-[#242933] border border-[#2d3540]/40 rounded-lg px-3 py-1.5 text-sm"
                          >
                            <option>30 days</option>
                            <option>90 days</option>
                            <option>1 year</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handlePreferencesSave}
                        disabled={isSavingPreferences}
                        className="px-6 py-2 bg-[#1e90ff] hover:bg-[#1e90ff]/90 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSavingPreferences ? 'Saving...' : 'Save Preferences'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
