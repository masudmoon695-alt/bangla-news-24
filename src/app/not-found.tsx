import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4 text-center">
      <h1 className="text-8xl md:text-9xl font-extrabold text-red-700 drop-shadow-sm">
        404
      </h1>

      <div className="w-24 h-1 bg-red-600 rounded-full my-4" />

      <h2 className="text-2xl md:text-3xl font-semibold text-red-900">
        পেজটি খুঁজে পাওয়া যায়নি
      </h2>
      <p className="mt-2 max-w-md text-red-800/80">
        আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে অথবা এর ঠিকানা ভুল।
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-red-700 px-6 py-3 font-medium text-white shadow-md transition hover:bg-red-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFound;