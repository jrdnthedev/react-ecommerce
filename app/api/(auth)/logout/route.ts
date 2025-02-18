import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  // Remove the token by setting an expired cookie
  response.cookies.set({
    name: "token",
    value: "",
    expires: new Date(0), // Expire immediately
    path: "/",
  });

  return response;
}
