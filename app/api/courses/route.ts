import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";
import { z } from "zod";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZOR_KEY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET_ID as string,
});

// Get all courses
export async function GET() {
  const courses = await prisma.course.findMany();
  return NextResponse.json(courses);
}

// Add a new course (Admin only)
const courseSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  subtitle: z.string().optional(),
  thumbnail: z.string().url().optional(),
  detailedDescription: z.string().min(4, "Detailed description is too short"),
  keyTopics: z.array(z.string()).min(1, "At least one key topic is required"),
  difficultyLevel: z.enum(["BEGINNER", "MODERATE", "ADVANCED"]),
  duration: z.string().min(3, "Duration must be specified"),
  price: z.number().positive("Price must be a positive number"),
  category: z.enum(["JEE", "NEET", "CRASH_COURSES", "OTHER"]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    body.price = Number(body.price); // Ensure price is a number

    // Validate the request body
    const parsedBody = courseSchema.parse(body);

    // Create the new course in the database
    const newCourse = await prisma.course.create({
      data: {
        title: parsedBody.title,
        subtitle: parsedBody.subtitle || null,
        thumbnail: parsedBody.thumbnail || null,
        detailedDescription: parsedBody.detailedDescription,
        keyTopics: parsedBody.keyTopics,
        difficultyLevel: parsedBody.difficultyLevel,
        duration: parsedBody.duration,
        price: parsedBody.price,
        category: parsedBody.category,
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation Error:", error.issues);
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Unable to create course. Please check your input." },
      { status: 400 }
    );
  }
}
