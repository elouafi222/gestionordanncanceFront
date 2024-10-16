import { ArrowBigLeft, ArrowBigLeftDash, ArrowBigRight } from "lucide-react";
import React from "react";

function Pagination({ pages, currentPage, setCurrentPage, count, perPage }) {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }
  return (
    <div className="flex justify-between items-center mt-4 bg-gray-100 p-3 rounded-lg">
      <span className="text-sm text-gray-700 italic">
        <span className="font-semibold text-slate-950">{count}</span>{" "}
        {count === 1 ? "résultat trouvé" : "résultats trouvés"}
      </span>
      <div className="mt-3  w-100 ">
        <ul className="pagination flex flex-row justify-center items-center">
          {currentPage !== 1 && (
            <li
              onClick={() => setCurrentPage((prev) => prev - 1)}
              aria-label="Précédent"
              className="mx-1 p-1 cursor-pointer  bg-gradient-to-r from-slate-950 to-slate-800 rounded-lg text-white flex justify-center items-center"
            >
              <ArrowBigLeft size={17} />
            </li>
          )}
          {generatedPages.map((page) => (
            <li
              onClick={() => setCurrentPage(page)}
              key={page}
              className={`cursor-pointer w-5 h-5 mx-1   p-3   rounded-lg text-white text-sm flex justify-center items-center ${
                currentPage === page
                  ? "bg-gradient-to-r from-green-600 to-green-500"
                  : "bg-gradient-to-r from-slate-950 to-slate-800"
              }`}
            >
              {page}
            </li>
          ))}
          {currentPage !== pages && (
            <li
              className="cursor-pointer mx-1 p-1 bg-gradient-to-r from-slate-950 to-slate-800 rounded-lg text-white  flex justify-center items-center"
              aria-label="Suivant"
              onClick={() => setCurrentPage((next) => next + 1)}
            >
              <ArrowBigRight size={16} />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
