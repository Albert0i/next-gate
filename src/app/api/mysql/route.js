import { NextResponse } from "next/server";
import { connectMySQL, closeMySQL, queryMySQL, executeMySQL } from "@/config/mysql";

// Get rows
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams  
  await connectMySQL()
  const result = await queryMySQL(searchParams.get('table'))
  closeMySQL()
  
  return NextResponse.json(
    { 
      success: true, 
      result
    }, 
    { status: 200 })
}

// Insert rows
export async function POST(req) {
  const searchParams = req.nextUrl.searchParams  
  const reqBody = await req.json() 
  await connectMySQL()
  const result = await executeMySQL(searchParams.get('table'), reqBody)
  closeMySQL()

  return NextResponse.json(
    { 
      success: true, 
      result
    }, 
    { status: 201 })
}
