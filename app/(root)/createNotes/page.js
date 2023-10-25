'use client';

// Import necessary dependencies and components

import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import `useRouter` from 'next/router' instead of 'next/navigation'
import { createNote } from '../../utils/notes/api';
import ReactMarkdown from 'react-markdown'; // Import the React Markdown component
import gfm from 'remark-gfm'; // Enable GitHub Flavored Markdown

function CreateNote() {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');
    const [preview, setPreview] = useState(false);
    const router = useRouter();

    // Use state to store the token
    const [token, setToken] = useState('');

    // Use useEffect to get the token from localStorage on the client side
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        console.log(storedToken);
        setToken(storedToken);
    }, []);

    const togglePreview = () => {
        setPreview(!preview);
    };

    const saveEntry = async () => {
        if (!token) {
            console.error('Token not available.');
            return;
        }

        // Decoding the token to get the user ID
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.id;

        const noteEntry = {
            userId,
            title,
            tags,
            content
        };

        console.log('Note entry: ', noteEntry);

        try {
            console.log('Creating note...');
            const response = await createNote(noteEntry, token);
            console.log('Note created successfully!');
            if (response) {
                router.push('/notes'); // Redirect to the '/notes' page
                setTitle('');
                setTags('');
                setContent('');
            } else {
                console.log('Note creation failed.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-4">Create a New Note</h1>

            <button
                onClick={togglePreview}
                className="mb-2 bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-700"
            >
                {preview ? 'Edit' : 'Preview'}
            </button>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    saveEntry();
                }}
            >
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-600">Title</label>
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
                    <label htmlFor="tags" className="block text-gray-600">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                {!preview ? (
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-600">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded h-32"
                            required
                        />
                    </div>
                ) : (
                    <div className="mb-4">
                        <label className="block text-gray-600">Preview</label>
                        <div className="border border-gray-300 p-2 rounded h-32">
                            <ReactMarkdown
                                children={content}
                                plugins={[gfm]} // Enable GitHub Flavored Markdown
                            />
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-700"
                >
                    Save Note
                </button>
            </form>
        </div>
    );
}

export default CreateNote;
