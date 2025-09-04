import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../ApiCalls/movies";
import { message, Input, Divider, Row, Col } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import { getAllTheatresByMovie } from "../apiCalls/shows";
import "./singleMovie.css";

const SingleMovie = () => {
  const params = useParams();
  const [movie, setMovie] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [theatres, setTheatres] = useState([]);
  const navigate = useNavigate();

  const handleDate = (e) => {
    setDate(moment(e.target.value).format("YYYY-MM-DD"));
    navigate(`/movie/${params.id}?date=${e.target.value}`);
  };

  const getData = async () => {
    try {
      const response = await getMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getAllTheatres = async () => {
    try {
      const response = await getAllTheatresByMovie({ movie: params.id, date });
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getAllTheatres();
  }, [date]);

  return (
    <div className="single-movie-container">
      {movie && (
        <Row gutter={32} className="single-movie-row">
          <Col xs={24} md={8} className="single-movie-image-col">
            <img src={movie.poster} alt="Movie Poster" className="single-movie-img" />
          </Col>
          <Col xs={24} md={16} className="single-movie-detail-col">
            <h1>{movie.title}</h1>
            <p>
              <strong>Language:</strong> {movie.language}
            </p>
            <p>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
              <strong>Release Date:</strong> {moment(movie.date).format("MMM Do YYYY")}
            </p>
            <p>
              <strong>Duration:</strong> {movie.duration} Minutes
            </p>
            <Divider />
            <Row align="middle" className="single-movie-date-row">
              <Col>
                <label>
                  <strong>Choose the date:</strong>
                </label>
              </Col>
              <Col>
                <Input
                  onChange={handleDate}
                  type="date"
                  value={date}
                  prefix={<CalendarOutlined />}
                  className="single-movie-date-input"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {theatres.length === 0 && (
        <div className="single-movie-no-theatres">
          <h2>Currently, no theatres available for this movie!</h2>
        </div>
      )}
      {theatres.length > 0 && (
        <div className="single-movie-theatres-list">
          <h2>Theatres</h2>
          {theatres.map((theatre) => (
            <div key={theatre._id} className="single-movie-theatre-item">
              <Row gutter={24}>
                <Col xs={24} lg={8}>
                  <h3>{theatre.name}</h3>
                  <p>{theatre.address}</p>
                </Col>
                <Col xs={24} lg={16}>
                  <ul className="single-movie-show-ul">
                    {theatre.shows
                      .sort((a, b) =>
                        moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                      )
                      .map((singleShow) => (
                        <li
                          key={singleShow._id}
                          className="single-movie-show-li"
                          onClick={() => navigate(`/book-show/${singleShow._id}`)}
                        >
                          {moment(singleShow.time, "HH:mm").format("hh:mm A")}
                        </li>
                      ))}
                  </ul>
                </Col>
              </Row>
              <Divider />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleMovie;
