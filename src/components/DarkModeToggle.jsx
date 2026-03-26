import { useState } from 'react';

export function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  const toggle = () => {
    const newVal = !dark;
    setDark(newVal);
    document.body.classList.toggle('dark', newVal);
  };

  return (
    <div className={`dm-wrapper ${dark ? 'dark' : ''}`}>
      <span className="dm-label">{dark ? '🌙 Dark' : '☀️ Light'}</span>
      <label className="dm-toggle" aria-label="Toggle dark mode">
        <input type="checkbox" checked={dark} onChange={toggle} />
        <span className="dm-slider" />
      </label>
    </div>
  );
}