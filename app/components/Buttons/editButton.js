import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

const EditButton = ({ noteId }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/notes/${noteId}`);
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleEdit}
    >
      Edit
    </button>
  );
};

EditButton.propTypes = {
  noteId: PropTypes.string.isRequired,
};

export default EditButton;


