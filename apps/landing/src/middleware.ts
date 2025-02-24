import createMiddleware from "next-intl/middleware"
import { locales } from "./config"

export default createMiddleware({
  locales,
  defaultLocale: "es"
})

export const config = {
  matcher: ["/", "/(en|es)/:path*"]
}
