export default function SearchResults({
  filteredResults,
  data,
  getContributors,
}) {
  return (
    <div>
      {(filteredResults ? filteredResults?.items : data?.items || []).map(
        (r) => {
          return (
            <div key={r.id} className="repo-item">
              <h2
                className="pointer underline"
                onClick={() => getContributors(r.owner.login, r.name)}
              >
                {r.full_name}
              </h2>
              {r.description && <p>{r.description}</p>}
              <div>
                <div>
                  <p>Stars: {r.stargazers_count || 0}</p>
                </div>
                <div>
                  <p>Folks: {r.forks_count || 0}</p>
                </div>
                {r.language && <p>{r.language || ""}</p>}
                <p>{`Updated ${new Date(r.updated_at).toDateString()}`}</p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
