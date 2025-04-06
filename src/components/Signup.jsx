
import React, { useState } from 'react'
import { createUser, getCurrentUser } from '../services/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Input } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Logo from '../assets/streamflix-logo.png'
import Button from '@mui/material/Button'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")

        try {
            const formData = new FormData()
            formData.append("fullname", data.name)
            formData.append("username", data.username)
            formData.append("email", data.email)
            formData.append("password", data.password)
            formData.append("avatar", data.avatar[0])
            formData.append("coverImage", data.coverImage[0])

            const userData = await createUser(formData)

            if (userData) {
                const currentUser = await getCurrentUser()
                if (currentUser) dispatch(login(currentUser))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[100vh] bg-white">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
                <div className=" flex justify-center">
                    <span className="inline-block w-full ">
                        <img src={Logo} alt="StreamFlix Logo" className='ml-20 w-[200px] object-contain h-auto' />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold text-black">Sign Up</h2>
                <p className="mt-2 text-center text-m text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-6 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-6 space-y-4">
                    <Input
                        label="Full Name:"
                        placeholder="Enter your full name"
                        {...register("name", { required: true })}
                    />
                    <Input
                        label="Username:"
                        placeholder="Enter your username"
                        {...register("username", { required: true })}
                    />                      
                    <Input
                        label="Email:"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be valid",
                            },
                        })}
                    />
                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avatar:</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("avatar", { required: true })}
                            className="block w-full text-sm text-gray-500
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-lg file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-blue-50 file:text-blue-700
                                       hover:file:bg-blue-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("coverImage", { required: true })}
                            className="block w-full text-sm text-gray-500
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-lg file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-purple-50 file:text-purple-700
                                       hover:file:bg-purple-100"
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Signup
