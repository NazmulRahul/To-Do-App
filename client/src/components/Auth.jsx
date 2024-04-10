/* eslint-disable react/prop-types */
import { useState } from "react";
const Auth = () => {
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
    const test = (e) => {
        e.preventDefault();
        console.log(user);
    };
    return (
            <div className="auth-container-box">
                <form >
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
                    <input type="submit" value="Submit" onClick={test} />
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
                            : "rgb(200,200,200)"
                        }}
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={() => setLogIn(true)}
                        style={{
                            backgroundColor: logIn
                                ? "rgb(230,230,230"
                                : "rgb(200,200,200)"
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
