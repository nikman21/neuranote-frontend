'use client';
import { useEffect, useState } from 'react';
import { getNoteById, updateNote } from '../../../utils/notes/api';
import { useRouter } from 'next/navigation';

export default function Note({ params }) {
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const id = params.id; // Define 'id' in the component's scope

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const fetchedNote = await getNoteById(id);
          setNote(fetchedNote);
        } catch (error) {
          console.error('Error fetching note:', error);
        }
      };

      fetchNote();
    }
  }, [id]);

  const saveEntry = async () => {
    const id = params.id;
    const noteEntry = {
      title,
      tags,
      content,
    };

    try {
      const response = await updateNote(id, noteEntry);
      if (response) {
        router.push('/notes');
      } else {
        console.log('Note update failed.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Initialize the state variables with the note's values
  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setTags(note.tags || '');
      setContent(note.content || '');
    }
  }, [note]);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4 text-white">Edit Note</h1>

      <button
        onClick={saveEntry}
        className="mb-2 bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-700"
      >
        Save Note
      </button>

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-600">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tags" className="block text-gray-600">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-600">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded h-32"
          required
        />
      </div>
    </div>
  );
}



