"use client";

import { useRouter, useSearchParams } from "next/navigation";

const AuthCallback = async () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  console.log(origin, "ASDASDADSAAAAAAAAAAAAAAAAAAAAAA");

  return <div>{origin}</div>;
};


export default AuthCallback