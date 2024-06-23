"use client";
import db from "@/utils/db";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { notFound, redirect } from "next/navigation";
import PdfRenderer from "@/components/PdfRenderer";
import ChatWrapper from "@/components/chat/ChatWrapper";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardWithPdf = async ({ params }) => {
  const [selectedfile, setSelectedfile] = useState(null);

  const { fileid } = params;

  // Dummy user data
  const user = { id: "user123" };

  if (!user || !user.id) {
    console.log("User not authenticated"); // Dummy log
    return null; // Return early if user is not authenticated
  }

  // Dummy file data
  const file = {
    id: fileid,
    url: selectedfile,
  };

  if (!file) {
    console.log("File not found"); // Dummy log
    notFound();
  }

  // Dummy plan data
  const plan = {
    isSubscribed: true, // Dummy subscription status
  };


  return (
    <>
      <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 xl:flex">
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              {/* Main area */}
              {selectedfile && <PdfRenderer url={file.url} />}
            </div>
          </div>

          <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
            {/* <ChatWrapper isSubscribed={plan.isSubscribed} fileId={file.id} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardWithPdf;
