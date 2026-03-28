import { Button } from "@/components/ui/button"
import { useSearchParams } from "react-router-dom"

export default function Pagination({ totalPages }) {

  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const changePage = (page) => {
  const currentQuery = searchParams.get("q") || ""
  setSearchParams({ q: currentQuery, page })
  window.scrollTo({ top: 0, behavior: "smooth" })
}

  const pages = []

  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)

  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push("...")
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("...")
    pages.push(totalPages)
  }

  return (
    <div className="flex gap-2 justify-center mt-8">

      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        Prev
      </Button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-2">...</span>
        ) : (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => changePage(page)}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        Next
      </Button>

    </div>
  )
}