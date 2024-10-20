import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const i18nConfig = {
  resources: {
    uz: {
      translation: {
        // Navigation
        home: "Bosh sahifa",
        products: "Mahsulotlar",
        agents: "Agentlar",
        about: "Biz haqimizda",
        contact: "Aloqa",

        // Hero Section
        heroTitle: "Yuqori samaradorlik uchun premium avtomobil suyuqliklari",
        heroSubtitle:
          "Condor'ning ilg'or formulalari bilan avtomobilingiz samaradorligi va umrini oshiring",
        heroImageAlt: "Condor mahsulotlari to'plami",
        exploreProducts: "Mahsulotlarni ko'rish",

        // Featured Products Section
        featuredProducts: "Bizning asosiy mahsulotlarimiz",
        antifreeze: "Antifriz",
        antifreezeImageAlt: "Condor Antifriz mahsuloti",
        antifreezeDesc: "Ekstremal haroratlardan yuqori himoya",
        motorOil: "Motor moyi",
        motorOilImageAlt: "Condor Motor moyi mahsuloti",
        motorOilDesc:
          "Dvigatel samaradorligi va chidamliligini optimallashtirish",
        transmissionFluid: "Transmissiya suyuqligi",
        transmissionFluidImageAlt: "Condor Transmissiya suyuqligi mahsuloti",
        transmissionFluidDesc:
          "Silliq uzatmalar almashinuvi va transmissiya uzoq umri",
        learnMore: "Batafsil ma'lumot",

        // Why Choose Us Section
        whyChooseCondor: "Nima uchun Condor'ni tanlaysiz?",
        qualityTitle: "Sifatdan kompromissiz",
        qualityDesc:
          "Bizning mahsulotlarimiz sanoat standartlariga javob beradi va ulardan oshib ketadi",
        innovationTitle: "Doimiy innovatsiyalar",
        innovationDesc: "Biz eng so'nggi formulalar bilan oldinda turamiz",
        supportTitle: "Ekspert yordami",
        supportDesc: "Jamoamiz har doim sizga yordam berishga tayyor",

        // CTA Section
        readyToStart: "Avtomobilingiz samaradorligini oshirishga tayyormisiz?",
        ctaSubtitle:
          "Ehtiyojlaringizga mos keladigan mukammal Condor mahsulotini topish uchun bugun biz bilan bog'laning",
        contactUs: "Biz bilan bog'laning",

        // Products Page
        ourProducts: "Bizning mahsulotlarimiz",
        all: "Barchasi",
        oil: "Moy",
        dot: "DOT",
        water: "Suv",
        volume: "Hajm",
        category: "Kategoriya",

        // Product names
        condorSimple200L: "CONDOR SIMPLE - 200 L",
        condorSimple20L: "CONDOR SIMPLE - 20 L",
        condorPowerGasoline200L: "CONDOR POWER GASOLINE - 200 L",
        condorPowerGasoline20L: "CONDOR POWER GASOLINE - 20 L",
        condorDiesel200L: "CONDOR DIESEL - 200 L",
        condorDiesel20L: "CONDOR DIESEL - 20 L",
        condorDiesel10L: "CONDOR DIESEL - 10 L",
        condorPowerDiesel200L: "CONDOR POWER DIESEL - 200 L",
        condorPowerDiesel50L: "CONDOR POWER DIESEL 20/50 - 50 L",
        condorPowerDiesel20L: "CONDOR POWER DIESEL - 20 L",
        condorPowerDiesel10L: "CONDOR POWER DIESEL - 10 L",
        condorTurboDiesel20L: "CONDOR TURBO DIESEL - 20 L",
        condorHD46_20L: "CONDOR HD 46 - 20 L",
        condorHD68_20L: "CONDOR HD 68 - 20 L",
        condorUZ20L: "CONDORUZ - 20 L",
        condorUZ10L: "CONDORUZ - 10 L",
        condorUZ5L: "CONDORUZ - 5 L",
        condorUZ4L: "CONDORUZ - 4 L",
        condorUZ3L: "CONDORUZ - 3 L",
        condorUZ: "CONDORUZ",
        condorUZDolivka: "CONDORUZ DOLIVKA",
        condorDOT4_455gr: "CONDOR DOT-4 - 455 gr",
        condorDOT4_100gr: "CONDOR DOT-4 - 100 gr",
        waterLabovoy1L: "SUV (LABOVOY) - 1 L",
        waterLabovoy5L: "SUV (LABOVOY) - 5 L",

        // Product descriptions
        condorSimple200LDesc: "Yuqori sifatli asosiy motor moyi, 200 L hajmda",
        condorSimple20LDesc: "Yuqori sifatli asosiy motor moyi, 20 L hajmda",
        condorPowerGasoline200LDesc:
          "Benzinli dvigatellar uchun kuchaytirilgan moy, 200 L",
        condorPowerGasoline20LDesc:
          "Benzinli dvigatellar uchun kuchaytirilgan moy, 20 L",
        condorDiesel200LDesc: "Dizel dvigatellari uchun maxsus moy, 200 L",
        condorDiesel20LDesc: "Dizel dvigatellari uchun maxsus moy, 20 L",
        condorDiesel10LDesc: "Dizel dvigatellari uchun maxsus moy, 10 L",
        condorPowerDiesel200LDesc: "Kuchaytirilgan dizel moyi, 200 L",
        condorPowerDiesel50LDesc:
          "Kuchaytirilgan dizel moyi, 20/50 qovushqoqlik, 50 L",
        condorPowerDiesel20LDesc: "Kuchaytirilgan dizel moyi, 20 L",
        condorPowerDiesel10LDesc: "Kuchaytirilgan dizel moyi, 10 L",
        condorTurboDiesel20LDesc:
          "Turbo dizel dvigatellari uchun maxsus moy, 20 L",
        condorHD46_20LDesc:
          "Og'ir sharoitlar uchun gidravlik moy, 46 qovushqoqlik, 20 L",
        condorHD68_20LDesc:
          "Og'ir sharoitlar uchun gidravlik moy, 68 qovushqoqlik, 20 L",
        condorUZ20LDesc: "Universal antifriz, 20 L",
        condorUZ10LDesc: "Universal antifriz, 10 L",
        condorUZ5LDesc: "Universal antifriz, 5 L",
        condorUZ4LDesc: "Universal antifriz, 4 L",
        condorUZ3LDesc: "Universal antifriz, 3 L",
        condorUZDesc: "Universal antifriz",
        condorUZDolivkaDesc: "Antifriz to'ldirish uchun",
        condorDOT4_455grDesc: "DOT-4 tormoz suyuqligi, 455 gr",
        condorDOT4_100grDesc: "DOT-4 tormoz suyuqligi, 100 gr",
        waterLabovoy1LDesc: "Oyna yuvish suyuqligi, 1 L",
        waterLabovoy5LDesc: "Oyna yuvish suyuqligi, 5 L",
        // Agents Page
        ourAgents: "Bizning agentlarimiz",
        phone: "Telefon",
        contactAgent: "Agent bilan bog'lanish",
        // About Page
        aboutUs: "Biz haqimizda",
        ourHistory: "Bizning tarixmiz",
        historyContent:
          "Condor 2000-yilda tashkil etilgan bo'lib, avtomobil suyuqliklari sohasida yetakchi ishlab chiqaruvchiga aylandi. Biz doimiy ravishda innovatsiyalar va sifatga e'tibor qaratamiz.",
        historyImageAlt: "Condor kompaniyasining tarixiy sur'ati",
        missionVision: "Vazifamiz va ko'rsatmamiz",
        ourMission: "Bizning vazifamiz",
        missionContent:
          "Mijozlarimizga eng yuqori sifatli avtomobil suyuqliklarini taqdim etish orqali transport vositalarining ishlashini va xizmat muddatini oshirish.",
        ourVision: "Bizning ko'rsatmamiz",
        visionContent:
          "Avtomobil suyuqliklari sohasida global miqyosda eng ishonchli va innovatsion yetkazib beruvchi bo'lish.",
        coreValues: "Asosiy qadriyatlarimiz",
        qualityDescription:
          "Biz har doim eng yuqori standartlarga javob beradigan mahsulotlar ishlab chiqaramiz.",
        innovationDescription:
          "Biz doimiy ravishda yangi texnologiyalar va yechimlarni izlaymiz.",
        integrityTitle: "Halollik",
        integrityDescription:
          "Biz barcha munosabatlarda ochiqlik va halollikka sodiqmiz.",
        sustainabilityTitle: "Barqarorlik",
        sustainabilityDescription:
          "Biz atrof-muhitni himoya qilish va barqaror amaliyotlarni qo'llash uchun harakat qilamiz.",
        customerFocusTitle: "Mijozlarga e'tibor",
        customerFocusDescription:
          "Mijozlarimizning ehtiyojlari bizning birinchi navbatdagi ustuvorligimizdir.",
        teamworkTitle: "Jamoaviy ish",
        teamworkDescription:
          "Biz birgalikda ishlash va bir-birimizni qo'llab-quvvatlash orqali muvaffaqiyatga erishamiz.",
        ourTeam: "Bizning jamoa",
        teamMember1Name: "John Doe",
        teamMember1Position: "Bosh direktor",
        teamMember2Name: "Jane Smith",
        teamMember2Position: "Texnologiyalar bo'yicha direktor",
        teamMember3Name: "Mike Johnson",
        teamMember3Position: "Savdo bo'yicha vitse-prezident",
        // Contact Page
        getInTouch: "Bog'lanish",
        contactDescription:
          "Bizga savolingiz yoki fikringiz bormi? Quyidagi ma'lumotlar orqali biz bilan bog'lanishingiz yoki xabar yuborishingiz mumkin.",
        address: "Manzil",
        companyAddress: "123 Condor ko'chasi, Toshkent, O'zbekiston",
        companyPhone: "+998 12 345 6789",
        email: "Elektron pochta",
        companyEmail: "info@condor.uz",
        mapAlt: "Condor ofisining xaritadagi joylashuvi",
        sendMessage: "Xabar yuborish",
        name: "Ism",
        subject: "Mavzu",
        selectSubject: "Mavzuni tanlang",
        generalInquiry: "Umumiy so'rov",
        technicalSupport: "Texnik yordam",
        sales: "Sotish",
        message: "Xabar",
        send: "Yuborish",
        messageSent: "Xabaringiz yuborildi. Tez orada siz bilan bog'lanamiz!",
        customizeTheme: "Mavzuni sozlash",
        primaryColor: "Asosiy rang",
        secondaryColor: "Ikkilamchi rang",
        accentColor: "Urg'u rangi",
        footerAboutText: "Condor - avtomobil suyuqliklari sohasida yetakchi ishlab chiqaruvchi. Biz sifat va innovatsiyaga sodiqmiz.",
        quickLinks: "Tezkor havolalar",
        followUs: "Bizni kuzatib boring",
        allRightsReserved: "Barcha huquqlar himoyalangan",
      },
    },
    en: {
      translation: {
        // Navigation
        home: "Home",
        products: "Products",
        agents: "Agents",
        about: "About Us",
        contact: "Contact",

        // Hero Section
        heroTitle: "Premium Automotive Fluids for Peak Performance",
        heroSubtitle:
          "Enhance your vehicle's efficiency and longevity with Condor's advanced formulations",
        heroImageAlt: "Condor product lineup",
        exploreProducts: "Explore Products",

        // Featured Products Section
        featuredProducts: "Our Featured Products",
        antifreeze: "Antifreeze",
        antifreezeImageAlt: "Condor Antifreeze product",
        antifreezeDesc: "Superior protection against extreme temperatures",
        motorOil: "Motor Oil",
        motorOilImageAlt: "Condor Motor Oil product",
        motorOilDesc: "Optimized engine performance and durability",
        transmissionFluid: "Transmission Fluid",
        transmissionFluidImageAlt: "Condor Transmission Fluid product",
        transmissionFluidDesc: "Smooth gear shifts and transmission longevity",
        learnMore: "Learn More",

        // Why Choose Us Section
        whyChooseCondor: "Why Choose Condor?",
        qualityTitle: "Uncompromising Quality",
        qualityDesc: "Our products meet and exceed industry standards",
        innovationTitle: "Continuous Innovation",
        innovationDesc: "We stay ahead with cutting-edge formulations",
        supportTitle: "Expert Support",
        supportDesc: "Our team is always ready to assist you",

        // CTA Section
        readyToStart: "Ready to Boost Your Vehicle's Performance?",
        ctaSubtitle:
          "Contact us today to find the perfect Condor product for your needs",
        contactUs: "Contact Us",

        // Products Page
        ourProducts: "Our Products",
        all: "All",
        oil: "Oil",
        dot: "DOT",
        water: "Water",
        volume: "Volume",
        category: "Category",

        // Product descriptions
        condorSimple200LDesc: "High-quality basic motor oil, 200 L volume",
        condorSimple20LDesc: "High-quality basic motor oil, 20 L volume",
        condorPowerGasoline200LDesc: "Enhanced oil for gasoline engines, 200 L",
        condorPowerGasoline20LDesc: "Enhanced oil for gasoline engines, 20 L",
        condorDiesel200LDesc: "Specialized oil for diesel engines, 200 L",
        condorDiesel20LDesc: "Specialized oil for diesel engines, 20 L",
        condorDiesel10LDesc: "Specialized oil for diesel engines, 10 L",
        condorPowerDiesel200LDesc: "Enhanced diesel oil, 200 L",
        condorPowerDiesel50LDesc: "Enhanced diesel oil, 20/50 viscosity, 50 L",
        condorPowerDiesel20LDesc: "Enhanced diesel oil, 20 L",
        condorPowerDiesel10LDesc: "Enhanced diesel oil, 10 L",
        condorTurboDiesel20LDesc:
          "Specialized oil for turbo diesel engines, 20 L",
        condorHD46_20LDesc: "Heavy-duty hydraulic oil, 46 viscosity, 20 L",
        condorHD68_20LDesc: "Heavy-duty hydraulic oil, 68 viscosity, 20 L",
        condorUZ20LDesc: "Universal antifreeze, 20 L",
        condorUZ10LDesc: "Universal antifreeze, 10 L",
        condorUZ5LDesc: "Universal antifreeze, 5 L",
        condorUZ4LDesc: "Universal antifreeze, 4 L",
        condorUZ3LDesc: "Universal antifreeze, 3 L",
        condorUZDesc: "Universal antifreeze",
        condorUZDolivkaDesc: "Antifreeze for topping up",
        condorDOT4_455grDesc: "DOT-4 brake fluid, 455 gr",
        condorDOT4_100grDesc: "DOT-4 brake fluid, 100 gr",
        waterLabovoy1LDesc: "Windshield washer fluid, 1 L",
        waterLabovoy5LDesc: "Windshield washer fluid, 5 L",
        // Agents Page
        ourAgents: "Our Agents",
        phone: "Phone",
        contactAgent: "Contact Agent",
        // About Page
        aboutUs: "About Us",
        ourHistory: "Our History",
        historyContent:
          "Condor was founded in 2000 and has grown to become a leading manufacturer in the automotive fluids industry. We have consistently focused on innovation and quality.",
        historyImageAlt: "Historical image of Condor company",
        missionVision: "Our Mission and Vision",
        ourMission: "Our Mission",
        missionContent:
          "To enhance vehicle performance and longevity by providing our customers with the highest quality automotive fluids.",
        ourVision: "Our Vision",
        visionContent:
          "To be the most trusted and innovative supplier of automotive fluids globally.",
        coreValues: "Our Core Values",
        qualityDescription:
          "We consistently deliver products that meet the highest standards.",
        innovationDescription:
          "We continually seek new technologies and solutions.",
        integrityTitle: "Integrity",
        integrityDescription:
          "We are committed to honesty and transparency in all our dealings.",
        sustainabilityTitle: "Sustainability",
        sustainabilityDescription:
          "We strive to protect the environment and adopt sustainable practices.",
        customerFocusTitle: "Customer Focus",
        customerFocusDescription: "Our customers' needs are our top priority.",
        teamworkTitle: "Teamwork",
        teamworkDescription:
          "We achieve success by working together and supporting each other.",
        ourTeam: "Our Team",
        teamMember1Name: "John Doe",
        teamMember1Position: "Chief Executive Officer",
        teamMember2Name: "Jane Smith",
        teamMember2Position: "Chief Technology Officer",
        teamMember3Name: "Mike Johnson",
        teamMember3Position: "Vice President of Sales",
        // Contact Page
        getInTouch: "Get in Touch",
        contactDescription:
          "Have a question or feedback? You can reach out to us using the information below or send us a message.",
        address: "Address",
        companyAddress: "123 Condor Street, Tashkent, Uzbekistan",
        companyPhone: "+998 12 345 6789",
        email: "Email",
        companyEmail: "info@condor.uz",
        mapAlt: "Map showing location of Condor office",
        sendMessage: "Send a Message",
        name: "Name",
        subject: "Subject",
        selectSubject: "Select a subject",
        generalInquiry: "General Inquiry",
        technicalSupport: "Technical Support",
        sales: "Sales",
        message: "Message",
        send: "Send",
        messageSent: "Your message has been sent. We'll get back to you soon!",
        customizeTheme: "Customize Theme",
        primaryColor: "Primary Color",
        secondaryColor: "Secondary Color",
        accentColor: "Accent Color",
        footerAboutText: "Condor is a leading manufacturer in the automotive fluids industry. We are committed to quality and innovation.",
        quickLinks: "Quick Links",
        followUs: "Follow Us",
        allRightsReserved: "All rights reserved",
      },
    },
  },
  lng: "uz", // Default language
  fallbackLng: "uz",
  interpolation: {
    escapeValue: false,
  },
};

i18n.use(initReactI18next).init(i18nConfig);

export default i18n;
