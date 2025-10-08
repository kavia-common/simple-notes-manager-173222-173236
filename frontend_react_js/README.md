# Simple Notes App (Ocean Professional Theme)

A lightweight React notes application with create, edit, delete, search, and localStorage persistence. Styled with the Ocean Professional theme.

## Features
- Create, edit, and delete notes
- Autosave to localStorage (no backend)
- Search/filter by title and content
- Timestamps and ordering by last updated
- Responsive two-column layout (stacks on small screens)
- Floating action button for quick note creation
- Accessible focus states, keyboard selection, and confirmations

## Quick Start
In the frontend directory:
```bash
npm install
npm start
```
Visit http://localhost:3000

## Project Structure
- src/App.js: Main app wiring and state
- src/components/Header.jsx: Top bar with app title and new note action
- src/components/SearchBar.jsx: Debounced search input
- src/components/NoteList.jsx: Sidebar list of notes
- src/components/NoteEditor.jsx: Editor for the selected note
- src/hooks/useLocalStorage.js: Persistence hook
- src/App.css, src/index.css: Theme and layout styles

## Data Model
Note object shape:
```js
{ id: string, title: string, content: string, updatedAt: string }
```

## Theming
Ocean Professional palette:
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

These are exposed as CSS variables in App.css.

## Testing
The default CRA test setup remains compatible. Component structure is test-friendly with clear props and minimal side effects.

## Notes
- Data is stored in the browser via localStorage under keys: `notes-app:v1:notes` and `notes-app:v1:selected`.
- Deleting a note prompts for confirmation.
