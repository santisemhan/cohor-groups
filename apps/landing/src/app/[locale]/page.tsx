import Features from "@/components/features"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import { Navigation } from "@/components/navigation"
import Quote from "@/components/quote"
import { getTranslations } from "next-intl/server"

export default async function IndexPage() {
  return (
    <Navigation>
      <main className="flex flex-col items-center justify-center divide-y divide-border min-h-screen w-full">
        <Hero />
        <Features />
        <Quote />
        <Footer />
      </main>
    </Navigation>
  )
}

export async function generateMetadata() {
  const t = await getTranslations("HOME")

  return {
    title: t("TITLE")
  }
}
