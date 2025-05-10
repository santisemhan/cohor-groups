import { getTranslations } from "next-intl/server"
import MessagesLottie from "./lotties/messages-lottie"
import PlaceholderLottie from "./lotties/placeholder-lottie"
import FindNewGroupsLottie from "./lotties/find-new-groups-lottie"

export default async function Features() {
  const t = await getTranslations("HOME.FEATURES")

  return (
    <section id="bento" className="relative flex w-full flex-col items-center justify-center px-5 md:px-10">
      <div className="relative mx-5 border-x md:mx-10">
        <div className="absolute -left-4 top-0 h-full w-4 bg-[size:10px_10px] text-primary/5 [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] md:-left-14 md:w-14"></div>
        <div className="absolute -right-4 top-0 h-full w-4 bg-[size:10px_10px] text-primary/5 [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] md:-right-14 md:w-14"></div>

        <div className="h-full w-full border-b p-10 md:p-14">
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-2">
            <h2 className="pb-1 text-center text-3xl font-medium tracking-tighter text-balance md:text-4xl">
              {t("TITLE")}
            </h2>
            <p className="text-center font-medium text-muted-foreground text-balance">{t("DESCRIPTION")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 overflow-hidden md:grid-cols-2">
          <div className="group relative flex min-h-[600px] cursor-pointer flex-col items-start justify-end p-0.5 before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] md:min-h-[500px]">
            <div className="relative flex size-full items-center justify-center overflow-hidden">
              <FindNewGroupsLottie />
            </div>

            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-lg font-semibold tracking-tighter">{t("FEATURE_1.TITLE")}</h3>
              <p className="text-muted-foreground">{t("FEATURE_1.DESCRIPTION")}</p>
            </div>
          </div>

          <div className="group relative flex min-h-[600px] cursor-pointer flex-col items-start justify-end p-0.5 before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] md:min-h-[500px]">
            <div className="relative flex size-full items-center justify-center overflow-hidden">
              <PlaceholderLottie />
            </div>

            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-lg font-semibold tracking-tighter">{t("FEATURE_2.TITLE")}</h3>
              <p className="text-muted-foreground">{t("FEATURE_2.DESCRIPTION")}</p>
            </div>
          </div>

          <div className="group relative flex min-h-[600px] cursor-pointer flex-col items-start justify-end p-0.5 before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] md:min-h-[500px]">
            <div className="relative flex size-full items-center justify-center overflow-hidden">       
              <PlaceholderLottie />
            </div>

            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-lg font-semibold tracking-tighter">{t("FEATURE_3.TITLE")}</h3>
              <p className="text-muted-foreground">{t("FEATURE_3.DESCRIPTION")} </p>
            </div>
          </div>

          <div className="group relative flex min-h-[600px] cursor-pointer flex-col items-start justify-end p-0.5 before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] md:min-h-[500px]">
            <div className="relative flex size-full items-center justify-center overflow-hidden">
              <MessagesLottie />
            </div>

            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-lg font-semibold tracking-tighter">{t("FEATURE_4.TITLE")}</h3>
              <p className="text-muted-foreground">{t("FEATURE_4.DESCRIPTION")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
