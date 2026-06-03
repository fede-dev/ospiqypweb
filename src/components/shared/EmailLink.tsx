import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

interface EmailLinkProps {
  email: string;
  label?: string;
  className?: string;
}

export function EmailLink({ email, label, className }: EmailLinkProps) {
  return (
    <a
      href={`mailto:${email}`}
      aria-label={label ? `Enviar email a ${label}: ${email}` : `Enviar email a ${email}`}
      className={cn(
        "inline-flex items-center gap-2 text-brand-700 hover:text-brand-800 transition-colors",
        className,
      )}
    >
      <EnvelopeIcon className="size-4" aria-hidden="true" />
      <span className="break-all">{email}</span>
    </a>
  );
}
