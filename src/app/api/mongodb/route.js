import { NextResponse } from "next/server";
import { connectMongoDB, closeMongoDB, queryMongoDB, executeMongoDB } from "@/config/mongoDB";

// Get documents
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams 
  await connectMongoDB()
  const result = await queryMongoDB(searchParams.get('collection'))
  closeMongoDB()

  return NextResponse.json(
    { 
      success: true,       
      result
    }, 
    { status: 200 })
}

// Insert documents
export async function POST(req) {
  const searchParams = req.nextUrl.searchParams  
  const reqBody = await req.json() 
  await connectMongoDB()
  const result = await executeMongoDB(searchParams.get('collection'), reqBody)
  closeMongoDB()

  return NextResponse.json(
    { 
      success: true, 
      result
    }, 
    { status: 201 })
}
