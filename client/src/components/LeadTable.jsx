import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/formatters';
import { useState } from 'react';

export default function LeadTable({
  leads,
  onStatusChange,
  page,
  totalPages,
  totalLeads,
  onPageChange,
}) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyEmail = async (email, id) => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!leads || leads.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No leads found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {totalLeads === 0
            ? 'No leads have been submitted yet.'
            : 'Try adjusting your search or filters.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                Budget
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Date
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Copy
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
              >
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {lead.name}
                  </span>
                  <span className="text-xs text-gray-400 block md:hidden">{lead.budget}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[120px] sm:max-w-[180px] block">
                      {lead.email}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{lead.budget}</span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead._id, e.target.value)}
                    className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      lead.status === 'New'
                        ? 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30'
                        : lead.status === 'Contacted'
                        ? 'text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-900/30'
                        : 'text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-900/30'
                    }`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDate(lead.createdAt)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleCopyEmail(lead.email, lead._id)}
                    className="text-gray-400 hover:text-primary-500 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    title="Copy email address"
                  >
                    {copiedId === lead._id ? (
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

