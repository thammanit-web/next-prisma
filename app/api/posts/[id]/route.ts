import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

const handleError = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      return handleError('Post not found', 404);
    }
    return NextResponse.json(post);
  } catch (error) {
    return handleError('Internal Server Error', 500);
  }
}

export async function PUT(req: Request, { params }: { params: { id: number } }) {
  try {
    const { id } = params;
    const { title, content } = await req.json();

    if (!title || !content) {
      return handleError('Title and content are required', 400);
    }

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    return handleError('Internal Server Error', 500);
  }
}

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
  try {
    const { id } = params;
    const deletedPost = await prisma.post.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedPost);
  } catch (error) {
    return handleError('Internal Server Error', 500);
  }
}
