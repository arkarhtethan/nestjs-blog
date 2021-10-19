import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import FormError, { FormInputError } from '../../components/error/formError';
import { SubmitButton } from '../../components/submitButton';

export const Register = () => {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const [loading, setLoading] = useState(false);
    const { email, password, name } = getValues();
    console.log(errors);
    const onSubmit = () => {
        setLoading(true);
        console.log(getValues());
    }

    const isValid = () => {
        return (email && email.length !== 0)
            && (password && password.length !== 0)
            && (name && name.length !== 0)
            && Object.entries(errors).length === 0
    }

    return (
        <div className="lg:pt-16 py-12">
            <form className="flex flex-col mx-auto w-3/4 md:w-1/2 lg:w-1/3" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl mb-4 font-bold">Create Your Account </h2>
                <FormError message="Internal Server Error" />
                <input
                    {...register("name", {
                        required: {
                            value: true,
                            message: "This field is required."
                        },
                        minLength: {
                            value: 5,
                            message: "Your name must be at least 5 characters."
                        }
                    })}
                    placeholder="Name"
                    className="border-2 border-black p-2 md:mb-4 mb-8"
                />
                {errors.name && <FormInputError message={errors.name.message} />}
                <input
                    {...register("email", {
                        required: {
                            value: true,
                            message: "This field is required."
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    placeholder="Email Address"
                    type="email"
                    className="border-2 border-black p-2 md:mb-4 mb-8 "
                />
                {errors.email && <FormInputError message={errors.email.message} />}
                <input
                    {...register("password", {
                        required: {
                            value: true,
                            message: "This field is required."
                        }, minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long."
                        }
                    })}
                    placeholder="Password"
                    type="password"
                    className="border-2 border-black p-2 md:mb-4 mb-8 "
                />
                {errors.password && <FormInputError message={errors.password.message} />}
                <SubmitButton buttonText="REGISTER" loading={loading} isValid={isValid()} />
                <div className="flex text-gray-400">
                    <div className="h-4 border-gray-500 border-b-2 w-1/2"></div>
                    <span className="font-black mx-1 mt-1">OR</span>
                    <div className="h-4 border-gray-500 border-b-2 w-1/2"></div>
                </div>
                <Link to="/login" className="mt-4 text-center border-black border-2 text-black py-2 h-10"> LOGIN </Link>
            </form>
        </div>
    )
}
