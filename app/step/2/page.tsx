import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">
        Step 2: Set up Firebase Project
      </h1>
      <div className="mb-4 flex gap-2">
        <Link
          className=" px-4 py-2 text-black bg-white
          border-black border-2 "
          href="/step/1"
        >
          Previous Step
        </Link>
        <Link
          className=" px-4 py-2 text-black bg-white
          border-black border-2 "
          href="/step/3"
        >
          Next Step
        </Link>
      </div>
      {/* Sub-step 1 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 1: Create a Firebase account
        </h2>
        <p>To get started, follow these steps:</p>
        <ol className="list-decimal pl-4 mt-2">
          <li>
            Visit the{" "}
            <Link
              className="underline"
              href="https://console.firebase.google.com/"
              target="blank"
            >
              Firebase Console
            </Link>
            .
          </li>
          <li>Click on "Add project".</li>
          <li>Select the Google Cloud project you set up in the first step.</li>
          <li>Continue and set up Google Analytics if desired.</li>
        </ol>
      </div>

      {/* Sub-step 2 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 2: Add Firebase to your web app
        </h2>
        <p>Follow these steps to integrate Firebase with your Next.js app:</p>
        <ol className="list-decimal pl-4 mt-2">
          <li>Click the{" </>"} button to add Firebase to your web app.</li>
          <li>Give your app a nickname and register the app.</li>
          <li>
            Ignore the npm install firebase command, as it comes preinstalled.
          </li>
          <li>
            Copy the provided `firebaseConfig` object and paste it into your
            `firebase.ts.example` file. Replace the placeholder values in the
            example file with the actual values provided.
          </li>
        </ol>
      </div>

      {/* Sub-step 3 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 3: Set up Authentication
        </h2>
        <p>Configure authentication for your Firebase project:</p>
        <ol className="list-decimal pl-4 mt-2">
          <li>Go to Authentication and click "Get Started".</li>
          <li>
            For sign-in providers, select Google, enable it, and press save.
          </li>
          <li>
            Return to the project overview by clicking the home icon in the left
            sidebar.
          </li>
        </ol>
      </div>

      {/* Sub-step 4 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 4: Set up Cloud Firestore
        </h2>
        <p>Initialize Cloud Firestore for your project:</p>
        <ol className="list-decimal pl-4 mt-2">
          <li>Click Cloud Firestore and select "Get Started".</li>
          <li>Leave defaults and press "Create".</li>
          <li>Choose to start in production and press "Create".</li>
        </ol>
      </div>

      {/* Additional information or links */}
      <p className="mt-4">
        For more detailed instructions, refer to the{" "}
        <Link
          className="underline"
          href="https://firebase.google.com/docs/web/setup"
        >
          Firebase Web Setup Guide
        </Link>
        .
      </p>
    </div>
  );
};

export default page;
