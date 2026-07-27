import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';
import { useLeads } from '../hooks/useLeads';
import { Zap, Shield, BarChart3, Users, Clock, Layers, Star, ChevronDown, ArrowRight, CheckCircle2, Quote } from 'lucide-react';
import toast from 'react-hot-toast';

const features = [
  {
    icon: Zap,
    title: 'Instant Capture',
    description: 'Capture leads from multiple channels in real-time. Never miss an opportunity with automatic lead collection from your website, forms, and email.',
  },
  {
    icon: Shield,
    title: 'Smart Qualification',
    description: 'Automatically qualify and score leads based on custom criteria. Focus your energy on the prospects that matter most.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Make data-driven decisions with comprehensive analytics. Track conversion rates, pipeline velocity, and team performance.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together seamlessly. Assign leads, share notes, and track activities across your entire sales team in real-time.',
  },
  {
    icon: Clock,
    title: 'Automated Follow-ups',
    description: 'Set up automated email sequences and reminders. Nurture leads on autopilot with intelligent follow-up scheduling.',
  },
  {
    icon: Layers,
    title: 'Pipeline Management',
    description: 'Visualize and manage your entire sales pipeline. Drag-and-drop interface makes moving leads through stages effortless.',
  },
];

const stats = [
  { value: '10,000+', label: 'Leads Managed', suffix: 'and counting' },
  { value: '98%', label: 'Satisfaction Rate', suffix: 'from our customers' },
  { value: '500+', label: 'Active Businesses', suffix: 'trust LeadDesk' },
  { value: '34%', label: 'Avg. Conversion Lift', suffix: 'within first month' },
];

const testimonials = [
  {
    quote: "LeadDesk transformed our sales process. We've seen a 40% increase in qualified leads within the first month. The pipeline management is incredibly intuitive.",
    author: 'Sarah Chen',
    role: 'VP of Sales, TechCorp',
    rating: 5,
  },
  {
    quote: "The automated follow-up sequences alone saved us 20 hours per week. It's like having an extra sales rep on the team. Highly recommend for any growing business.",
    author: 'Marcus Johnson',
    role: 'CEO, InnovateLab',
    rating: 5,
  },
  {
    quote: "We evaluated 12 CRM solutions before choosing LeadDesk. The combination of powerful features, beautiful design, and reasonable pricing made it an easy decision.",
    author: 'Emily Rodriguez',
    role: 'Head of Growth, DataFlow',
    rating: 5,
  },
];

const faqs = [
  {
    q: 'How does the free trial work?',
    a: 'Start your 14-day free trial with no credit card required. You get full access to all features, including lead capture, pipeline management, and analytics. No commitments, cancel anytime.',
  },
  {
    q: 'Can I import my existing leads?',
    a: 'Yes! You can easily import leads from CSV, Excel, or directly from popular CRMs. Our onboarding team will help you migrate your data seamlessly.',
  },
  {
    q: 'What kind of support do you offer?',
    a: 'All plans include email support with a 4-hour response time. Pro and Enterprise plans include priority chat support and a dedicated account manager.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. We use bank-level encryption (AES-256) for data at rest and TLS 1.3 for data in transit. We are SOC 2 compliant and GDPR ready.',
  },
  {
    q: 'Can I customize the pipeline stages?',
    a: 'Yes! You can fully customize your sales pipeline with custom stages, fields, and automation rules to match your exact sales process.',
  },
  {
    q: 'Do you offer discounts for nonprofits?',
    a: 'Yes, we offer a 50% discount for verified nonprofit organizations. Contact our sales team to learn more.',
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white pr-4">{question}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-5 animate-slide-up">
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  const { createLead } = useLeads();
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleLeadSubmit = async (formData) => {
    try {
      await createLead(formData);
      toast.success('Thank you! We\'ll be in touch shortly.');
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <Hero />

      {/* Stats Section */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <p className="text-3xl lg:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.suffix}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 md:py-32 bg-white/50 dark:bg-gray-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-200/50 dark:border-emerald-800/30 mb-5">
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 tracking-tight leading-[1.1]">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">Close More Deals</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful tools to manage, track, and convert your leads into loyal customers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="section-label mb-4">Testimonials</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              Loved by{' '}
              <span className="text-emerald-600 dark:text-emerald-400">Sales Teams</span> Everywhere
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Don't just take our word for it. Here's what our customers have to say.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-6 lg:p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-emerald-200 dark:text-emerald-800 absolute -top-2 -left-2 opacity-50" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic relative z-10 pl-4">
                    "{item.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-sm font-bold text-emerald-700 dark:text-emerald-400">
                    {item.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.author}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-20 md:py-28 bg-white/50 dark:bg-gray-950/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="section-label mb-4">FAQ</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              Frequently Asked{' '}
              <span className="text-emerald-600 dark:text-emerald-400">Questions</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Everything you need to know about LeadDesk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-premium p-6 lg:p-8 divide-y divide-gray-100 dark:divide-gray-800"
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.q}
                answer={faq.a}
                isOpen={openFAQ === i}
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-emerald-600 dark:bg-emerald-900" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Ready to Transform Your Sales?
            </h2>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
              Join thousands of businesses that use LeadDesk to streamline their sales process
              and drive growth. Start your free trial today.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={() => window.location.href = '/login'}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl bg-white text-emerald-700 hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-all"
              >
                Learn More
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <div className="flex items-center gap-2 text-emerald-100 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                No credit card required
              </div>
              <div className="flex items-center gap-2 text-emerald-100 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2 text-emerald-100 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form" className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-label mb-4">Get Started</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                Ready to Transform Your{' '}
                <span className="text-emerald-600 dark:text-emerald-400">Lead Management</span>?
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
                Join thousands of businesses that use LeadDesk to streamline their sales process and drive growth.
              </p>
              <ul className="space-y-3">
                {[
                  'Free 14-day trial, no credit card required',
                  'Set up in minutes, not hours',
                  'Dedicated support team',
                  'Cancel anytime',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-premium p-8 shadow-premium-2xl"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Submit Your Details
              </h3>
              <LeadForm onSubmit={handleLeadSubmit} />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

