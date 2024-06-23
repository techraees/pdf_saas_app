// Generate JWT function
export default function generateJWT(userId) {
  return jwt.sign(
    { userId },
    process.env.NEXT_PUBLIC_JWT_SECRET,
    { expiresIn: "1h" } // Token expiration time
  );
}
