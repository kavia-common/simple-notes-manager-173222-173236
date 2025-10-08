import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteEditor - Title and content editor for a selected note
 */
export default function NoteEditor({ note, onChange }) {
  const [title, setTitle] = React.useState(note?.title ?? '');
  const [content, setContent] = React.useState(note?.content ?? '');

  React.useEffect(() => {
    setTitle(note?.title ?? '');
    setContent(note?.content ?? '');
  }, [note?.id]);

  React.useEffect(() => {
    if (!note) return;
    const handler = setTimeout(() => {
      onChange({ title, content });
    }, 180);
    return () => clearTimeout(handler);
  }, [title, content, note, onChange]);

  return (
    <>
      <div className="editor-toolbar">
        <div className="helper">Last updated {new Date(note.updatedAt).toLocaleString()}</div>
        <div className="helper">Autosaving…</div>
      </div>
      <div className="editor-body">
        <label className="visually-hidden" htmlFor="note-title">Title</label>
        <input
          id="note-title"
          className="input"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="visually-hidden" htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          className="textarea"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </>
  );
}
