import Image from "next/image";

export default function Home() {
  console.log(process.env.GOOGLE_CLIENT_ID)
  console.log(process.env.GOOGLE_CLIENT_SECRET)
  return (
    <main className="bg-red-600 text-9xl text-yellow-600">
      hi there
    </main>
  );
}
