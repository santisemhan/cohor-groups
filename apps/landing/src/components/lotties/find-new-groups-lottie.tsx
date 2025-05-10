"use client";

import Lottie from "lottie-react";
import animationData from "../../../public/lottie/people.json";

export default function FindNewGroupsLottie() {
    return <Lottie animationData={animationData} className="flex justify-center items-center" loop={true} />
}