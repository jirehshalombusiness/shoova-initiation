import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("adminToken");

        if (token) {
            navigate("/admin");
        }

    }, [navigate]);

    const handleLogin = async () => {

        setLoading(true);

        try {

            const res = await fetch("https://shoova-initiation-yjg3.onrender.com/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.token) {

                localStorage.setItem("adminToken", data.token);
                localStorage.setItem("adminEmail", data.email);

                navigate("/admin");

            } else {
                alert("Invalid login");
            }

        } catch (error) {

            alert("Login failed");

        }

        setLoading(false);
    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white p-10 rounded-xl shadow w-96">

                <h1 className="text-2xl font-bold mb-6">
                    Admin Login
                </h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >

                    <input
                        placeholder="Email"
                        className="border p-3 w-full mb-4 rounded"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        placeholder="Password"
                        type="password"
                        className="border p-3 w-full mb-6 rounded"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white w-full py-3 rounded font-semibold hover:bg-green-700 flex justify-center items-center gap-2"
                    >

                        {loading ? (
                            <>
                                <div className="shoova-spinner"></div>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}

                    </button>
                    <p
                        className="text-sm text-blue-600 cursor-pointer mt-3"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot Password?
                    </p>

                </form>
            </div>

        </div>

    );
}
