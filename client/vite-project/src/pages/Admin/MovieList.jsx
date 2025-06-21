import { useEffect, useState } from 'react'
import { Modal, message, Button, Space, Table } from 'antd'
import { AddNewMovie, DeleteMovie, GetAllMovies, UpdateMovie } from '../../ApiCalls/movies';
import MovieForm from './MovieForm';
import EditMovieForm from './EditMovieForm';
import dayjs from 'dayjs';


function MovieList() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getMovies();
    }, []);
    const getMovies = async () => {
            try {
                const response = await GetAllMovies();
                setMovies(response.data.data);
            } catch (err) {
                console.error("Error while fetching movies:", err);
            }
        };


    // handling edit form
    const [isEditModalOpen, setIsEditModal] = useState(false)
    const [selectedMovie, isSelectedMovie] = useState(null)
    const handleEdit = (record) => {    // gets the entire movie object
        // console.log("Edit clicked for ", record)
        isSelectedMovie(record);
        setIsEditModal(true);
    }
    const handleEditFormSubmit = async (updatedMovie)=>{
        try{
            // console.log("Updated movie data ", updatedMovie)
            const response = await UpdateMovie(updatedMovie);
            setIsEditModal(false);
            message.success("Movie updated");
            getMovies();
        } catch(err){
            message.error("error while adding movie")
            console.log(err)
        }
        
    }

    // handle delete
    const handleDelete = async (id) => {    // gets the movie_id alone which is enough to delete the movie
        try{
            const response = await DeleteMovie(id);
            console.log("Movie deleted")
            getMovies();
        } catch(err){
            console.log("Error while deleting the movie", err)   
        }
    }

    // handling add new movie form 
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => (
        setIsModalOpen(true)
    )
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const handleFormSubmit = async (formData) => {
        try {
            const response = await AddNewMovie(formData);
            message.success("Movie added successfully!");
            setIsModalOpen(false);
            getMovies()
        } catch (error) {
            message.error("Failed to add movie.");
            console.error(error);
        }
    };


    const columns = [
        {
            title: "Poster",
            dataIndex: "poster", // dataindex is the key name from which we have to get the data from the array
            key: "poster",
            render: (poster) => (
                <img
                    src={poster}
                    alt="Poster"
                    style={{ width: "80px", height: "auto", borderRadius: "8px" }}
                />
            ),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (title) => (
                <span
                    style={{ fontSize: "1rem", fontWeight: "bold" }}
                >
                    {title}
                </span>
            )
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
        },
        {
            title: "Duration (min)",
            dataIndex: "duration",
            key: "duration",
        },
        {
            title: "Genre",
            dataIndex: "genre",
            key: "genre",
        },
        {
            title: "Language",
            dataIndex: "language",
            key: "language",
        },
        {
            title:"Release-Date",
            dataIndex:"releaseDate",
            key:"releaseDate",
            render:(date)=> dayjs(date).format("DD-MM-YYYY")
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => ( // record is the keyword for the movie data of that particular row 
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}>Edit</a>
                    <a
                        style={{ color: "red" }}
                        onClick={() => handleDelete(record._id)}>Delete</a>
                </Space>
            ),
        },
    ]

    return (
        <>
            <div style={{ display: "flex", justifyContent: "Center", margin: '20px 0' }}>
                <Button type="primary" onClick={showModal}>
                    Add new Movie
                </Button>
            </div>
            <Modal
                title="Add Movie Details"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel} // Even thoigh the button is removed we should have this to cancel at the X mark at the top and while clicking outside the form 
                footer={null} // removes the ok and cancel button
            >
                <MovieForm onFinish={handleFormSubmit} />
            </Modal>

            {/* edit modal form */}
            <Modal
                title="Edit Movie"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isEditModalOpen}
                onOk={()=>(setIsEditModal(false))}
                onCancel={()=>(setIsEditModal(false))} 
                footer={null} // since i gave footer is null the ok and cancel button goes off
            >
                <EditMovieForm onFinish={handleEditFormSubmit} movieData={selectedMovie}/>
            </Modal>
            <Table columns={columns} dataSource={movies} rowKey="_id" />
        </>
    )
}

export default MovieList
