import React from 'react';

function useDebouncedCallback(cb, delay = 250) {
  const timeout = React.useRef();
  return React.useCallback((...args) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => cb(...args), delay);
  }, [cb, delay]);
}

/**
 * PUBLIC_INTERFACE
 * SearchBar - Debounced search input for filtering notes
 */
export default function SearchBar({ value, onChange }) {
  const [inner, setInner] = React.useState(value || '');
  const debounced = useDebouncedCallback(onChange, 250);

  React.useEffect(() => {
    setInner(value || '');
  }, [value]);

  const handle = (e) => {
    const v = e.target.value;
    setInner(v);
    debounced(v);
  };

  return (
    <div className="search">
      <label className="visually-hidden" htmlFor="search-notes">Search notes</label>
      <div className="field">
        <span className="icon" aria-hidden>🔎</span>
        <input
          id="search-notes"
          value={inner}
          onChange={handle}
          placeholder="Search notes..."
          aria-label="Search notes"
        />
      </div>
    </div>
  );
}
