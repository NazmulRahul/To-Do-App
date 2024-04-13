/* eslint-disable react/prop-types */
import { useState } from "react";
const Auth = ({ setLoggedIn,getData,setEmail }) => {
    const [logIn, setLogIn] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmedPassword: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleAuth = async (event, action) => {
        event.preventDefault();
        if (!logIn && user.password !== user.confirmedPassword) {
            setError("password does not match");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/${action}`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc. // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "include",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(user),
            });
            // const response=await Axios.post(`http://localhost:5000/${action}`,{
            //     body:user
            // })
            const data = await response.json();
            if (data.detail) {
                setError(data.error);
                return;
            }
            if (response.status === 404) {
                setError(data.msg);
                return;
            }
            if (response.status === 200 ) {
        
                setEmail(user.email)
                getData()
                setLoggedIn(true);
                
                return;
            }
        } catch (error) {
            console.log("ERROR: ");
            console.log(error);
        }
    };
    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{logIn ? "Please Log In" : "Please Sign Up"}</h2>
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    {!logIn && (
                        <input
                            type="password"
                            placeholder="confirm password"
                            name="confirmedPassword"
                            value={user.confirmedPassword}
                            onChange={handleChange}
                        />
                    )}
                    <input
                        type="submit"
                        value="Submit"
                        onClick={() =>
                            handleAuth(event, logIn ? "login" : "signup")
                        }
                    />
                    {error && <p>{error}</p>}
                </form>
                <div className="auth-options">
                    <button
                        onClick={() => {
                            setError(null);
                            setLogIn(false);
                        }}
                        style={{
                            backgroundColor: !logIn
                                ? "rgb(230,230,230"
                                : "rgb(200,200,200)",
                        }}
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={() => setLogIn(true)}
                        style={{
                            backgroundColor: logIn
                                ? "rgb(230,230,230"
                                : "rgb(200,200,200)",
                        }}
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
