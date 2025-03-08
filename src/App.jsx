import React, { useRef } from "react";
import "./App.css";
import Header from "./components/Header/Index";
import Hero from "./components/Hero/Index";
import WhatDoWeProvide from "./components/WhatDoWeProvide/Index";
import Events from "./components/Events/Index";
import Nav from "./components/navbar/index";
import Markee from "./components/Markee/Index";
import Projects from "./components/Projects/Index";
import Footer from "./components/Footer/Index";
import CommunityDiscord from "./components/communityDiscord/Index";
import Navbar from "./components/navbar/index";

function App() {
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
      <Navbar sectionsRefs={sectionsRefs} />
      <div className="xl:mt-16 xl:mx-16 mt-8 mx-6">
        <section id="header" ref={headerRef}>
          <Header />
        </section>
        <section
          id="hero"
          ref={heroRef}
          className="xl:my-[220px] my-[110px] flex flex-col"
        >
          <Hero />
          <div className="mx-auto xl:mx-0">
            <Markee />
          </div>
        </section>

        <section id="whatDoWeProvide" ref={whatDoWeProvideRef}>
          <WhatDoWeProvide />
        </section>

        <section id="events" ref={eventsRef}>
          <Events />
        </section>

        <section id="projects" ref={projectsRef} className="md:block hidden">
          <Projects />
        </section>

        <section id="communityDiscord" ref={communityDiscordRef}>
          <CommunityDiscord />
        </section>
      </div>
      <section id="footer" ref={communityDiscordRef}>

        <Footer />
      </section>
    </>
  );
}

export default App;
