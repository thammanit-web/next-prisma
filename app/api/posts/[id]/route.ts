import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query; // Getting the ID from the query parameters
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function PUT(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query; // Getting the ID from the query parameters
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const { title, content } = req.body; // Destructuring the request body
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query; // Getting the ID from the query parameters
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const deletedPost = await prisma.post.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json(deletedPost);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
