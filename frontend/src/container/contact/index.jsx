import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import FormError, { FormInputError } from '../../components/error/formError';
import { SubmitButton } from '../../components/submitButton';

export const Contact = () => {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const [loading, setLoading] = useState(false);
    const { email, phoneNumber, name } = getValues();
    console.log(errors);
    const onSubmit = () => {
        setLoading(true);
        console.log(getValues());
    }

    const isValid = () => {
        return (email && email.length !== 0)
            && (phoneNumber && phoneNumber.length !== 0)
            && (name && name.length !== 0)
            && Object.entries(errors).length === 0
    }

    return (
        <div className="lg:pt-16 py-12">
            <form className="flex flex-col mx-auto w-3/4 md:w-1/2 lg:w-1/3" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl mb-4 font-bold">Contact US </h2>
                <FormError message="Internal Server Error" />
                <div class="flex ">
                    <div className="w-full mr-2">
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
                            className="border-2 border-black p-2 md:mb-4 mb-8 w-full"
                        />
                        {errors.name && <FormInputError message={errors.name.message} />}
                    </div>
                    <div className="w-full">
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
                            className="border-2 border-black p-2 md:mb-4 mb-8 w-full"
                        />
                        {errors.email && <FormInputError message={errors.email.message} />}
                    </div>
                </div>

                <input
                    {...register("phoneNumber", {
                        required: {
                            value: true,
                            message: "This field is required."
                        }, minLength: {
                            value: 6,
                            message: "Phone Number must be at least 6 characters long."
                        }
                    })}
                    placeholder="Phone Number"
                    type="text"
                    className="border-2 border-black p-2 md:mb-4 mb-8 "
                />
                {errors.phoneNumber && <FormInputError message={errors.phoneNumber.message} />}
                <textarea
                    {...register("message", {
                        required: {
                            value: true,
                            message: "This field is required."
                        }, minLength: {
                            value: 6,
                            message: "Please provide details information."
                        }
                    })}
                    placeholder="Message"
                    type="text"
                    className="border-2 border-black p-2 md:mb-4 mb-8 "
                />
                {errors.message && <FormInputError message={errors.message.message} />}

                <SubmitButton buttonText="SUBMIT" loading={loading} isValid={isValid()} />
            </form>
        </div>
    )
}
