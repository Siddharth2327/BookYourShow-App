import { useEffect, useState } from 'react'
import { GetAllTheatresForAdmin } from '../../ApiCalls/theatres';
import { UpdateTheatre } from '../../ApiCalls/theatres'

function TheatreList() {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await GetAllTheatresForAdmin();
      if (response.success) {
        setTheatres(response.data);
        console.log(response);
      } else {
        message.error("Error while trying to fetch theatres");
        console.log(response.message);
      }
    } catch (err) {
      message.error("Error while trying to fetch theatres");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (theatre) => {
    try {
      setLoading(true);
      
      // Create the update payload with only necessary fields
      const updatePayload = {
        _id: theatre._id,
        isActive: !theatre.isActive
      };
      
      const response = await UpdateTheatre(updatePayload);
      
      if (response && response.data && response.data.success) {
        const statusMessage = !theatre.isActive 
          ? "Theatre approved successfully!" 
          : "Theatre blocked successfully!";
        
        message.success(statusMessage);
        
        // Refresh the data to get updated list
        await getData();
      } else {
        message.error("Failed to update theatre status");
      }
    } catch (err) {
      console.error("Error updating theatre:", err);
      message.error("Error while updating theatre status");
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
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
      title: "Owner",
      dataIndex: "owner",
      align: "center",
      render: (text, data) => (
        <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
          {data.owner && data.owner.name}
        </span>
      )
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      align: "center"
    },
    {
      title: "Email",
      dataIndex: "email", 
      key: "email",
      align: "center"
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      align: "center",
      render: (isActive) => (
        <span style={{ 
          color: isActive ? '#52c41a' : '#ff4d4f',
          fontWeight: 'bold'
        }}>
          {isActive ? "Approved" : "Pending/Blocked"}
        </span>
      )
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, data) => (
        <Button 
          onClick={() => handleStatusChange(data)}
          loading={loading}
        >
          {data.isActive ? "Block" : "Approve"}
        </Button>
      )
    },
  ]

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <Table
        columns={columns}
        dataSource={theatres}
        rowKey="_id"
        loading={loading}
        
      />
    </>
  )
}

export default TheatreList;