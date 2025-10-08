import React from 'react';

function timeAgo(iso) {
  try {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
    const secs = Math.round(diff / 1000);
    if (secs < 60) return rtf.format(-secs, 'second');
    const mins = Math.round(secs / 60);
    if (mins < 60) return rtf.format(-mins, 'minute');
    const hours = Math.round(mins / 60);
    if (hours < 24) return rtf.format(-hours, 'hour');
    const days = Math.round(hours / 24);
    if (days < 7) return rtf.format(-days, 'day');
    return d.toLocaleDateString();
  } catch {
    return '';
  }
}

/**
 * PUBLIC_INTERFACE
 * NoteList - Renders list of notes with selection and delete action
 */
export default function NoteList({ notes, selectedId, onSelect, onDelete, onCreate }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="empty-list">
        <p className="empty-title">No notes yet</p>
        <p className="empty-subtitle">Create your first note to get started.</p>
        <button className="btn btn-primary" onClick={onCreate}>+ New Note</button>
      </div>
    );
  }

  return (
    <ul className="note-list" role="list" aria-label="Notes">
      {notes.map(n => (
        <li
          key={n.id}
          className={`note-item ${selectedId === n.id ? 'active' : ''}`}
          onClick={() => onSelect(n.id)}
          role="button"
          aria-pressed={selectedId === n.id}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onSelect(n.id);
          }}
        >
          <div>
            <h3 className="note-title">{n.title || 'Untitled'}</h3>
            <p className="note-preview">{(n.content || '').replace(/\n/g, ' ').slice(0, 80) || 'No content'}</p>
            <div className="note-meta">Updated {timeAgo(n.updatedAt)}</div>
          </div>
          <div className="note-actions" onClick={(e) => e.stopPropagation()}>
            <button
              className="icon-btn delete"
              aria-label={`Delete ${n.title || 'Untitled'}`}
              title="Delete note"
              onClick={() => onDelete(n.id)}
            >
              🗑
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
