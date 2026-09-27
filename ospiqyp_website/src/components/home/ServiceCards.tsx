import Link from "next/link";
import {
  FaceSmileIcon,
  IdentificationIcon,
  EyeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BeakerIcon,
  ShieldCheckIcon,
  PhoneArrowUpRightIcon,
  MapPinIcon,
  GlobeAltIcon,
  TicketIcon,
  BuildingOffice2Icon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import { SERVICES, type Service } from "@/content/services";

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;

const ICON_MAP: Record<Service["iconName"], IconCmp> = {
  "face-smile": FaceSmileIcon,
  identification: IdentificationIcon,
  eye: EyeIcon,
  "user-group": UserGroupIcon,
  "document-text": DocumentTextIcon,
  beaker: BeakerIcon,
  "shield-check": ShieldCheckIcon,
  "phone-arrow-up-right": PhoneArrowUpRightIcon,
  "map-pin": MapPinIcon,
  "globe-alt": GlobeAltIcon,
  ticket: TicketIcon,
  "building-office-2": BuildingOffice2Icon,
};

export function ServiceCards() {
  return (
    <section className="py-16 md:py-20 bg-white" aria-labelledby="services-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Nuestros servicios
          </h2>
          <p className="text-lg text-[color:var(--color-fg-soft)]">
            Cobertura integral en todas las prestaciones esenciales para tu salud y la de tu familia.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.iconName];
            const isExternal = /^https?:\/\//.test(service.href);
            const cardClassName =
              "group flex flex-col h-full p-6 bg-white border border-[color:var(--color-border)] rounded-xl hover:border-brand-600 hover:shadow-lg transition-all";
            const cardInner = (
              <>
                <div className="size-12 rounded-lg bg-brand-50 group-hover:bg-brand-600 text-brand-700 group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-[color:var(--color-fg-soft)] text-sm flex-1 mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-brand-700 font-medium text-sm group-hover:gap-2 transition-all">
                  Conocer más
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </span>
              </>
            );
            return (
              <li key={service.id}>
                {isExternal ? (
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {cardInner}
                  </a>
                ) : (
                  <Link href={service.href} className={cardClassName}>
                    {cardInner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
