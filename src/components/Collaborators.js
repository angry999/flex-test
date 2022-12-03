export default function Collaborators({ collaborators, setShowCollaborators }) {
  return (
    <>
      <div className="collaborators-wrapper">
        <button
          onClick={() => setShowCollaborators(false)}
          className="btn-close"
        >
          Close
        </button>
        {(collaborators || []).map((c) => {
          return (
            <div key={c.id} className="repo-item">
              <img src={c.avatar_url} alt={c.type} />
              <h2>
                {c.login} ({c.type})
              </h2>
              <div>
                <div>
                  <p>Contributions: {c.contributions || 0}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
