import React from "react";
import Spinner from "../../utils/spinner";
import useFetchData from "../../hooks/useFetchData";
import { Row, Col } from "react-bootstrap";
import { Pagelayout, Personcard } from "../../component";
import useInfiniteScroll from "../../hooks/useInfinteScroll";

export default function Person() {
  const { error, data,setPage,newData } = useFetchData("person/popular");
  const [isFetching, SetisFetching] = useInfiniteScroll(fetchMore);


  function fetchMore() {
    setTimeout(() => {
      setPage((prev) => prev + 1);
      SetisFetching(false);
    }, 5000);
  }
  if (!data) return <Spinner />;
  return (
    <Pagelayout heading="Trending People" error={error}>
      <Row className="gy-2">
        {[...newData,...data].map((person) => (
          <Col xs={6} md={3} xl={2} key={person.id}>
            <Personcard {...person} />
          </Col>
        ))}
      </Row>
      {isFetching &&<Spinner/>}
    </Pagelayout>
  );
}