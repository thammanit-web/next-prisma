import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(params.id) },
    });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { title, content } = await req.json();
    const updatedPost = await prisma.post.update({
      where: { id: Number(params.id) },
      data: { title, content },
    });
    return NextResponse.json(updatedPost);
  } catch (_) {
    return NextResponse.json(
      { error: 'Failed to update the post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(deletedPost);
  } catch (_) {
    return NextResponse.json(
      { error: 'Failed to delete the post' },
      { status: 500 }
    );
  }
}
