import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import TextInput from "@/components/ui/Input/TextInput.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import { login } from "@/services";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = loginData.email.trim() !== "" && loginData.password.trim() !== "";
    const handleLogin = async () => {
        setLoading(true)
        login({
            email: loginData.email,
            password: loginData.password,
        })
        .then(() => {
            setLoading(false);
            navigate("/board?page=1");
        })
        .catch((error) => {
            setLoading(false);
            console.error("Login error:", error.response.data);
        });
    }

    return (
        <>
            <div className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <TextInput
                        id="email"
                        type="text"
                        value={loginData.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="Email Address"
                        inputClasses="mr-3"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        inputClasses="mr-3"
                    />
                </div>

                <div>
                    <Button btnClass="w-full" name="nextButton" disabled={!isFormValid} onClick={handleLogin}
                            loading={loading}>Sign In</Button>
                </div>
                <p className="mt-10 text-center text-gray-500">
                    Need an account? <a className="text-black cursor-pointer" onClick={() => {navigate("/register")}}>create one here.</a>
                </p>
            </div>
        </>
    )
}

export default HomePage;