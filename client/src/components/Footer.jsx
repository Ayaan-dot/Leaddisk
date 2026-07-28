import { Heart, Code2, Mail, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#' },
    { label: 'Changelog', href: '#' },
    { label: 'Documentation', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-14">
          {/* Brand */}
          <div className="col-span-2 space-y-5">
            <Logo />
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              Transform your lead management into a growth engine.
              Intelligent tracking, automated workflows, data-driven insights.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-200">
                <Code2 className="w-4 h-4" />
              </a>
              <a href="mailto:support@leaddesk.com" className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-200">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{group}</h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200 transition-colors duration-200 inline-flex items-center gap-1 group/link"
                    >
                      {label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            &copy; {currentYear} LeadDesk. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> for modern businesses
          </p>
        </div>

        {/* Credit Line */}
        <div className="mt-6 text-center">
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            Built for Digital Heroes Training Task
          </a>
        </div>
      </div>
    </footer>
  );
}

