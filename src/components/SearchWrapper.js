import { useState, useEffect, useCallback } from "react";
import SearchResults from "./SearchResults";
import SearchInput from "./SearchInput";
import Collaborators from "./Collaborators";
import Spinner from "./Spinner";
import Pagebar from "./Pagebar";

const URI = "https://api.github.com";
const PERPAGE = 10;

export default function SearchWrapper() {
  const [collaborators, setCollaborators] = useState([]);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.currentTarget.title === "search") {
      input ? handleSubmit() : alert("Please enter search term to get results");
    }
  };

  const handleReset = () => {
    setData(null);
    setPage(1);
    setInput("");
  };

  const handleSubmit = () => {
    setPage(1);
    fetchData({ input: input });
  };

  const fetchData = useCallback(
    ({ input }) => {
      if (!input) return;
      setLoading(true);

      const queryTerm = `q=` + encodeURIComponent(input);
      const queryPerPage = `&per_page=${PERPAGE}`;
      const queryPage = `&page=${page || 1}`;
      const queryString = queryTerm + queryPerPage + queryPage;

      let url = `${URI}/search/repositories?${queryString}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData({
            totalCount: data.total_count,
            items: data.items,
          });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    },
    [page]
  );

  const handlePagination = (direction) => {
    let offset = page * (PERPAGE + 1);
    let results = data?.totalCount || 0;
    if (direction === "prev" && page >= 2) {
      setPage(page - 1);
    }
    if (direction === "next" && page > 0 && offset < results) {
      setPage(page + 1);
    }
  };

  const getContributors = (owner, repo) => {
    setLoading(true);

    let url = `${URI}/repos/${owner}/${repo}/contributors`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCollaborators(data);
        setLoading(false);
        setShowCollaborators(true);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchData({ input: input });
  }, [page, fetchData]);

  return (
    <>
      <SearchInput
        input={input}
        handleInput={handleInput}
        handleKeyPress={handleKeyPress}
        handleReset={handleReset}
        totalCount={data?.totalCount || 0}
      />
      <div>
        {loading ? (
          <Spinner />
        ) : showCollaborators ? (
          collaborators && (
            <Collaborators
              collaborators={collaborators}
              setShowCollaborators={setShowCollaborators}
            />
          )
        ) : (
          data && (
            <>
              <SearchResults
                fetchData={fetchData}
                data={data}
                getContributors={getContributors}
              />
              <Pagebar
                page={page}
                handlePagination={handlePagination}
              />
            </>
          )
        )}
      </div>

      {error && <div className="error-wrapper">Error!</div>}
    </>
  );
}
