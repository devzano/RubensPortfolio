// src/components/ProjectCard.tsx
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

export type VariantLink = { label: string; href: string };

export type ProjectCardProps = {
  title: string;
  desc: string;
  href: string;
  icon: StaticImageData | string;
  iconAlt?: string;
  variants?: readonly VariantLink[];
  className?: string;
};

export default function ProjectCard({
  title,
  desc,
  href,
  icon,
  iconAlt = `${title} icon`,
  variants,
  className = "",
}: ProjectCardProps) {
  const base =
    "group rounded-2xl p-5 ring-1 ring-neutral-200 hover:ring-neutral-300 dark:ring-neutral-800 dark:hover:ring-neutral-700 transition";

  if (Array.isArray(variants) && variants.length > 0) {
    return (
      <div className={`${base} ${className}`}>
        <div className="flex items-start justify-between gap-3">
          <Link href={href} className="flex items-center gap-3 hover:opacity-90" aria-label={title}>
            <Image
              src={icon}
              alt={iconAlt}
              width={28}
              height={28}
              className="rounded-md ring-1 ring-black/10 dark:ring-white/10"
            />
            <span className="font-semibold tracking-tight hover:underline underline-offset-4">
              {title}
            </span>
          </Link>

          <div className="shrink-0 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400">
            {variants.map((v, i) => (
              <span key={v.label}>
                {i > 0 && <span className="mx-1 opacity-60">|</span>}
                <Link href={v.href} className="hover:underline">
                  {v.label}
                </Link>
              </span>
            ))}
          </div>
        </div>

        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
      </div>
    );
  }

  return (
    <Link href={href} className={`${base} ${className}`} aria-label={title}>
      <div className="flex items-start gap-3">
        <Image
          src={icon}
          alt={iconAlt}
          width={28}
          height={28}
          className="rounded-md ring-1 ring-black/10 dark:ring-white/10"
        />
        <div>
          <h3 className="font-semibold tracking-tight group-hover:underline underline-offset-4">{title}</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
        </div>
      </div>
    </Link>
  );
}