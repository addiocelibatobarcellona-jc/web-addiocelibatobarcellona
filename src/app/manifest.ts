import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Addio al Celibato Barcellona",
    short_name: "Addio Celibato BCN",
    description:
      "Organizziamo addii al celibato e al nubilato a Barcellona dal 2017. Preventivo gratuito!",
    start_url: "/",
    display: "browser",
    background_color: "#080808",
    theme_color: "#3A75FF",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
