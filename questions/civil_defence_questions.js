// inside questions/civil_defence_questions.js
    const CIVIL_DEFENCE_QUESTIONS = [
  {
    id: 1,
    question: "When was the Nigeria Security and Civil Defence Corps (NSCDC) officially established as a para-military agency?",
    options: { A: "1967", B: "2003", C: "1984", D: "1999" },
    answer: "B",
    explanation: "The NSCDC became a recognized para-military agency in 2003 under an Act of the National Assembly."
  },
  {
    id: 2,
    question: "What is the primary mandate of the NSCDC regarding critical national assets and infrastructure?",
    options: { A: "Construction", B: "Management", C: "Protection", D: "Taxation" },
    answer: "C",
    explanation: "NSCDC is primarily tasked with the protection of critical national assets and infrastructure."
  },
  {
    id: 3,
    question: "The NSCDC operates under which Nigerian ministry?",
    options: { A: "Ministry of Defence", B: "Ministry of Police Affairs", C: "Ministry of Justice", D: "Ministry of Interior" },
    answer: "D",
    explanation: "The NSCDC is supervised by the Ministry of Interior."
  },
  {
    id: 4,
    question: "Which of the following is NOT a core function of the NSCDC?",
    options: { A: "International diplomacy", B: "Disaster management", C: "Protection of pipelines", D: "Licensing of private security guards" },
    answer: "A",
    explanation: "International diplomacy is outside NSCDC's jurisdiction."
  },
  {
    id: 5,
    question: "The NSCDC Act was amended in which year to give the corps more powers?",
    options: { A: "2003", B: "2005", C: "2007", D: "2010" },
    answer: "C",
    explanation: "The 2007 amendment expanded NSCDC's operational powers."
  },
  {
    id: 6,
    question: "What is the motto of the Nigeria Security and Civil Defence Corps?",
    options: { A: "Service to Humanity", B: "Defending the Nation, Securing the Future", C: "Peace and Order", D: "Security for All" },
    answer: "B",
    explanation: "The NSCDC’s motto is 'Defending the Nation, Securing the Future'."
  },
  {
    id: 7,
    question: "In the event of a natural disaster, what role does NSCDC play?",
    options: { A: "Disaster management and relief operations", B: "Border patrol", C: "Prison administration", D: "Firefighting" },
    answer: "A",
    explanation: "NSCDC assists in emergency response and relief efforts during disasters."
  },
  {
    id: 8,
    question: "The NSCDC is empowered to arrest and prosecute individuals involved in:",
    options: { A: "Traffic offenses", B: "Election rigging", C: "Vandalism of public infrastructure", D: "International trade disputes" },
    answer: "C",
    explanation: "NSCDC prosecutes cases related to vandalism and public asset destruction."
  },
  {
    id: 9,
    question: "Who is the current Commandant General of the NSCDC?",
    options: { A: "Ahmed Abubakar Audi", B: "Abdullahi Gana Muhammadu", C: "Ade Abolurin", D: "Ibrahim Liman" },
    answer: "A",
    explanation: "Dr. Ahmed Abubakar Audi is the current Commandant General of the NSCDC."
  },
  {
    id: 10,
    question: "The NSCDC works in synergy with which agencies?",
    options: { A: "Nigeria Police Force", B: "Nigerian Army", C: "Department of State Services", D: "All of the above" },
    answer: "D",
    explanation: "NSCDC collaborates with other security agencies for effective internal security."
  },
  {
    id: 11,
    question: "What is the significance of the NSCDC's intelligence and investigation department?",
    options: { A: "To conduct foreign espionage", B: "To gather information on criminal activities related to their mandate", C: "To manage public relations", D: "To design security architecture" },
    answer: "B",
    explanation: "The department focuses on intelligence gathering for security operations."
  },
  {
    id: 12,
    question: "The NSCDC has a specialized unit for combating illegal mining. What is it called?",
    options: { A: "Solid Minerals Protection Unit", B: "Oil and Gas Protection Unit", C: "Agro-Rangers", D: "Critical Infrastructure Protection Unit" },
    answer: "A",
    explanation: "The Solid Minerals Protection Unit tackles illegal mining activities."
  },
  {
    id: 13,
    question: "What does the NSCDC's Agro-Rangers unit primarily focus on?",
    options: { A: "Protecting oil pipelines", B: "Combating cybercrime", C: "Protecting farmers and farmlands", D: "Border security" },
    answer: "C",
    explanation: "The Agro-Rangers protect farmers and agricultural assets from attacks."
  },
  {
    id: 14,
    question: "The NSCDC plays a role in internal security. What aspect do they primarily address?",
    options: { A: "Counter-terrorism operations", B: "Protection of critical national assets and infrastructure", C: "Foreign intelligence gathering", D: "Maritime security" },
    answer: "B",
    explanation: "Their key internal security focus is asset and infrastructure protection."
  },
  {
    id: 15,
    question: "Which of these is a non-lethal weapon commonly used by NSCDC personnel?",
    options: { A: "Batons", B: "AK-47 rifles", C: "Machine guns", D: "Hand grenades" },
    answer: "A",
    explanation: "NSCDC uses non-lethal equipment such as batons for crowd control."
  },
  {
    id: 16,
    question: "The NSCDC is involved in monitoring and supervision of which sector?",
    options: { A: "Telecommunications", B: "Banking", C: "Private security companies", D: "Education" },
    answer: "C",
    explanation: "The Corps regulates and licenses private security companies in Nigeria."
  },
  {
    id: 17,
    question: "What is the primary reason for the establishment of the NSCDC in its current form?",
    options: { A: "To replace the Nigeria Police Force", B: "To complement the efforts of other security agencies", C: "To manage elections", D: "To oversee foreign policy" },
    answer: "B",
    explanation: "The NSCDC complements the operations of other security organizations."
  },
  {
    id: 18,
    question: "The NSCDC's operations are guided by which legal framework?",
    options: { A: "NSCDC Act", B: "Police Act", C: "Armed Forces Act", D: "Immigration Act" },
    answer: "A",
    explanation: "The NSCDC Act defines and empowers the Corps’ activities."
  },
  {
    id: 19,
    question: "What is the significance of the NSCDC's presence in rural areas?",
    options: { A: "To conduct agricultural research", B: "To collect taxes", C: "To provide security for local communities and infrastructure", D: "To manage local government affairs" },
    answer: "C",
    explanation: "Their rural deployment ensures local security and asset protection."
  },
  {
    id: 20,
    question: "The NSCDC is involved in intelligence gathering related to:",
    options: { A: "Vandalism", B: "Illegal bunkering", C: "Pipeline sabotage", D: "All of the above" },
    answer: "D",
    explanation: "The Corps gathers intelligence on various forms of economic sabotage."
  },
  {
    id: 21,
    question: "What kind of training do NSCDC personnel undergo?",
    options: { A: "Diplomatic training", B: "Para-military and specialized security training", C: "Medical training", D: "Engineering training" },
    answer: "B",
    explanation: "NSCDC personnel are trained in para-military and security disciplines."
  },
  {
    id: 22,
    question: "The NSCDC has a department dedicated to disaster management. What is its main role?",
    options: { A: "To coordinate response to emergencies and disasters", B: "To predict weather patterns", C: "To build disaster-resistant structures", D: "To provide financial aid to victims" },
    answer: "A",
    explanation: "They coordinate responses during national emergencies and disasters."
  },
  {
    id: 23,
    question: "What is the importance of public cooperation with the NSCDC?",
    options: { A: "To reduce their workload", B: "To provide financial support", C: "To enhance intelligence gathering and crime prevention", D: "To promote tourism" },
    answer: "C",
    explanation: "Public cooperation helps NSCDC improve intelligence and prevent crime."
  },
  {
    id: 24,
    question: "The NSCDC is empowered to carry out which type of operations?",
    options: { A: "Naval operations", B: "Rescue operations", C: "Air force operations", D: "Space exploration" },
    answer: "B",
    explanation: "Rescue operations are part of NSCDC’s civil protection role."
  },
  {
    id: 25,
    question: "What is the role of the NSCDC in maintaining peace and order during public gatherings?",
    options: { A: "To provide security and prevent breakdown of law", B: "To organize the gatherings", C: "To provide entertainment", D: "To regulate speeches" },
    answer: "A",
    explanation: "The Corps provides security and prevents disturbances during events."
  },
  {
    id: 26,
    question: "The NSCDC's mandate includes protecting which type of national assets?",
    options: { A: "Oil pipelines", B: "Telecommunication masts", C: "Power installations", D: "All of the above" },
    answer: "D",
    explanation: "NSCDC safeguards vital national infrastructures across various sectors."
  },
  {
    id: 27,
    question: "What is the primary focus of the NSCDC's intelligence network?",
    options: { A: "Political analysis", B: "Prevention of crime and sabotage", C: "Economic forecasting", D: "Historical research" },
    answer: "B",
    explanation: "Their intelligence operations aim to detect and prevent sabotage."
  },
  {
    id: 28,
    question: "The NSCDC personnel are often seen wearing which colour of uniform?",
    options: { A: "Khaki and dark blue", B: "Red and white", C: "Green and black", D: "Yellow and brown" },
    answer: "A",
    explanation: "The Corps’ official uniform is khaki and dark blue."
  },
  {
    id: 29,
    question: "What is the significance of the NSCDC's presence at schools and public institutions?",
    options: { A: "To teach", B: "To conduct research", C: "To ensure safety and security", D: "To provide catering services" },
    answer: "C",
    explanation: "They help ensure the safety of students and staff in public institutions."
  },
  {
    id: 30,
    question: "The NSCDC collaborates with which international organizations on security matters?",
    options: { A: "Interpol", B: "United Nations", C: "African Union", D: "All of the above" },
    answer: "A",
    explanation: "NSCDC collaborates with Interpol and other partners on crime prevention."
  },
  {
    id: 31,
    question: "The NSCDC has a specialized unit for combating human trafficking. What is its purpose?",
    options: { A: "To rescue victims and apprehend traffickers", B: "To issue passports", C: "To manage borders", D: "To provide legal advice" },
    answer: "A",
    explanation: "This unit combats trafficking and rescues victims."
  },
  {
    id: 32,
    question: "What is the NSCDC's approach to community engagement?",
    options: { A: "To impose rules", B: "To provide financial aid", C: "To foster cooperation and gather intelligence", D: "To conduct surveys" },
    answer: "C",
    explanation: "NSCDC promotes community partnership for better intelligence."
  },
  {
    id: 33,
    question: "The NSCDC's legal department is responsible for:",
    options: { A: "Drafting new laws", B: "Prosecuting offenders and providing legal advice", C: "Representing the government in court", D: "Issuing licenses" },
    answer: "B",
    explanation: "Their legal department handles prosecutions and legal issues."
  },
  {
    id: 34,
    question: "What is the primary objective of the NSCDC's surveillance activities?",
    options: { A: "To detect and prevent criminal activities", B: "To monitor weather", C: "To track wildlife", D: "To observe traffic" },
    answer: "A",
    explanation: "Surveillance helps identify and stop crimes early."
  },
  {
    id: 35,
    question: "The NSCDC is involved in training and capacity building for:",
    options: { A: "International military forces", B: "Medical professionals", C: "Its personnel and private security guards", D: "Farmers" },
    answer: "C",
    explanation: "NSCDC trains both its officers and licensed private guards."
  },
  {
    id: 36,
    question: "Which of the following sectors benefits most directly from the NSCDC’s activities?",
    options: { A: "Transport", B: "Security", C: "Agriculture", D: "Education" },
    answer: "B",
    explanation: "NSCDC enhances national security through protection and intelligence."
  },
  {
    id: 37,
    question: "What is the rank of the head of the Nigeria Security and Civil Defence Corps?",
    options: { A: "Commandant General", B: "Inspector General", C: "Field Marshal", D: "Lieutenant General" },
    answer: "A",
    explanation: "The highest rank in the NSCDC is Commandant General."
  },
  {
    id: 38,
    question: "The NSCDC’s Anti-Vandal Unit focuses primarily on what type of crime?",
    options: { A: "Cybercrime", B: "Pipeline vandalism", C: "Drug trafficking", D: "Kidnapping" },
    answer: "B",
    explanation: "The Anti-Vandal Unit combats pipeline vandalism and oil theft."
  },
  {
    id: 39,
    question: "Which of the following best describes the NSCDC’s communication structure?",
    options: { A: "Hierarchical and disciplined", B: "Informal", C: "Democratic", D: "Flexible" },
    answer: "A",
    explanation: "As a paramilitary organization, NSCDC maintains a strict hierarchical structure."
  },
  {
    id: 40,
    question: "The NSCDC collaborates with NNPC mainly to prevent:",
    options: { A: "Industrial strikes", B: "Pipeline vandalism", C: "Public protests", D: "Fuel price increase" },
    answer: "B",
    explanation: "NSCDC protects NNPC pipelines from vandalism and illegal tapping."
  },
  {
    id: 41,
    question: "In the NSCDC ranking system, which is higher than Superintendent?",
    options: { A: "Assistant Superintendent", B: "Deputy Commandant", C: "Inspector", D: "Corporal" },
    answer: "B",
    explanation: "Deputy Commandant is a higher rank than Superintendent."
  },
  {
    id: 42,
    question: "Which of the following offences can NSCDC prosecute offenders for?",
    options: { A: "Traffic offences", B: "Pipeline vandalism", C: "Environmental sanitation", D: "Election malpractice" },
    answer: "B",
    explanation: "NSCDC can prosecute individuals caught vandalizing pipelines or critical assets."
  },
  {
    id: 43,
    question: "The NSCDC collaborates with which agency for crisis management?",
    options: { A: "NEMA", B: "INEC", C: "NNPC", D: "FRSC" },
    answer: "A",
    explanation: "NSCDC and NEMA work together in crisis and disaster management."
  },
  {
    id: 44,
    question: "What document legally backs the NSCDC to bear arms?",
    options: { A: "Firearms Act", B: "NSCDC Amendment Act of 2007", C: "Police Act", D: "Defence Act" },
    answer: "B",
    explanation: "The 2007 Amendment Act legally empowered NSCDC officers to bear arms."
  },
  {
    id: 45,
    question: "The NSCDC’s operations are divided into how many main departments?",
    options: { A: "Three", B: "Five", C: "Seven", D: "Nine" },
    answer: "C",
    explanation: "The Corps has seven core departments managing its various mandates."
  },
  {
    id: 46,
    question: "NSCDC’s Disaster Management Department is responsible for:",
    options: { A: "Forecasting weather", B: "Coordinating relief and rescue", C: "Public relations", D: "Tax collection" },
    answer: "B",
    explanation: "It coordinates relief and rescue during emergencies and disasters."
  },
  {
    id: 47,
    question: "What color is associated with the NSCDC’s ceremonial uniform?",
    options: { A: "Blue", B: "White", C: "Khaki", D: "Black" },
    answer: "A",
    explanation: "Blue color is used in NSCDC ceremonial uniforms."
  },
  {
    id: 48,
    question: "The NSCDC has how many zones across Nigeria?",
    options: { A: "4", B: "6", C: "8", D: "12" },
    answer: "B",
    explanation: "The NSCDC is divided into six geopolitical zones for administrative ease."
  },
  {
    id: 49,
    question: "Which of the following best explains the term ‘Critical National Assets’?",
    options: { A: "Government buildings only", B: "Public utilities and essential infrastructure", C: "Private properties", D: "Commercial vehicles" },
    answer: "B",
    explanation: "Critical National Assets include power, oil, water, and communication infrastructure."
  },
  {
    id: 50,
    question: "What is the duration of NSCDC basic training for recruits?",
    options: { A: "3 months", B: "6 months", C: "9 months", D: "12 months" },
    answer: "B",
    explanation: "NSCDC basic training typically lasts six months."
  },
  {
    id: 51,
    question: "Which of these is an example of a critical national infrastructure?",
    options: { A: "Shopping mall", B: "Pipeline", C: "Stadium", D: "Park" },
    answer: "B",
    explanation: "Pipelines are critical national infrastructures that NSCDC protects."
  },
  {
    id: 52,
    question: "What is the NSCDC’s official website domain extension?",
    options: { A: ".com", B: ".gov.ng", C: ".org", D: ".edu.ng" },
    answer: "B",
    explanation: "As a government agency, NSCDC uses the .gov.ng extension."
  },
  {
    id: 53,
    question: "What role does the NSCDC play in elections?",
    options: { A: "Counting votes", B: "Providing security at polling units", C: "Announcing results", D: "Campaigning" },
    answer: "B",
    explanation: "NSCDC ensures peace and security during election processes."
  },
  {
    id: 54,
    question: "What is the name of the NSCDC’s training academy?",
    options: { A: "Civil Defence College", B: "NSCDC Training School", C: "Peace Academy", D: "Command and Staff College" },
    answer: "A",
    explanation: "Civil Defence College located in Katstina is often cited as the primary initial training institution."
  },
  {
    id: 55,
    question: "Which agency does NSCDC collaborate with on anti-terrorism operations?",
    options: { A: "NDLEA", B: "DSS", C: "NCC", D: "NAFDAC" },
    answer: "B",
    explanation: "The NSCDC works with the DSS for intelligence and counter-terrorism operations."
  },
  {
    id: 56,
    question: "The NSCDC was originally known as what?",
    options: { A: "Civil Defence Organisation", B: "National Guard", C: "Defence Corps", D: "Peace Corps" },
    answer: "A",
    explanation: "It was originally established as the Civil Defence Organisation in 1967."
  },
  {
    id: 57,
    question: "What is the full meaning of NSCDC?",
    options: { A: "National Security and Civil Defence Corps", B: "Nigeria Safety and Civil Defence Corps", C: "Nigeria Security and Civil Defence Corps", D: "Nigerian Security and Defence Council" },
    answer: "C",
    explanation: "The correct full meaning is Nigeria Security and Civil Defence Corps."
  },
  {
    id: 58,
    question: "NSCDC officers can operate weapons under which conditions?",
    options: { A: "For parade", B: "When on duty and under threat", C: "For personal reasons", D: "At social gatherings" },
    answer: "B",
    explanation: "They are authorized to use arms only when on official duty and under threat."
  },
  {
    id: 59,
    question: "The NSCDC Commandant General reports to which authority?",
    options: { A: "President", B: "Minister of Interior", C: "National Assembly", D: "Attorney General" },
    answer: "B",
    explanation: "The NSCDC operates under the supervision of the Ministry of Interior."
  },
  {
    id: 60,
    question: "The NSCDC Act empowers officers to arrest offenders without a warrant when:",
    options: { A: "They suspect wrongdoing", B: "They receive public complaint", C: "The offence is committed in their presence", D: "They have a letter" },
    answer: "C",
    explanation: "NSCDC officers can arrest without a warrant when offences occur in their view."
  },
  {
    id: 61,
    question: "What department handles the training and retraining of NSCDC personnel?",
    options: { A: "Operations Department", B: "Training Department", C: "Intelligence Department", D: "Administration Department" },
    answer: "B",
    explanation: "The Training Department ensures officers remain competent and efficient."
  },
  {
    id: 62,
    question: "What does the term 'para-military' signify in NSCDC?",
    options: { A: "It is a sports agency", B: "It operates with military discipline but serves civilians", C: "It is a private organization", D: "It is a foreign army" },
    answer: "B",
    explanation: "NSCDC maintains military-like discipline while serving civil functions."
  },
  {
    id: 63,
    question: "Which of these is an NSCDC command rank?",
    options: { A: "Assistant Inspector", B: "Commandant", C: "Colonel", D: "Warrant Officer" },
    answer: "B",
    explanation: "Commandant is a recognized rank within the NSCDC hierarchy."
  },
  {
    id: 64,
    question: "Which of the following best defines the NSCDC’s peace-building role?",
    options: { A: "Organizing protests", B: "Resolving community conflicts", C: "Providing jobs", D: "Conducting elections" },
    answer: "B",
    explanation: "NSCDC mediates and resolves minor community disputes to maintain peace."
  },
  {
    id: 65,
    question: "The NSCDC operates a special security unit for oil installations known as:",
    options: { A: "Anti-Vandal Squad", B: "Oil Watch", C: "Pipeline Taskforce", D: "Energy Guards" },
    answer: "A",
    explanation: "The Anti-Vandal Squad protects oil and gas infrastructures."
  },
  {
    id: 66,
    question: "Who appoints the Commandant General of NSCDC?",
    options: { A: "Minister of Defence", B: "President of Nigeria", C: "Senate", D: "Inspector General" },
    answer: "B",
    explanation: "The President appoints the NSCDC Commandant General."
  },
  {
    id: 67,
    question: "The NSCDC has a gender desk office to address what issues?",
    options: { A: "Recruitment", B: "Gender-based violence and equality", C: "Promotions", D: "Sports" },
    answer: "B",
    explanation: "The gender desk focuses on handling gender-related issues and violence."
  },
  {
    id: 68,
    question: "Which of these represents one of NSCDC’s official symbols?",
    options: { A: "Anchor and sword", B: "Eagle and torch", C: "Shield and spear", D: "Book and pen" },
    answer: "B",
    explanation: "The NSCDC logo features the eagle and torch, symbolizing vigilance and guidance."
  },
  {
    id: 69,
    question: "Which training does NSCDC share with the Nigerian Army?",
    options: { A: "Weapon handling and discipline", B: "Flight operations", C: "Sea navigation", D: "Medical emergency training" },
    answer: "A",
    explanation: "Both institutions share training on weapon handling and discipline."
  },
  {
    id: 70,
    question: "What is the NSCDC’s long-term goal?",
    options: { A: "To become a police agency", B: "To ensure a safe, peaceful, and secure society", C: "To regulate taxes", D: "To join international peacekeeping" },
    answer: "B",
    explanation: "NSCDC’s mission focuses on promoting peace, safety, and national security."
  }
];
