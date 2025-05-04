"use client"
import Lottie from "lottie-react"
import animationData from "../../../public/lottie/app-store.json"

import { HTMLAttributes } from "react";

export default function AppStoreLottie({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return <Lottie animationData={animationData} className="flex justify-center items-center size-48" loop={false}  {...props} />
}
