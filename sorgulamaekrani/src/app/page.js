import React from "react";
import Search from "./search/page";
import Image from "next/image";

export default function Page() {
  return (
    <div className="p-4 max-w-screen-2xl min-h-screen bg-white mx-auto">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={"/logo.svg"}
          alt="Üsküdar Üniversitesi"
          width={350}
          height={200}
          className="object-cover rounded-md"
        />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
      2024 Yükseköğretim Programları ve Yerleştirme Verileri
      </h1>
      <div></div>
      <Search />
    </div>
  );
}
