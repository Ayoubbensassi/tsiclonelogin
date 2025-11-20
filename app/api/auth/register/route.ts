import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/email';

// Generate 6-digit verification code
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, userType, ...otherFields } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un utilisateur avec cet email existe déjà' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification code and expiry (15 minutes)
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    // Create user (unverified)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        userType,
        isVerified: false,
        verificationCode,
        verificationCodeExpiry,
        ...otherFields,
      },
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, name, verificationCode);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Delete user if email fails
      await prisma.user.delete({ where: { id: user.id } });
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email de vérification' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Inscription réussie! Vérifiez votre email.',
        user: { id: user.id, email: user.email, name: user.name }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}
