import React,{useState} from 'react';
//import { useParams } from 'react-router-dom';

const SlipDetails = ({ slips=[] }) => {
    const [slip] = useState([]); 
    // const { id } = useParams();
    // const slip = slips.find((slip) => slip.id.toString() === id);

    // if (!slip) {
    //     return <div>Slip not found!</div>;
    // }
    // const { id } = useParams();
    // console.log("Params ID:", id);
    // console.log("Slips:", slips);
    
    // const slip = slips.find((slip) => slip.id === Number(id));
    
    // // if (!slip) {
    // //     console.error("Slip not found for ID:", id);
    // //     return <div>Slip not found!</div>;
    // // }
    // if (!slip) {
    //     return <div>No slip found for ID: {id}. Please check the URL or contact support.</div>;
    // }
    return (
        <div className="profile-container">
            <h2>Slip Details</h2>
        <div className="profile-grid">
          <div className="profile-item">
                <p><strong>Student Name:</strong> {slip.studentName}</p>
            </div>
            <div className="profile-item">
                <p><strong>Registration No:</strong> {slip.regNo}</p>
            </div>
            <div className="profile-item">
                <p><strong>Slip Type:</strong> {slip.type}</p>
            </div>
            <div className="profile-item">
                <p><strong>Address:</strong> {slip.address}</p>
            </div>
            <div className="profile-item">
                <p><strong>Reason:</strong> {slip.reason}</p>
            </div>
            <div className="profile-item">
                <p><strong>Date:</strong> {slip.date}</p>
            </div>
            <div className="profile-item">
                <p><strong>Time:</strong> {slip.time}</p>
                </div>
            <div className="profile-item">
                <p><strong>Status:</strong> {slip.status}</p>
            </div>
            <div className="profile-item"><p><strong>Comment:</strong> {slip.comment}</p>
            </div>
      </div> 
      </div>
    );
};

export default SlipDetails;
