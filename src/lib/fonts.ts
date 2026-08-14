import localFont from "next/font/local";

/**
 * VCFO typography — fully self-hosted via next/font/local:
 * no runtime Google Fonts requests, no build-time network dependency,
 * no layout shift, Arabic-first font stack.
 */
export const sansArabic = localFont({
  variable: "--font-sans-ar",
  display: "swap",
  src: [
    {
      path: "../assets/fonts/NotoSansArabic_400Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/NotoSansArabic_500Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/NotoSansArabic_600SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/NotoSansArabic_700Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const sansLatin = localFont({
  variable: "--font-sans-en",
  display: "swap",
  src: [
    {
      path: "../assets/fonts/IBMPlexSans_400Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/IBMPlexSans_500Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/IBMPlexSans_600SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/IBMPlexSans_700Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const mono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    {
      path: "../assets/fonts/IBMPlexMono_400Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/IBMPlexMono_500Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/IBMPlexMono_600SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
});
