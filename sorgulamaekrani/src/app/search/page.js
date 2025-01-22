"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setData(null);

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("API Hatası");

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Arama Hatası:", error);
      setData({ error: "Bir hata oluştu, lütfen tekrar deneyin." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-4 bg-white shadow-md rounded-md">
      <div className="flex items-center justify-center py-6">
        <div className="flex items-center w-full max-w-2xl bg-white rounded-md shadow-md">
          <div className="flex items-center pl-4 text-gray-500">
            <FiSearch size={20} />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Aramak İstediğiniz Kelimeyi Giriniz"
            className="flex-grow px-3 text-xs sm:text-base text-gray-700 outline-none"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center w-12 h-12 bg-[#09B3AD] rounded-md text-white hover:bg-[#29928f] transition-colors"
          >
            <FiSearch size={24} />
          </button>
        </div>
      </div>

      {loading && (
        <div className=" bg-white p-36 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-700"></div>
          <p className="text-gray-500 text-center mt-4 text-lg">
            Yükleniyor...
          </p>
        </div>
      )}
      {data && (
        <div className="mt-6">
          {/* Mesaj */}
          {data.criteria?.message && (
            <div className="bg-[#09b3ad42] p-4 rounded-md mb-4 shadow-sm">
              <p className="text-[#1a6e6c] font-semibold">
                {data.criteria.message}
              </p>
            </div>
          )}

          {/* Öneriler */}
          {data.criteria?.suggestions &&
            data.criteria.suggestions.length > 0 && (
              <div className="bg-[#F5F5F7] p-4 rounded-md shadow-sm mb-4">
                <p className="text-gray-800 font-bold mb-2">Öneriler:</p>
                <ul className="list-disc list-inside text-gray-700">
                  {data.criteria.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

          {/* Tablo */}
          {data.results && data.results.length > 0 && (
            <div className="overflow-x-auto rounded-md">
              <table className="table-auto w-full text-base">
                <thead>
                  <tr className="bg-[#09B3AD] text-white text-lg">
                    <th className="border border-gray-300 px-4 py-2">
                      Üniversite
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Fakülte
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Program Adı
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Şehir</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Üniversite Türü
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Burs Bilgisi
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Kontenjan
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Yerleşen
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Taban Puan
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Tavan Puan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.results.map((result) => (
                    <tr key={result.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">
                        {result.university_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {result.faculty}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {result.program_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {result.city}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {result.university_type}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {isNaN(result.scholarship_type)
                          ? result.scholarship_type
                          : `%${result.scholarship_type}`}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {result.quota_total}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {result.placed_count}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {typeof result.min_score === "number"
                          ? result.min_score.toFixed(5)
                          : "Belirtilmemiş"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {typeof result.max_score === "number"
                          ? result.max_score.toFixed(5)
                          : "Belirtilmemiş"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Hata Mesajı */}
          {data.error && (
            <div className="bg-red-100 p-4 rounded-md mt-4 shadow-sm">
              <p className="text-red-800">{data.error}</p>
              <p className="text-red-800">{data.details}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
