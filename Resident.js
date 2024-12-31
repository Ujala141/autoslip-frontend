import React, { useEffect,useRef, useState } from 'react';
import profilePic from './profile.png';
import './MainAdminDashboard.css';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';


const ResidentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  // const handleLogout = () => {
  //   // Clear session data if needed
  //   alert("You have been logged out.");
  //    window.location.href = "/login"; // Redirect to login page
  //    };

     const handleLogout = () => {
      localStorage.clear();
      alert('You have been logged out.');
      window.location.href = '/login';
    };
  const Profile = () => {
    const [student, setStudent] = useState([]);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // useEffect(() => {
    //   const regNo = localStorage.getItem('reg_no');
    //   if (!regNo) {
    //     alert('Please log in again.');
    //     window.location.href = '/login'; // Redirect to login page
    //     return;
    //   }
    
    //   const fetchStudentData = async () => {
    //     try {
    //       const response = await fetch(`http://127.0.0.1:5000/api/student/${regNo}`);
    //       const data = await response.json();
    
    //       if (response.ok) {
    //         setStudent(data);
    //       } else {
    //         console.error('Failed to fetch student data:', data.error);
    //       }
    //     } catch (error) {
    //       console.error('Error fetching student data:', error);
    //     }
    //   };
    
    //   fetchStudentData();
    // }, []);
    
    
    // useEffect(() => {
    //   const fetchStudentData = async () => {
    //     try {
    //       const regNo = localStorage.getItem('reg_no'); // Assuming reg_no is stored in localStorage after login
    //       const response = await fetch(`http://127.0.0.1:5000/api/student/${regNo}`);
    //       const data = await response.json();
    //       console.log('Fetched student data:', data);
    //       if (response.ok) {
    //         setStudent(data);
    //       } else {
    //         console.error('Failed to fetch student data:', data.error);
    //       }
    //     } catch (error) {
    //       console.error('Error fetching student data:', error);
    //     }
    //   };
    //   fetchStudentData();
    // }, []);
    useEffect(() => {
      const fetchStudentData = async () => {
        const regNo = localStorage.getItem('reg_no');
        if (!regNo) {
          alert('Please log in again.');
          window.location.href = '/login';
          return;
        }
        try {
          // URL encode the regNo
          const encodedRegNo = encodeURIComponent(regNo);
    
          const response = await fetch(`http://127.0.0.1:5000/api/students/${encodedRegNo}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched student data:', data);
            setStudent(data);
          } else {
            console.error('Failed to fetch student data');
          }
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };
      fetchStudentData();
    }, []);
    
    // Handle password change
    const handlePasswordChange = async (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match.');
        return;
      }
  
      try {
        const response = await fetch('http://127.0.0.1:5000/api/students/update_password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reg_no: student.reg_no,
            current_password: currentPassword,
            new_password: newPassword,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Password updated successfully');
          setShowPasswordForm(false);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          alert(`Failed to update password: ${data.error}`);
        }
      } catch (error) {
        console.error('Error updating password:', error);
        alert('An error occurred while updating the password.');
      }
    };
  
    // useEffect(() => {
    //   const fetchStudentData = async () => {
    //     try {
    //       const token = localStorage.getItem('token'); // Fetch token from localStorage
    //       const response = await fetch('http://127.0.0.1:5000/api/student', {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${token}` // Include token in the request header
    //         },
    //       });
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch student data');
    //       }
    //       const data = await response.json();
    //       console.log('Fetched student data:', data);
    //       setStudent(data);
    //     } catch (error) {
    //       console.error('Failed to fetch student data:', error);
    //     }
    //   };
    //   fetchStudentData();
    // }, []);

    // if (!student) return <p>Loading student data...</p>;

    // const handlePasswordChange = async (e) => {
    //   e.preventDefault();
    //   if (newPassword !== confirmPassword) {
    //     alert('New password and confirm password do not match.');
    //     return;
    //   }
    //   try {
    //     const token = localStorage.getItem('token');
    //     const response = await fetch('http://127.0.0.1:5000/api/change-password', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`
    //       },
    //       body: JSON.stringify({ currentPassword, newPassword })
    //     });
    //     const data = await response.json();
    //     // console.log('Fetched student data:', data);
    //     if (response.ok) {
    //       alert('Password updated successfully');
    //       setShowPasswordForm(false);
    //     } else {
    //       alert(`Error: ${data.message}`);
    //     }
    //   } catch (error) {
    //     console.error('Failed to update password:', error);
    //     alert('An error occurred while updating the password.');
    //   }
    // };
    // useEffect(() => {
    //   const fetchStudentData = async () => {
    //     try {
    //       // Assuming you have an API to get the student data
    //       const response = await fetch('/api/student');  // Replace with actual API endpoint
    //       const data = await response.json();
    //       setStudent(data);
    //     } catch (error) {
    //       console.error('Failed to fetch student data:', error);
    //     }
    //   };
    //   fetchStudentData();}, []);
    // if (!student) return <p>Loading student data...</p>;

    // const handlePasswordChange = (e) => {
    //   e.preventDefault();
    //   if (newPassword !== confirmPassword) {
    //     alert('New password and confirm password do not match.');
    //   } else {
    //     console.log('Password Change Requested:', { currentPassword, newPassword });
    //     // Call backend to change the password
    //   }
    // };

    return (
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-grid">
          <div className="profile-item">
            <p><strong>Registration Number:</strong> {student.reg_no}</p>
          </div>
          <div className="profile-item">
            <p><strong>Name:</strong> {student.name}</p>
          </div>
          <div className="profile-item">
            <p><strong>CNIC:</strong> {student.cnic}</p>
          </div>
          <div className="profile-item">
            <p><strong>Block ID:</strong> {student.block_id}</p>
          </div>
          <div className="profile-item">
            <p><strong>Room Number:</strong> {student.room}</p>
          </div>
          {/* <div className="profile-item">
            <p><strong>Contact Number:</strong> {student.contact_number}</p>
          </div> */}
          <div className="profile-item">
            <p><strong>Email:</strong> {student.email}</p>
          </div>
          <div className="profile-item">
            <p><strong>Parents Contact:</strong> {student.phone_number}</p>
          </div>
          <div className="profile-item">
            <p><strong>Emergency Contact:</strong> {student.emergency_contact}</p>
          </div>
        </div>

        {!showPasswordForm && (
          <button className="toggle-password-btn" onClick={() => setShowPasswordForm(true)}>
            Change Password
          </button>
        )}

        {showPasswordForm && (
          <form onSubmit={handlePasswordChange} className="password-form">
            <div className="form-group">
              <label>Current Password:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn" >Update Password</button>
              <button type="button" className="cancel-btn" onClick={() => setShowPasswordForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  const SlipRequest = () => {
    const [formData, setFormData] = useState({
      regNo: '',
      Name: '',
      slipType: '',
      address: '',
      reason: '',
      attachment: null,
    });

     // Reference for file input element
  const fileInputRef = useRef(null);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        attachment: file,
      }));
    };
    
    const handleCancelFile = () => {
      setFormData((prevData) => ({
        ...prevData,
        attachment: null,
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the input field
      }
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Slip Data Submitted:', formData);
      // Call backend to submit slip request
    };

    return (
      <div className="slip-request-container">
        <h2>Slip Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Registration Number:</label>
            <input
              type="text"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              placeholder="####-ABCD/EFGH-F##"
              required
            />
          </div>

          <div className="form-group">
            <label>Slip Type:</label>
            <select
              name="slipType"
              value={formData.slipType}
              onChange={handleChange}
              required
            >
              <option value="">Select Slip Type</option>
              <option value="Day Out">Day Out</option>
              <option value="Night Out">Night Out</option>
              <option value="Clearance">Clearance</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              required
            />
          </div>
          <div className="form-group">
            <label>Reason:</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Write reason here..."
              required
            />
          </div>
          <div className="form-group">
          <label>Attach Document (optional):</label>
          <input
            type="file"
            name="attachment"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            ref={fileInputRef} // Attach ref here
          />
          {formData.attachment && (
            <div>
              <p><strong>Uploaded File:</strong> {formData.attachment.name}</p>
              <button type="button" onClick={handleCancelFile} className="cancel-file-btn">
                Cancel
              </button>
            </div>
          )}
        </div>
        <button type="submit" className="submit-btn-slip">Submit Slip</button>
      </form>
    </div>
    );
  };
  const WarningLetter = () => {
    const [warnings, setWarnings] = useState([
      {
        id: 1,
        date: "2024-11-05",
        reason: "",
        attachment: null,
        adminComment: "You must adhere to the hostel’s curfew.",
      },
      {
        id: 2,
        date: "2024-11-10",
        reason: "",
        attachment: null,
        adminComment: "You are responsible for all hostel properties.",
      },
    ]);
  
    // Handle file input change
    const handleFileChange = (e, id) => {
      const file = e.target.files[0];
      setWarnings((prevWarnings) =>
        prevWarnings.map((warning) =>
          warning.id === id ? { ...warning, attachment: file } : warning
        )
      );
    };
  
    // Cancel file selection
    const handleCancelFile = (id) => {
      setWarnings((prevWarnings) =>
        prevWarnings.map((warning) =>
          warning.id === id ? { ...warning, attachment: null } : warning
        )
      );
    };
  
    // Handle reason change
    const handleReasonChange = (e, id) => {
      setWarnings((prevWarnings) =>
        prevWarnings.map((warning) =>
          warning.id === id ? { ...warning, reason: e.target.value } : warning
        )
      );
    };
  
    // Handle submit
    const handleSubmit = (id) => {
      const warningToSubmit = warnings.find((warning) => warning.id === id);
      console.log("Warning ID:", id);
      console.log("Student Submitted Reason:", warningToSubmit.reason);
      console.log("Attached File:", warningToSubmit.attachment);
      // Add backend call or further actions here
    };
  

    return (
      <div className="warning-letter-container">
        <h2>Warnings</h2>
        <table className="warning-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Admin Comment</th>
              <th>Reason</th>
              <th>Attach Document</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {warnings.map((warning) => (
              <tr key={warning.id}>
                <td>{warning.date}</td>
                <td>{warning.adminComment}</td>
                <td>
                  <textarea
                    value={warning.reason}
                    onChange={(e) => handleReasonChange(e, warning.id)}
                    placeholder="Enter your reason..."
                    rows="4"
                    cols="30"
                  />
                </td>
                <td>
                  <input
                    type="file"
                    name="attachment"
                    onChange={(e) => handleFileChange(e, warning.id)}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {warning.attachment && (
                    <div>
                      <p>
                        <strong>Uploaded File:</strong> {warning.attachment.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCancelFile(warning.id)}
                        className="cancel-file-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  <button
                    className="primary-submit"
                    onClick={() => handleSubmit(warning.id)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === 'profile') return <Profile />;
    if (activeTab === 'slipRequest') return <SlipRequest />;
    if (activeTab === 'slipHistory') return <SlipHistory />;
    if (activeTab === 'warning') return <WarningLetter />;
    return null;
    };
  
  return (
    <div className="container">
      <div className="sidebar">
      <div className="profile-pic-container">
          <img src={profilePic} alt="Profile" className="profile-pic" />
        </div>
      <div className="profile">
          <h2>Resident</h2> 
          <p>Email:</p>
        </div>
        <ul className="nav-links">
       <li><button onClick={() => setActiveTab('profile')}>My Profile</button></li> 
       <li><button onClick={() => setActiveTab('slipRequest')}>Slip Request</button></li>
       <li><button onClick={() => setActiveTab('slipHistory')}>Slip History</button></li>
       <li><button onClick={() => setActiveTab('warning')}>Warning</button></li>
       <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul></div>

      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};
export default ResidentDashboard;
export const SlipHistory = ({ slips=[] }) => { 
  
  const [studentHistory, setStudentHistory] = useState([]);
  const [totalWarnings, setTotalWarnings] = useState(1); // New state for total warnings
  const [loading, setLoading] = useState(true);

  /*useEffect(() => {
    // Fetch slip history from the backend
    const fetchStudentHistory = async () => {
      try {
        const response = await fetch('/api/student/history'); 
      
        const data = await response.json();
        setStudentHistory(data);
      } catch (error) {
        console.error('Error fetching student history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentHistory();
  }, []);*/

  /*useEffect(() => {
    // Fetch slip history and warning count from the backend
    const fetchStudentHistory = async () => {
      try {
        const response = await fetch('/api/student/history');
        const data = await response.json();
        
        // Update the history data
        setStudentHistory(data.history|| []);
      //  console.log('Fetched Data:', data);
        // Assuming the backend sends totalWarnings as part of the response
        setTotalWarnings(data.totalWarnings || 0); // If totalWarnings is available in the response
      } catch (error) {
        console.error('Error fetching student history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentHistory();
  }, []);*/
  useEffect(() => {
    // Simulate fetching slip history and warning count from the backend
    const fetchStudentHistory = async () => {
      try {
        // Simulate API response
        const dummyData = {
          history: [
            {
              date: "2024-12-01",
              dayOut: 2,
              nightOut: 1,
              address: "123 Street, City",
              reason: "Family Visit",
              dayOutTimes: ["10:00 AM", "4:00 PM"],
              nightOutTimes: ["8:00 PM"],
              status: "accepted",
            },
            {
              date: "2024-12-02",
              dayOut: 1,
              nightOut: 0,
              address: "University Campus",
              reason: "Event",
              dayOutTimes: ["9:00 AM"],
              nightOutTimes: [],
              status: "rejected",
              comment: "Incomplete documents"
            },
            {
              date: "2024-12-03",
              dayOut: 0,
              nightOut: 1,
              address: "Friend's House",
              reason: "Birthday Party",
              dayOutTimes: [],
              nightOutTimes: ["7:30 PM"],
              status: "accepted",
            },
          ],
          totalWarnings: 2, // Simulated warning count
        };
  
        // Update state with dummy data
        setStudentHistory(dummyData.history || []);
        setTotalWarnings(dummyData.totalWarnings || 0);
      } catch (error) {
        console.error('Error fetching student history:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudentHistory();
  }, []);
  if (loading) return <p>Loading...</p>;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dayOut = payload[0].value;
      const nightOut = payload[1].value;
      const dayOutTimes = payload[0].payload.dayOutTimes || [];
      const nightOutTimes = payload[1].payload.nightOutTimes || [];

      return (
        <div className="custom-tooltip">
          <p><strong>{label}</strong></p>
          {dayOut > 0 && (
            <>
              <p>Day Outs: {dayOut}</p>
              <p><strong>Day Out Times:</strong></p>
              {dayOutTimes.map((time, index) => (
                <p key={index}>{time}</p>
              ))}
            </>
          )}
          {nightOut > 0 && (
            <>
              <p>Night Outs: {nightOut}</p>
              <p><strong>Night Out Times:</strong></p>
              {nightOutTimes.map((time, index) => (
                <p key={index}>{time}</p>
              ))}
            </>
          )}
        </div>
      );
    }
    return null;
  };

  let totalDayOuts = 0;
  let totalNightOuts = 0;

  return (
    <div className="slip-history-container">
      <h2>Slip History - Current Month</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={studentHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => Math.floor(value)}/>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="dayOut" fill="#8884d8" name="Day Out" />
          <Bar dataKey="nightOut" fill="#82ca9d" name="Night Out" />
        </BarChart>
      </ResponsiveContainer>

      <h3>History Details</h3>
      <table className="history-table">
        <thead>
          <tr>
            <th>Slip ID</th>
            <th>Slip Type</th>
            <th>Address</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {studentHistory.map((entry, index) => {
            let dayOutRow = null;
            let nightOutRow = null;

            if (entry.dayOut > 0) {
              totalDayOuts += entry.dayOut; // Accumulate total day outs
              dayOutRow = (
                <tr  key={'day-' + index}>
                  <td>{index + 1}</td>
                  <td>Day Out</td>
                  <td>{entry.address}</td>
                  <td>{entry.reason}</td>
                  <td>{entry.date}</td>
                  <td>{entry.dayOutTimes.join(', ')}</td>
                  <td>
                    {entry.status === 'accepted' ? (
                      <Link to={`/slip-details/${entry.id}`}>Accepted</Link>
                    ) : (
                      <span>Rejected {entry.comment && `(${entry.comment})`}</span>
                    )}
                  </td>
                </tr>
              );
            }

            if (entry.nightOut > 0) {
              totalNightOuts += entry.nightOut; // Accumulate total night outs
              nightOutRow = (
                <tr className='tble-row' key={'night-' + index}>
                  <td>{index + 1}</td>
                  <td>Night Out</td>
                  <td>{entry.address}</td>
                  <td>{entry.reason}</td>
                  <td>{entry.date}</td>
                  <td>{entry.nightOutTimes.join(', ')}</td>
                  <td>
                    {entry.status === 'accepted' ? (
                      <Link to={`/slip-details/${entry.id}`}>Accepted</Link>
                    ) : (
                      <span>Rejected {entry.comment && `(${entry.comment})`}</span>
                    )}
                  </td>
                </tr>
              );
            }

            return (
              <React.Fragment key={index}>
                {dayOutRow}
                {nightOutRow}
              </React.Fragment>
            );
          })}
          {/* {studentHistory.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.type}</td>
              <td>{entry.address}</td>
              <td>{entry.reason}</td>
              <td>{entry.date}</td>
              <td>{entry.time}</td>
              <td>{entry.status || 'Pending'}</td>
            </tr>
          ))} */}
          {slips.map(({ id, type, date, time, status, comment }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{type}</td>
              <td>{date}</td>
              <td>{time}</td>
              <td>
              {status === 'accepted' ? (
                  <Link to={`/slip-details/${id}`}>{status}</Link>
                ) : (
                  <span>Rejected {comment && `(${comment})`}</span>
                )}
                  </td>
              {/* <td>
                {status ? (
                  <Link to={`/slip-details/${id}`}>{status} {comment && `(${comment})`}</Link>
                ) : (
                  'Pending'
                )}
              </td> */}
            </tr>
          ))}
         {/* {slips.map(({ id, type, date, time, status, comment }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{type}</td>
                            <td>{date}</td>
                            <td>{time}</td>
                            <td>
                                {status ? (
                                    <Link to={`/slip-details/${id}`}>
                                        {status} {comment && `(${comment})`}
                                    </Link>
                                ) : (
                                    'Pending'
                                )}
                            </td>
                        </tr>
                    ))}
                 */}
        </tbody>
        <tfoot>
          <tr className='tble-row'>
            <td colSpan="5"><strong>Total Day Outs:</strong></td>
            <td>{totalDayOuts}</td>
          </tr>
          <tr className='tble-row'>
            <td colSpan="5"><strong>Total Night Outs:</strong></td>
            <td>{totalNightOuts}</td>
          </tr>
         {totalWarnings > 0 && (
            <tr className="tble-row">
              <td colSpan="5"><strong>Total Warnings:</strong></td>
              <td>{totalWarnings}</td>
            </tr>
          )} 
        </tfoot>
      </table>
    </div>
  );
};