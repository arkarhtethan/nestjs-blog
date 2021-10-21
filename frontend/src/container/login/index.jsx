import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import FormError, { ErrorMessage } from '../../components/error/formError';
import { SubmitButton } from '../../components/submitButton';

export const Login = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({ mode: "onChange" });
    const [loading, setLoading] = useState(false);
    const { email, password } = getValues();
    const onSubmit = (values) => {
        setLoading(true)
        console.log(values)
        console.log(errors);
    }

    const isValid = () => {
        return (email && email.length !== 0) && (password && password.length !== 0) && Object.entries(errors).length === 0;
    }

    return (
        <div className="py-28" >
            <form className="flex flex-col mx-auto w-3/4 md:w-1/2 lg:w-1/3" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl mb-4 font-bold">Log In To Your Account </h2>
                <FormError message={"Internal Server Error."} />
                <input
                    {...register("email", {
                        required: "Please enter an email address",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    placeholder="user@example.com"
                    className="border-2 border-gray-500 p-2 md:mb-4" />
                {errors.email && <ErrorMessage message={errors.email.message} />}
                <input
                    {...register("password", {
                        minLength: {
                            value: 6,
                            message: "The password must be at least 6 characters long."
                        }, required: "This field is required."
                    })}
                    type="password"
                    placeholder="*******"
                    className="border-2 border-gray-500 p-2 md:mb-4 mb-8"
                />
                {errors.password && <ErrorMessage message={errors.password.message} />}
                {/* use in nromal design */}
                <SubmitButton loading={loading} buttonText="Login" isValid={isValid()} />
                {/* when sending request */}
                <Link to="/register" className="text-center border-black border-2 text-black py-2"> REGISTER </Link>
            </form>
        </div>
    )
}
