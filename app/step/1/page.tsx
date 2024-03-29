import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">
        Step 1: Set up Google Cloud Account
      </h1>
      <div className="mb-4 flex gap-2">
        <Link
          className=" px-4 py-2 text-black bg-white
          border-black border-2 "
          href="/"
        >
          Home
        </Link>
        <Link
          className=" px-4 py-2 text-black bg-white
          border-black border-2 "
          href="/step/2"
        >
          Next Step
        </Link>
      </div>
      {/* Sub-step 1 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 1: Create a Google Cloud account
        </h2>
        <p>To get started, follow these steps:</p>
        <ol className="list-decimal pl-4 mt-2">
          <li>
            Visit{" "}
            <Link
              className="underline"
              href="https://console.cloud.google.com/"
              target="blank"
            >
              Google Cloud Console
            </Link>
            .
          </li>
          <li>
            Click on "Create account" and follow the registration process.
          </li>
        </ol>
      </div>

      {/* Sub-step 2 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 2: Set up a new project
        </h2>
        <p>
          Once you have your Google Cloud account, create a new project for your
          Next.js app. Here's how:
        </p>
        <ol className="list-decimal pl-4 mt-2">
          <li>Go to the Google Cloud Console.</li>
          <li>Click on the project drop-down and select "New Project".</li>
          <li>Enter a project name and click "Create".</li>
        </ol>
      </div>

      {/* Sub-step 3 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 3: Set up OAuth consent screen
        </h2>
        <p>Follow these steps to set up the OAuth consent screen:</p>
        <ol className="list-decimal pl-4 mt-2">
          <li>Navigate to "APIs & Services" {">"} "OAuth consent screen".</li>
          <li>Set user type to external, then create.</li>
          <li>
            Fill in app information, set the app domain to http://localhost:3000
            for all 3 fields.
          </li>
          <li>Set email to your email.</li>
          <li>
            For Scopes, click "Add or remove scopes" and select the top 3 for
            the bare minimum user data. Click update at the bottom.
          </li>
          <li>You can add yourself as a test user if you'd like.</li>
          <li>Save and continue.</li>
        </ol>
      </div>

      {/* Sub-step 4 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 4: Create Credentials
        </h2>
        <p>Follow these steps to set up the OAuth consent screen:</p>
        <ol className="list-decimal pl-4 mt-2">
          <li>Navigate to "APIs & Services" {">"} "Credentials".</li>
          <li>
            Click the "+ CREATE CREDENTIALS" button at the top of the page.
          </li>
          <li>Select OAuth client ID</li>
          <li>
            Set Application type to web application then fill in app name.
          </li>
          <li>
            Add an Authorized JavaScript origins URI. This will be
            http://localhost:3000 for now.{" "}
          </li>
          <li>
            Add Authorized redirect URI. This will be
            http://localhost:3000/api/auth/callback/google for now
          </li>
          <li>Click create</li>
          <li>
            You can copy the client ID and the Client secret to the .env.example
            file.
          </li>
        </ol>
      </div>

      {/* Additional information or links */}
      <p className="mt-4">
        For more detailed instructions, refer to the{" "}
        <Link
          className="underline"
          href="https://cloud.google.com/gcp/getting-started"
        >
          Google Cloud Getting Started Guide
        </Link>
        .
      </p>
    </div>
  );
};

export default page;
