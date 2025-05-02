import Features from "@/components/features"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import { Navigation } from "@/components/navigation"
import Quote from "@/components/quote"
import { getTranslations } from "next-intl/server"

export default async function IndexPage() {
  return (
    <div className="max-w-7xl mx-auto border-x relative">
      <Navigation>
        <div className="flex flex-col items-center justify-center divide-y divide-border min-h-screen w-full">
          <Hero />
          <Features />
          <Quote />
          <Footer />
        </div>
      </Navigation>
    </div>
  )
}

export async function generateMetadata() {
  const t = await getTranslations("HOME")

  return {
    title: t("TITLE")
  }
}
