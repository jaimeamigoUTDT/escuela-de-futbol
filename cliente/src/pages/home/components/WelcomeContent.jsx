"use client"

import NewsSection from "./NewsSection"
import "./welcomeContent.css"

function WelcomeContent() {
  return (
    <div className="content-card">
      <h1>Bienvenido a la Escuela de Fútbol</h1>
      <p>Aquí encontrarás toda la información sobre partidos, resultados y torneos de nuestra escuela de fútbol.</p>

      <NewsSection />
    </div>
  )
}

export default WelcomeContent
