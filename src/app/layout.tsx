import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://a-snextgen-ojxnhnmlu-enickas-projects.vercel.app"), // Change this after deployment

  title: "AS NEXTGEN Pvt Ltd | Turning Dreams Into Digital Reality",

  description:
    "AS NEXTGEN Pvt Ltd is a premier digital solutions and technology development company specializing in Website Development, Mobile Applications, Digital Transformation, and Student Career Growth.",

  keywords: [
    "AS NEXTGEN",
    "AS NEXTGEN Pvt Ltd",
    "Web Development Hungary",
    "App Development India",
    "Student Internship Tech",
    "Software Development Hungary",
    "Digital Transformation Solutions",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  authors: [{ name: "AS NEXTGEN Pvt Ltd" }],
  openGraph: {
    title: "AS NEXTGEN Pvt Ltd | Turning Dreams Into Digital Reality",
    description: "Specializing in premium web development, mobile applications, digital solutions, and student career growth.",
    url: "https://asnextgen.com",
    siteName: "AS NEXTGEN",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "AS NEXTGEN Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-background text-foreground transition-colors duration-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
