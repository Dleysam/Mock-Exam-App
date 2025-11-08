// inside questions/correctional_questions.js
const CORRECTIONAL_QUESTIONS = [
  {
    question: "When was the Nigeria Prison Service officially renamed to the Nigeria Correctional Service?",
    options: ["2015", "2019", "2020", "2017"],
    correctAnswer: "2019"
  },
  {
    question: "Who signed the Nigerian Correctional Service Act into law?",
    options: ["Goodluck Jonathan", "Muhammadu Buhari", "Bola Tinubu", "Olusegun Obasanjo"],
    correctAnswer: "Muhammadu Buhari"
  },
  {
    question: "The NCoS Act was signed into law in which month?",
    options: ["July 2019", "August 2019", "June 2020", "September 2018"],
    correctAnswer: "August 2019"
  },
  {
    question: "The NCoS operates under which ministry?",
    options: ["Ministry of Defence", "Ministry of Interior", "Ministry of Justice", "Ministry of Police Affairs"],
    correctAnswer: "Ministry of Interior"
  },
  {
    question: "Which of the following is NOT a function of the NCoS?",
    options: ["Safe custody of inmates", "Rehabilitation of offenders", "Recruitment of police officers", "Provision of vocational training for inmates"],
    correctAnswer: "Recruitment of police officers"
  },
  {
    question: "How many major operational arms does the NCoS have under the new Act?",
    options: ["3", "2", "4", "5"],
    correctAnswer: "2"
  },
  {
    question: "The Custodial Service and Non-Custodial Service are provisions under which section of the NCoS Act?",
    options: ["Section 2", "Section 5", "Section 10", "Section 1"],
    correctAnswer: "Section 2"
  },
  {
    question: "Who was the first Controller General after the renaming to NCoS?",
    options: ["Ahmed Ja’afaru", "Haliru Nababa", "Ja’afaru Ahmed", "Olushola Ogundipe"],
    correctAnswer: "Ahmed Ja’afaru"
  },
  {
    question: "Inmates awaiting trial are called?",
    options: ["Convicts", "Remand prisoners", "Parolees", "Detainees"],
    correctAnswer: "Remand prisoners"
  },
  {
    question: "Which year was the first prison in Nigeria established?",
    options: ["1861", "1900", "1914", "1920"],
    correctAnswer: "1861"
  },
  {
    question: "Where was the first prison in Nigeria built?",
    options: ["Lagos", "Calabar", "Ibadan", "Benin"],
    correctAnswer: "Lagos"
  },
  {
    question: "The Nigeria Correctional Service motto is:",
    options: ["Justice and Rehabilitation", "Justice, Care, and Reformation", "Reform for Nation Building", "Custody and Care"],
    correctAnswer: "Justice, Care, and Reformation"
  },
  {
    question: "What is the maximum security prison in Nigeria called?",
    options: ["Medium prison", "Maximum security custodial centre", "Correctional camp", "Rehabilitation facility"],
    correctAnswer: "Maximum security custodial centre"
  },
  {
    question: "NCoS uniforms are primarily what colour?",
    options: ["Blue", "Khaki", "Green", "Black"],
    correctAnswer: "Khaki"
  },
  {
    question: "Who is the current Minister of Interior (2025)?",
    options: ["Olubunmi Tunji-Ojo", "Rauf Aregbesola", "Abdulrahman Dambazau", "Kayode Egbetokun"],
    correctAnswer: "Olubunmi Tunji-Ojo"
  },
  {
    question: "The main goal of NCoS is:",
    options: ["Punishment alone", "Reformation and reintegration", "Public humiliation", "Capital punishment"],
    correctAnswer: "Reformation and reintegration"
  },
  {
    question: "Non-custodial measures in the NCoS Act include all except:",
    options: ["Community service", "Parole", "Life imprisonment", "Probation"],
    correctAnswer: "Life imprisonment"
  },
  {
    question: "The Controller General of NCoS is appointed by:",
    options: ["President", "National Assembly", "Minister of Interior", "Supreme Court"],
    correctAnswer: "President"
  },
  {
    question: "NCoS vocational training includes:",
    options: ["Carpentry", "Oil drilling", "Ship navigation", "Rocket science"],
    correctAnswer: "Carpentry"
  },
  {
    question: "Nigeria Correctional Service headquarters is located in:",
    options: ["Abuja", "Lagos", "Kaduna", "Ibadan"],
    correctAnswer: "Abuja"
  },
  {
    question: "The highest rank in NCoS is:",
    options: ["Deputy Controller General", "Controller General", "Superintendent of Prisons", "Assistant Controller General"],
    correctAnswer: "Controller General"
  },
  {
    question: "The lowest rank in NCoS is:",
    options: ["Inspector", "Prison Assistant I", "Warder", "Superintendent"],
    correctAnswer: "Prison Assistant I"
  },
  {
    question: "Who is responsible for discipline of NCoS officers?",
    options: ["Controller General", "Minister of Interior", "Senate", "National Assembly"],
    correctAnswer: "Controller General"
  },
  {
    question: "Prisoners serving less than 3 months are kept in:",
    options: ["Short-term prison", "Maximum security prison", "Remand centre", "Juvenile home"],
    correctAnswer: "Short-term prison"
  },
  {
    question: "Juvenile offenders are kept in:",
    options: ["Custodial centre", "Borstal home", "Maximum prison", "Detention cell"],
    correctAnswer: "Borstal home"
  },
  {
    question: "NCoS Act 2019 focuses more on:",
    options: ["Punishment", "Reformation and rehabilitation", "Public execution", "Isolation"],
    correctAnswer: "Reformation and rehabilitation"
  },
  {
    question: "Which is NOT a category of prison in Nigeria?",
    options: ["Maximum", "Medium", "Minimum", "Luxury"],
    correctAnswer: "Luxury"
  },
  {
    question: "The official vehicle of NCoS is usually painted:",
    options: ["Green and White", "Blue", "Yellow and Black", "Brown"],
    correctAnswer: "Green and White"
  },
  {
    question: "Prison staff training is done at:",
    options: ["NCoS Staff College, Kaduna", "Police Academy", "NDA", "Civil Defence College"],
    correctAnswer: "NCoS Staff College, Kaduna"
  },
  {
    question: "NCoS also works with:",
    options: ["Legal Aid Council", "Ministry of Sports", "Ministry of Agriculture", "National Assembly"],
    correctAnswer: "Legal Aid Council"
  },
  {
    question: "Which rank is immediately above Inspector of Correctional Service?",
    options: ["Assistant Superintendent II", "Chief Inspector", "Superintendent", "Senior Inspector"],
    correctAnswer: "Assistant Superintendent II"
  },
  {
    question: "Who is the current Controller-General of NCoS as of 2025?",
    options: ["Ahmed Ja’afaru", "Haliru Nababa", "Abubakar Umar", "Isa Abdulmumin"],
    correctAnswer: "Abubakar Umar"
  },
  {
    question: "The Nigeria Correctional Service falls under which ministry?",
    options: ["Ministry of Justice", "Ministry of Defence", "Ministry of Interior", "Ministry of Police Affairs"],
    correctAnswer: "Ministry of Interior"
  },
  {
    question: "Which year did Nigeria adopt the current NCoS Act?",
    options: ["2015", "2019", "2020", "2018"],
    correctAnswer: "2019"
  },
  {
    question: "Which body is responsible for training NCoS officers?",
    options: ["Nigeria Defence Academy", "Nigeria Police Academy", "Nigeria Correctional Service Training College", "Ministry of Interior Training School"],
    correctAnswer: "Nigeria Correctional Service Training College"
  },
  {
    question: "Which is the official currency of Nigeria?",
    options: ["Pound", "Naira", "Dollar", "Kobo"],
    correctAnswer: "Naira"
  }
];

export default correctionalQuestions;
