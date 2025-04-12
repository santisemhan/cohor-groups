"use client";

import Lottie from "lottie-react";
import animationData from "../../../public/lottie/placeholder.json";

export default function PlaceholderLottie() {
    return <Lottie animationData={animationData} className="flex justify-center items-center" loop={true} />
}