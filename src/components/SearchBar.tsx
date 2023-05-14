type Props = {
  inputText: string;
  setInputText: any;
};

function SearchBar({ inputText, setInputText }: Props) {
  return (
    <input
      type="text"
      placeholder="busca una serie"
      className="border border-black p-2 bg-zinc-300"
      value={inputText}
      onChange={(event) => setInputText(event.target.value)}
    />
  );
}

export default SearchBar;
