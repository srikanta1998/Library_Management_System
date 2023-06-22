import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AdminLogin = () => {

    const [isLoggedIn2, setIsLoggedIn2] = useState(false);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password:''})

        const handleInput = (event) => {setCredentials({...credentials, [event.target.name]: event.target.value})}

        function isEmailValid(username) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(username);
        }
    
        function isPasswordValid(password) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        };

        const handleLogin = async (e) => {

            e.preventDefault();
        
            try{
                if(isEmailValid(credentials.username))
                {
                    if(isPasswordValid(credentials.password))
                    {
                        const response = await axios.post('http://localhost:9001/api/v00/validateadmin', JSON.stringify(credentials), 
                        {headers: {'Content-Type': 'application/json'}});

                        const output = response.data;

                        localStorage.setItem('isLoggedIn2', 'true');
                        setIsLoggedIn2(true);
                        alert(output);
                        navigate('/adminhomepage');
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
                <h2>Admin LogIn</h2><hr/>
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="username">email</label>
                    <input onChange={handleInput} type="email" placeholder="username" id="username" name="username" required/>
                    <label htmlFor="password">password</label>
                    <input onChange={handleInput} type="password" placeholder="********" id="password" name="password" required/>
                    <button type="submit">Log In</button>
                </form>        
            </div>
            </div>
        )
        
}