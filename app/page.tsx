"use client";
import React from "react";
import Image from "next/image";
import InterfaceCard from "../components/InterfaceCard";
import "../components/interfaceCard.scss";

export default function HomePage() {
  const KonamiImg = "./KonamiThumbnail.png";
  const interfaces = [
    {
      title: "Konami",
      imageSrc: KonamiImg,
      description:
        "The Konami interface allows users to look up player information and process payments using Konami player accounts.",
    },
    {
      title: "Stay",
      imageSrc: "/images/stay-interface.png",
      description:
        "The Stay interface enables searching for player information by card, phone, or other identifiers.",
    },
  ];

  return (
    <div className="homepage">
      <Image
        src={"/OTMSLogo.png"}
        width={350}
        height={200}
        alt={`OTMS Logo`}
        className="logo"
      />
      <h1 className="page-title">Welcome to OTMS Theme Creator</h1>
      <p className="page-subtitle">
        Select an Interface to begin customizing the theme!
      </p>
      <div className="interface-card-container">
        {interfaces.map((interfaceData, index) => (
          <InterfaceCard
            key={index}
            title={interfaceData.title}
            imageSrc={interfaceData.imageSrc}
            description={interfaceData.description}
          />
        ))}
      </div>
    </div>
  );
}
