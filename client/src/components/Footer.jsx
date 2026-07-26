export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-surface border-t border-white/5 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">LD</span>
            </div>
            <span className="text-sm font-semibold text-text-primary">LeadDesk Mini</span>
          </div>
          <p className="text-sm text-text-muted">(c) {currentYear} LeadDesk Mini. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}