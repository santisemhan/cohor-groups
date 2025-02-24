import InstagramIcon from "@/components/icons/instagram-icon"
import LinkedInIcon from "@/components/icons/linkedin-icon"
import TiktokIcon from "@/components/icons/tiktok-icon"

import { Button } from "@/components/ui/button"

export default function EmailConfirmated() {
  return (
    <div className="bg-[url('/EmailConfirmed.png')] bg-cover bg-center bg-no-repeat h-screen w-screen flex flex-col justify-center items-center gap-14 px-8 md:px-0">
      <div className="flex flex-col gap-10 items-center justify-center">
        <h1 className="font-semibold text-headline-small uppercase text-white">Cohor</h1>
        <div className="flex flex-col gap-4 items-center justify-center">
          <h2 className="font-bold text-headline-medium text-center text-white">¡Email confirmado con éxito!</h2>
          <p className="font-normal text-body-small text-center text-white w-[300px] md:w-[390px]">
            Gracias por verificar tu cuenta. Ya podés empezar a conectar con otros grupos en Cohor
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-16 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <Button variant="outline" className="rounded-full font-semibold w-[365px] py-7">
            Abrir app
          </Button>
          <small className="text-label-large text-center text-white">
            Si no se redirige automáticamente en unos segundos, hacé{" "}
            <span className="underline cursor-pointer">click acá</span>
          </small>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 px-2 md:flex-row">
          <span className=" text-white text-body-small-w-medium">Nos vemos adentro, El equipo de Cohor &#x270C;</span>
          <div className="flex justify-center items-center gap-4">
            <TiktokIcon fill="#fff" className="cursor-pointer" />
            <InstagramIcon fill="#fff" className="cursor-pointer" />
            <LinkedInIcon fill="#fff" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}
