import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <EmptyState
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      }
      title={t('empty_state.no_results_title')}
      description={t('empty_state.no_results_desc')}
      action={t('empty_state.clear_filter')}
      onAction={onClear}
      variant="search"
    />
  );
}

export function EmptyListEmpty({ onAdd }) {
  const { t } = useTranslation();
  return (
    <EmptyState
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12h14" />
        </svg>
      }
      title={t('empty_state.list_empty_title')}
      description={t('empty_state.list_empty_desc')}
      action={t('empty_state.add_item')}
      onAction={onAdd}
      variant="default"
    />
  );
}

export function ErrorEmpty({ onRetry }) {
  const { t } = useTranslation();
  return (
    <EmptyState
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      }
      title={t('empty_state.error_title')}
      description={t('empty_state.error_desc')}
      action={t('empty_state.retry')}
      onAction={onRetry}
      variant="error"
    />
  );
}