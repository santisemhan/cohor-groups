import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"
import { Locale, locales } from "./config"

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) return notFound()

  return {
    locale: locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
