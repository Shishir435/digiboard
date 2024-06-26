import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="text-green-500">
      Hello Digiboard
    </div>
  );
}
