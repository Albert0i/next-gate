import { NextResponse } from "next/server";
import { connectMySQL, closeMySQL, queryMySQL, insertMySQL, deleteMySQL } from "@/config/mysql";

// Get rows
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams  
  await connectMySQL()
  const result = await queryMySQL(searchParams.get('table'), searchParams.get('omitkey'))
  closeMySQL()
  
  return NextResponse.json(
    result, { status: 200 })
}

// Insert rows
export async function POST(req) {
  const searchParams = req.nextUrl.searchParams  
  const reqBody = await req.json() 
  await connectMySQL()
  const result = await insertMySQL(searchParams.get('table'), reqBody)
  closeMySQL()

  return NextResponse.json(
    result, { status: 201 })
}

// Delete rows 
export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams    
  await connectMySQL()
  const result = await deleteMySQL(searchParams.get('table'))
  closeMySQL()

  return NextResponse.json(
    result, { status: 200 })
}