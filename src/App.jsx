import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Index";
import Hero from "./components/Hero/Index";
import WhatDoWeProvide from "./components/WhatDoWeProvide/Index";
import Events from "./components/Events/Index";
import Navbar from "./components/navbar/index";
import Markee from "./components/Markee/Index";
import Projects from "./components/Projects/Index";
import Footer from "./components/Footer/Index";
import CommunityDiscord from "./components/communityDiscord/Index";
import HeroImage from "./components/HeroImage";
import ElectroBotRumble from "./pages/ElectroBotRumble";
import AdminPage from "./pages/AdminPage";
import AddProjectsAdmin from "./pages/AddProjectsAdmin";
import AddEventsAdmin from "./pages/AddEventsAdmin";
function Home() {
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const whatDoWeProvideRef = useRef(null);
  const eventsRef = useRef(null);
  const projectsRef = useRef(null);
  const communityDiscordRef = useRef(null);

  const sectionsRefs = {
    header: headerRef,
    projects: projectsRef,
    events: eventsRef,
    communityDiscord: communityDiscordRef,
  };

  return (
    <>
      <ScrollingBanner />
      <Navbar sectionsRefs={sectionsRefs} />
      <div className="xl:mt-16 xl:mx-16 mt-8 mx-6">
        <section id="header" ref={headerRef}>
          <Header />
        </section>
        <section id="hero" ref={heroRef} className="xl:my-[110px] my-2 flex flex-col">
          <Hero />
          <div className="mx-auto xl:mx-0">
            <Markee />
          </div>
        </section>
        <HeroImage />
        <section id="whatDoWeProvide" ref={whatDoWeProvideRef}>
          <WhatDoWeProvide />
        </section>
        <section id="events" ref={eventsRef}>
          <Events />
        </section>
        <section id="projects" ref={projectsRef} className="">
          <Projects />
        </section>
        <section id="communityDiscord" ref={communityDiscordRef}>
          <CommunityDiscord />
        </section>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/electrobot-rumble" element={<ElectroBotRumble />} />
        <Route path="/electrobot-applications" element={<AdminPage />} />
        <Route path="/add-projects" element={<AddProjectsAdmin />} />
        <Route path="/add-events" element={<AddEventsAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
