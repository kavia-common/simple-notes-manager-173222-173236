import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header - Top navigation bar with app title and New Note action
 */
export default function Header({ onCreate }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand" role="img" aria-label="Ocean Professional">
          <div className="brand-icon">✦</div>
          <div className="title">Simple Notes</div>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={onCreate}>
            + New Note
          </button>
        </div>
      </div>
    </header>
  );
}
