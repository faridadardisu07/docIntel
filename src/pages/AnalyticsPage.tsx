import React from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useData } from '../contexts/DataProvider';
import { 
  TrendingUp, 
  FileText, 
  MessageCircle, 
  Upload, 
  HardDrive,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { formatFileSize } from '../lib/utils';

export const AnalyticsPage: React.FC = () => {
  const { analytics } = useData();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$5,795.00',
      change: '+49% From last month',
      positive: true,
      icon: TrendingUp
    },
    {
      title: 'Total Costs',
      value: '$3,569.00',
      change: '-25% From last month',
      positive: false,
      icon: BarChart3
    },
    {
      title: 'Total Savings',
      value: '$2,765.00',
      change: '+16% From last month',
      positive: true,
      icon: PieChart
    }
  ];

  const topFiles = [
    { name: 'Q4 Financial Report.pdf', views: 245, chats: 89 },
    { name: 'Employee Handbook.docx', views: 189, chats: 56 },
    { name: 'Project Charter.pdf', views: 167, chats: 43 },
    { name: 'Budget Analysis.xlsx', views: 134, chats: 32 },
    { name: 'Marketing Strategy.pptx', views: 112, chats: 28 }
  ];

  const chartData = [
    { name: 'Jan', value: 3500 },
    { name: 'Feb', value: 4200 },
    { name: 'Mar', value: 4800 },
    { name: 'Apr', value: 4100 },
    { name: 'May', value: 5200 },
    { name: 'Jun', value: 3800 },
    { name: 'Jul', value: 4600 },
    { name: 'Aug', value: 5800 },
    { name: 'Sep', value: 3200 },
    { name: 'Oct', value: 4200 },
    { name: 'Nov', value: 5100 },
    { name: 'Dec', value: 4900 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Comprehensive insights into your document intelligence platform</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">Monthly</Badge>
          <Badge variant="success">+25 customers</Badge>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                  <p className="text-sm text-gray-500 mt-1">monthly</p>
                </div>
                <stat.icon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Reports Chart */}
        <Card className="lg:col-span-2 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Sales Reports</h3>
                <p className="text-sm text-gray-400">Monthly performance overview</p>
              </div>
              <Badge variant="secondary">Monthly</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <div className="flex items-end justify-between h-full px-4">
                {chartData.map((item, index) => (
                  <div key={item.name} className="flex flex-col items-center space-y-2">
                    <div className="flex items-end space-x-1">
                      <div 
                        className="w-6 bg-green-500 rounded-t"
                        style={{ height: `${(item.value / 6000) * 100}%` }}
                      />
                      <div 
                        className="w-6 bg-yellow-500 rounded-t"
                        style={{ height: `${((item.value * 0.7) / 6000) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0k</span>
                <span>1k</span>
                <span>2k</span>
                <span>3k</span>
                <span>4k</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earning Reports */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Earning Reports</h3>
                <p className="text-sm text-gray-400">Monthly earnings breakdown</p>
              </div>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray="150 251"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="8"
                    strokeDasharray="63 251"
                    strokeDashoffset="-150"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    strokeDasharray="38 251"
                    strokeDashoffset="-213"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">59%</div>
                    <div className="text-sm text-gray-400">Total Saves</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">37%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">13%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">50%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Files */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Most Accessed Files</h3>
                <p className="text-sm text-gray-400">Top documents by views and interactions</p>
              </div>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-white">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{file.name}</div>
                      <div className="text-xs text-gray-400">{file.views} views • {file.chats} chats</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-emerald-400">{file.views}</div>
                    <div className="text-xs text-gray-400">views</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Usage Statistics</h3>
                <p className="text-sm text-gray-400">Current month activity</p>
              </div>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{analytics.totalFiles.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Files</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{analytics.totalChats.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">AI Chats</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{analytics.totalUploads.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Uploads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formatFileSize(analytics.totalStorage)}</div>
                  <div className="text-sm text-gray-400">Storage</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">OpenAI Usage</span>
                  <span className="text-sm font-medium text-white">{analytics.aiEngineUsage.openai}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Gemini Usage</span>
                  <span className="text-sm font-medium text-white">{analytics.aiEngineUsage.gemini}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">DeepSeek Usage</span>
                  <span className="text-sm font-medium text-white">{analytics.aiEngineUsage.deepseek}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};