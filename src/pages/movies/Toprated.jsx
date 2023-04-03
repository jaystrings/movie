import React from 'react'
import Spinner from '../../utils/spinner'
import { Pagelayout } from '../../component'
import {Mediacard} from '../../component'
import useFetchData from '../../hooks/useFetchData'
import { Row, Col } from 'react-bootstrap'
import useInfiniteScroll from '../../hooks/useInfinteScroll'

export default function Toprated() {
const {setPage,newData, error, data} = useFetchData('movie/top_rated')
const [isFetching, SetisFetching] = useInfiniteScroll(fetchMore);


  function fetchMore() {
    setTimeout(() => {
      setPage((prev) => prev + 1);
      SetisFetching(false);
    }, 5000);
  }
if(!data) return <Spinner/>

  return (
   <Pagelayout heading='Top Rated' error={error}>
         <Row className='gy-2'>
            {[...newData,...data].map((movie) => (
              <Col key={movie.id} xs={6} md={3} xl={2}>
                <Mediacard {...movie} />
                </Col>
            ))}
        </Row>
        {isFetching && <Spinner/>}
   </Pagelayout>
  )
}