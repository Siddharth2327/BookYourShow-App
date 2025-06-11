import { axiosInstance } from "./index.js";

// getting all movies 
export const GetAllMovies = async()=>{
    try{
        const response = axiosInstance.get("http://localhost:8000/api/movies/get-all-movies");
        // console.log(response.data)
        return response
    } catch(error){
        console.log("error while fetching movies ", error)
    }
}
