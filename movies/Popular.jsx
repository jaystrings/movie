import React from "react";
import { Mediacard, Pagelayout } from "../../component";
import useFetchData from "../../hooks/useFetchData";

import { Row,Col } from "react-bootstrap";

import Spinner from "../../utils/spinner";
import useInfiniteScroll from "../../hooks/useInfinteScroll";

export default function Popular() {
  const { error, data,newData,setPage } = useFetchData("movie/popular");
  const [isFetching, SetisFetching] = useInfiniteScroll(fetchMore);


  function fetchMore() {
    setTimeout(() => {
      setPage((prev) => prev + 1);
      SetisFetching(false);
    }, 5000);
  }
  if (!data) return <Spinner />;
  return (
    <Pagelayout heading="Popular" error={error}>
    <Row className="gy-2">
      
      {[...newData,...data].map((movie) => (
         <Col xs={6} md={3} xl={2} key={movie.id}>
        <Mediacard {...movie} />
        </Col>
      ))}
    </Row>
    {isFetching &&<Spinner/>}
    </Pagelayout>
  );
}