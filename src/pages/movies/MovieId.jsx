import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import Spinner from "../../utils/spinner";
import { BASE_URL, API_KEY } from "../../api/config";
import { PagelayoutId } from "../../component";
import { AiFillStar } from "react-icons/ai";
import useScroll from "../../hooks/useScroll";
import { ScrollButtons } from "../../component";
import { Videobox,Mediacard } from "../../component";
import {Imagebox} from "../../component";
import { Link } from "react-router-dom";

export default function MovieId() {
  const { movie_id } = useParams();
  const [dataId, setDataId] = useState(null);
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPicModal, setShowPicModal] = useState(false);
  const [index, setIndex] = useState(1);
  const { scrollRef, scroll, scrollRefB, scrollB,scrollRefC,scrollC } = useScroll();

  useEffect(() => {
    async function fetchData() {
      // setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&append_to_response=credits,recommendations,images,videos&include_video_language=en`
        );
        setDataId(response.data);
        setDataId(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        // setLoading(false);
      }
    }
    fetchData();
  }, [movie_id]);

  useEffect(()=>{
    if (showModal || showPicModal){
      document.body.style.overflow ='hidden'
    }else{
      document.body.style.overflow = 'unset'
    }
  }, [showModal, showPicModal])

  useEffect(()=>{
    document.title=dataId?.title
  window.scrollTo({top:'0'})},[dataId?.title,movie_id])
  console.log(dataId);
  if (!dataId) return <Spinner />;

  const {
    videos: { results },
    images: { backdrops },
    credits: { cast, crew },
    genres,
    overview,
    tagline,
    vote_average,
    runtime,
    release_date,
    title,
    poster_path,
    backdrop_path,
    recommendations: { results: resultsB },
  } = dataId;

  return (
    <PagelayoutId
      src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
      alt={title}
      error={error}
    >
      <div className="d-md-flex gap-4">
        <div className="text-center text-md-start mb-4">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            className="rounded-2 media_poster"
            alt={title}
            title={title}
          />
        </div>
        <div>
          <h1 className="fs-4 text-white">{title}</h1>
          <p className="text-secondary fw-bold">
            {release_date.slice(0, 10)} - {runtime} minutes
          </p>
          <div className="d-flex gap-2">
            <AiFillStar color="orange" size="1.5rem" />
            <p className="text-white">{`${vote_average.toFixed(2)} / 10`}</p>
          </div>
          <div className="text-white ">
            <h1 className="fs-5">Overview</h1>
            <p>{tagline}</p>
            <p>
              {overview.split("\n\n").map((paragraph, index) => (
                <p key={index}>
                  {paragraph
                    .split("\n")
                    .reduce((total, line) => [total, <br />, line])}
                </p>
              ))}
            </p>
            <h1 className="text-secondary fs-5">Screenplay</h1>
            <p>
              {crew[0].job} - {crew[0].name}
            </p>
            <h1 className="fs-5">Genres</h1>
            <div className="d-flex flex-wrap  gap-2">
              {genres.map((genre) => (
                <p
                  key={genre.id}
                  className="small rounded-3 p-2 text-dark fw-bold"
                  style={{ backgroundColor: "orange" }}
                >
                  {genre.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 ">
        <h1 className="text-white fs-5 mt-3 mb-3">Videos</h1>
        {results.length > 0 ? (
          <div style={{ position: "relative" }}>
            <div
              className="d-flex scrollbody"
              style={{
                overflowX: "scroll",
                overflowY: `hidden`,
                width: "100%",
              }}
              ref={scrollRef}
            >
              {results.map((video, index) => (
                <div
                  key={index}
                  className="d-flex flex-column justify-content-between text-white me-3"
                >
                  <div
                    className="p-1 rounded-3 text-center shadow trailerVid"
                    onClick={() => {
                      setShowModal(true);
                      setIndex(index);
                    }}
                  >
                    <p className="text-white small fw-bold mt-1 mb-0">
                      {video.name.slice(0, 30)}
                    </p>
                    <p className="small text-secondary">{video.type}</p>
                  </div>
                </div>
              ))}
            </div>
            {results.length > 5 ? <ScrollButtons scroll={scroll} /> : null}
            {showModal && (
              <Videobox
                setShowModal={setShowModal}
                results={results}
                index={index}
                setIndex={setIndex}
              />
            )}
          </div>
        ) : (
          <h1 className="text-secondary fs-6 mt-3 mb-3">
            No videos for {title} at the moment
          </h1>
        )}
      </div>
      <div>
        <h1 className="text-white fs-5 mt-3 mb-3">Images</h1>
        {backdrops.length > 0 ? (
          <div style={{ position: `relative` }}>
            <div
              className="d-flex scrollbody"
              style={{
                overflowX: "scroll",
                overflowY: "hidden",
                width: "100%",
              }}
              ref={scrollRefB}
            >
              {backdrops.slice(0, 25).map((image, index) => (
                <div key={index} className="me-3">
                    onClick={()=>{
                        setShowPicModal(true)
                        setIndex(index)
                    }}
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    className="rounded-3"
                    style={{
                      width: "270px",
                      height: "180px",
                      cursor: "pointer",
                      objectFit: "fill",
                    }}
                    alt="..."
                  />
                </div>
              ))}
            </div>
            {backdrops.length > 8 && <ScrollButtons scroll={scrollB} />}
            {showModal && (
              <Imagebox
                setShowPicModal={setShowPicModal}
                index={index}
                setIndex={setIndex}
                backdrops={backdrops}
              />
            )}
          </div>
        ) : (
          <h1 className="text-secondary fs-6 mt-3 mb-3">No Image for {title} at the moment(" ")</h1>
        )}
      </div>
      <div className="mt-4">
        <h1 className='text-white fs-5 mt-3 mb-3'>Cast</h1>
        <div style={{ position: "relative" }}>
        <div
              className="d-flex scrollbody"
              style={{
                overflowX: "scroll",
                overflowY: `hidden`,
                width: "100%",
              }}
              ref={scrollRefC}
            >
              {cast.slice(0,25).map((ca)=>(
                <div className='me-3 text-white text-center key ={ca.id}'>
                  <Link to ={'/person/$(ca.id}'}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${ca.profile_path}`}
                    className='rounded-circle'
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'fill',
                    }}
                    alt={ca.name}
                    title={ca.name}
                  />
                  </Link>
                  <Link to ={`/person/${ca.id}`}>
                    <p className='small mt-3 mb-1 text-white'>{ca.name}</p>
                  </Link>
                  <p className='small text-secondary'>{ca.character}</p>
                </div>
              ))}
              </div>
              {cast.length > 8 && <ScrollButtons scroll={scrollC}/>}
            </div>
            </div>
            <div clasName='mt-4'>
              <h1 className='text-white fs-5 mt-3 mb-3'>Recommendation</h1>
              {resultsB.length>0 ? (
                <Row className='gy-2'>
                  {resultsB.map((movie)=>(
                    <Col xs={6} md={3} xl={2} key ={movie.id}>
                      <Mediacard {...movie}/>
                    </Col>
                  ))}
                </Row>
              ):(<h1 className='text-secondary fs-6 mt-3 mb-3'> No recommendations for {title}</h1>)}
            </div>
    </PagelayoutId>
  );
}
