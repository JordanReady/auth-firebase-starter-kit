import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">
        Step 3: Set up env files and firebase.ts
      </h1>
      <div className="mb-4 flex gap-2">
        <Link
          className=" px-4 py-2 text-black bg-white
          border-black border-2 "
          href="/step/2"
        >
          Previous Step
        </Link>
        <Link
          className=" px-4 py-2 text-black bg-white
          border-black border-2 "
          href="/step/4"
        >
          Next Step
        </Link>
      </div>
      {/* Sub-step 1 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 1: Create .env file
        </h2>
        <p>
          Follow these steps to create a{" "}
          <code className="bg-slate-300">.env</code> file:
        </p>
        <ol className="list-decimal pl-4 mt-2">
          <li>
            In your project's root directory, run the following command in your
            terminal:
            <code className="bg-slate-300 p-1">cp .env.example .env</code>
          </li>
        </ol>
      </div>

      {/* Sub-step 2 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 2: Configure Firebase settings
        </h2>
        <p>Set up Firebase credentials for your project:</p>
        <ol className="list-decimal pl-4 mt-2">
          <li>
            Go to your Firebase project settings and navigate to Service
            accounts.
          </li>
          <li>
            Generate a new private key and paste the keys into the{" "}
            <code className="bg-slate-300">.env</code> file.
          </li>
          <li>
            Format the private key correctly in the{" "}
            <code className="bg-slate-300">.env</code> file.
          </li>
          <li>
            Run{" "}
            <code className=" bg-slate-300 p-1">
              cp firebase.ts.example firebase.ts
            </code>{" "}
            in your project root.
          </li>
        </ol>
      </div>

      {/* Sub-step 3 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Sub-step 3: Enable Firebase Admin
        </h2>
        <p>
          Uncomment the Firebase Admin initialization in the{" "}
          <code>firebase-admin.ts</code> file.
        </p>
        <p>
          Open <code className="bg-slate-300">firebase-admin.ts</code> then push{" "}
          <code className="bg-slate-300">ctrl + a</code> then{" "}
          <code className="bg-slate-300">ctrl + /</code>
          then <code className="bg-slate-300">ctrl + s</code>
        </p>
        <p>
          Uncomment the FirebaseAuthProvider component wrapper in the{" "}
          <code>layout.tsx</code> file.
        </p>
        <p>
          Open <code className="bg-slate-300">layout.tsx</code> then uncomment
          line 28 and 31.
        </p>
        <p>
          Turn this: <br />
          <code>{`{/* <FirebaseAuthProvider> */}`}</code> <br />
          <code className="ml-10">{`<Header />`}</code>
          <br />
          <code className="ml-10">{`{children}`}</code>
          <br />
          <code className="">{`{/* </FirebaseAuthProvider> */}`}</code>
        </p>
        <p>
          To this: <br />
          <code>{` <FirebaseAuthProvider> `}</code> <br />
          <code className="ml-10">{`<Header />`}</code>
          <br />
          <code className="ml-10">{`{children}`}</code>
          <br />
          <code className="">{` </FirebaseAuthProvider> `}</code>
        </p>
      </div>

      {/* Sub-step 4 */}
      <div className="bg-gray-200 p-4  mb-4">
        <h2 className="text-xl font-semibold mb-2">Sub-step 4: Test login</h2>
        <p>
          Save the changes and restart the development server to test the login
          functionality.
        </p>
      </div>

      {/* Additional information or links */}
      <p className="mt-4">
        For more details on setting up environment variables, refer to the{" "}
        <Link
          className="underline"
          href="https://nextjs.org/docs/basic-features/environment-variables"
        >
          Next.js Environment Variables documentation
        </Link>
        .
      </p>
    </div>
  );
};

export default page;
