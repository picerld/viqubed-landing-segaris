import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export function YoutubeIcon(
  props: SVGProps<SVGSVGElement> & {
    onClick?: () => void;
  },
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
      className={`cursor-pointer ${props.className ?? ""}`}
    >
      <path d="M22 12.06c0-2.62-.2-3.71-.2-3.71-.2-.86-.86-1.53-1.72-1.73C18.24 6.2 12 6.2 12 6.2s-6.24 0-8.08.42c-.86.2-1.53.87-1.72 1.73 0 0-.2 1.09-.2 3.71 0 2.62.2 3.71.2 3.71.19.86.86 1.53 1.72 1.73 1.84.42 8.08.42 8.08.42s6.24 0 8.08-.42a2.14 2.14 0 0 0 1.72-1.73s.2-1.09.2-3.71zM10.2 14.65V9.47l5.34 2.59-5.34 2.59z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.1 4.3c-2.24 0-3.78 1.37-3.78 3.87v2.27H7.75v2.96h2.57V21h3.18z" />
    </svg>
  );
}
