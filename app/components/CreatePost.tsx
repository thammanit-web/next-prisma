import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface CreatePostFormProps {
  isCreateOpen: boolean
  onClose: () => void
}


const CreatePostForm: React.FC<CreatePostFormProps> = ({ isCreateOpen, onClose }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
  }, [isCreateOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await axios.post('/api/posts', { title, content })
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  if (!isCreateOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
        <h1 className="text-2xl font-semibold mb-6">Create Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full h-14 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm shadow-xl px-4"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm shadow-xl px-4 pt-4"
            ></textarea>
          </div>
          <div  className='flex justify-end items-end'>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
            <button onClick={onClose}  className="mx-2 py-2 px-4 border shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostForm
