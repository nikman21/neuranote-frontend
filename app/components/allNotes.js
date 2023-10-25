'use client';
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { getUserNotes } from '../utils/users/api';
import DeleteButton from './Buttons/deleteButton';

const AllNotes = ({ token }) => {
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        // Get the user ID from the token
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.id;
        
        // Fetch the user notes
        const userNotes = await getUserNotes(userId, token);
        setNotes(userNotes);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user notes:', error);
        setIsLoading(false); // Handle the error and set isLoading to false
      }
    };

    fetchUserNotes();
  }, [token]);

  console.log('notes:', notes)

  const handleDeleteNote = (deletedNoteId) => {
    // Update the state to remove the deleted note
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== deletedNoteId));
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Add a key prop to each element in the notes array
  const notesWithKeys = notes.map((note, index) => (
    <li key={index} className="mb-2 p-2 rounded-lg shadow-sm bg-white">
      <p className="text-gray-900 text-lg">{note._id}</p>
      <p className="text-gray-800 text-lg">{note.title}</p>
      <DeleteButton noteId={note._id} token={token} onDelete={handleDeleteNote} />
    </li>
  ));

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">All Notes</h1>
      <ul>
        {notesWithKeys}
      </ul>
    </div>
  );
};

export default AllNotes;