import React, { useState } from 'react';
import { 
  Home, Search, BarChart3, PlusCircle, Wallet, Bell, User, 
  MapPin, TrendingUp, Clock, CheckCircle, AlertCircle, 
  Settings, LogOut, FileText, Users, DollarSign, Menu, X
} from 'lucide-react';

 function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const campaigns = [
    {
      id: 1,
      title: 'Rebuild Homes in Flood-Affected Jhapa',
      location: 'Jhapa, Nepal',
      raised: 45000,
      goal: 60000,
      status: 'active',
      milestone: 'Phase 2: Construction',
      donors: 234,
      aiScore: 88,
      image: '🏠'
    },
    {
      id: 2,
      title: 'Emergency Food Relief - Turkey Earthquake',
      location: 'Istanbul, Turkey',
      raised: 28000,
      goal: 35000,
      status: 'active',
      milestone: 'Phase 1: Food Distribution',
      donors: 156,
      aiScore: 92,
      image: '🍲'
    },
    {
      id: 3,
      title: 'Medical Supplies for Hurricane Victims',
      location: 'Florida, USA',
      raised: 50000,
      goal: 50000,
      status: 'completed',
      milestone: 'Completed',
      donors: 389,
      aiScore: 95,
      image: '⚕️'
    }
  ];

  const recentActivity = [
    { type: 'donation', user: 'Sarah M.', amount: 500, campaign: 'Jhapa Flood Relief', time: '5 min ago' },
    { type: 'milestone', campaign: 'Turkey Earthquake', milestone: 'Phase 2 Approved', time: '1 hour ago' },
    { type: 'donation', user: 'John D.', amount: 250, campaign: 'Hurricane Relief', time: '2 hours ago' },
    { type: 'verification', campaign: 'Jhapa Flood Relief', status: 'AI Verified', time: '3 hours ago' }
  ];

  const stats = [
    { label: 'Total Raised', value: '$123,450', icon: DollarSign, color: 'bg-green-500', change: '+12%' },
    { label: 'Active Campaigns', value: '8', icon: BarChart3, color: 'bg-blue-500', change: '+2' },
    { label: 'Total Donors', value: '1,234', icon: Users, color: 'bg-purple-500', change: '+45' },
    { label: 'Pending Reviews', value: '3', icon: Clock, color: 'bg-orange-500', change: '-1' }
  ];

  const upcomingMilestones = [
    { campaign: 'Jhapa Flood Relief', milestone: 'Phase 2 Review', date: 'Dec 25, 2024', votes: 145 },
    { campaign: 'Turkey Earthquake', milestone: 'Final Inspection', date: 'Dec 28, 2024', votes: 98 },
    { campaign: 'School Reconstruction', milestone: 'Foundation Complete', date: 'Jan 5, 2025', votes: 67 }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'campaigns', label: 'My Campaigns', icon: BarChart3 },
    { id: 'donations', label: 'Donations', icon: Wallet },
    { id: 'milestones', label: 'Milestones', icon: CheckCircle },
    { id: 'verification', label: 'Verification', icon: AlertCircle },
    { id: 'transparency', label: 'Transparency', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="bg-orange-500 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="font-bold text-orange-500">We Raise It</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
              <PlusCircle className="w-5 h-5" />
              {sidebarOpen && <span>New Campaign</span>}
            </button>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center ${sidebarOpen ? 'space-x-3' : 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">John Doe</div>
                <div className="text-sm text-gray-500 truncate">john@example.com</div>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <div className="mt-3 flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 flex items-center justify-center transition-colors">
                <Settings className="w-4 h-4" />
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 flex items-center justify-center transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500">Welcome back, John! Here's what's happening today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Campaigns List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Active Campaigns</h2>
                  <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{campaign.image}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">{campaign.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            {campaign.location}
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-semibold text-gray-900">
                                ${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{campaign.milestone}</span>
                            <div className="flex items-center space-x-4">
                              <span className="text-gray-600">{campaign.donors} donors</span>
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                {campaign.aiScore}% AI Score
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'donation' ? 'bg-green-100' :
                        activity.type === 'milestone' ? 'bg-blue-100' :
                        'bg-orange-100'
                      }`}>
                        {activity.type === 'donation' ? '💰' : activity.type === 'milestone' ? '✓' : '🔍'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.type === 'donation' && (
                            <><span className="font-semibold">{activity.user}</span> donated ${activity.amount} to <span className="font-semibold">{activity.campaign}</span></>
                          )}
                          {activity.type === 'milestone' && (
                            <><span className="font-semibold">{activity.campaign}</span>: {activity.milestone}</>
                          )}
                          {activity.type === 'verification' && (
                            <><span className="font-semibold">{activity.campaign}</span> - {activity.status}</>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-6">
              {/* Upcoming Milestones */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Milestones</h2>
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone, index) => (
                    <div key={index} className="border-l-4 border-orange-500 pl-4">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{milestone.campaign}</h3>
                      <p className="text-sm text-gray-600 mb-2">{milestone.milestone}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{milestone.date}</span>
                        <span>{milestone.votes} votes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center space-x-3">
                    <PlusCircle className="w-5 h-5" />
                    <span>Create Campaign</span>
                  </button>
                  <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center space-x-3">
                    <FileText className="w-5 h-5" />
                    <span>Upload Milestone Proof</span>
                  </button>
                  <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur py-3 px-4 rounded-lg font-medium transition-all text-left flex items-center space-x-3">
                    <Users className="w-5 h-5" />
                    <span>Vote on Milestones</span>
                  </button>
                </div>
              </div>

              {/* AI Verification Score */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">AI Verification</h2>
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#f97316"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.88)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-3xl font-bold text-gray-900">88%</span>
                  </div>
                  <p className="text-sm text-gray-600">Average verification score across your campaigns</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;