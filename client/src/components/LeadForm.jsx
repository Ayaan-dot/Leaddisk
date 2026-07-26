import { useState } from 'react';
import toast from 'react-hot-toast';
import { createLead } from '../services/leadService';
import { validateLeadForm } from '../utils/validators';

const BUDGET_OPTIONS = [
  'Under $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
];

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLeadForm(
      formData.name,
      formData.email,
      formData.budget,
      formData.message
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await createLead(formData);
      toast.success('Your message has been sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', budget: '', message: '' });
      setErrors({});
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title mb-4">Get in Touch</h2>
            <p className="section-subtitle">
              Ready to grow your business? Fill out the form below and our team will reach out to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
placeholder="Ayaan Ahmed"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Budget Range <span className="text-red-500">*</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`input-field ${errors.budget ? 'border-red-500 focus:ring-red-500' : ''}`}
              >
                <option value="">Select a budget range</option>
                {BUDGET_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.budget && <p className="mt-1 text-sm text-red-500">{errors.budget}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={`input-field resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Tell us about your project or requirements..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

