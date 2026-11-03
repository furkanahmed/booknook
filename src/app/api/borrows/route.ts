import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET /api/borrows?email=user@example.com
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const client = await clientPromise;
    const db = client.db("booknook");
    const borrowsCol = db.collection("borrows");

    const query: Record<string, any> = {};
    if (email) {
      query.userEmail = email.toLowerCase();
    }

    const records = await borrowsCol.find(query).sort({ borrowedAt: -1 }).toArray();

    const formatted = records.map((r) => ({
      ...r,
      _id: r._id.toString(),
    }));

    return NextResponse.json({ success: true, count: formatted.length, data: formatted });
  } catch (error: any) {
    console.error("GET /api/borrows error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to load borrow records" },
      { status: 500 }
    );
  }
}

// POST /api/borrows { bookId, userEmail, userName, returnDate }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookId, userEmail, userName, returnDate } = body;

    if (!bookId || !userEmail || !returnDate) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: bookId, userEmail, returnDate." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("booknook");
    const borrowsCol = db.collection("borrows");
    const booksCol = db.collection("books");

    const normalizedEmail = userEmail.toLowerCase();

    // 1. Check duplicate borrow for this user
    const existingBorrow = await borrowsCol.findOne({
      bookId: bookId.toString(),
      userEmail: normalizedEmail,
    });

    if (existingBorrow) {
      return NextResponse.json(
        { success: false, message: "You have already borrowed this book." },
        { status: 400 }
      );
    }

    // 2. Locate book in DB (if stored in MongoDB)
    let bookQuery: any = { _id: bookId };
    if (ObjectId.isValid(bookId)) {
      bookQuery = { $or: [{ _id: new ObjectId(bookId) }, { _id: bookId }] };
    }
    const book = await booksCol.findOne(bookQuery);

    // If book exists in MongoDB, check copies & atomic decrement
    if (book) {
      if (typeof book.totalCopies === "number" && book.totalCopies <= 0) {
        return NextResponse.json(
          { success: false, message: "Cannot borrow: Book is currently out of stock." },
          { status: 400 }
        );
      }
      // Atomic decrement with $inc
      await booksCol.updateOne(
        { _id: book._id, totalCopies: { $gt: 0 } },
        { $inc: { totalCopies: -1 } }
      );
    }

    // 3. Create borrow document
    const newBorrow = {
      bookId: bookId.toString(),
      bookTitle: book?.title || body.bookTitle || "Library Book",
      bookImage: book?.image || body.bookImage || "/image/The Alchemist.webp",
      bookAuthor: book?.author || body.bookAuthor || "Unknown Author",
      bookCategory: book?.category || body.bookCategory || "Fiction",
      userName: userName || "Reader",
      userEmail: normalizedEmail,
      borrowedAt: new Date().toISOString(),
      returnDate,
    };

    const insertRes = await borrowsCol.insertOne(newBorrow);

    return NextResponse.json(
      {
        success: true,
        message: "Book borrowed successfully.",
        data: { _id: insertRes.insertedId.toString(), ...newBorrow },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/borrows error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to process borrow." },
      { status: 500 }
    );
  }
}

// DELETE /api/borrows?bookId=...&userEmail=... OR delete by record id
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");
    const userEmail = searchParams.get("userEmail");
    const id = searchParams.get("id");

    const client = await clientPromise;
    const db = client.db("booknook");
    const borrowsCol = db.collection("borrows");
    const booksCol = db.collection("books");

    let deleteQuery: any = {};
    if (id && ObjectId.isValid(id)) {
      deleteQuery = { _id: new ObjectId(id) };
    } else if (bookId && userEmail) {
      deleteQuery = { bookId: bookId.toString(), userEmail: userEmail.toLowerCase() };
    } else {
      return NextResponse.json(
        { success: false, message: "Missing bookId or record id." },
        { status: 400 }
      );
    }

    const existingBorrow = await borrowsCol.findOne(deleteQuery);
    if (!existingBorrow) {
      return NextResponse.json(
        { success: false, message: "Borrow record not found." },
        { status: 404 }
      );
    }

    // Delete borrow record
    await borrowsCol.deleteOne(deleteQuery);

    // Atomic increment in books ($inc: { totalCopies: 1 })
    const targetBookId = existingBorrow.bookId;
    let bookQuery: any = { _id: targetBookId };
    if (ObjectId.isValid(targetBookId)) {
      bookQuery = { $or: [{ _id: new ObjectId(targetBookId) }, { _id: targetBookId }] };
    }
    await booksCol.updateOne(bookQuery, { $inc: { totalCopies: 1 } });

    return NextResponse.json({
      success: true,
      message: "Book returned successfully. Inventory copies incremented.",
    });
  } catch (error: any) {
    console.error("DELETE /api/borrows error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to return book." },
      { status: 500 }
    );
  }
}
