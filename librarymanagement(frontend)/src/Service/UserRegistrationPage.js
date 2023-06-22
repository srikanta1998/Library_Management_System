import axios from "axios"
import React, {useState} from "react"
import { useNavigate } from "react-router-dom"

export const Register = (props) => {      

    const navigate = useNavigate();
    

    const [post, setPost] = useState({
        first_name: '',
        last_name: '',
        email: '',
        passwords: ''

    })

    function isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

    function isPasswordValid(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
      };

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    const handleClick = () => {

        navigate("/userloginpage")
    }

     async function handleSubmit(event) {

        event.preventDefault();
        try{
        if (isEmailValid(post.email)) {
            if(isPasswordValid(post.passwords)){
        await axios.post('http://localhost:9001/api/v1/adduser', JSON.stringify(post), 
        {headers: {'Content-Type': 'application/json'}});
        alert("Registration Successful!");
        navigate("/userloginpage");
            }       
    else {
        alert("Password format is invalid!");
      }
    }
    else {
        alert("Email format is invalid!");
      }
    }catch(error){
        console.error(error);
        alert("Email Already Exists!")
    }
    }

    return (
        <div className='App2'>
        <div className="auth-form-container">
            <h2>Register</h2><hr/>
            <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="first_name">First Name</label>
            <input onChange={handleInput} type="text" placeholder="First_Name" id="first_name" name="first_name" required/>
            <label htmlFor="last_name">Last Name</label>
            <input onChange={handleInput} type="text" placeholder="Last_Name" id="last_name" name="last_name" required/>
            <label htmlFor="email">email</label>
            <input onChange={handleInput} type="email" placeholder="Email" id="email" name="email" required/>
            <label htmlFor="passwords">password</label>
            <input onChange={handleInput} type="password" placeholder="********" id="passwords" name="passwords" required/>
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={handleClick}>Already have an account? Login here.</button>
    </div>
    </div>
    )
}