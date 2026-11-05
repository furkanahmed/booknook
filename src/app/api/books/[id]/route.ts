import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("booknook");
    const booksCol = db.collection("books");

    let book = null;
    if (ObjectId.isValid(id)) {
      book = await booksCol.findOne({ _id: new ObjectId(id) });
    }
    if (!book) {
      book = await booksCol.findOne({ _id: id as any });
    }

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { ...book, _id: book._id.toString() },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch book" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("booknook");
    const booksCol = db.collection("books");

    const updateFields: Record<string, any> = {};
    if (body.title !== undefined) updateFields.title = body.title.trim();
    if (body.author !== undefined) updateFields.author = body.author.trim();
    if (body.category !== undefined) updateFields.category = body.category.trim();
    if (body.image !== undefined) updateFields.image = body.image.trim();
    if (body.shortDescription !== undefined) updateFields.shortDescription = body.shortDescription.trim();
    if (body.longDescription !== undefined) updateFields.longDescription = body.longDescription.trim();
    if (body.totalCopies !== undefined) updateFields.totalCopies = parseInt(body.totalCopies, 10) || 1;

    let filter: any = null;
    if (ObjectId.isValid(id)) {
      filter = { _id: new ObjectId(id) };
    } else {
      filter = { _id: id };
    }

    const result = await booksCol.updateOne(filter, { $set: updateFields });

    return NextResponse.json({
      success: true,
      message: "Book updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to update book" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("booknook");
    const booksCol = db.collection("books");

    let filter: any = null;
    if (ObjectId.isValid(id)) {
      filter = { _id: new ObjectId(id) };
    } else {
      filter = { _id: id };
    }

    const result = await booksCol.deleteOne(filter);

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to delete book" },
      { status: 500 }
    );
  }
}

