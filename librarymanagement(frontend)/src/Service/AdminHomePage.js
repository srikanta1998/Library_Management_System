import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {
    const [isLoggedIn2, setIsLoggedIn2] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus2 = () => {
            const isLoggedInUser2 = localStorage.getItem('isLoggedIn2') === 'true';
            setIsLoggedIn2(isLoggedInUser2);
        };
        checkLoginStatus2();
    }, []);

    const logout = () => {
        localStorage.removeItem('isLoggedIn2');
        setIsLoggedIn2(false);
        alert('Successfully Logged out!');
    };

    const navigatepage = () => {
        navigate('/adminloginpage');
    };

    const handleClick0 = () => {
        navigate('/mainhomepage');
      };

    const handleClick1 = () => {
        navigate('/listbooks', { state: { role: 'admin' } });
    };

    const handleClick2 = () => {
        navigate('/listusers', { state: { role: 'admin' } });
    };

    const handleClick3 = () => {
        navigate('/listreservation', { state: { role: 'admin' } });
    };

    const handleClick4 = () => {
        navigate('/listborrowings', { state: { role: 'admin' } });
    };

    const handleClick5 = () => {
        navigate('/listfines', { state: { role: 'admin' } });
    };

    const handleClick6 = () => {
        navigate('/adduser', { state: { role: 'admin' } });
    };

    const handleClick7 = () => {
        navigate('/addbook', { state: { role: 'admin' } });
    };

    const handleClick8 = () => {
        navigate('/deleteuser', { state: { role: 'admin' } });
    };

    const handleClick9 = () => {
        navigate('/deletebook', { state: { role: 'admin' } });
    };

    const handleClick10 = () => {
        navigate('/deletereservation', { state: { role: 'admin' } });
    };

    const handleClick11 = () => {
        navigate('/deleteborrow', { state: { role: 'admin' } });
    };

    const handleClick12 = () => {
        navigate('/deletefine', { state: { role: 'admin' } });
    };

    const handleClick13 = () => {
        navigate('/updatebook', { state: { role: 'admin' } });
    };

    const handleClick14 = () => {
        navigate('/admin_updateuser', { state: { role: 'admin' } });
    };

    const handleClick15 = () => {
        navigate('/searchbook', { state: { role: 'admin' } });
    };

    const handleClick16 = () => {
        navigate('/searchuser', { state: { role: 'admin' } });
    };

    const handleClick17 = () => {
        navigate('/searchbooksub', { state: { role: 'admin' } });
    };

    return (
        <div className='App'>
            <div>
                {isLoggedIn2 ? (
                    <>
                        <h1>Welcome to Admin Page</h1>
                        <hr />
                        <table className="table table-bordered">
                            <tbody>
                                <tr> <h4>Books Table</h4></tr>
                                <tr>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick1} className="btn btn-primary btn-block">All Books</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick7} className="btn btn-primary btn-block">Add Book</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick9} className="btn btn-primary btn-block">Delete Book</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick13} className="btn btn-primary btn-block">Update Book</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick15} className="btn btn-primary btn-block">Search Book</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick17} className="btn btn-primary btn-block">Search by Subject</button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                                </table>
                                <table className="table table-bordered">
                                <tbody>
                                <tr> <h4>Users Table</h4></tr>
                                <tr>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick2} className="btn btn-primary btn-block">All Users</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick6} className="btn btn-primary btn-block">Add User</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick8} className="btn btn-primary btn-block">Delete User</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick14} className="btn btn-primary btn-block">Update User</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick16} className="btn btn-primary btn-block">Search User</button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                                </table>
                                <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick3} className="btn btn-primary btn-block">All Reservations</button>
                                        </div>
                                    </td>
                                    <td>
                                    <div className="button-box">
                                            <button onClick={handleClick10} className="btn btn-primary btn-block">Delete Reservation</button>
                                        </div>
                                    </td>
                                    
                                </tr>
                                </tbody>
                                </table>
                                <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick4} className="btn btn-primary btn-block">All Borrowings</button>
                                        </div>
                                    </td>
                                    <td>
                                    <div className="button-box">
                                            <button onClick={handleClick11} className="btn btn-primary btn-block">Delete Borrowing</button>
                                        </div>
                                    </td>
                                    
                                </tr>
                                </tbody>
                                </table>
                                <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td>
                                        <div className="button-box">
                                            <button onClick={handleClick5} className="btn btn-primary btn-block">All Fines</button>
                                        </div>
                                    </td>
                                    <td>
                                    <div className="button-box">
                                            <button onClick={handleClick12} className="btn btn-primary btn-block">Delete Fine</button>
                                        </div>
                                    </td>
                                    
                                </tr>
                                    
                            </tbody>
                        </table>
                        <hr />
                        <button onClick={logout} className="btn btn-primary"><h6>Logout</h6></button>
                    </>
                ) : (
                        <div>
                            <h1>Admin Login!.</h1><br/>
                            <button onClick={navigatepage} className="btn btn-primary"><h1>Log In</h1></button><br/>
                            <button className='link-btn' onClick={handleClick0}><h5>go back to main page</h5></button>
                        </div>
                    )}
                    
            </div>
        </div>
    );
};

export default AdminHomePage;
