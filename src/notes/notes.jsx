/*

import Header from './components/header/PcbHeader3' ; is the best look so far but everything is screwed up and I don't feel like fixing it right now (bedtime);

Will keep original Header File for now

index.js is where all my input lives. 







{

    title: "Software Developer & Embedded Systems",

    company_name: "Applied Wireless",

    icon: AppliedWireless,

    iconBg: "#E6DEDD",

    date: "August 2024 - Present",

    role_description: "Serve as the technical lead for critical software and hardware initiatives within the company's RF and audio product lines. Developed a real-time Android application for embedded hardware control, engineered custom communication protocols, and resolved complex legacy hardware issues.",

    points: [

        "Served as the sole developer and technical lead for a real-time Android (Ionic React + Capacitor) application for embedded brake and vehicle control",

        "Designed the entire 10-byte custom bidirectional packet structure and communication API from scratch to interface with the hardware engineer’s PIC16 ASM implementation",

        "Architected and maintained the full phone and ESP32 side of the stack (JavaScript → BLE → ESP32 C++ → UART), including checksum validation, handshake protocol, and exponential backoff with guaranteed eventual delivery",

        "Achieved 1.67-second average round-trip latency",

        "Implemented selective optimistic UI, GPS + accelerometer-based vehicle profile auto-locking (>5 mph threshold requiring full stop to change), longPressHandler for continuous value adjustment, automatic profile recall on reconnect, PIN protection system, and safety-critical guaranteed brake command logic (queued and sent 2× with explicit latch)",

        "Designed and built the complete UI/UX from scratch in Figma, including dark mode, custom animated Lottie splash screen (created in After Effects), dynamic text formatting/highlighting system, help menu, and a real-time linear gradient brake force visualization driven by stage voltage and vehicle profile",

        "Self-taught C++, ESP32 development, binary/hexadecimal protocol design, and low-level BLE integration to successfully deliver the application",

        "Investigated and resolved a 12-year-old audio whine/grounding issue on the PAR900M legacy RF product line. Became the sole builder and quality assurance tester for that line as well as technical support should past customers need their product fixed.",

        "Identified missing decoupling capacitors and improper grounding near the oscillator/RF section through systematic board probing and testing. Implemented fixes that enabled continued sale of existing inventory instead of total loss",

        "Manage the complete building and testing lifecycle for every iteration of the PAR900M, PAT900, and related audio/RF products (including Si4703 FM receiver modules)",

        "Assumed full technical responsibility for all sequential iterations of the Eagle Eye Transmitter/Receiver product line after initial rollout",

        "Direct firmware flashing and modification (hex frequency band adjustments to prevent crosstalk), full assembly, CNC machining of cases, functional testing, and quality control",

        "Delivered 200+ units with only one RMA (software-related bug)",

        "Designed and implemented improved RF testing procedures, replacing ineffective Mylar bag testing with a modified Faraday cage + LED pass/fail indicators",

        "The Faraday cage dramatically increased testing reliability and ensured consistent performance validation across all units",

        "Created product manuals and custom visual artwork to improve customer understanding of product connections and setup",

        "Self-taught Fusion 360 and produced accurate .STEP file models of multiple products for direct customer delivery"

    ],

}





"Built a real-time Android application for embedded hardware control while working on RF and audio product lines at the embedded level. Built the communication protocol, created and designed the user interface, and solved hardware issues.",
    points: [

      ------------
      "Architected and solo-developed a real-time Android (Ionic React + Capacitor) application for embedded brake and vehicle control",
      "Designed the entire 10-byte custom bidirectional packet structure and communication API from scratch to interface with the hardware engineer’s PIC16 ASM implementation",
      "Handled the full phone and ESP32 side of the stack (JavaScript → BLE → ESP32 C++ → UART), including checksum validation, handshake protocol, and exponential backoff with guaranteed eventual delivery",
      "Achieved 1.67-second average round-trip latency",
      "Implemented selective optimistic UI, GPS + accelerometer-based vehicle profile auto-locking (>5 mph threshold requiring full stop to change), longPressHandler for continuous value adjustment, automatic profile recall on reconnect, PIN protection system, and safety-critical guaranteed brake command logic (queued and sent 2× with explicit latch)",
      "Given full creative control, designed and built the complete UI/UX from scratch in Figma, including dark mode, custom animated Lottie splash screen (created in After Effects), dynamic text formatting/highlighting system, help menu, and a real-time linear gradient brake force visualization driven by stage voltage and vehicle profile",
      "Self-taught C++, ESP32 development, binary/hexadecimal protocol design, and low-level BLE integration to deliver the entire application",

      ------------
      "Investigated and resolved a 12-year-old audio whine/grounding issue on the PAR900M legacy RF product line (which I now work on)",
      "Identified missing decoupling capacitors and improper grounding near the oscillator/RF section through systematic board probing and testing. Implemented fixes that enabled continued sale of existing inventory instead of total loss",
      "Independently build and test every iteration of the PAR900M, PAT900, and related audio/RF products (including Si4703 FM receiver modules)",

      ------------
      "Handled all sequential iterations of the Eagle Eye Transmitter/Receiver product line after initial rollout",
      "Independently handle firmware flashing and modification (hex frequency band adjustments to prevent crosstalk), full assembly, CNC machining of cases, functional testing, and quality control",
      "Delivered 200+ units with only one RMA (software-related bug)",

      ------------
      "Designed and implemented improved RF testing procedures, replacing ineffective Mylar bag testing with a modified Faraday cage + LED pass/fail indicators which dramatically increased testing reliability and ensured consistent performance validation across all units",

      ------------
      "Created product manuals and custom visual artwork to improve customer understanding of product connections and setup",

      ------------
      "Self-taught Fusion 360 and produced accurate .STEP file models of multiple products for direct customer delivery"



      {
    title: "Software Developer & Embedded Systems",
    company_name: "Applied Wireless",
    icon: AppliedWireless,
    iconBg: "#E6DEDD",
    date: "August 2024 - Present",
    role_description: "Built a real-time Android application for embedded hardware control while working on RF and audio product lines at the embedded level. Built the communication protocol, created and designed the user interface, and solved hardware issues.",

    points: [
        "--- EMBEDDED CONTROL APPLICATION & UI/UX ---",
        "Architected and solo-developed a real-time Android (Ionic React + Capacitor) application for embedded brake and vehicle control.",
        "Designed and built the complete UI/UX from scratch in Figma, including dark mode, custom animated Lottie splash screen (created in After Effects), dynamic text formatting/highlighting system, help menu, and a real-time linear gradient brake force visualization driven by stage voltage and vehicle profile.",
        "Designed the entire 10-byte custom bidirectional packet structure and communication API from scratch to interface with the hardware engineer’s PIC16 ASM implementation.",
        "Developed the full phone and ESP32 side of the stack (JavaScript → BLE → ESP32 C++ → UART), including checksum validation, handshake protocol, and exponential backoff with guaranteed eventual delivery.",
        "Achieved 1.67-second average round-trip latency.",
        "Implemented selective optimistic UI, GPS + accelerometer-based vehicle profile auto-locking (>5 mph threshold requiring full stop to change), longPressHandler for continuous value adjustment, automatic profile recall on reconnect, PIN protection system, and safety-critical guaranteed brake command logic (queued and sent 2× with explicit latch).",
        "Self-taught C++, ESP32 development, binary/hexadecimal protocol design, and low-level BLE integration.",
        
        "--- RF & AUDIO PRODUCT LINES (PAR900M / PAT900) ---",
        "Investigated and resolved a 12-year-old audio whine/grounding issue on the PAR900M legacy RF product line.",
        "Identified missing decoupling capacitors and improper grounding near the oscillator/RF section through systematic board probing and testing using a spectrum analyzer and oscilloscope.",
        "Implemented fixes that enabled continued sale of existing inventory instead of total loss.",
        "Extensively worked with Si4703 FM receiver developer modules, as well as the TEA5757— built and tested custom FM modules, diagnosed persistent whine issues, and traced problems back to the main board design.",
        "Manage the physical assembly, flashing, and bench testing for all ongoing iterations of the PAR900M and PAT900 hardware lines.",
        
        "--- EAGLE EYE PRODUCT LINE ---",
        "Build all sequential iterations of the Eagle Eye Transmitter/Receiver product line after initial rollout.",
        "Independently handle firmware flashing and modification (hex frequency band adjustments to prevent crosstalk), full assembly, CNC machining of cases, functional testing, and quality control.",
        "Delivered 200+ units with only one RMA (software-related bug).",
        
        "--- TESTING PROCEDURES ---",
        "Designed and implemented improved RF testing procedures, replacing ineffective Mylar bag testing with a modified Faraday cage + LED pass/fail indicators.",
        "The modified setup dramatically increased testing reliability and ensured consistent performance validation across all units."

        "--- MANUALS ---",
      "Created product manuals and custom visual artwork to improve customer understanding of product connections and setup",

      "--- FUSION 360 ---"
      "Self-taught Fusion 360 and produced accurate .STEP file models of multiple products for direct customer delivery"
    ],

},










*/