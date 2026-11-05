import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { initialBooksCatalog } from "@/data/initial-books";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const userEmail = searchParams.get("userEmail");

    const client = await clientPromise;
    const db = client.db("booknook");
    const booksCol = db.collection("books");

    let query: Record<string, any> = {};
    if (userEmail) {
      query.userEmail = userEmail.toLowerCase();
    }

    let cursor = booksCol.find(query).sort({ createdAt: -1 });
    if (limit) {
      cursor = cursor.limit(parseInt(limit, 10));
    }

    const dbBooks = await cursor.toArray();

    // Map _id to string
    const formattedDbBooks = dbBooks.map((b) => ({
      ...b,
      _id: b._id.toString(),
    }));

    // If query is for all books and not filtered by specific user, merge initial catalog if not present
    if (!userEmail) {
      const dbIds = new Set(formattedDbBooks.map((b) => b._id));
      const initialRemaining = initialBooksCatalog.filter((b) => !dbIds.has(b._id));
      const combined = [...formattedDbBooks, ...initialRemaining];
      const finalResult = limit ? combined.slice(0, parseInt(limit, 10)) : combined;
      return NextResponse.json({ success: true, count: finalResult.length, data: finalResult });
    }

    return NextResponse.json({ success: true, count: formattedDbBooks.length, data: formattedDbBooks });
  } catch (error: any) {
    console.error("GET /api/books error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to load books" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, author, category, image, shortDescription, longDescription, totalCopies, userName, userEmail } = body;

    if (!title || !author || !category || !image || !shortDescription) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("booknook");
    const booksCol = db.collection("books");

    const newBook = {
      title: title.trim(),
      author: author.trim(),
      category: category.trim(),
      image: image.trim(),
      shortDescription: shortDescription.trim(),
      longDescription: (longDescription || shortDescription).trim(),
      totalCopies: parseInt(totalCopies, 10) || 1,
      userName: userName || "Anonymous Member",
      userEmail: (userEmail || "").toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    const result = await booksCol.insertOne(newBook);

    return NextResponse.json(
      {
        success: true,
        message: "Book added successfully to MongoDB.",
        data: { _id: result.insertedId.toString(), ...newBook },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/books error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to add book" },
      { status: 500 }
    );
  }
}

