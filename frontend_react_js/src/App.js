import React, { useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import useLocalStorage from './hooks/useLocalStorage';

// Utilities
const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const nowIso = () => new Date().toISOString();

/**
 * PUBLIC_INTERFACE
 * App - Simple Notes Application main component
 * Renders a responsive two-column layout with notes list/search and editor.
 * Manages notes state and persists to localStorage via useLocalStorage hook.
 */
function App() {
  const [notes, setNotes] = useLocalStorage('notes-app:v1:notes', []);
  const [selectedNoteId, setSelectedNoteId] = useLocalStorage('notes-app:v1:selected', null);
  const [query, setQuery] = useState('');

  // Ensure selectedNoteId exists if there are notes
  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedNoteId) || null,
    [notes, selectedNoteId]
  );

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...notes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    return [...notes]
      .filter(n => (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q))
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [notes, query]);

  // PUBLIC_INTERFACE
  const createNote = () => {
    const newNote = {
      id: createId(),
      title: 'Untitled',
      content: '',
      updatedAt: nowIso()
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
  };

  // PUBLIC_INTERFACE
  const updateNote = (id, patch) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...patch, updatedAt: nowIso() } : n))
    );
  };

  // PUBLIC_INTERFACE
  const deleteNote = (id) => {
    const note = notes.find(n => n.id === id);
    if (!note) return;
    const ok = window.confirm(`Delete note "${note.title || 'Untitled'}"? This cannot be undone.`);
    if (!ok) return;
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedNoteId === id) {
      // Select the next available note or clear selection
      const remaining = notes.filter(n => n.id !== id);
      setSelectedNoteId(remaining[0]?.id || null);
    }
  };

  // Seed with one sample note on first run
  React.useEffect(() => {
    if (Array.isArray(notes) && notes.length === 0) {
      const sample = {
        id: createId(),
        title: 'Welcome to Notes',
        content:
          'Start typing on the right to edit this note.\n\nTips:\n- Use the + button to create new notes.\n- Use the search bar to filter by title or content.\n- Your notes are saved automatically in your browser.',
        updatedAt: nowIso()
      };
      setNotes([sample]);
      setSelectedNoteId(sample.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="notes-app">
      <Header onCreate={createNote} />
      <main className="layout">
        <section className="sidebar">
          <div className="sidebar-inner">
            <SearchBar value={query} onChange={setQuery} />
            <NoteList
              notes={filteredNotes}
              selectedId={selectedNoteId}
              onSelect={setSelectedNoteId}
              onDelete={deleteNote}
              onCreate={createNote}
            />
          </div>
        </section>
        <section className="editor">
          <div className="editor-inner">
            {selectedNote ? (
              <NoteEditor
                key={selectedNote.id}
                note={selectedNote}
                onChange={(patch) => updateNote(selectedNote.id, patch)}
              />
            ) : (
              <div className="empty-editor">
                <p className="empty-title">No note selected</p>
                <p className="empty-subtitle">Create a new note or select one from the list.</p>
                <button className="btn btn-primary" onClick={createNote}>+ New Note</button>
              </div>
            )}
          </div>
        </section>
      </main>

      <button
        className="fab"
        aria-label="Create new note"
        title="Create new note"
        onClick={createNote}
      >
        +
      </button>
    </div>
  );
}

export default App;
