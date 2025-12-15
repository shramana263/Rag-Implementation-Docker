// /src/data/mockNewsData.ts

import { RawArticle } from '../types/article';

// --- MOCK DATA ---
// NOTE: You must expand this array to contain approximately 50 unique articles 
// with varying content to fully satisfy the assignment requirement (~50 news articles).
export type MockRawArticle = {
    id: string;
    title: string;
    content: string;
    url: string;
};

export const mockNewsArticles: RawArticle[] = [
    {
        id: "a1",
        title: "Global Chip Shortage Impacts Auto Industry",
        content: "The ongoing global shortage of semiconductor chips has severely impacted automotive production worldwide, leading to factory shutdowns and rising prices for both new and used vehicles. Experts predict the shortage may ease in late 2026, but full recovery remains uncertain. Key manufacturers are aggressively investing in new fabrication plants to secure future supply.",
        url: "https://mocknews.com/chip-shortage-auto",
    },
    {
        id: "a2",
        title: "New Policy on Renewable Energy Subsidies Announced",
        content: "The Ministry of Energy today announced a major new policy framework designed to boost investment in offshore wind and solar power. The policy introduces significant tax subsidies for projects meeting strict environmental standards. Critics argue the subsidies do not go far enough to address coal dependency, while industry leaders praise the long-term vision.",
        url: "https://mocknews.com/renewable-policy",
    },
    {
        id: "a3",
        title: "Local Startup Edwid Tech Raises Series B Funding",
        content: "Edwid Tech PVT LTD, a local leader in AI-powered intelligence systems, successfully closed a Series B funding round this week, raising $25 million. The capital will be used to expand their engineering team and accelerate development of their new scalable RAG platform. The company aims to hire dozens of backend developers and data scientists over the next quarter.",
        url: "https://mocknews.com/edwid-funding",
    },
    {
        id: "a4",
        title: "Major League Baseball Bans Shift Restrictions",
        content: "Effective next season, Major League Baseball (MLB) will implement strict rules limiting defensive shifts. The change is aimed at increasing batting averages and improving the pace of play. Early fan reaction is mixed, with traditionalists supporting the return to old-school tactics and analytics enthusiasts predicting marginal impact.",
        url: "https://mocknews.com/mlb-shift",
    },
    {
        id: "a5",
        title: "Tech Giants Report Record Quarterly Earnings",
        content: "Major technology companies announced unprecedented profit margins this quarter, driven by cloud computing services and AI product adoption. Revenue growth exceeded analyst expectations by 15%, though concerns about market saturation are mounting. Companies are investing heavily in AI research and development.",
        url: "https://mocknews.com/tech-earnings",
    },
    {
        id: "a6",
        title: "Climate Summit Reaches Historic Carbon Reduction Agreement",
        content: "World leaders have signed a landmark agreement committing to reduce global carbon emissions by 50% before 2035. The treaty includes binding enforcement mechanisms and establishes a $500 billion climate fund for developing nations. Environmental groups call it a critical first step, though some economists worry about economic impacts.",
        url: "https://mocknews.com/climate-summit",
    },
    {
        id: "a7",
        title: "Healthcare Innovation: New Gene Therapy Approved",
        content: "Regulatory authorities have approved a groundbreaking gene therapy treatment for rare genetic disorders. The therapy has shown 95% success rates in clinical trials, offering hope to thousands of patients worldwide. Manufacturing capacity remains limited, and pricing discussions are ongoing with healthcare providers.",
        url: "https://mocknews.com/gene-therapy",
    },
    {
        id: "a8",
        title: "E-Commerce Platform Expands to 50 New Markets",
        content: "A leading e-commerce company announced expansion into 50 additional countries this fiscal year. The aggressive growth strategy includes localized payment systems and regional warehousing. Competitors are preparing counter-strategies as the global online retail market intensifies.",
        url: "https://mocknews.com/ecommerce-expansion",
    },
    {
        id: "a9",
        title: "University Research Team Develops Advanced Battery Technology",
        content: "Scientists at a leading research institution have developed a new battery technology with 3x longer lifespan and faster charging capabilities. The breakthrough could revolutionize electric vehicle adoption and renewable energy storage. Tech companies are already licensing the patent for commercial applications.",
        url: "https://mocknews.com/battery-tech",
    },
    {
        id: "a10",
        title: "Government Announces Cybersecurity Initiative",
        content: "A national cybersecurity strategy has been unveiled to protect critical infrastructure from rising threats. The plan includes mandatory security audits, workforce training programs, and a $2 billion investment in defensive technologies. Industry leaders express support for standardized compliance frameworks.",
        url: "https://mocknews.com/cybersecurity",
    },
    {
        id: "a11",
        title: "Agricultural Sector Adopts AI-Driven Farming Solutions",
        content: "Farmers worldwide are increasingly adopting AI-powered systems for crop monitoring and yield optimization. Machine learning models predict pest outbreaks and optimize irrigation schedules. Early adopters report 20-30% increases in productivity and significant resource savings.",
        url: "https://mocknews.com/ai-farming",
    },
    {
        id: "a12",
        title: "Space Agency Announces Moon Base Construction Timeline",
        content: "A major space agency revealed plans to establish a permanent lunar base by 2030. The project will involve international cooperation and significant technological advances in habitation systems. Commercial space companies are bidding for supply contracts worth billions of dollars.",
        url: "https://mocknews.com/moon-base",
    },
    {
        id: "a13",
        title: "Telecommunications Provider Launches 5G Network Nationwide",
        content: "A leading telecom company has completed its nationwide 5G rollout, covering 95% of urban populations. The network enables unprecedented data speeds and low latency applications. Enterprise clients are already developing innovative use cases for the new infrastructure.",
        url: "https://mocknews.com/5g-launch",
    },
    {
        id: "a14",
        title: "Financial Markets React to Interest Rate Decisions",
        content: "Central banks announced interest rate adjustments in response to inflation trends. Markets experienced significant volatility following the announcement, with stock indices fluctuating by 3-5%. Economists remain divided on the long-term implications for economic growth.",
        url: "https://mocknews.com/interest-rates",
    },
    {
        id: "a15",
        title: "Transportation Sector Shifts to Electric Vehicles",
        content: "Major cities are mandating fleet conversions to electric vehicles by 2030. Public transportation agencies are investing in charging infrastructure and battery technology. Vehicle manufacturers are accelerating EV production to meet surging demand.",
        url: "https://mocknews.com/ev-transition",
    },
    {
        id: "a16",
        title: "Education Platform Reports Explosive Growth in Online Learning",
        content: "EdTech platforms have seen enrollment increase by 40% year-over-year, driven by remote work trends. Investment in interactive learning technologies and AI tutoring systems is accelerating. Traditional educational institutions are partnering with digital platforms.",
        url: "https://mocknews.com/edtech-growth",
    },
    {
        id: "a17",
        title: "Pharmaceutical Company Announces COVID-19 Vaccine Advancement",
        content: "Researchers have developed an enhanced vaccine candidate with improved efficacy against emerging variants. Clinical trials show 98% effectiveness in early stages. Distribution partnerships are being negotiated with governments and international health organizations.",
        url: "https://mocknews.com/vaccine-advance",
    },
    {
        id: "a18",
        title: "Manufacturing Industry Embraces Industry 4.0 Technologies",
        content: "Smart factories integrating IoT sensors and robotic automation are reporting efficiency gains of 35%. Supply chain visibility has improved dramatically with real-time tracking systems. Companies are investing in digital transformation to remain competitive.",
        url: "https://mocknews.com/industry-40",
    },
    {
        id: "a19",
        title: "Streaming Services Consolidate Market Position",
        content: "Entertainment streaming platforms are investing heavily in original content production. Competition for subscriber loyalty intensifies as price wars continue. Bundling strategies and ad-supported tiers are changing consumer expectations.",
        url: "https://mocknews.com/streaming-wars",
    },
    {
        id: "a20",
        title: "Retail Sector Undergoes Digital Transformation",
        content: "Traditional retailers are accelerating digital integration with augmented reality shopping experiences. Omnichannel strategies combining online and offline operations are becoming essential. Companies investing in technology are capturing market share from slower competitors.",
        url: "https://mocknews.com/retail-digital",
    },
    {
        id: "a21",
        title: "Water Treatment Innovation Addresses Global Scarcity",
        content: "A new desalination technology uses 60% less energy than conventional methods. The innovation could provide fresh water to millions in arid regions. Governments and private investors are funding large-scale pilot projects.",
        url: "https://mocknews.com/water-treatment",
    },
    {
        id: "a22",
        title: "Insurance Industry Adopts Blockchain for Claims Processing",
        content: "Blockchain technology is streamlining insurance claims, reducing processing time from weeks to hours. Smart contracts automate claim verification and payments. Industry adoption is accelerating as trust in the technology grows.",
        url: "https://mocknews.com/blockchain-insurance",
    },
    {
        id: "a23",
        title: "Food Industry Explores Sustainable Packaging Solutions",
        content: "Major food companies are transitioning to biodegradable and compostable packaging materials. Regulatory pressure and consumer demand are driving innovation in sustainable alternatives. Production costs are decreasing as economies of scale emerge.",
        url: "https://mocknews.com/sustainable-packaging",
    },
    {
        id: "a24",
        title: "Mental Health Tech Sector Experiences Rapid Expansion",
        content: "Digital mental health platforms have grown user bases by 50% amid increased awareness. AI-powered chatbots and virtual therapy sessions are becoming mainstream. Healthcare providers are integrating digital mental health into treatment protocols.",
        url: "https://mocknews.com/mental-health-tech",
    },
    {
        id: "a25",
        title: "Logistics Companies Deploy Autonomous Delivery Systems",
        content: "Self-driving delivery vehicles are operating in controlled environments across major cities. Route optimization algorithms reduce delivery times by 25%. Regulatory frameworks are being developed to enable wider deployment.",
        url: "https://mocknews.com/autonomous-delivery",
    },
    {
        id: "a26",
        title: "Fashion Industry Embraces Digital Fashion and NFTs",
        content: "Digital clothing and virtual fashion items are gaining traction among younger consumers. NFT-based authentication ensures luxury brand exclusivity. Traditional fashion houses are launching digital-first collections.",
        url: "https://mocknews.com/digital-fashion",
    },
    {
        id: "a27",
        title: "Sports Analytics Revolution Transforms Team Performance",
        content: "Professional sports teams are using advanced analytics to optimize player performance and injury prevention. Wearable technology provides real-time biometric data. Data-driven decision making is becoming a competitive advantage.",
        url: "https://mocknews.com/sports-analytics",
    },
    {
        id: "a28",
        title: "Hospitality Sector Leverages AI for Personalized Guest Experiences",
        content: "Hotels are implementing AI systems that predict guest preferences and personalize services. Chatbots handle inquiries and reservations with 95% accuracy. Guest satisfaction scores have improved significantly with AI integration.",
        url: "https://mocknews.com/hospitality-ai",
    },
    {
        id: "a29",
        title: "Construction Industry Adopts Drone Surveys and 3D Modeling",
        content: "Drones and 3D modeling technology are improving project planning and reducing construction delays. Real-time site monitoring enables faster problem identification. Cost savings from improved efficiency exceed initial technology investments.",
        url: "https://mocknews.com/construction-tech",
    },
    {
        id: "a30",
        title: "Gaming Industry Reports Record Revenue and User Engagement",
        content: "The gaming sector generated $200 billion in revenue last year, driven by mobile and cloud gaming. Esports tournaments attract millions of viewers and substantial sponsorships. Game streaming platforms continue to dominate entertainment consumption.",
        url: "https://mocknews.com/gaming-revenue",
    },
    {
        id: "a31",
        title: "Legal Tech Platform Automates Contract Management",
        content: "Artificial intelligence is transforming legal services by automating document review and contract analysis. Law firms report 40% reduction in administrative overhead. AI-powered research is improving case preparation efficiency.",
        url: "https://mocknews.com/legal-tech",
    },
    {
        id: "a32",
        title: "Real Estate Market Shows Resilience Amid Economic Uncertainty",
        content: "Property markets remain strong despite broader economic concerns, driven by remote work flexibility. Virtual property tours and blockchain-based transactions are accelerating sales. Investment interest in commercial real estate is recovering.",
        url: "https://mocknews.com/real-estate",
    },
    {
        id: "a33",
        title: "Beverage Industry Invests in Plant-Based Alternatives",
        content: "Major beverage manufacturers are launching plant-based and sustainable product lines. Consumer preference shifts toward healthier options are reshaping product portfolios. Investment in alternative ingredient research is increasing dramatically.",
        url: "https://mocknews.com/plant-based",
    },
    {
        id: "a34",
        title: "Aerospace Industry Plans Commercial Space Tourism",
        content: "Multiple aerospace companies are preparing to offer suborbital and orbital flights to consumers. Ticket prices are decreasing as competition increases and technology matures. Regulatory frameworks for space tourism are being established.",
        url: "https://mocknews.com/space-tourism",
    },
    {
        id: "a35",
        title: "Automotive Industry Launches Advanced Driver Assistance Systems",
        content: "Semi-autonomous vehicle technologies are becoming standard features in new vehicles. Driver assistance systems reduce accident rates by 25% in early deployments. Full autonomy timelines are being extended as technical challenges emerge.",
        url: "https://mocknews.com/adas-systems",
    },
    {
        id: "a36",
        title: "Cybersecurity Threats Require Enhanced Data Protection",
        content: "Ransomware attacks targeting businesses have increased by 60% this year. Organizations are investing in zero-trust security architecture and threat detection systems. Insurance companies are expanding cyber liability coverage options.",
        url: "https://mocknews.com/cyber-threats",
    },
    {
        id: "a37",
        title: "Human Resources Technology Streamlines Talent Management",
        content: "HR platforms using AI for recruitment are reducing hiring time by 50%. Employee engagement software improves retention rates through better communication. Predictive analytics identify flight risk and development opportunities.",
        url: "https://mocknews.com/hr-tech",
    },
    {
        id: "a38",
        title: "Supply Chain Resilience Becomes Strategic Priority",
        content: "Companies are diversifying suppliers and building inventory buffers to improve resilience. Supply chain visibility technologies provide real-time tracking across networks. Investment in nearshoring and domestic production is accelerating.",
        url: "https://mocknews.com/supply-chain",
    },
    {
        id: "a39",
        title: "Customer Service Excellence Driven by AI Chatbots",
        content: "AI-powered chatbots handle 80% of routine customer inquiries efficiently. Natural language processing capabilities continue to improve conversation quality. Companies report higher customer satisfaction and reduced support costs.",
        url: "https://mocknews.com/chatbots",
    },
    {
        id: "a40",
        title: "Entertainment Industry Explores Metaverse Opportunities",
        content: "Virtual worlds are attracting entertainment companies seeking new revenue streams. Concert performances and virtual events draw millions of participants. Investment in metaverse platforms is reaching billions of dollars annually.",
        url: "https://mocknews.com/metaverse",
    },
    {
        id: "a41",
        title: "Medical Imaging Technology Improves Diagnostic Accuracy",
        content: "AI algorithms analyzing medical images achieve diagnostic accuracy exceeding human radiologists. Early detection capabilities improve patient outcomes significantly. Healthcare systems are rapidly adopting AI-powered imaging analysis.",
        url: "https://mocknews.com/medical-imaging",
    },
    {
        id: "a42",
        title: "Fintech Disruption Accelerates Digital Banking Adoption",
        content: "Digital-only banks are gaining market share from traditional institutions. Blockchain-based payments enable faster cross-border transactions. Regulatory frameworks are evolving to accommodate fintech innovation.",
        url: "https://mocknews.com/fintech",
    },
    {
        id: "a43",
        title: "Environmental Monitoring Uses Satellite Technology",
        content: "Satellite imagery and AI enable real-time environmental monitoring for climate change research. Deforestation tracking and ocean pollution detection have become more accurate. Space agencies are launching dedicated environmental observation missions.",
        url: "https://mocknews.com/environmental-monitoring",
    },
    {
        id: "a44",
        title: "Language Learning Platforms Leverage Immersive Technologies",
        content: "Virtual reality language learning provides immersive practice environments. Adaptive learning algorithms personalize difficulty based on student progress. Adoption among language learners is growing rapidly.",
        url: "https://mocknews.com/language-learning",
    },
    {
        id: "a45",
        title: "Fitness Industry Embraces Wearable Technology Integration",
        content: "Wearable devices track comprehensive health metrics enabling personalized fitness recommendations. Virtual fitness classes with live coaching attract millions of subscribers. Gym memberships are being supplemented with digital fitness services.",
        url: "https://mocknews.com/fitness-tech",
    },
    {
        id: "a46",
        title: "Agriculture Investment Grows in Precision Farming",
        content: "Precision agriculture using GPS and sensor technology optimizes resource usage. Soil health monitoring reduces chemical inputs while maintaining yields. Startup funding in agri-tech reaches $8 billion annually.",
        url: "https://mocknews.com/precision-farming",
    },
    {
        id: "a47",
        title: "Energy Sector Transitions to Smart Grid Infrastructure",
        content: "Smart grids with distributed renewable generation improve energy efficiency. Real-time demand response systems balance supply and consumption. Utilities are investing billions in grid modernization projects.",
        url: "https://mocknews.com/smart-grid",
    },
    {
        id: "a48",
        title: "Music Industry Transforms Through Streaming and NFTs",
        content: "Artists are releasing NFT collections alongside traditional releases. Streaming platforms now dominate music industry revenue. Direct fan engagement through digital platforms is creating new artist opportunities.",
        url: "https://mocknews.com/music-streaming",
    },
    {
        id: "a49",
        title: "Quality Assurance Benefits from Automation and AI Testing",
        content: "Automated testing frameworks reduce manual QA time by 70% while improving coverage. AI-powered test generation identifies edge cases humans might miss. Software release cycles are accelerating with improved testing efficiency.",
        url: "https://mocknews.com/qa-automation",
    },
    {
        id: "a50",
        title: "Cloud Computing Market Expansion Accelerates Digital Transformation",
        content: "Enterprise migration to cloud platforms continues at record pace with 85% adoption. Multi-cloud strategies provide flexibility and reduce vendor lock-in risks. Cloud infrastructure spending exceeds $500 billion annually.",
        url: "https://mocknews.com/cloud-computing",
    },
];
