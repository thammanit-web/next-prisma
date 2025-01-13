'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import ConfirmModal from './components/DeletePost';
import EditPostForm from './components/EditPost';
import CreatePostForm from './components/CreatePost';

interface Post {
  id: number
  title: string
  content: string
}

export default function List() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts')
      setPosts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteClick = (id: number) => {
    setSelectedPostId(id)
    setIsModalOpen(true)
  }
  const handleEditClick = (id: number) => {
    setSelectedPostId(id)
    setIsEditOpen(true)
  }
  const handleCreateClick = () => {
    setIsCreateOpen(true)
  }

  const deletePost = async () => {
    if (selectedPostId) {
      try {
        await axios.delete(`/api/posts/${selectedPostId}`)
        fetchPosts()
        setIsModalOpen(false)
        setSelectedPostId(null)
      } catch (error) {
        console.error('Failed to delete the post', error)
      }
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setSelectedPostId(null)
    fetchPosts()
  }
  const handleCloseModal = () => {
    setIsEditOpen(false)
    setSelectedPostId(null)
    fetchPosts()
  }

  const handleCloseCreate = () => {
    setIsCreateOpen(false)
    fetchPosts()
  }



  return (
    <div className="mx-auto px-14 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 underline">Blog Posts</h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-50ay-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
              >id</th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
              >
                Content
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {post.id}
                  </div>
                  </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {post.title}
                  </div>
                </td>
                <td>{post.content}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-white mx-1 inline-block bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-300"
                    onClick={() => handleEditClick(post.id)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post.id)}
                    className="text-white inline-block bg-red-500 px-2 py-1 rounded-md hover:bg-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPostId && (
        <EditPostForm
          isEditOpen={isEditOpen}
          onClose={handleCloseModal}
          postId={selectedPostId}
        />
      )}

      <button
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => handleCreateClick()}
      >
        Create a New Post
      </button>

      <CreatePostForm
        isCreateOpen={isCreateOpen}
        onClose={handleCloseCreate}
      />

      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={deletePost}
        onCancel={handleCancel}
        message="Are you sure to delete this post?"
      />
    </div>
  )
}
