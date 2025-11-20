import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, email, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID utilisateur requis' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Update user (excluding password and email)
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...updateData,
        name: `${updateData.firstName} ${updateData.lastName}`,
      },
    });

    // Return updated user (without password)
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(
      {
        message: 'Profil mis à jour avec succès',
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}
