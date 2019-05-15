import React from 'react'

import IntroSection from './layout/landing/intro-section'
import InfoSection from './layout/landing/info-section'
import Curve from './layout/landing/curve'
import Reviews from './layout/landing/reviews'
import Access from './layout/landing/access'
import FooterSection from './layout/landing/footer-section'
import Navigation from './layout/landing/navigation'

const LandingPage = () => (
  <div>
    <Navigation />
    <IntroSection />
    <Curve />
    <InfoSection />
    <Reviews />
    <Access />
    <FooterSection />
  </div>
)

export default LandingPage
