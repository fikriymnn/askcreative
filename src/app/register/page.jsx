'use client'
import React from 'react'
import CustomFooter from '@/components/CustomFooter';
import NavbarWithCTAButton from '@/components/NavbarWithCTAButton';

import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';

function Register() {
    return (
        <>
            <NavbarWithCTAButton />

            <div className='bg-black  '>
                <div className=' bg-cover bg-[url("/assets/images/login.jpg")] h-screen w-full flex justify-center items-center opacity-30 absolute'></div>
                <div className='h-screen flex justify-center items-center' >
                    <div className='w-[700px] mx-5 z-20'>

                        <Card >
                            <form className="flex flex-col gap-4 ">
                                <div>
                                    <div className="mb-2 block">
                                        <div>

                                            <p className='text-blue-500 font-semibold text-2xl mb-5'>Sign Up</p>
                                        </div>
                                        <Label
                                            htmlFor="Email"
                                            value="Email"
                                        />
                                    </div>
                                    <TextInput
                                        id="email"
                                        placeholder="Input Your Email"
                                        required
                                        type="email"
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="full name"
                                            value="full name"
                                        />
                                    </div>
                                    <TextInput
                                        id="fullname"
                                        placeholder="Input Your full name"
                                        required
                                        type="name"
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="Password"
                                            value="Password"
                                        />
                                    </div>
                                    <TextInput
                                        id="confirm password"
                                        placeholder="Confirm Your Password"
                                        required
                                        type="confirm password"
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="Confirm Password"
                                            value="Confirm Password"
                                        />
                                    </div>
                                    <TextInput
                                        id="confirmpassword"
                                        placeholder="Input Your Password"
                                        required
                                        type="confirmpassword"
                                    />
                                </div>
                                <div className="flex items-center gap-2">

                                </div>
                                <Button type="submit" className='bg-blue-500'>
                                    Sign Up
                                </Button>
                                <div className='flex gap-1'>
                                    <p>Already have an account ?</p>
                                    <a href="/login">
                                        <p className='font-semibold hover:text-blue-500 duration-100 ease-in-out'>Login</p>
                                    </a>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
            <CustomFooter />
        </>
    )
}

export default Register