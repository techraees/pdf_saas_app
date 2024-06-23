import * as React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
// import { AiOutlineArrowRight } from "react-icons/ai";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";
import UserAccountNav from "./UserAccountNav";
import Image from "next/image";
import PDFIcon from "@/public/pdfIcon.png";

const getKindeServerSession = () => {
  return {
    getUser: () => ({
      given_name: "John",
      family_name: "Doe",
      email: "john.doe@example.com",
      picture:
        "https://images.unsplash.com/photo-1718964313194-5c028558f69d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }),
  };
};

const Navbar = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <div className="flex gap-2 items-center " >
          <Image src={PDFIcon} alt="PDF ICON" width={28} height={28} />
            <Link href="/" className="flex z-40 font-semibold">
              <span>rpdf.</span>
            </Link>
          </div>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "destructive",
                  })}
                >
                  Get started
                  {/* <AiOutlineArrowRight className="ml-1.5 h-5 w-5" /> */}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? "Your Account"
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ""}
                  imageUrl={user.picture ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
