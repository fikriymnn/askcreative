import { HoverEffect } from "./service-card";

function CardHoverEffectDemo() {
  return (
    <div className="md:grid sm:grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 gap-y-10 w-full">
      <HoverEffect items={projects} />;
    </div>
  );
}
export const projects = [
  {
    title: "Workshop Aromaterapi",

    link: "/packages",
  },
  {
    title: "Workshop Parfum",

    link: "/",
  },
  {
    title: "Buat Parfum dan Aromaterapi kamu sendiri",

    link: "/",
  },
  {
    title: "Alat Labolatorium Skala Mikro",

    link: "/",
  },
];

export default CardHoverEffectDemo;
