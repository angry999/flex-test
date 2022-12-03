export default function Pagebar({ totalCount, page, handlePagination }) {
  return (
    <div className="flex justify-center py-20">
      <div onClick={() => handlePagination("prev")} className="pointer">
        {"< Prev"}
      </div>
      <span className="mx-10">{page}</span>
      <div onClick={() => handlePagination("next")} className="pointer">
        {"Next >"}
      </div>
    </div>
  );
}
