import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { validateEmail, validateName, validatePhone } from '../utils/validators';

export default function LeadForm({ onSubmit, initialData = null, isModal = false }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    company: initialData?.company || '',
    notes: initialData?.notes || '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    const nameErr = validateName(formData.name);
    if (nameErr) newErrors.name = nameErr;
    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;
    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit(formData);
      if (!initialData) {
        setFormData({ name: '', email: '', phone: '', company: '', notes: '' });
      }
    } catch {
      // Error handled by parent
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const fields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe', required: true },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@company.com', required: true },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+1 (555) 123-4567', required: true },
    { label: 'Company', name: 'company', type: 'text', placeholder: 'Company Inc.' },
    { label: 'Notes', name: 'notes', type: 'textarea', placeholder: 'Any additional information...' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(({ label, name, type, placeholder, required }) => (
        <div key={name}>
          <label className="label-premium">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          {type === 'textarea' ? (
            <textarea
              value={formData[name]}
              onChange={handleChange(name)}
              placeholder={placeholder}
              rows={3}
              className={`input-premium resize-none ${errors[name] ? 'error' : ''}`}
            />
          ) : (
            <input
              type={type}
              value={formData[name]}
              onChange={handleChange(name)}
              placeholder={placeholder}
              className={`input-premium ${errors[name] ? 'error' : ''}`}
            />
          )}
          {errors[name] && (
            <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full gap-2 py-3"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {initialData ? 'Update Lead' : 'Submit Lead'}
          </>
        )}
      </button>
    </form>
  );
}

