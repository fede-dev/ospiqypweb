"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

export type AccordionItemData = {
  id: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
};

interface AccordionProps {
  items: AccordionItemData[];
  /** Permitir varios abiertos a la vez (default: uno solo). */
  multiple?: boolean;
  className?: string;
}

/**
 * Acordeón accesible (Radix) para secciones desplegables/toggles.
 * Usado en Coberturas, Prestadores, Farmacias y Ópticas.
 */
export function Accordion({ items, multiple = false, className }: AccordionProps) {
  const common = {
    className: cn(
      "divide-y divide-[color:var(--color-border)] rounded-xl border border-[color:var(--color-border)] bg-white overflow-hidden",
      className,
    ),
  };

  const renderItems = items.map((item) => (
    <RadixAccordion.Item
      key={item.id}
      value={item.id}
      className="scroll-mt-24"
      id={item.id}
    >
      <RadixAccordion.Header>
        <RadixAccordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-[color:var(--color-fg)] hover:bg-brand-50 transition-colors data-[state=open]:bg-brand-50 data-[state=open]:text-brand-700">
          <span>{item.trigger}</span>
          <ChevronDownIcon
            className="size-5 flex-shrink-0 text-brand-600 transition-transform duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="px-5 pb-5 pt-1 text-[color:var(--color-fg-soft)] leading-relaxed">
          {item.content}
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  ));

  return multiple ? (
    <RadixAccordion.Root type="multiple" {...common}>
      {renderItems}
    </RadixAccordion.Root>
  ) : (
    <RadixAccordion.Root type="single" collapsible {...common}>
      {renderItems}
    </RadixAccordion.Root>
  );
}
