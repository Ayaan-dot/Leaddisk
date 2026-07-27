import { ArrowRight, CheckCircle2, TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Mini sparkline data for the chart
  const chartData = [30, 45, 38, 52, 48, 65, 58, 72, 68, 84, 78, 96];
  const maxVal = Math.max(...chartData);
  const chartH = 64;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 to-transparent dark:from-emerald-950/10 dark:to-transparent" />

      {/* Reduced blob opacity */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-emerald-100/20 dark:bg-emerald-900/10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-teal-100/15 dark:bg-teal-900/8 blur-3xl" />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column */}
          <div className="space-y-10">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-200/50 dark:border-emerald-800/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Trusted by 500+ businesses
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.08] tracking-tighter"
            >
              Transform Your{' '}
              <span className="text-emerald-600 dark:text-emerald-400 bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">Lead Management</span>
              <br />Into Revenue Growth
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl"
            >
              Streamline your sales pipeline with intelligent lead tracking,
              automated follow-ups, and actionable insights that drive real results.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/login')}
                className="btn-primary gap-2 px-7 py-3 text-base shadow-premium-lg hover:shadow-premium-xl"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary gap-2 px-7 py-3 text-base"
              >
                Explore Features
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-x-8 gap-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Cancel anytime
              </div>
            </motion.div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="card-premium p-6 shadow-premium-3xl relative overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    LD
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">LeadDesk</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard Overview</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {['JD', 'AK', 'MR'].map((initials, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI Grid - 4 cards for more realism */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Total Leads</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">2,847</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">+12.5%</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Target className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Conversion</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">24.8%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">+4.2%</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Revenue</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">$48.2k</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">+8.1%</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Target className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Win Rate</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">32.4%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">+3.7%</span>
                  </div>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lead Growth</p>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">+18.3% vs last month</span>
                </div>
                <div className="h-16 flex items-end gap-[3px]">
                  {chartData.map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all duration-500"
                      style={{
                        height: `${(val / maxVal) * 100}%`,
                        background: i === chartData.length - 1
                          ? 'linear-gradient(to top, #10B981, #34D399)'
                          : 'linear-gradient(to top, rgba(16,185,129,0.4), rgba(16,185,129,0.15))',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">Recent Activity</p>
                {[
                  { name: 'Sarah Johnson', company: 'TechCorp', status: 'new', time: '2 min ago' },
                  { name: 'Michael Chen', company: 'InnovateLab', status: 'qualified', time: '15 min ago' },
                  { name: 'Emma Wilson', company: 'DataFlow', status: 'proposal', time: '1 hr ago' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[9px] font-bold text-white">
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">{item.name}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">{item.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        item.status === 'new' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        item.status === 'qualified' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' :
                        'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {item.status}
                      </span>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium floating badge */}
              <div className="absolute -top-2.5 -right-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-emerald-500/25 animate-float">
                +156 this week
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

