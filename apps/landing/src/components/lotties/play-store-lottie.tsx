"use client"
import Lottie from "lottie-react"
import animationData from "../../../public/lottie/google-play.json"
import { HTMLAttributes } from "react"

export default function PlayStoreLottie({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return <Lottie animationData={animationData} loop={false} className="flex justify-center items-center" {...props} />
}
