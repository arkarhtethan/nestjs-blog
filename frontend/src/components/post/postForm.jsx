import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../error/formError';
import { Spinner } from '../loader';
import SolidButton from '../submitButton/ solidButton';
import './postForm.css';

export default function PostForm () {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const [showModal, setShowModal] = useState(false);
    const [loading] = useState(false);
    const { title, tags, content } = getValues();

    const isValid = () => {
        return (title && title.length !== 0)
            && (content && content.length !== 0)
            && (tags && tags.length !== 0)
            && Object.entries(errors).length === 0
    }
    const onSubmit = (data) => {
        if (Object.entries(errors).length === 0) {
            setShowModal(false);
        }
    }

    return (
        <>
            <div className="flex mb-3 items-stretch">
                <input className="border-black border-2 py-0.5 flex-grow mr-2 pl-2" placeholder="Enter Post Title" onFocus={() => setShowModal(true)} />
                <button
                    className="bg-gray-800 text-white font-bold uppercase text-sm px-4 py-2 outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Create
                </button>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-xl">
                            {/*content*/}
                            <form onSubmit={handleSubmit(onSubmit)} method="post">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Create New Post
                                        </h3>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">

                                        <input
                                            {...register("title", {
                                                required: {
                                                    value: true,
                                                    message: "This field is required."
                                                },
                                                minLength: {
                                                    value: 5,
                                                    message: "Post title be at least 5 characters."
                                                }
                                            })}
                                            placeholder="Post Title"
                                            className="border-2 border-black p-2 md:mb-2 w-full"
                                        />
                                        {errors.title && <ErrorMessage message={errors.title.message} />}

                                        <select
                                            {...register("Category", {
                                                required: {
                                                    value: true,
                                                    message: "This field is required."
                                                },
                                                minLength: {
                                                    value: 5,
                                                    message: "Category must be selected."
                                                }
                                            })}
                                            placeholder="Category"
                                            className="border-2 border-black p-2 md:my-2 w-full bg-white"
                                        >
                                            <option value="0">Select Category</option>
                                            <option value="hello">Hello</option>
                                        </select>
                                        {errors.category && <ErrorMessage message={errors.category.message} />}

                                        <input
                                            {...register("tags", {
                                                required: {
                                                    value: true,
                                                    message: "This field is required."
                                                },
                                            })}
                                            placeholder="eg. python,html,css"
                                            className="border-2 border-black p-2 md:mb-2 w-full"
                                        />
                                        <small className="mb-2 text-xs block text-green-500 only"> Comma separated value. </small>
                                        {errors.tags && <ErrorMessage message={errors.tags.message} />}

                                        <textarea
                                            cols={15}
                                            {...register("content", {
                                                required: {
                                                    value: true,
                                                    message: "This field is required."
                                                },
                                                minLength: {
                                                    value: 25,
                                                    message: "Post content too short."
                                                }
                                            })}
                                            placeholder="Content"
                                            className="border-2 border-black p-2 w-full"
                                        />
                                        {errors.content && <ErrorMessage message={errors.content.message} />}
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        {loading ?
                                            <button type="submit" className={`bg-black text-white py-2 mb-4 flex justify-center cursor-wait`
                                            }> <Spinner /> </button > :
                                            <SolidButton type="submit" classes={`px-4 ${!isValid() && 'cursor-not-allowed bg-gray-600'}`} text="Save" isValid={isValid()} />}

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}
