const statusStyles = {
  new: 'status-pill-new',
  contacted: 'status-pill-contacted',
  qualified: 'status-pill-qualified',
  proposal: 'status-pill-proposal',
  closed: 'status-pill-closed',
  lost: 'status-pill-lost',
};

export default function StatusBadge({ status = 'new' }) {
  const style = statusStyles[status] || statusStyles.new;
  return (
    <span className={style}>
      {status}
    </span>
  );
}

