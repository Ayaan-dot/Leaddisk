import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToForm = () => {
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { label: 'Total Leads', value: '1,284', change: '+12%' },
    { label: 'New', value: '48', change: '+8%' },
    { label: 'Closed', value: '326', change: '+24%' },
  ];

  const activities = [
    { name: 'Ayaan Ahmed', email: 'ayaan@company.com', status: 'New', initials: 'AA', time: '2m ago', bg: 'from-primary-400 to-primary-500', badgeType: 'badge-blue' },
    { name: 'Ravi Patel', email: 'ravi@startup.io', status: 'Contacted', initials: 'RP', time: '15m ago', bg: 'from-secondary-400 to-secondary-500', badgeType: 'badge-warning' },
    { name: 'John Doe', email: 'john@biz.com', status: 'Closed', initials: 'JD', time: '1h ago', bg: 'from-accent-success to-emerald-400', badgeType: 'badge-success' },
  ];

  const logos = ['TechFlow', 'NexGen', 'DataSphere', 'CloudPeak'];

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-surface">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] radial-blue opacity-40" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] radial-purple opacity-30" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] radial-blue opacity-20" />
        <motion.div animate={{x:[0,30,-20,0],y:[0,-40,-20,0]}} transition={{duration:20,repeat:Infinity,ease:"linear"}} className="absolute top-20 right-[20%] w-72 h-72 bg-primary-500/5 rounded-full blur-[100px]" />
        <motion.div animate={{x:[0,-30,20,0],y:[0,30,-40,0]}} transition={{duration:25,repeat:Infinity,ease:"linear"}} className="absolute bottom-40 left-[15%] w-96 h-96 bg-secondary-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              Trusted by 500+ businesses
            </motion.div>

            <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary leading-[1.05] tracking-tight mb-6">
              Manage Your Leads <span className="gradient-text">Like a Pro</span>
            </motion.h1>

            <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.1}} className="text-lg md:text-xl text-text-muted leading-relaxed mb-10 max-w-lg">
              Capture, track, and nurture your sales leads with our intelligent management platform. Turn prospects into customers effortlessly.
            </motion.p>

            <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}} className="flex flex-col sm:flex-row gap-4 mb-12">
              <button onClick={scrollToForm} className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Get Started Free
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
              <a href="#features" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto text-center">Learn More</a>
            </motion.div>

            <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.3}} className="pt-6 border-t border-white/5">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">Trusted by industry leaders</p>
              <div className="flex flex-wrap gap-6 items-center">
                {logos.map((name) => (
                  <div key={name} className="flex items-center gap-2 text-text-muted/60 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-secondary-500 opacity-60 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">{name.slice(0, 2)}</span>
                    </div>
                    <span className="text-sm font-semibold group-hover:text-text-muted transition-colors">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:0.3}} className="relative hidden lg:block">
            <div className="card-glass p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">LD</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">LeadDesk Mini</p>
                    <p className="text-xs text-text-muted">Dashboard Preview</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-danger/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-warning/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-success/60" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider">{stat.label}</p>
                    <p className="text-lg font-bold text-text-primary mt-1">{stat.value}</p>
                    <span className="text-[10px] font-semibold text-accent-success">{stat.change}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-text-primary">Recent Activity</p>
                  <span className="text-[10px] text-text-muted">View all &rarr;</span>
                </div>
                {activities.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.bg} flex items-center justify-center`}>
                        <span className="text-xs font-bold text-white">{item.initials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{item.name}</p>
                        <p className="text-[10px] text-text-muted">{item.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`badge ${item.badgeType} text-[10px]`}>{item.status}</span>
                      <p className="text-[10px] text-text-muted mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}