import { NextResponse } from "next/server";
import { connectMongoDB, closeMongoDB, queryMongoDB, insertMongoDB, deleteMongoDB } from "@/config/mongoDB";

// Get documents
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams 
  await connectMongoDB()
  const result = await queryMongoDB(searchParams.get('collection'), searchParams.get('omitkey'))
  closeMongoDB()

  return NextResponse.json(
    result, { status: 200 })
}

// Insert documents
export async function POST(req) {
  const searchParams = req.nextUrl.searchParams  
  const reqBody = await req.json() 
  await connectMongoDB()
  const result = await insertMongoDB(searchParams.get('collection'), reqBody)
  closeMongoDB()

  return NextResponse.json(
    result, { status: 201 })
}

// Delete documents
export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams    
  await connectMongoDB()
  const result = await deleteMongoDB(searchParams.get('collection'))
  closeMongoDB()

  return NextResponse.json(
    result, { status: 200 })
}