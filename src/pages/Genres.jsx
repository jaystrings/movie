import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import axios from "axios";
import { API_KEY, BASE_URL } from "../api/config";
import { Spinner,Row,Col} from "react-bootstrap";
import { Pagelayout } from "../component";
import {Mediacard } from "../component";
import useInfiniteScroll from "../hooks/useInfinteScroll";



export default function Genres() {
  const { id } = useParams();
  const [genreList, setGenreList] = useState([]);
  const [newGenreList, setNewGenreList] = useState([]);
  const [page,setPage]=useState(1);
  const [error, setError] = useState(null);

  const { genres } = useFetchData("genre/movie/list");

  const filterGenreTitle = genres.filter((genre) => genre.id === id);
  const [isFetching, SetisFetching] = useInfiniteScroll(fetchMore)

  function fetchMore() {
    setTimeout(() => {
      setPage((prev) => prev + 1);
      SetisFetching(false);
    }, 5000);
  }


  useEffect(() => {
    async function fetchData() {
      
      try {
        const response =
          await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_video=false&page=${page}&with_genres=${id}`);
        const movieList = response.data.results;
        setGenreList(movieList);
        setNewGenreList([...newGenreList,...genreList]);
      } catch (error) {
        console.log(error);
        setError(error);
      } 
    }
    fetchData();
  }, [id,page]);
  const filterGenreTitile = genres.filter((genre)=>genre.id === id)
  useEffect(()=>{
    window.scrollTo({top:'0'})
  },[id])
 
  if (!genreList) return <Spinner />;

  return (
    <Pagelayout
      error={error}
      heading={`${filterGenreTitle.map((title) => title.name)}Movies`}
   >
  
        <Row className="gy-2">
        {[...newGenreList,...genreList].map((movie) => (
          <Col xs={6} md={3} xl={2} key={movie.id}>
          <Mediacard {...movie}  />
          </Col>
        ))}
    </Row>
    {isFetching && <Spinner/>}
    </Pagelayout>
  );
}