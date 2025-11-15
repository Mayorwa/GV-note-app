import React, { useState } from 'react'
import TextInput from "@/components/ui/Input/TextInput.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import {register} from "@/services";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [registerData, useRegisterData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        useRegisterData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = registerData.fullName.trim() !== "" && registerData.password.trim() !== "" && registerData.email.trim() !== "" && registerData.confirmPassword.trim() !== "";
    const handleRegister = async () => {
        setLoading(true)
        register({
            fullName: registerData.fullName,
            email: registerData.email,
            confirmPassword: registerData.confirmPassword,
            password: registerData.password,
        })
            .then(()  => {
                setLoading(false);
                return navigate("/board?page=1");
            })
            .catch((error) => {
                setLoading(false);
                console.error("Sign Up error:", error.response.data);
            });
    }
    return (
        <>
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Full Name</label>
                    <TextInput
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={registerData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        inputClasses="mr-3"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <TextInput
                        id="email"
                        type="text"
                        name="email"
                        value={registerData.email}
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
                        value={registerData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        inputClasses="mr-3"
                    />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                    </div>
                    <TextInput
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        inputClasses="mr-3"
                    />
                </div>

                <div>
                    <Button btnClass="w-full" name="nextButton" disabled={!isFormValid} onClick={handleRegister} loading={loading}>Register</Button>
                </div>
                <p className="mt-10 text-center text-gray-500">
                    Already got an account? <a className="text-black cursor-pointer" onClick={() => {navigate("/")}}>sign in here.</a>
                </p>
            </div>
        </>
    )
}

export default RegisterPage;