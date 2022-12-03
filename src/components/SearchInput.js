export default function SearchInput({
  input,
  handleInput,
  handleKeyPress,
  handleReset,
  totalCount,
}) {
  return (
    <div className="flex bg-black px-20 py-20">
      <input
        type="text"
        value={input}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
        className="input-search"
      />
      <button
        className="pointer btn btn-search"
        title={"search"}
        onClick={handleKeyPress}
      >
        Search
      </button>
      <button
        className="pointer btn btn-search"
        title={"search"}
        onClick={handleReset}
      >
        Reset
      </button>
      {totalCount && <label className="label-total">Total repos: {totalCount}</label>}
    </div>
  );
}
