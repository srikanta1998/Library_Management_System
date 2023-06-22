import { useNavigate } from "react-router-dom";

export const MainHomePage = () => {

    const navigate = useNavigate();

    const handleClick1 = () => {navigate("/userloginpage")}
    const handleClick2 = () => {navigate("/adminloginpage")}
    const handleClick3 = () => {navigate("/registration")}

    return (
        
        <div className='App'>
        <div><h1>Welcome to Library Management System</h1><br/>            
        <div className="auth-form-container">
            
            <h2>Home Page</h2><hr/>

            <button onClick={handleClick1}><h4>User Login</h4></button><hr/>
            <button onClick={handleClick2}><h4>Admin Login</h4></button><hr/>
            <button onClick={handleClick3}><h4>Register as New User</h4></button>
    
        </div>
        </div>
        </div>
    )
}