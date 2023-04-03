import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { API_KEY, BASE_URL } from "../api/config";
import axios from "axios";
import Spinner from "../utils/spinner";
import { Pagelayout } from "../component";
import Mediacard from "../component/Mediacard";
import { Row, Col } from "react-bootstrap";
import useInfiniteScroll from "../hooks/useInfinteScroll";

export default function Genres() {
  const { id } = useParams();
  const [genreList, setGenreList] = useState([]);
  const [newGenreList, setNewGenreList] = useState([]); //add new list to the old list
  const [error, setError] = useState(null); 
  const {genres} = useFetchData('genre/movie/list')
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore)
  const [page, setPage] = useState(1) //to Scroll
  // eslint-disable-next-line eqeqeq
  const filterGenreTitle = genres.filter((genre) => genre.id == id)

function fetchMore(){
  setTimeout(() => {
      setPage(prev => prev + 1)
      setIsFetching(false)
  }, 5000)
}

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_video=false&page=${page}&with_genres=${id}`
        );
        const movielist = response.data.results;
        setGenreList(movielist);
        setNewGenreList([...newGenreList, ...genreList])
      } catch (error) {
        console.log(error)
        setError(error);
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);

  useEffect(() => {
    window.scrollTo({top: '0'})
  }, [id])

  if(!genreList) return <Spinner/>

  return <Pagelayout error={error} heading={`${filterGenreTitle.map((title) => title.name)} Movies`}>
       <Row className='gy-2'>
            {[...newGenreList, ...genreList].map((movie, index) => (
              <Col key={index} xs={6} md={3} xl={2}>
                <Mediacard {...movie} />
                </Col>
            ))}
        </Row>
        {isFetching && <Spinner/>}
  </Pagelayout>
}