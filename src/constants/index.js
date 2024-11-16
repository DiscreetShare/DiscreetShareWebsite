import { send, shield, star  } from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "upload",
    title: "Upload",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Free & more..",
    content:
      "With DiscreetShare, you can upload your files for free and with total anonymity.",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Untraceable",
    content:
      "We take care to remove all the informations that could potentially trace back to you.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Fast and Unlimited",
    content:
      "Experience the freedom of unlimited file size and bandwidth speed with our service.",
  },
];


export const footerLinks = [
  {
    title: "For Developers",
    links: [
      {
        name: "API Documentation",
        link: "https://docs.discreetshare.com/",
      },
      {
        name: "Status Page",
        link: "https://status.discreetshare.com/",
      },
    ],
  },
  {
    title: "Information ",
    links: [
      {
        name: "Blog Page",
        link: "https://blog.discreetshare.com/",
      },
      {
        name: "Submit Abuse",
        link: "mailto:abuse@discreetshare.com?subject=Abuse%20Report",
      },
    ],
  },
  {
    title: "Social Media",
    links: [
      {
        name: "Discord",
        link: "https://discord.gg/CVxaB3rPuJ",
      },
    ],
  },
];