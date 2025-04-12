import { getTranslations } from "next-intl/server"

export default async function Quote() {
  const t = await getTranslations("HOME.QUOTE")

  return (
    <section id="quote" className="flex flex-col items-center justify-center gap-8 w-full p-14 bg-transparent z-20">
      <blockquote className="max-w-3xl text-left px-4">
        <p className="text-xl md:text-2xl text-primary leading-relaxed tracking-tighter font-medium mb-6">
          {t("CONTENT")}
        </p>
        <div className="flex gap-4">
          <div className="size-10 rounded-full bg-primary border border-border">
            <img
              src="https://randomuser.me/api/portraits/men/91.jpg"
              alt="Alex Johnson"
              className="size-full rounded-full object-contain"
            />
          </div>
          <div className="text-left">
            <cite className="text-lg font-medium text-primary not-italic">Jane Doe</cite>
            <p className="text-sm text-primary">{t("TITLE")}</p>
          </div>
        </div>
      </blockquote>
    </section>
  )
}
