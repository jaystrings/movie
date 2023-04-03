import { useState, useEffect } from "react";
const useInfiniteScroll = (callback) => {
  const [isFetching, SetisFetching] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching) return callback();
  }, [isFetching,callback]);
  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight
    )
      return;
    SetisFetching(true);
  }
  return [isFetching, SetisFetching];
};
export default useInfiniteScroll;