import Link from "next/link";
import Image from "next/image";
import { MapPinIcon, ClockIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { ADDRESS, MAIN_PHONES, EMAILS } from "@/content/contact";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-brand-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Institucional */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">OSPIQYP</h3>
            <p className="text-sm text-white leading-relaxed">
              Obra Social del Personal de Industrias Químicas y Petroquímicas.
              Compromiso con la salud de nuestros afiliados.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2 text-white">
                <MapPinIcon className="size-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <address className="not-italic">
                  {ADDRESS.street}
                  <br />
                  {ADDRESS.city}
                  <br />
                  ({ADDRESS.postalCode})
                </address>
              </div>
              <div className="flex items-center gap-2 text-white">
                <ClockIcon className="size-4 flex-shrink-0" aria-hidden="true" />
                <span>{ADDRESS.hours}</span>
              </div>
            </div>
          </div>

          {/* Teléfonos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Teléfonos</h3>
            <ul className="flex flex-col gap-2">
              {MAIN_PHONES.map((p) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="text-white hover:underline text-sm transition-colors"
                  >
                    {p.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Email + nav */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Email</h3>
            <ul className="flex flex-col gap-2 mb-4">
              {EMAILS.slice(0, 2).map((e) => (
                <li key={e.email}>
                  <a
                    href={`mailto:${e.email}`}
                    className="text-white hover:underline text-sm break-all transition-colors"
                  >
                    {e.email}
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/contacto"
              className="text-sm text-white hover:underline transition-colors inline-flex items-center gap-1"
            >
              Ver todos los contactos
              <ArrowTopRightOnSquareIcon className="size-3" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-brand-700 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white">
          <p>© {CURRENT_YEAR} OSPIQYP. Todos los derechos reservados.</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <a
              href="http://osocial2.homelinux.org/webmail/src/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              Correo interno (Webmail)
              <ArrowTopRightOnSquareIcon className="size-3" aria-hidden="true" />
            </a>
            <a
              href="http://osocial.homelinux.org:48888/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              Interior
              <ArrowTopRightOnSquareIcon className="size-3" aria-hidden="true" />
            </a>
            <a
              href="https://www.sssalud.gob.ar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Superintendencia de Servicios de Salud"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="inline-flex items-center rounded bg-white px-3 py-2">
                <Image
                  src="/images/logo-sss.png"
                  alt="Superintendencia de Servicios de Salud"
                  width={1336}
                  height={278}
                  className="h-7 w-auto"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
