import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './MainAdminDashboard.css';
const MainAdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [students, setStudents] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [subAdmins, setSubAdmins] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [studentData, setStudentData] = useState({
        reg_no: '',
        student_name: '',
        cnic: '',
        block_id: 'A',
        room_number: '',
        contact_number: '',
        email: '',
        password: ''
    });

    const [editIndex, setEditIndex] = useState(null);
    const [adminData, setAdminData] = useState({
        email: '',
        name: '',
        password: ''
    });
    const [editingAdminIndex, setEditingAdminIndex] = useState(null);

    const [subAdminData, setSubAdminData] = useState({
        warden_email: '',
        block_id: '',
        block_name: '',
        warden_name: '',
        password: ''
    });

    const [blockData, setBlockData] = useState({
        block_id: '',
        block_name: '',
    });

    const [selectedBlock, setSelectedBlock] = useState('');
    const [editingBlockIndex, setEditingBlockIndex] = useState(null);

    const [selectedStudent, setSelectedStudent] = useState(null); 
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data (e.g., from localStorage or context)
        localStorage.removeItem('user'); // Adjust this based on your authentication method
        navigate('/login'); // Redirect to login page
    };
    const renderContent = () => {
        switch (activeSection) {
            case 'home':
                return <h2>Welcome to the Dashboard!</h2>;
            case 'manageStudents':
                return renderStudentManagement();
            case 'manageAdmins':
                return renderAdminManagement();
            case 'manageSubAdmins':
                return renderSubAdminManagement();
            case 'manageBlocks':
                return renderBlockManagement();
            case 'viewBlocks':
                return renderBlockRecords();
            case 'viewStudents':
                return renderStudentRecords();
            case 'viewMainAdmins':
                return renderMainAdminRecords();
            case 'viewSubAdmins':
                return renderSubAdminRecords();
            case 'viewBlockStudents':
                return renderBlockStudents();
            case 'viewStudentDetails': 
                return renderStudentDetails();
            default:
                return <h2>Welcome to the Admin Dashboard!</h2>;
        }
    };

    const handleStudentSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedStudents = students.map((student, index) =>
                index === editIndex ? studentData : student
            );
            setStudents(updatedStudents);
            setEditIndex(null);
        } else {
            setStudents([...students, studentData]);
        }
        resetStudentForm();
    };

    const resetStudentForm = () => {
        setStudentData({
            reg_no: '',
            student_name: '',
            cnic: '',
            block_id: 'A',
            room_number: '',
            contact_number: '',
            email: '',
            password: ''
        });
    };

    const handleEditStudent = (index) => {
        setStudentData(students[index]);
        setEditIndex(index);
    };

    const handleDeleteStudent = (index) => {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
    };

    const handleViewStudentDetails = (index) => {
        setSelectedStudent(students[index]);
        setActiveSection('viewStudentDetails'); 
    };

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        if (editingAdminIndex !== null) {
            const updatedAdmins = admins.map((admin, index) =>
                index === editingAdminIndex ? adminData : admin
            );
            setAdmins(updatedAdmins);
            setEditingAdminIndex(null);
        } else {
            setAdmins([...admins, adminData]);
        }
        resetAdminForm();
    };

    const resetAdminForm = () => {
        setAdminData({ email: '', name: '', password: '' });
    };

    const handleEditAdmin = (index) => {
        setAdminData(admins[index]);
        setEditingAdminIndex(index);
    };

    const handleDeleteAdmin = (index) => {
        const updatedAdmins = admins.filter((_, i) => i !== index);
        setAdmins(updatedAdmins);
    };

    const handleSubAdminSubmit = (e) => {
        e.preventDefault();
        setSubAdmins([...subAdmins, { ...subAdminData }]);
        setSubAdminData({ warden_email: '', block_id: '', block_name: '', warden_name: '', password: '' });
    };

    const handleBlockSubmit = (e) => {
        e.preventDefault();
        if (editingBlockIndex !== null) {
            const updatedBlocks = [...blocks];
            updatedBlocks[editingBlockIndex] = { ...blockData };
            setBlocks(updatedBlocks);
            setEditingBlockIndex(null);
        } else {
            setBlocks([...blocks, { ...blockData }]);
        }
        resetBlockForm();
    };

    const resetBlockForm = () => {
        setBlockData({ block_id: '', block_name: '', warden_name: '' });
    };

    const handleEditBlock = (index) => {
        setBlockData(blocks[index]);
        setEditingBlockIndex(index);
    };

    const handleDeleteBlock = (index) => {
        const updatedBlocks = blocks.filter((_, i) => i !== index);
        setBlocks(updatedBlocks);
    };

    const renderStudentManagement = () => (
         <div>
        <h2>Manage Student Records</h2>
        <form onSubmit={handleStudentSubmit}>
            <input type="text" placeholder="Student Name" value={studentData.name} onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} required />
            <input type="text" placeholder="Registration Number" value={studentData.reg_no} onChange={(e) => setStudentData({ ...studentData, reg_no: e.target.value })} required />
            
            {/* Adding label for Select Block ID dropdown */}
            <select
                id="block-select"  // Adding an id for accessibility
                value={subAdminData.block_id}
                onChange={(e) => setSubAdminData({ ...subAdminData, block_id: e.target.value })}
                required
            >
                <option value="" disabled>Select the Block ID</option> {/* Placeholder option */}
                {blocks.map(block => (
                    <option key={block.id} value={block.id}>{block.name}</option>
                ))}
            </select>
            <input type="text" placeholder="Room Number" value={studentData.room_no} onChange={(e) => setStudentData({ ...studentData, room_no: e.target.value })} required />
            <input type="text" placeholder="CNIC" value={studentData.cnic} onChange={(e) => setStudentData({ ...studentData, cnic: e.target.value })} required />
            <input type="password" placeholder="Password" value={studentData.password} onChange={(e) => setStudentData({ ...studentData, password: e.target.value })} required />
            <button type="submit" className='primary-submit'>Add Student</button>
        </form>
    </div>

    );

    const renderStudentRecords = () => (
        <div>
            <h2>Student Records</h2>
            <table>
                <thead>
                    <tr>
                        <th>Registration No</th>
                        <th>Name</th>
                        <th>CNIC</th>
                        <th>Block</th>
                        <th>Room No</th>
                        <th>Contact No</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.reg_no}</td>
                            <td><Link to="/slip-history">{student.student_name}</Link></td>
                            <td>{student.cnic}</td>
                            <td>{student.block_id}</td>
                            <td>{student.room_number}</td>
                            <td>{student.contact_number}</td>
                            <td>{student.email}</td>
                            <td>
                                <button onClick={() => handleEditStudent(index)}>Edit</button>
                                <button onClick={() => handleDeleteStudent(index)}>Delete</button>
                                <button onClick={() => handleViewStudentDetails(index)}>View</button> {/* View details button */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderStudentDetails = () => {
        if (!selectedStudent) return null;

        return (
            <div>
                <h2>Student Details</h2>
                <p><strong>Registration No:</strong> {selectedStudent.reg_no}</p>
                <p><strong>Name:</strong> {selectedStudent.student_name}</p>
                <p><strong>CNIC:</strong> {selectedStudent.cnic}</p>
                <p><strong>Block:</strong> {selectedStudent.block_id}</p>
                <p><strong>Room Number:</strong> {selectedStudent.room_number}</p>
                <p><strong>Contact Number:</strong> {selectedStudent.contact_number}</p>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <button onClick={() => setActiveSection('viewStudents')}>Back to Records</button>
            </div>
        );
    };

    const renderAdminManagement = () => (
        <div>
            <h2>Manage Main Admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <input type="text" placeholder="Admin Name" value={adminData.name} onChange={(e) => setAdminData({ ...adminData, name: e.target.value })} required />
                <input type="email" placeholder="Admin Email" value={adminData.email} onChange={(e) => setAdminData({ ...adminData, email: e.target.value })} required />
                <input type="password" placeholder="Password" value={adminData.password} onChange={(e) => setAdminData({ ...adminData, password: e.target.value })} required />
                <button type="submit"  className='primary-submit'>{editingAdminIndex !== null ? 'Update Admin' : 'Add Admin'}</button>
            </form>
        </div>
    );

    const renderSubAdminManagement = () => (
        <div>
        <h2>Manage Sub Admins</h2>
        <form onSubmit={handleSubAdminSubmit}>
            <input type="text" placeholder="Warden Name" value={subAdminData.warden_name} onChange={(e) => setSubAdminData({ ...subAdminData, warden_name: e.target.value })} required />
            <input type="email" placeholder="Warden Email" value={subAdminData.warden_email} onChange={(e) => setSubAdminData({ ...subAdminData, warden_email: e.target.value })} required />
            
            {/* Adding label for Select Block ID dropdown */}
            
            <select
                id="block-select"  // Adding an id for accessibility
                value={subAdminData.block_id}
                onChange={(e) => setSubAdminData({ ...subAdminData, block_id: e.target.value })}
                required
            >
                <option value="" disabled>Select the Block ID</option> {/* Placeholder option */}
                {blocks.map(block => (
                    <option key={block.id} value={block.id}>{block.name}</option>
                ))}
            </select>
            
            <input type="text" placeholder="Block Name" value={subAdminData.block_name} onChange={(e) => setSubAdminData({ ...subAdminData, block_name: e.target.value })} required />
            <input type="password" placeholder="Password" value={subAdminData.password} onChange={(e) => setSubAdminData({ ...subAdminData, password: e.target.value })} required />
            <button type="submit"  className='primary-submit'>Add Sub Admin</button>
        </form>
    </div>
    );

    const renderBlockManagement = () => (
        <div>
        <h2>Manage Blocks</h2>
        <form onSubmit={handleBlockSubmit}>
            <input
                type="text"
                placeholder="Block ID"
                value={blockData.block_id}
                onChange={(e) => setBlockData({ ...blockData, block_id: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Block Name"
                value={blockData.block_name}
                onChange={(e) => setBlockData({ ...blockData, block_name: e.target.value })}
                required
            />
            <button type="submit"  className='primary-submit'>{editingBlockIndex !== null ? 'Update Block' : 'Add Block'}</button>
        </form>
    </div>
    
    );

    const renderBlockRecords = () => (
        <div>
            <h2>Block Records</h2>
            <table>
                <thead>
                    <tr>
                        <th>Block ID</th>
                        <th>Block Name</th>
                        <th>Warden Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blocks.map((block, index) => (
                        <tr key={index}>
                            <td>{block.id}</td>
                            <td>{block.name}</td>
                            <td>{block.wardenEmail}</td>
                            <td>
                                <button onClick={() => handleEditBlock(index)}>Update</button>
                                <button onClick={() => handleDeleteBlock(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMainAdminRecords = () => (
        <div>
            <h2>Main Admin Records</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin, index) => (
                        <tr key={index}>
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            <td>
                                <button onClick={() => handleEditAdmin(index)}>Update</button>
                                <button onClick={() => handleDeleteAdmin(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderSubAdminRecords = () => (
        <div>
            <h2>Sub Admin Records</h2>
            <table>
                <thead>
                    <tr>
                        <th>Warden Email</th>
                        <th>Warden Name</th>
                        <th>Block ID</th>
                        <th>Block Name</th>
                    </tr>
                </thead>
                <tbody>
                    {subAdmins.map((subAdmin, index) => (
                        <tr key={index}>
                            <td>{subAdmin.warden_email}</td>
                            <td>{subAdmin.warden_name}</td>
                            <td>{subAdmin.block_id}</td>
                            <td>{subAdmin.block_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderBlockStudents = () => {
        const filteredStudents = students.filter(student => student.block_id === selectedBlock);

        return (
            <div>
                <h2>Students in {blocks.find(block => block.id === selectedBlock)?.name}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Registration No</th>
                            <th>Name</th>
                            <th>CNIC</th>
                            <th>Room No</th>
                            <th>Contact No</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => (
                            <tr key={index}>
                                <td>{student.reg_no}</td>
                                <td><Link to="/slip-history">{student.student_name}</Link></td>
                                <td>{student.cnic}</td>
                                <td>{student.room_number}</td>
                                <td>{student.contact_number}</td>
                                <td>{student.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="container">
            <nav className="sidebar">
                <div className="profile">
                    <h2>Main Admin</h2>
                    <p>Name: {adminData.name}</p>
                    <p>Email: {adminData.email}</p>
                </div>
                <ul className="nav-links">
                    <li><button onClick={() => setActiveSection('home')}>Home</button></li>
                    <li>
                        <button onClick={() => setActiveSection('viewBlockStudents')}>View Block Students</button>
                        <ul>
                            {blocks.map(block => (
                                <li key={block.id}>
                                    <button onClick={() => { setSelectedBlock(block.id); setActiveSection('viewBlockStudents'); }}>
                                        {block.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li><button onClick={() => setActiveSection('viewStudents')}>View Students</button></li>
                    <li><button onClick={() => setActiveSection('viewBlocks')}>View Blocks</button></li>
                    <li><button onClick={() => setActiveSection('viewMainAdmins')}>View Main Admins</button></li>
                    <li><button onClick={() => setActiveSection('viewSubAdmins')}>View Sub Admins</button></li>
               
                    <li><button onClick={() => setActiveSection('manageStudents')}>Manage Students</button></li>
                    <li><button onClick={() => setActiveSection('manageBlocks')}>Manage Blocks</button></li>
                    <li><button onClick={() => setActiveSection('manageAdmins')}>Manage Main Admins</button></li>
                    <li><button onClick={() => setActiveSection('manageSubAdmins')}>Manage Sub Admins</button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                     </ul>
            </nav>
            <main className="main-content">
                {renderContent()}
            </main>
        </div>
    );
};

export default MainAdminDashboard;