import { useEffect, useState } from "react";
import { GetAllMovies } from "../ApiCalls/movies";
import { Card, Input, Pagination, Skeleton, message } from "antd";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

const { Meta } = Card;
const { Search } = Input;

const ITEMS_PER_PAGE = 8;

const Home = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await GetAllMovies();
        if (response?.data?.data) {
          setAllMovies(response.data.data);
          setFilteredMovies(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch movies. Please try again.");
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = filteredMovies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="home-container">
      <ToastContainer />
      <div className="home-title">
        <span>Movies</span>
      </div>

      {/* Search Input */}
      <div className="search-container">
        <Search
          placeholder="Search movies by title..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <Skeleton
              key={index}
              active
              avatar
              paragraph={{ rows: 2 }}
              className="movie-skeleton"
            />
          ))}
        </div>
      ) : (
        <>
          {/* Movies Grid */}
          <div className="movies-grid">
            {paginatedMovies.map((movieObj, index) => (
              <motion.div
                key={movieObj.id || index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  hoverable
                  className="movie-card"
                  cover={
                    <img
                      alt={`${movieObj.title} Poster`}
                      src={movieObj.poster}
                      className="movie-poster"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/280x400?text=No+Image";
                      }}
                    />
                  }
                >
                  <Meta title={movieObj.title} />
                  {movieObj.description && (
                    <div className="movie-description">
                      {movieObj.description}
                    </div>
                  )}
                  <div className="movie-meta">
                    {movieObj.rating && (
                      <span className="movie-rating">⭐ {movieObj.rating}</span>
                    )}
                    {movieObj.genre && (
                      <span className="movie-genre">{movieObj.genre}</span>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {filteredMovies.length > ITEMS_PER_PAGE && (
            <div className="pagination-container">
              <Pagination
                current={currentPage}
                pageSize={ITEMS_PER_PAGE}
                total={filteredMovies.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          )}

          {/* No results found */}
          {filteredMovies.length === 0 && !loading && (
            <div className="no-results">No movies found.</div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
