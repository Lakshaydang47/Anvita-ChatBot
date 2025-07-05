class Anvita {
    constructor() {
      this.name = "Anvita";
      this.hospitalName = "Aarogya Connect";
      this.location = "Karnal, Haryana, India";
      this.medicalKnowledgeBase = {
        "what are the common symptoms of flu": [
          "Common symptoms of the flu include fever, cough, sore throat, runny or stuffy nose, muscle or body aches, headaches, and fatigue.",
          "Yeh flu ke aam lakshan hain: bukhar, khaansi, gale mein kharash, naak behna ya band hona, maanspeshiyon ya badan mein dard, sir dard, aur thakan." // Hindi
        ],
        "how can i prevent the spread of infection": [
          "You can prevent the spread of infection by washing your hands frequently with soap and water, covering your mouth and nose when you cough or sneeze, avoiding touching your face, and staying home if you are sick.",
          "Aap infection ko phailne se rok sakte hain baar baar sabun aur paani se haath dhokar, khaansne ya chheenkne par apne munh aur naak ko dhak kar, apne chehre ko chhoone se bachkar, aur agar aap bimaar hain toh ghar par rahkar." // Hindi
        ],
        "what should i do for a minor cut": [
          "For a minor cut, clean the wound with mild soap and water, apply an antiseptic if available, and cover it with a clean bandage.",
          "Ek chote katne par, ghav ko halki sabun aur paani se saaf karein, agar uplabdh ho toh antiseptic lagayein, aur use saaf patti se dhak dein." // Hindi
        ],
        "what are the benefits of exercise": [
          "Regular exercise has many benefits, including improving cardiovascular health, strengthening muscles and bones, boosting mood, and helping to manage weight.",
          "Niyamit vyayam ke kai fayde hain, jinme cardiovascular swasthya mein sudhar, maanspeshiyon aur haddiyon ko majboot karna, mood ko badhana, aur vajan ko niyantrit karne mein madad shaamil hai." // Hindi
        ],
        "what is a healthy diet": [
          "A healthy diet includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. It's also important to limit processed foods, sugary drinks, and excessive amounts of unhealthy fats.",
          "Ek swasth aahar mein vibhinn prakar ke phal, sabziyan, anaj, patla protein, aur swasth charbi shaamil hain. Processed food, meethe pey, aur answasth charbi ki adhik matra ko kam karna bhi mahatvapurn hai." // Hindi
        ],
        "what are the importance of sleep": [
          "Adequate sleep is crucial for physical and mental health. It helps with memory consolidation, immune function, mood regulation, and overall well-being.",
          "Paryapt neend sharirik aur mansik swasthya ke liye bahut zaroori hai. Yeh smriti ko mazboot karne, immune function, mood regulation, aur samagr kushal-kshem mein madad karta hai." // Hindi
        ],
        "what is first aid": [
          "First aid is the initial assistance given to someone who is injured or suddenly becomes ill before professional medical help arrives.",
          "Prathamik chikitsa kisi aise vyakti ko di jaane wali prarambhik sahayata hai jo ghayal ho gaya ho ya achanak bimaar ho gaya ho, peshevar chikitsa madad pahunchne se pehle." // Hindi
        ],
        "what to do in case of fever": [
          "If you have a fever, it's important to rest, drink plenty of fluids, and you can take over-the-counter medication like paracetamol to reduce the temperature. If the fever is high or persists, consult a doctor.",
          "Agar aapko bukhar hai, toh aaram karna, khoob saara paani peena zaroori hai, aur aap taapmaan kam karne ke liye over-the-counter dawa jaise paracetamol le sakte hain. Agar bukhar tej hai ya bana rehta hai, toh doctor se salaah lein." // Hindi
        ],
        "what are the symptoms of dehydration": [
          "Symptoms of dehydration can include thirst, dry mouth, dark urine, dizziness, and fatigue. It's important to drink enough fluids, especially in hot weather or during illness.",
          "Dehydration ke lakshanon mein pyaas lagna, munh sookhna, gehra peshab aana, chakkar aana, aur thakan shaamil ho sakte hain. Paryapt matra mein paani peena zaroori hai, khaaskar garmiyon mein ya bimaari ke dauraan." // Hindi
        ],
        "how often should i see a doctor for a checkup": [
          "The frequency of checkups depends on your age, health status, and risk factors. Generally, healthy adults are recommended to have a checkup every 1-2 years. It's best to discuss this with your doctor.",
          "Checkup ki frequency aapki umar, swasthya sthiti, aur jokhim karakon par nirbhar karti hai. Aam taur par, swasth vyaskon ko har 1-2 saal mein checkup karwane ki salaah di jaati hai. Is baare mein apne doctor se baat karna sabse achha hai." // Hindi
        ]
        // Add more general medical questions and answers here
      };
    }
  
    greet(language = "hindi") {
      if (language.toLowerCase() === "hindi") {
        return "Namaste! Aarogya Connect mein aapka swagat hai. Main Anvita hoon, aapki virtual sahayak. Main aapki kya seva kar sakti hoon?";
      } else {
        return "Hello, welcome to Aarogya Connect. I am Anvita, your virtual assistant. How can I help you today?";
      }
    }
  
    handleQuery(query) {
      const lowerQuery = query.toLowerCase();
  
      if (lowerQuery.includes("doctor review") || lowerQuery.includes("doctors' review") || lowerQuery.includes("doctors review")) {
        return this.getDoctorReviews();
      } else if (lowerQuery.includes("hospital facilit") || lowerQuery.includes("facilities available")) {
        return this.getHospitalFacilities("hindi"); // Default to Hindi for facilities
      } else if (lowerQuery.includes("appointment fee") || lowerQuery.includes("booking fee") || lowerQuery.includes("fees for appointment")) {
        return this.getAppointmentFees("hindi"); // Default to Hindi for fees
      } else if (this.medicalKnowledgeBase.hasOwnProperty(lowerQuery)) {
        const responses = this.medicalKnowledgeBase[lowerQuery];
        return this.getRandomResponse(responses);
      } else if (lowerQuery.includes("health") || lowerQuery.includes("medical") || lowerQuery.includes("symptom") || lowerQuery.includes("disease")) {
        // Offer to answer general medical questions
        return "Agar aapke koi aam swasthya ya medical sambandhit sawaal hain toh pooch sakte hain. Main unka jawaab dene ki koshish karungi. Jaise ki, 'flu ke aam lakshan kya hain?'"; // Hindi
        // return "If you have any general health or medical-related questions, feel free to ask. I will try my best to answer them. For example, 'what are the common symptoms of flu?'"; // English
      } else if (lowerQuery.includes("help") || lowerQuery.includes("information")) {
        return "Main aapko doctors ke reviews, hospital ki suvidhaon, appointment booking fees, aur aam medical sawaalon ke jawaab de sakti hoon. Aap kya jaanna chahte hain?"; // Hindi
        // return "I can provide information about doctor reviews, hospital facilities, appointment booking fees, and answer general medical questions. What would you like to know?"; // English
      } else if (lowerQuery.includes("thank you") || lowerQuery.includes("dhanyawad")) {
        return "Aapka swagat hai! Kya main aaj aapki aur koi madad kar sakti hoon?"; // Hindi
        // return "You're welcome! Is there anything else I can help you with today?"; // English
      } else if (lowerQuery.includes("bye") || lowerQuery.includes("namaste")) {
        return "Phir milenge! Dhanyawad."; // Hindi
        // return "Goodbye! Thank you."; // English
      } else {
        return this.escalate();
      }
    }
  
    getRandomResponse(responses) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  
    getDoctorReviews() {
      return "Hamare doctors ki mareezon dwara bahut prashansa ki jaati hai. Kuch udaharan yahan diye gaye hain: Ek mareez ne bataya ki Cardiac Department ke doctors ne unke high BP ko control karne mein bahut madad ki, aur ab woh swasth hain. Isi tarah, ek aur mareez ne zikr kiya ki Neurology Department ke ek doctor ne unki migraine ki samasya ko dhyan se samjha aur sahi ilaaj pradaan kiya. Orthopedic Department ke ek doctor ne ek mareez ki ghutne ki surgery safaltapoorvak ki, jo ab bina dard ke chal sakte hain. General Medicine department ke doctors bhi apne mareezon ke prati caring aur madadgar ravaiye ke liye jaane jaate hain.";
      // return "Our doctors are highly praised by patients. Here are a few examples: One patient reported that the doctors in the Cardiac Department were very helpful in controlling their high BP, and they are now healthy. Similarly, another patient mentioned that a doctor in the Neurology Department carefully understood their migraine problem and provided the right treatment. A doctor in the Orthopedic Department successfully performed knee surgery on a patient, who can now walk without pain. The doctors in the General Medicine department are also known for their caring and helpful approach towards their patients.";
    }
  
    getHospitalFacilities(language = "hindi") {
      if (language.toLowerCase() === "hindi") {
        return "Aarogya Connect mein aapko adhunik suvidhayein milengi jaise ki 24 ghante emergency seva, vishiisht vibhag (jaise Cardiac, Orthopedic, Neurology), advanced diagnostic lab, pharmacy, aur aaramdayak mareez kaksh.";
      } else {
        return "At Aarogya Connect, you will find a comprehensive range of modern facilities designed to cater to your healthcare needs. These include a 24/7 Emergency Service to provide immediate medical attention whenever required. We house specialized departments such as Cardiology for heart-related issues, Orthopedics for bone and joint care, and Neurology for conditions affecting the nervous system, among others. Our hospital is equipped with an advanced diagnostic laboratory for accurate and timely testing. For your convenience, we also have an on-site pharmacy to fulfill your prescription needs. Furthermore, we offer comfortable and well-maintained patient rooms to ensure a restful recovery.";
      }
    }
  
    getAppointmentFees(language = "hindi") {
      if (language.toLowerCase() === "hindi") {
        return "Aam taur par, Aarogya Connect mein pehli baar appointment book karne ki koi fees nahi hai. Agar kisi vishesh prakriya ya follow-up consultation ki koi fees hai toh woh aapko appointment book karte samay bata di jayegi. General consultation ki fees lagbhag ₹500 plus GST hai, aur specialist consultation ki fees ₹1200 plus GST ho sakti hai. Kripya dhyaan dein ki yeh aam aankde hain aur vastavik shulk doctor, vibhag, aur atirikt prakriyaon ke aadhar par badal sakte hain. Sahi fees aapko appointment booking ke dauraan ya sambandhit vibhag dwara bata di jayegi. Yaad rahe, aapki pehli booking bilkul muft hai!";
      } else {
        return "At Aarogya Connect, your first appointment booking is absolutely free. For a general consultation after your first visit, the fees are usually around ₹500 plus GST. Specialist consultations generally cost ₹1200 plus GST. Please note that these are general estimates, and the actual charges may vary based on the specific doctor, department, and any additional procedures or tests required. The exact fees will be communicated to you during the appointment booking process or by the relevant department. Remember, your initial booking is complimentary!";
      }
    }
  
    escalate() {
      return "Mujhe is vishay mein aur madad karne mein mushkil ho rahi hai. Kripya thoda intezaar karein, main ek sahayak ko aapki madad ke liye bhej rahi hoon.";
      // return "I apologize that I couldn't fully resolve this for you. It seems like this issue requires more in-depth assistance than I can currently provide. I'll transfer you to a human agent who will be able to help you better.";
    }
  
    closeConversation() {
      return "Kya main aaj aapki aur koi madad kar sakti hoon?";
      // return "Is there anything else I can help you with today?";
    }
  }
  
  // Example Usage:
  const anvita = new Anvita();
  
  console.log(anvita.greet("hindi"));
  console.log(anvita.handleQuery("What are the common symptoms of flu"));
  console.log(anvita.handleQuery("How can I prevent the spread of infection"));
  console.log(anvita.handleQuery("Tell me about doctor reviews."));
  console.log(anvita.handleQuery("What are the facilities here?"));
  console.log(anvita.handleQuery("appointment booking fees"));
  console.log(anvita.handleQuery("I need help with a serious condition."));
  console.log(anvita.handleQuery("thank you"));
  console.log(anvita.closeConversation());