import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { debounce } from "radash";
import SearchBar from "./components/SearchBar";

type Phrase = {
  anime: string;
  quote: string;
  character: string;
};

function App() {
  const [inputText, setInputText] = useState("naruto");
  const [anime, setAnime] = useState("dragon ball");

  useEffect(() => {
    const debounced = debounce({ delay: 1000 }, () => setAnime(inputText));
    debounced();
    return () => debounced.cancel();
  }, [inputText]);

  useEffect(() => {
    console.log(anime);
  }, [anime]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["quote-search", anime],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://animechan.vercel.app/api/quotes/anime?title=${anime}`
      );
      return data as Phrase[];
    },
    staleTime: 10000,
  });

  if (isLoading)
    return (
      <div className="p-4">
        <SearchBar inputText={inputText} setInputText={setInputText} />
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-4">
        <SearchBar inputText={inputText} setInputText={setInputText} />
        <p>Error</p>
      </div>
    );

  return (
    <div className="p-4">
      <SearchBar inputText={inputText} setInputText={setInputText} />
      <div className="space-y-4 my-4">
        {data?.map((phrase) => (
          <p className="p-2 bg-gray-200">
            <strong>{phrase.character}:</strong> {phrase.quote}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
