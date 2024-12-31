import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // import Navigate for redirection
import LoginPage from './Login';
import MainAdminDashboard from './MainAdminDashboard';
import SubAdminDashboard from './SubAdminDashboard';
import ResidentDashboard from './Resident';
import { SlipHistory } from './Resident';
import SlipDetails from './SlipDetails';
const App = () => {
 const [loggedInUser, setLoggedInUser] = useState(null);
 const [slips] = useState([]); 

 return (
 <Router>
 <Routes>
 {/* Login Route */}
 <Route path="/" element={<LoginPage setLoggedInUser={setLoggedInUser} />} />

 {/* Conditional Rendering based on User Role */}
 <Route 
 path="/dashboard/main" 
 element={loggedInUser?.role === 'admin' ? <MainAdminDashboard /> : <Navigate to="/" />} 
 />
 <Route 
 path="/dashboard/sub" 
 element={loggedInUser?.role === 'subAdmin' ? <SubAdminDashboard /> : <Navigate to="/" />} 
 />
 <Route 
 path="/dashboard/resident" 
element={loggedInUser?.role === 'resident' ? <ResidentDashboard /> : <Navigate to="/" />} 
 />
 
<Route path="/slip-history" element={<SlipHistory  />} /> 
<Route path="/slip-details/:id" element={<SlipDetails slips={slips} />} />

 </Routes>
 </Router>
 );
};

export default App;