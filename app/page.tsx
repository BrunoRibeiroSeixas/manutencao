import HeroSection from "@/components/HeroSection"
import Footer from "@/components/Footer"

export const metadata = {
  title: 'Site em Manutenção',
  description: 'Este site está temporariamente fora do ar para manutenção. Por favor, volte mais tarde.',
  icons: {
    icon: [
      { rel: 'icon', url: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', url: '/favicon.png' },
    ],
  },
};

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl ">
        <HeroSection />
        <Footer />
      </main>
    </>
  )
}