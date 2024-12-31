import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import './Login.css'; 
import logo from './logo.png';
import loginBackground from './loginbackground.png';  // Ensure the image is correctly imported


const LoginPage = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
//   const handleLogin = async (email, password) => {
//     try {
//       console.log('Attempting login with:', { email, password });
//       const response = await fetch('http://127.0.0.1:5000/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       console.log('Response status:', response.status);
//       const data = await response.json();
//       console.log('Response data:', data);
  
//       if (response.ok) {
//         localStorage.setItem('reg_no', data.reg_no); // Save reg_no
//         alert('Login successful');
//         navigate('/resident-dashboard'); // Redirect to dashboard
//       } else {
//         setError(data.error || 'Login failed');
//         console.error('Login failed:', data.error);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError('An error occurred during login.');
//     }
//   };
  
// const LoginPage = ({ setLoggedInUser }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error] = useState('');
//     // const navigate = useNavigate();
//     const handleLogin = async (email, password) => {
//         try {
//           const response = await fetch('http://127.0.0.1:5000/api/login', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//           });
      
//           const data = await response.json();
//           if (response.ok) {
//             localStorage.setItem('reg_no', data.reg_no); // Save reg_no
//             alert('Login successful');
//             window.location.href = '/resident-dashboard'; // Redirect to dashboard
//           } else {
//             alert(`Login failed: ${data.error}`);
//           }
//         } catch (error) {
//           console.error('Login error:', error);
//           alert('An error occurred during login.');
//         }
//       };
const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('reg_no', data.reg_no);  // Save reg_no
        setLoggedInUser(data);
        navigate('/dashboard'); // Redirect to dashboard
          //Navigate based on the user role
                if (data.role === 'admin') {
                    navigate('/dashboard/main');
                } else if (data.role === 'subAdmin') {
                    navigate('/dashboard/sub');
                } else if (data.role === 'resident') {
                    navigate('/dashboard/resident');
                }
           
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     setError('');

    //     try {
    //         const response = await fetch('http://localhost:5000/api/login', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ email, password }),
    //         });
            
    //         if (response.ok) {
    //             const data = await response.json();
    //             setLoggedInUser(data);

    //             // Navigate based on the user role
    //             if (data.role === 'admin') {
    //                 navigate('/dashboard/main');
    //             } else if (data.role === 'subAdmin') {
    //                 navigate('/dashboard/sub');
    //             } else if (data.role === 'resident') {
    //                 navigate('/dashboard/resident');
    //             }
    //         } else {
    //             const errorData = await response.json();
    //             setError(errorData.error || 'Login failed');
    //         }
    //     } catch (err) {
    //         setError('An error occurred while trying to log in');
    //     }
    // };

    // //Credentials for Main Admin, Sub Admin, and Resident (can be moved to a config file)
    // const mainAdmin = { email: 'admin@example.com', password: 'admin' };
    // const subAdmin = { email: 'subadmin@example.com', password: 'subadmin' };
    // const resident = { email: 'resident@example.com', password: 'resident' };

    // // Initialize useNavigate hook for redirection
    // const navigate = useNavigate();

    // // Handle login for both residents, admins, and sub-admins
    // const handleLogin = (e) => {
    //     e.preventDefault();
    
    //     // Check for main admin login
    //     if (email === mainAdmin.email && password === mainAdmin.password) {
    //         setLoggedInUser({ role: 'mainAdmin', studentName: 'Admin User' });
    //         setError('');
    //         navigate('/dashboard/main');  // Redirect to Main Admin Dashboard
    //     } 
    //     // Check for sub-admin login
    //     else if (email === subAdmin.email && password === subAdmin.password) {
    //         setLoggedInUser({ role: 'subAdmin', studentName: 'Sub Admin' });
    //         setError('');
    //         navigate('/dashboard/sub');  // Redirect to Sub Admin Dashboard
    //     } 
    //     // Check for resident login
    //     else if (email === resident.email && password === resident.password) {
    //         setLoggedInUser({ role: 'resident', studentName: 'Resident User' });
    //         setError('');
    //         navigate('/dashboard/resident');  // Redirect to Resident Dashboard
    //     }
    //     // Invalid login credentials
    //     else {
    //         setError('Invalid email or password');
    //     }
    // };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${loginBackground})` }}>
            <div className="login-box">
                <img src={logo} alt="Logo" className="logo" />
                <form onSubmit={handleLogin}>
                    <div className="input-field">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

   // // Initialize useNavigate hook for redirection
        // const navigate = useNavigate();
    
        // // Handle login for users (residents, admins, sub-admins)
        // const handleLogin = async (e) => {
        //     e.preventDefault();
    
        //     try {
        //         const response = await fetch('http://localhost:5000/auth/login', {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({ email, password }),
        //         });
    
        //         const data = await response.json();
    
        //         if (data.status === 'success') {
        //             const { role, studentName } = data; // Extract role and user details from the response
        //             setLoggedInUser({ role, studentName });
        //             setError('');
    
        //             // Redirect based on role
        //             if (role === 'mainAdmin') {
        //                 navigate('/dashboard/main');
        //             } else if (role === 'subAdmin') {
        //                 navigate('/dashboard/sub');
        //             } else if (role === 'Resident') {
        //                 navigate('/dashboard/resident');
        //             }
        //         } else {
        //             setError(data.message || 'Invalid email or password');
        //         }
        //     } catch (error) {
        //         console.error('Login error:', error);
        //         setError('An error occurred while logging in. Please try again.');
        //     }
        // };