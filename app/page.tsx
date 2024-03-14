import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">
        Kickstart Your Next.js Journey with OAuth and Firebase
      </h1>
      <p className="text-lg mb-4">
        Welcome to your Next.js app, pre-equipped with NextAuth.js and Firebase
        for seamless authentication. Follow the outlined steps to effortlessly
        set up your project. If you're new to any part of the process, dive into
        the detailed step-by-step guides by clicking on the respective steps
        card.
      </p>
      <div className="mb-5 mt-0 flex gap-2">
        <Link
          className=" px-4 py-2 text-black bg-white
            border-black border-2 hover:bg-slate-200"
          href="/step/1"
        >
          Get Started!
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link href="/step/1">
          <div className="bg-gray-200 p-4 hover:border-black border-2 cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">
              Step 1: Set up Google Cloud Account
            </h2>
            <p>
              Follow these steps to create a Google Cloud account and set up
              your project for this Next.js app:
            </p>
            <ol className="list-decimal pl-4 mt-2">
              <li>
                Create a Google Cloud account at{" "}
                <Link
                  className="underline"
                  href="https://console.cloud.google.com/"
                  target="blank"
                >
                  Google Cloud Console
                </Link>
                .
              </li>
              <li>Set up a new project for your Next.js app.</li>
              <li>
                Generate API keys and credentials for Firebase authentication.
              </li>
            </ol>
            <p className="mt-2">
              For detailed instructions, refer to the{" "}
              <Link
                className="underline"
                href="https://cloud.google.com/gcp/getting-started"
                target="blank"
              >
                Google Cloud Getting Started Guide
              </Link>
              .
            </p>
          </div>
        </Link>

        <Link href="/step/2">
          <div className="bg-gray-200 hover:border-black border-2 p-4 cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">
              Step 2: Set up Firebase Project
            </h2>
            <p>
              Now, let's set up a Firebase project to use as the backend for
              your Next.js app:
            </p>
            <ol className="list-decimal pl-4 mt-2">
              <li>
                Create a Firebase account at{" "}
                <Link
                  className="underline"
                  href="https://console.firebase.google.com/"
                  target="blank"
                >
                  Firebase Console
                </Link>
                .
              </li>
              <li>
                Add a new project and configure Firebase for web applications.
              </li>
              <li>
                Retrieve the Firebase config settings, including the apiKey,
                authDomain, projectId, and storageBucket.
              </li>
            </ol>
            <p className="mt-2">
              Refer to the{" "}
              <Link
                className="underline"
                href="https://firebase.google.com/docs/web/setup"
                target="blank"
              >
                Firebase Web Setup Guide
              </Link>{" "}
              for detailed instructions.
            </p>
          </div>
        </Link>

        <Link href="/step/3">
          <div className="bg-gray-200 hover:border-black border-2 p-4 cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">
              Step 3: Set up env files and firebase.ts
            </h2>
            <p>
              Configure environment files and create a <code>firebase.ts</code>{" "}
              file to manage Firebase settings:
            </p>
            <ol className="list-decimal pl-4 mt-2">
              <li>
                Create a <code>.env</code> file in your project root with <br />
                <pre className="bg-gray-300 p-2  mt-2">
                  cp .env.example .env
                </pre>{" "}
                <br />
              </li>
              <li>
                Create a <code>firebase.ts</code> file <br />
                <pre className="bg-gray-300 p-2  mt-2">
                  cp .firebase.ts.example .firebase.ts
                </pre>{" "}
                <br /> Replace the placholder values with your newly setup
                google cloud and firebase configs.
              </li>
            </ol>
            <p className="mt-2">
              View the{" "}
              <Link
                className="underline"
                href="https://nextjs.org/docs/basic-features/environment-variables"
                target="blank"
              >
                Next.js Environment Variables documentation
              </Link>{" "}
              for details on setting up environment variables.
            </p>
          </div>
        </Link>
        <Link href="/step/4">
          <div className="bg-gray-200 hover:border-black border-2 p-4 cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">
              Step 4: Customize and Develop Your App
            </h2>
            <p>
              Congratulations on completing the initial setup! Now it's time to
              customize the starter files and start developing your Next.js app.
            </p>
            <ol className="list-decimal pl-4 mt-2">
              <li>
                Feel free to tailor the <code>page.tsx</code> file in your app
                directory to match your project requirements.
              </li>
              <li>
                You have the flexibility to either remove or build upon the
                pre-made route folders. I've included <code>about</code>,{" "}
                <code>protected</code>, and <code>step</code> folders to
                kickstart your development.
              </li>
            </ol>
          </div>
        </Link>
        <Link href="/step/5">
          <div className="bg-gray-200 hover:border-black border-2 p-4 cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">
              Step 5: Deploy Your Next.js App to Vercel
            </h2>
            <p>
              You're almost there! Let's deploy your Next.js app to Vercel and
              make it live for the world to see.
            </p>
            <div className="mt-2">
              <p className="mb-2 font-semibold">Prerequisites:</p>
              <ul className="list-disc pl-4">
                <li>
                  Make sure you have a Vercel account. If not, you can sign up
                  at{" "}
                  <Link
                    className="underline"
                    href="https://vercel.com/"
                    target="blank"
                  >
                    Vercel
                  </Link>
                  .
                </li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="mb-2 font-semibold">Deployment Steps:</p>
              <ol className="list-decimal pl-4">
                <li>
                  Install the Vercel CLI by running:
                  <pre className="bg-gray-300 p-2  mt-2">
                    npm install -g vercel
                  </pre>
                </li>
                <li>
                  Deploy to production by running:{" "}
                  <pre className="bg-gray-300 p-2  mt-2">vercel --prod</pre>
                </li>
                <li>Import environment variables on vercel</li>
              </ol>
            </div>
            <p className="mt-2">
              Congratulations! Your Next.js app is now live on the internet.
              Share the provided URL with the world.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
