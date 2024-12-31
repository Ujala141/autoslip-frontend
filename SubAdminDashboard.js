import React, { useState } from 'react';
import './MainAdminDashboard.css';
import { Link } from 'react-router-dom';
const SubAdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [studentRegNo, setStudentRegNo] = useState('');
    const [studentName, setStudentName] = useState('');
    const [warningReason, setWarningReason] = useState('');
    const [comment, setComment] = useState('');
    const [slips, setSlips] = useState([
        { 
            id: 1, 
            studentName: 'John Doe', 
            regNo: '4275-FBAS/BSCS/F20', 
            type: 'Night Out', 
            address: 'Home', 
            reason: 'Visiting family', 
            date: '2024-11-08', 
            time: '8:00 PM', 
            roomNo: '101',  // Add roomNo here
            warningComment: '', 
            warningReason: '', 
            isCommenting: false,  
            action: '' 
        },
        // Add more slips with roomNo as needed
    ]);
    
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [currentSlipId, setCurrentSlipId] = useState(null);
    const [action, setAction] = useState(''); // Declare the action state

    // Accept action, opens modal for comment
    const handleAccept = (id) => {
        setCurrentSlipId(id);
        setAction('accept'); // Set action to 'accept'
        setShowModal(true);
    };

    // Reject action, opens modal for comment
    const handleReject = (id) => {
        setCurrentSlipId(id);
        setAction('reject'); // Set action to 'reject'
        setShowModal(true);
    };

    // Handle comment submit
    const handleCommentSubmit = () => {
        setSlips(slips.map(slip =>
            slip.id === currentSlipId ? {
                ...slip,
                warningComment: comment,
                isCommenting: false // Reset isCommenting after submit
            } : slip
        ));
        // Optionally, reset the comment and warning reason fields after submit
        setComment('');
        setWarningReason('');
        setShowModal(false); // Close the modal
    };

    // Handle modal close
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleWarningSubmit = (e) => {
        e.preventDefault();
        alert(`Warning generated for ${studentName} (Reg No: ${studentRegNo})\nReason: ${warningReason}`);
        setStudentRegNo('');
        setStudentName('');
        setWarningReason('');
    };

    const handleLogout = () => {
        alert("You have been logged out.");
        window.location.href = "/login"; // Redirect to login page
    };

    const totalNightOutCount = slips.filter(slip => slip.type === 'Night Out').length;
    const totalDayOutCount = slips.filter(slip => slip.type === 'Day Out').length;

    const renderContent = () => {
        if (activeTab === 'slips') {
            return (
                <table>
                <thead>
                    <tr>
                        {['Slip ID', 'Student Name', 'Reg No', 'Room No', 'Slip Type', 'Address', 'Reason', 'Date', 'Time', 'Total Count', 'Action'].map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {slips.length === 0 ? (
                        <tr>
                            <td colSpan="11">No slips available.</td>
                        </tr>
                    ) : (
                        slips.map(({ id, studentName, regNo, roomNo, type, address, reason, date, time, isCommenting, action }) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td><Link to="/slip-history">{studentName}</Link></td>
                                <td>{regNo}</td>   {/* Reg No column */}
                                <td>{roomNo}</td>  {/* Room No column (after Reg No) */}
                                <td>{type}</td>
                                <td>{address}</td>
                                <td>{reason}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                                <td>{type === 'Night Out' ? totalNightOutCount : totalDayOutCount}</td>
                                <td className="button-container">
                                    <button className="button-accept" onClick={() => handleAccept(id)}>Accept</button>
                                    <button className="button-reject" onClick={() => handleReject(id)}>Reject</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            );
        }

        if (activeTab === 'warnings') {
            return (
                <div>
                    <h2>Generate Warning</h2>
                    <form onSubmit={handleWarningSubmit} className="warning-form">
                        {[{ label: 'Student Registration No:', value: studentRegNo, onChange: setStudentRegNo },
                          { label: 'Student Name:', value: studentName, onChange: setStudentName }].map(({ label, value, onChange }, idx) => (
                            <div key={idx} className="form-group">
                                <label>{label}</label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                        ))}
                        <div className="form-group">
                            <label>Reason for Warning:</label>
                            <textarea
                                value={warningReason}
                                onChange={(e) => setWarningReason(e.target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="submit-button">Generate Warning</button>
                    </form>
                </div>
            );
        }

        return <h2>Welcome to the Dashboard!</h2>;
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="profile">
                    <h2>Sub Admin</h2>
                    <p>Email: </p>
                    <p>Block: </p>
                </div>
                <ul className="nav-links">
                    {['home', 'slips', 'warnings'].map((tab) => (
                        <li key={tab}>
                            <button
                                className={activeTab === tab ? 'active-tab' : ''}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button onClick={handleLogout}>Log out</button>
                    </li>
                </ul>
            </div>
            <div className="main-content">
                <div id="contentArea">
                    {renderContent()}
                </div>
            </div>
            
            {/* Modal for Comment/Warning */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{action === 'accept' ? 'Accept Slip' : 'Reject Slip'}</h3>
                        <form className="comment-form">
                            <div className="form-group">
                                <label htmlFor="comment">Comment:</label>
                                <textarea
                                    id="comment"
                                    placeholder="Enter comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                           
                            <button 
                                type="button" 
                                className="submit-button"
                                onClick={handleCommentSubmit}
                            >
                                Submit
                            </button>
                        </form>
                        <button className="close-button" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubAdminDashboard;