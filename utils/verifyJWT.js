export default function verifyJWT(token) {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
