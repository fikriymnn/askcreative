import React from 'react'
import HoverEffect from '@/components/newcomps/service-card'
import CardHoverEffectDemo from '@/components/newcomps/card-2d'

function Services() {
  return (
    <>
      <p id="about" className="font-semibold text-3xl text-center pt-14 pb">
        Layanan Kami
      </p>
      <div
        id="getstart"
        className="w-full"
      >
        <CardHoverEffectDemo />
      </div>

    </>
  )
}

export default Services
