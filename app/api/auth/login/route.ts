import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Check if email is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { 
          error: 'Compte non vérifié',
          needsVerification: true,
          email: user.email
        },
        { status: 403 }
      );
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Connexion réussie',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
