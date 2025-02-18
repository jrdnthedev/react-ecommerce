import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: `User does not exist` },
        { status: 400 }
      );
    }

    const isPassWordMatch = await bcrypt.compare(password, user.password);

    if (!isPassWordMatch) {
      return NextResponse.json(
        { message: `Password does not match` },
        { status: 401 }
      );
    }

    const tokenData = {
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { message: `User found successfully`, success: true, data: token },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
