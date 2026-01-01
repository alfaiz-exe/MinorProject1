import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import './CSS/Notepad.css';
import { withApi } from './apiConfig';
import Token from './token';

const useAuthHeaders = () => {
  const token = Token.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

function Notepad() {
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const saveTimeout = useRef(null);
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    setStatusMessage('Please sign in to manage your notes.');
    navigate('/signin');
  };

  const fetchNotesFromAPI = async () => {
    try {
      const response = await fetch(withApi('/api/users/getNotes'), {
        method: 'GET',
        credentials: 'include',
        headers: {
          ...useAuthHeaders(),
        },
      });

      if (response.status === 401) return handleUnauthorized();

      const result = await response.json();
      if (Array.isArray(result.notes)) {
        setNotes(result.notes);
        setActiveNoteId(result.notes[0]?._id || null);
      } else {
        setStatusMessage('Unable to load notes.');
      }
    } catch (error) {
      setStatusMessage('Error fetching notes.');
      console.error('Error fetching notes from API:', error);
    }
  };

  const addNoteToAPI = async (content) => {
    try {
      const response = await fetch(withApi('/api/users/addNote'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...useAuthHeaders(),
        },
        body: JSON.stringify({ content }),
      });

      if (response.status === 401) return handleUnauthorized();
      const result = await response.json();
      if (Array.isArray(result.notes)) {
        setNotes(result.notes);
        setActiveNoteId(result.notes[result.notes.length - 1]?._id || null);
      }
    } catch (error) {
      setStatusMessage('Error adding note.');
      console.error('Error adding note to API:', error);
    }
  };

  const deleteNoteFromAPI = async (noteId) => {
    try {
      const response = await fetch(withApi(`/api/users/deleteNote/${noteId}`), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          ...useAuthHeaders(),
        },
      });

      if (response.status === 401) return handleUnauthorized();
      const result = await response.json();
      if (Array.isArray(result.notes)) {
        setNotes(result.notes);
        setActiveNoteId(result.notes[0]?._id || null);
      }
    } catch (error) {
      setStatusMessage('Error deleting note.');
      console.error('Error deleting note from API:', error);
    }
  };

  const updateNoteOnAPI = async (noteId, content) => {
    try {
      const response = await fetch(withApi(`/api/users/updateNote/${noteId}`), {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...useAuthHeaders(),
        },
        body: JSON.stringify({ content }),
      });

      if (response.status === 401) return handleUnauthorized();
      if (!response.ok) setStatusMessage('Unable to save note changes.');
    } catch (error) {
      setStatusMessage('Error saving note.');
      console.error('Error updating note on API:', error);
    }
  };

  useEffect(() => {
    fetchNotesFromAPI();
    return () => clearTimeout(saveTimeout.current);
  }, []);

  const addNote = () => {
    setStatusMessage('');
    addNoteToAPI('New note');
  };

  const deleteNote = (noteId) => {
    setStatusMessage('');
    deleteNoteFromAPI(noteId);
  };

  const updateActiveNote = (value) => {
    setStatusMessage('');
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === activeNoteId ? { ...note, content: value } : note
      )
    );

    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      if (activeNoteId) {
        updateNoteOnAPI(activeNoteId, value);
      }
    }, 400);
  };

  const activeNote = notes.find((note) => note._id === activeNoteId);

  return (
    <>
      <Navbar />
      <div id="container">
        <div className="main-content">
          <div className="editor-header">
            <h1 id="title">Note Pad</h1>
            <button onClick={addNote} id="Add">Add Note</button>
          </div>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
          {activeNote ? (
            <textarea
              value={activeNote.content}
              onChange={(e) => updateActiveNote(e.target.value)}
              className="textArea"
            />
          ) : (
            <textarea
              value={"Select a note from the sidebar or create a new one."}
              className="textArea"
              readOnly
            />
          )}
        </div>

        <aside id="sidebar">
          <h3>Notes</h3>
          {notes.map((note) => (
            <div
              key={note._id}
              className={activeNoteId === note._id ? 'active' : ''}
            >
              <div
                onClick={() => setActiveNoteId(note._id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ flex: 1 }}>{note.content.slice(0, 20) || 'New Note'}</span>
                <span
                  className="delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note._id);
                  }}
                >
                  🗑️
                </span>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}

export default Notepad;
