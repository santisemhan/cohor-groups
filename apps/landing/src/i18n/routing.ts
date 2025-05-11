import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  pathnames: {
    "/": "/",
    "/email-confirmed": {
      es: "/email-confirmado",
      en: "/email-confirmed"
    }
  }
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
