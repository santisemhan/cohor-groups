import InstagramIcon from "@/components/icons/instagram-icon"
import LinkedInIcon from "@/components/icons/linkedin-icon"
import TiktokIcon from "@/components/icons/tiktok-icon"
import { Button } from "@/components/ui/button"
import Manifest from "@/manifest"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import Link from "next/link"

export default async function EmailConfirmated() {
  const t = await getTranslations("EMAIL.CONFIRMATION")

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen w-screen flex flex-col justify-center items-center gap-6 px-8 md:px-0"
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
          radial-gradient(80.06% 50% at 50% 50%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.9) 90%),
          url("/image/EmailConfirmed.png")
        `
      }}
    >
      <div className="flex flex-col gap-10 items-center justify-center">
        <Link
          href="#"
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
        >
          <Image src="/image/logo.svg" alt="logo" width={75} height={75} />
        </Link>
        <div className="flex flex-col gap-4 items-center justify-center">
          <h2 className="font-bold text-2xl md:text-3xl text-center text-white">{t("TITLE")}</h2>
          <p className="font-normal text-xs md:text-sm text-center text-white w-[300px] md:w-[390px]">
            {t("DESCRIPTION")}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-16 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <Button variant="gradient" className="rounded-full font-semibold w-[365px]">
            {t("OPEN_APP")}
          </Button>
          <small className="text-label-large text-center text-white">
            {t("NOT_REDIRECTION")}{" "}
            <span className="underline cursor-pointer">{t("CLICK_HERE")}</span>
          </small>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 px-2 md:flex-row">
          <span className=" text-white text-sm">{t("REGARDS")} &#x270C;</span>
          <div className="flex justify-center items-center gap-4">
            <Link href={Manifest.TIKTOK_URL} target="_blank">
              <TiktokIcon fill="#fff" />
            </Link>
            <Link href={Manifest.INSTAGRAM_URL} target="_blank">
              <InstagramIcon fill="#fff" />
            </Link>
            <Link href={Manifest.LINKEDIN_URL} target="_blank">
              <LinkedInIcon fill="#fff" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata() {
  const t = await getTranslations("EMAIL.CONFIRMATION")

  return {
    title: `Cohor | ${t("TITLE")}`
  }
}
