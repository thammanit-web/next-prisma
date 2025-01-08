import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
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
    console.error(error); // Log the error
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content } = await req.json();
    return Response.json(await prisma.post.update({
      where: { id: Number(params.id) },
      data: { title, content },
    }));
  } catch (error) {
    console.error(error); // Log the error
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    return Response.json(await prisma.post.delete({
      where: { id: Number(params.id) },
    }));
  } catch (error) {
    console.error(error); // Log the error
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
