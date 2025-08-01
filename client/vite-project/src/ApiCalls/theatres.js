import { axiosInstance } from "./index.js";


// add new theatre
export const AddNewTheatre = async (values) => {
    try {
        const response = await axiosInstance.post("http://localhost:8000/api/theatres/add-theatre", values);
        // console.log(response)
        return response
    } catch (err) {
        console.log("Error while adding new theatre ", err.message)
    }
}
// get theatres by specific owner
 export const GetTheatresByOwner = async(id)=>{
    try{
        const response = await axiosInstance.post("http://localhost:8000/api/theatres/get-all-theatres-by-owner", {owner : id});
        console.log("User owned Theatres",response.data);
        return response;
    } catch(err){
        console.log("error while retrieving the specific owner's theatres", err.response?.data || err.message)
        return err.message
    }
 }

 // get all theatres for admin
 export const GetAllTheatresForAdmin = async()=>{
    try{
        const response = await axiosInstance.get("http://localhost:8000/api/theatres/get-all-theatres");
        return response.data;
    }catch(err){
        return err.message;
    }
 }


// delete a Theatre
export const DeleteTheatre = async (id) => {
    try {
        const response = await axiosInstance.delete(`http://localhost:8000/api/theatres/delete-theatre/${id}`);
        console.log("Theatre deleted successfully")
        return response
    } catch (err) {
        console.log("Error while deleting the Theatre")
    }
}

// Updating a Theatre
export const UpdateTheatre = async (values) => {
    try {
        const response = await axiosInstance.put("http://localhost:8000/api/theatres/update-theatre", values);
        console.log("Theatre Updated successfully");
        return response; // This will contain response.data with success, message, data
    } catch (err) {
        console.error("Error while updating the Theatre:", err);
        // Return error response structure for consistent handling
        return {
            data: {
                success: false,
                message: err.response?.data?.message || err.message || "Update failed"
            }
        };
    }
}