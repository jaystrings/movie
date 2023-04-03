import React, { useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
import { Row, Col } from "react-bootstrap";
import Spinner from "../utils/spinner";
import useInfiniteScroll from "../hooks/useInfinteScroll";
import { Mediacard, Pagelayout } from "../component";
export default function Home() {
  const { error, data, setPage,newData} = useFetchData("trending/movie/week");
  const [isFetching, SetisFetching] = useInfiniteScroll(fetchMore);


  function fetchMore() {
    setTimeout(() => {
      setPage((prev) => prev + 1);
      SetisFetching(false);
    }, 5000);
  }
  console.log(data, "data");

  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <Pagelayout heading={"Trending Movies"} error={error}>
      <Row className="gy-2">
        {[...newData,...data].map((movie) => (
          <Col xs={6} md={3} xl={2} key={movie.id}>
            <Mediacard {...movie} key={movie.id} />
          </Col>
        ))}
      </Row>
      {isFetching &&<Spinner/>}
    </Pagelayout>
  );
}