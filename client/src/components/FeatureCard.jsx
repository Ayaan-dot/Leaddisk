export default function FeatureCard({ icon, title, description, index = 0 }) {
  return (
    <div
      className="card-hover p-6 md:p-8 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

