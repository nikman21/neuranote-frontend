'use client';

import jwt_decode from 'jwt-decode';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation'; 
import { createNote } from '../../utils/notes/api';
import TextEditor from '../../components/textEditor';


function CreateNote() {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');

    const router = useRouter();

    // Use state to store the token
    const [token, setToken] = useState('');

    // Use useEffect to get the token from localStorage on the client side
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        console.log(storedToken);
        setToken(storedToken);
    }, []);

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
        <div className="max-w-3xl mx-auto mt-3">
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

                <div className="">
                    <label htmlFor="tags" className="block text-gray-600">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-600">Content</label>
                        <TextEditor value={content} onChange={setContent} />
                    </div>

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
