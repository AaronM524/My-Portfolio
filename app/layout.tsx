import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import Script from "next/script";
import { initScript } from "@/components/scripts";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "./globals.css";

const description =
  "Aaron Mathew: Computer Science student at Stevens Institute of Technology building full-stack web apps with Next.js, TypeScript and Supabase.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Software Engineer`,
  description,
  openGraph: { title: `${site.name} | Software Engineer`, description, url: site.url, type: "website" },
  twitter: { card: "summary", title: site.name, description },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f2f3f7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    alumniOf: "Stevens Institute of Technology",
    sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </head>
      <body>
        {children}
        <Script src="/enhance.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
