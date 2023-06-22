import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserLogin = () => {

    const [isLoggedIn1, setIsLoggedIn1] = useState(false);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        passwords:''})

    const handleInput = (event) => {setCredentials({...credentials, [event.target.name]: event.target.value})}

    const handleClick = () => {navigate("/registration")}

    function isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isPasswordValid(passwords) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(passwords);
    };


const handleLogin = async (e) => {

    e.preventDefault();

    try{
        if(isEmailValid(credentials.email))
        {
            if(isPasswordValid(credentials.passwords))
            {
                const response = await axios.post('http://localhost:9001/api/v1/validateuser', JSON.stringify(credentials), 
                {headers: {'Content-Type': 'application/json'}});

                const {user_id, role} = response.data;
                const user = { user_id, role };
                JSON.stringify(user);
                
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('isLoggedIn1', 'true');
                setIsLoggedIn1(true);
                if(user.role === 'user')
                {
                navigate('/userhomepage');
                }
                else{
                    alert("Role is not specified for the provided credentials!");
                }
            }
        }
    } catch(error){
        console.error(error);
        alert("Login Failed!")
    }

};

return (
    <div className='App2'>
    <div className="auth-form-container">
        <h2>User LogIn</h2><hr/>
        <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">email</label>
            <input onChange={handleInput} type="email" placeholder="Email" id="email" name="email" required/>
            <label htmlFor="passwords">password</label>
            <input onChange={handleInput} type="password" placeholder="********" id="passwords" name="passwords" required/>
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={handleClick}>Dont have an account? Register here.</button>

    </div>
    </div>
)
}
