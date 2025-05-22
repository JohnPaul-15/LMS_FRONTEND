import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define the login request schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // TODO: Replace this with your actual authentication logic
    // This is just a mock implementation
    if (email === 'admin@libdash.com' && password === 'password123') {
      // Generate a mock token (in a real app, use a proper JWT)
      const token = 'mock-jwt-token-' + Math.random().toString(36).substring(7);
      
      return NextResponse.json({
        token,
        user: {
          id: 1,
          email,
          name: 'Admin User',
          role: 'admin',
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 