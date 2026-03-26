export function EmptyState({ icon, title, description, action, onAction, variant = 'default' }) {
  return (
    <div className={`empty-state empty-state--${variant}`}>
      {icon && <div className="empty-state__icon">{icon}</div>}
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__desc">{description}</p>}
      {action && onAction && (
        <button className="empty-state__btn" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
}

export function NoResultsEmpty({ onClear }) {
  return (
    <EmptyState
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      }
      title="No Results Found"
      description="No results matched your search. Try different keywords."
      action="Clear Filter"
      onAction={onClear}
      variant="search"
    />
  );
}

export function EmptyListEmpty({ onAdd }) {
  return (
    <EmptyState
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12h14" />
        </svg>
      }
      title="List is Empty"
      description="Add your first item and get started."
      action="+ Add Item"
      onAction={onAdd}
      variant="default"
    />
  );
}

export function ErrorEmpty({ onRetry }) {
  return (
    <EmptyState
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      }
      title="Something Went Wrong"
      description="Failed to load data. Check your connection and try again."
      action="Retry"
      onAction={onRetry}
      variant="error"
    />
  );
}