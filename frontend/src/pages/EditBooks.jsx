import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [authour, setAuthour] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar(); // Uncomment if using notistack

  // Fetch book details when component mounts
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5556/books/${id}`)
      .then((response) => {
        const { title, authour, publishYear } = response.data;
        setTitle(title);
        setAuthour(authour);
        setPublishYear(publishYear);
        setLoading(false);
        enqueueSnackbar('Book Edited Successfully', { variant: 'success' });

      })
      .catch((error) => {
        setLoading(false);
        // Uncomment if using notistack
        enqueueSnackbar('Error fetching book details', { variant: 'error' });
        console.log('Error fetching book details:', error);
      });
  }, [id]); // Dependency array includes id to refetch if id changes

  const handleEditBook = () => {
    const data = {
      title,
      authour,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5556/books/${id}`, data) // Use PUT method for updates
      .then(() => {
        setLoading(false);
        // Uncomment if using notistack
        // enqueueSnackbar('Book updated successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // Uncomment if using notistack
        // enqueueSnackbar('Error updating book', { variant: 'error' });
        console.log('Error updating book:', error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={authour}
            onChange={(e) => setAuthour(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBooks;
