import { useEffect, useState } from 'react'
import { Modal, message, Button, Space, Table } from 'antd'
import TheatreForm from './TheatreForm';
import { AddNewTheatre, UpdateTheatre } from '../../ApiCalls/theatres';
import { useSelector } from 'react-redux';
import { GetTheatresByOwner } from '../../ApiCalls/theatres';
import { DeleteTheatre } from '../../ApiCalls/theatres';
import ShowModalForm from './ShowModalForm';


function OwnedTheatre() {
    const {user} = useSelector ((state)=> state.user);
    const [Alltheatres, setAllTheatres] = useState();
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [isFormModalOpen, setFormModal] = useState(false);
    const [TheatreFormState, setTheatreFormState] = useState("add");
    const [isShowModalOpen, setShowModalOpen] = useState(false)

    const GetTheatres = async ()=>{
        const response = await GetTheatresByOwner(user._id);
        console.log(response.data.data);
        if(response?.data?.success){
            setAllTheatres(response.data.data);
        }
        else{
            alert("Error while fetch your theatre details, Try Again!")
        }
    }
    useEffect(()=>{
        if(user._id) GetTheatres();
    },[user._id])
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (name) => (
                <span
                    style={{ fontSize: "1rem", fontWeight: "bold" }}
                >
                    {name}
                </span>
            )
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status, data)=>(
                <span
                style={{color:data.isActive ? '#52c41a' : '#ff4d4f',
                fontWeight:'bold'}}>
                {data.isActive ? 'Approved' : 'Blocked/Pending'}
                </span>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, data) => ( // data is the keyword for the movie data of that particular row 
                <div style={{display:"flex", flexDirection:"column", gap:"6px"}}>
                    <a onClick={() => handleEdit(data)}>Edit</a>
                    <a
                        style={{ color: "red" }}
                        onClick={() => handleDelete(data._id)}>Delete
                    
                    </a>
                    {data.isActive && <Button onClick={()=>{setShowModalOpen(true); setSelectedTheatre(data)}}>+ Shows</Button>}    
                </div>
            ),
        },
    ]

    // Add new theatre
    const handleAddTheatre = () => {
        setFormModal(true);
        setTheatreFormState("add");
    }
    const onAdd = async (values) => {
        setFormModal(false);
        // Api call for adding theatre
        try {
            const response = await AddNewTheatre({...values, owner:user._id});
            alert("New Theatre added");
            console.log("New Theatre Details", response.data.data)
        } catch (err) {
            alert("Error while adding theatre")
            console.log("Error while adding theatre", err)
        } finally{
            GetTheatres()
        }
    }

    // delete a theatre
    const handleDelete = async (theatreId) => {
        // APi call for theatre delete
        try {
            const response = await DeleteTheatre(theatreId);
            alert("Theatre Deleted successfully");
        } catch (err) {
            alert("Error while deleting theatre")
            console.log("Error while deleting theatre", err)
        } finally{
            GetTheatres()
        }
    }

    // edit a theatre
    const handleEdit = (theatre) => {
        setSelectedTheatre(theatre);
        setTheatreFormState("edit");
        setFormModal(true);
    }
    const onEdit = async (values) => {
        setFormModal(false)
        // Upadte Theatre API call
        try {
            const response = await UpdateTheatre(values);
            alert("Theatre Updated successfully");
            console.log("Updated Theatre Details", response.data.data)
        } catch (err) {
            alert("Error while updating theatre")
            console.log("Error while updating theatre", err)
        } finally{
            GetTheatres()
        }
        
    }
    
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <Button type='primary' onClick={handleAddTheatre}>
                    Add Theatre
                </Button>
            </div>
            <Modal
                title="Add Theatre Details"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isFormModalOpen}
                onOk={() => { }} // empty fn bcz the footer is disabled anyway
                onCancel={() => setFormModal(false)} // Even though the button is removed we should have this to cancel at the X mark at the top and while clicking outside the form 
                footer={null} // removes the ok and cancel button
            >
                <TheatreForm onAdd={onAdd} onEdit={onEdit} formState={TheatreFormState} selectedTheatre={selectedTheatre} />
            </Modal>
            {isShowModalOpen && <ShowModalForm isShowModalOpen = {isShowModalOpen} setShowModalOpen = {setShowModalOpen } selectedTheatre = {selectedTheatre}/>}
            <Table columns={columns} dataSource={Alltheatres} rowKey="_id" />
        </>
    )
}

export default OwnedTheatre
