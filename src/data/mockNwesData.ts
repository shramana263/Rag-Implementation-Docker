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
    // --- ADD 46 MORE ARTICLES HERE TO REACH THE ~50 ARTICLE REQUIREMENT ---
];