"use client";
import Lottie from "lottie-react"
import animationData from "../../../public/lottie/messages.json";

export default function MessagesLottie() {
    return <Lottie animationData={animationData} className="flex justify-center items-center" loop={true} />
}