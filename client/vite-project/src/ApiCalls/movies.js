import { axiosInstance } from "./index.js";

// getting all movies 
export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("http://localhost:8000/api/movies/get-all-movies");
        // console.log(response.data)
        return response
    } catch (error) {
        console.log("error while fetching movies ", error)
    }
}

// add new movie
export const AddNewMovie = async (values) => {
    try {
        const response = await axiosInstance.post("http://localhost:8000/api/movies/add-movie", values);
        // console.log(response)
        return response
    } catch (err) {
        console.log("Error while adding new movie ", err.message)
    }
}

// delete a movie
export const DeleteMovie = async (id) => {
    try {
        const response = await axiosInstance.delete(`http://localhost:8000/api/movies/delete-movie/${id}`);
        console.log("Movie deleted successfully")
        return response
    } catch (err) {
        console.log("Error while deleting the movie")
    }
}


// edit a movie 
export const UpdateMovie = async (values) => {
    try {
        const response = await axiosInstance.put("http://localhost:8000/api/movies/update-movie", values);
        console.log("Movie Updated successfully");
        return response;
    } catch (err) {
        console.log("Error while updating the movie ", err.message)
    }
}

// get single movie
export const getMovieById = async (id) => {
    try{
        const response = await axiosInstance.get(`http://localhost:8000/api/movies/movie/${id}`)
        return response.data;
    }catch(err){
        return err.response
    }
}