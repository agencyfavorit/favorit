import type { Dict } from './types';
import { CONTACTS } from '@/config/site';

export const en: Dict = {
  locale: 'en',
  lang: 'en',
  ogLocale: 'en_US',
  path: '/en/',

  meta: {
    title: 'Favorit — full-cycle software agency',
    description:
      'We design and build web platforms, mobile apps and AI systems for companies that play to win. Full cycle, from strategy to long-term support.',
    ogImageAlt: 'The word “Favorit” in square brackets above a photo of a phone and a laptop',
  },

  a11y: {
    skip: 'Skip to content',
    home: 'Favorit, home',
    mainNav: 'Main navigation',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    sitemap: 'Sitemap',
  },

  nav: [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services', count: 6 },
    { href: '#process', label: 'Process', count: 4 },
    { href: '#approach', label: 'Approach' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ],

  hero: {
    mark: 'Favorit',
    note: '(software agency)',
    heading: 'Favorit — full-cycle software agency',
    alt: 'A phone and a laptop on stone plinths against a blue backdrop',
  },

  about: {
    ghost: 'About',
    label: 'Full-cycle software agency',
    title: 'We build digital products for companies that play to win',
    lead: 'We design and engineer web platforms, mobile apps and AI systems. We take a product from idea to launch and stay on as it grows. One team and one point of accountability for the entire result.',
    ctaProject: 'Discuss a project',
    ctaTelegram: 'Message on Telegram',
    quote:
      'Behind every good product is a precise answer to a well-framed problem. We don’t write code for its own sake — we build systems that move the business forward.',
    quoteCaption: 'The principle every project starts with',
    tiles: [
      { value: '2 wks', label: 'Sprints with demos and visible progress' },
      { value: '100%', label: 'Source code and IP stay with you' },
      { value: '12 mo', label: 'Support after launch' },
      { value: '24 h', label: 'Reply to every inquiry' },
    ],
  },

  services: {
    label: 'What we do',
    title: 'Six disciplines,\none standard',
    lead: 'Full cycle: from strategy and design to launch and support. We take on the whole product or strengthen your team exactly where it’s needed.',
    cta: 'Discuss a project',
    more: 'Learn more',
    includesLabel: 'What’s included',
    stackLabel: 'Technology',
    items: [
      {
        id: 'web',
        title: 'Web development',
        short: 'Web development',
        desc: 'Websites, web services and e-commerce — from a landing page to a complex enterprise system. Fast, responsive and ready for load.',
        includes: ['Architecture and prototyping', 'Interface design', 'Frontend and backend', 'Launch, analytics and SEO foundations'],
        stack: ['React', 'Next.js', 'Vue', 'Node.js'],
        alt: 'An open laptop on a black granite plinth',
        page: {
          seoTitle: 'Web development, end to end — Favorit',
          seoDescription:
            'We design and build websites, web services and e-commerce — from prototype to launch and support. React, Next.js, Node.js.',
          lead: 'We build web products that load fast, rank well and hold up as traffic grows. We cover everything — from structure and design to infrastructure and analytics — and stay on for support after launch.',
          deliverables: [
            { title: 'Discovery & structure', text: 'We unpack the business goal and user journeys, then map pages and features before any design work.' },
            { title: 'Design & prototype', text: 'An interactive prototype and design system, tested with users before development starts.' },
            { title: 'Frontend', text: 'A fast, responsive interface in React or Vue, fully usable by keyboard and screen readers.' },
            { title: 'Backend & integrations', text: 'APIs, customer portals, payments, CRM and ERP — everything the product needs to work with data.' },
            { title: 'Performance & SEO', text: 'We tune load speed, Core Web Vitals and technical SEO so people find the site and stay.' },
            { title: 'Launch & support', text: 'Hosting, CI/CD, analytics and monitoring at launch — and continued development afterwards.' },
          ],
          faq: [
            {
              q: 'What do you build websites with?',
              a: 'We pick the stack for the job: Astro or Next.js for marketing sites, React or Vue with Node.js for complex services. No site builders — the source code is entirely yours.',
            },
            {
              q: 'Can you improve an existing website?',
              a: 'Yes. We start with an audit of the code, speed and SEO, then propose a plan: what to fix right away and what to rebuild.',
            },
            {
              q: 'Who will manage the content?',
              a: 'We connect an admin panel or a headless CMS so your team can edit copy and pages without developers.',
            },
          ],
        },
      },
      {
        id: 'mobile',
        title: 'Mobile apps',
        short: 'Mobile apps',
        desc: 'Native and cross-platform apps for iOS and Android — with considered UX and a smooth path through store review.',
        includes: ['UX and design to Apple and Google guidelines', 'iOS and Android development', 'Subscriptions, push and analytics', 'App Store and Google Play release'],
        stack: ['Swift', 'Kotlin', 'Flutter'],
        alt: 'Two smartphones on a stepped travertine plinth',
        page: {
          seoTitle: 'iOS and Android app development — Favorit',
          seoDescription:
            'Native and cross-platform apps: design to Apple and Google guidelines, subscriptions, push, analytics and App Store / Google Play release.',
          lead: 'We design and build apps that feel at home on iOS and Android. We own the whole path — from the first screen to store review, payment logic and post-launch analytics.',
          deliverables: [
            { title: 'Product & UX', text: 'Flows, onboarding and screens that follow Apple and Google guidelines, so the app needs no manual.' },
            { title: 'iOS & Android', text: 'Native development in Swift and Kotlin or cross-platform in Flutter — chosen for the task and budget.' },
            { title: 'Subscriptions & payments', text: 'In-app purchases, subscriptions and paywalls with renewals and refunds handled correctly.' },
            { title: 'Push & engagement', text: 'Push notifications, reminders and user segments that bring people back.' },
            { title: 'Analytics', text: 'Event and funnel tracking that shows where users drop off and what to improve.' },
            { title: 'Release & updates', text: 'We prepare store listings, get through App Store and Google Play review, and ship updates.' },
          ],
          faq: [
            {
              q: 'Native or cross-platform?',
              a: 'Native when performance and deep system integration matter. Flutter when you need both platforms faster from a single codebase. We’ll recommend one after the brief.',
            },
            {
              q: 'Can you help us pass App Store review?',
              a: 'Yes. We prepare the listing, screenshots and replies to reviewers, and we know where apps usually get stuck.',
            },
            {
              q: 'Can you port our app to the other platform?',
              a: 'Yes, we port apps from iOS to Android and back, keeping the logic and design intact.',
            },
          ],
        },
      },
      {
        id: 'ai',
        title: 'AI & machine learning',
        short: 'AI & ML',
        desc: 'AI built into real workflows: assistants, knowledge-base search, computer vision, forecasting and recommendations.',
        includes: ['Finding where AI actually pays off', 'A prototype on your own data', 'Integration into product and process', 'Quality and cost control'],
        stack: ['Python', 'PyTorch', 'OpenAI', 'LLM'],
        alt: 'A glass sphere refracting light on a granite plinth',
        page: {
          seoTitle: 'AI and machine learning implementation — Favorit',
          seoDescription:
            'AI assistants, knowledge-base search, computer vision and forecasting — from ROI assessment to production integration.',
          lead: 'We help you find the tasks where AI genuinely saves time and money, and take the solution all the way into real workflows — with answer quality and cost under control.',
          deliverables: [
            { title: 'Audit & assessment', text: 'We review processes and data, estimate the impact and pick the tasks where AI pays off fastest.' },
            { title: 'Assistants & agents', text: 'Chatbots and agents that answer from your documents and take actions in your systems.' },
            { title: 'Knowledge search', text: 'Search and answers across your internal base: policies, contracts, email and support tickets.' },
            { title: 'Computer vision', text: 'Recognising documents, products and defects in photos and video.' },
            { title: 'Forecasts & recommendations', text: 'Demand, churn and personalisation models trained on your data.' },
            { title: 'Quality & cost', text: 'Testing on real examples, answer monitoring and control over model spend.' },
          ],
          faq: [
            {
              q: 'Which models do you use?',
              a: 'Whatever fits the task: cloud models from OpenAI and other providers, or open models deployed on your side when data can’t leave your perimeter.',
            },
            {
              q: 'Is it safe to give AI our data?',
              a: 'We design the system so data travels no further than it must: masking, access control and, if needed, models running inside your infrastructure.',
            },
            {
              q: 'Where do we start if we’re not sure we need AI?',
              a: 'With a short audit: in a few sessions we’ll find tasks with a clear payoff — or tell you honestly that AI isn’t needed here.',
            },
          ],
        },
      },
      {
        id: 'backend',
        title: 'Backend & DevOps',
        short: 'Backend & DevOps',
        desc: 'Reliable infrastructure, APIs that hold up under load, and CI/CD for fast, predictable releases.',
        includes: ['Architecture and APIs', 'Cloud and containers', 'CI/CD and monitoring', 'Security and backups'],
        stack: ['Docker', 'Kubernetes', 'AWS', 'PostgreSQL'],
        alt: 'A rack server resting on stone slabs',
        page: {
          seoTitle: 'Backend development and DevOps — Favorit',
          seoDescription:
            'Architecture, high-load APIs, cloud infrastructure, CI/CD and monitoring — a reliable foundation for your product.',
          lead: 'We build server-side systems and infrastructure that take growth in their stride: clear architecture, automated releases, monitoring and backups.',
          deliverables: [
            { title: 'Architecture', text: 'A system designed for load and change: services, data, queues and integrations.' },
            { title: 'APIs & integrations', text: 'Documented REST and GraphQL APIs, plus integrations with payment, inventory and CRM systems.' },
            { title: 'Databases', text: 'Schemas, indexes and migrations in PostgreSQL and other databases — no data loss, no slow queries.' },
            { title: 'Cloud & containers', text: 'Docker, Kubernetes and managed cloud services, with infrastructure defined as code.' },
            { title: 'CI/CD', text: 'Automated builds, tests and deployments: a release becomes routine, not an event.' },
            { title: 'Monitoring & security', text: 'Logs, metrics, alerts, backups and regular dependency updates.' },
          ],
          faq: [
            {
              q: 'Will you take over a backend someone else built?',
              a: 'Yes. We start with an audit of the architecture, code and infrastructure, then take the system on and remove the risks step by step.',
            },
            {
              q: 'Which cloud do you deploy to?',
              a: 'Wherever suits you: AWS, Google Cloud, regional providers or your own servers — with data residency requirements in mind.',
            },
            {
              q: 'What will the infrastructure cost?',
              a: 'We estimate it during design and optimise it: cloud bills can often be cut without losing reliability.',
            },
          ],
        },
      },
      {
        id: 'design',
        title: 'Product design',
        short: 'Product design',
        desc: 'Interfaces people enjoy using: research, prototypes and design systems that outlive a single release.',
        includes: ['User research', 'Prototypes and testing', 'UI and design system', 'Lossless handoff to engineering'],
        stack: ['Figma', 'Design systems', 'UX research'],
        alt: 'A tablet with a stylus and a fan of colour swatches',
        page: {
          seoTitle: 'Product design and UX — Favorit',
          seoDescription: 'User research, prototypes, UI and design systems for web services and mobile apps.',
          lead: 'We design interfaces that make sense the first time and are easy to evolve — from user research to a design system your team can build new screens with, without us.',
          deliverables: [
            { title: 'Research', text: 'Interviews, competitor review and analytics: who your users are and what gets in their way.' },
            { title: 'Flows & structure', text: 'User journeys and information architecture before the first mock-up.' },
            { title: 'Prototype', text: 'A clickable prototype tested with users and agreed with your team.' },
            { title: 'UI design', text: 'Visual style, screens for every state and device, and micro-interactions.' },
            { title: 'Design system', text: 'Components, tokens and rules in Figma — the base for fast, consistent development.' },
            { title: 'Engineering handoff', text: 'Specs and implementation support, so the product ships the way it was designed.' },
          ],
          faq: [
            {
              q: 'Can we hire you for design only?',
              a: 'Yes. We hand over the mock-ups and design system to your team and support the implementation.',
            },
            {
              q: 'Do you work on existing products?',
              a: 'Yes. We start with a UX audit and analytics, then improve the most important flows step by step.',
            },
            {
              q: 'What do we get at the end?',
              a: 'Figma files with the design system, prototypes, specs and all source files — no lock-in.',
            },
          ],
        },
      },
      {
        id: 'web3',
        title: 'Blockchain & Web3',
        short: 'Blockchain & Web3',
        desc: 'Decentralised apps and smart contracts — with a security audit and integration into the product you already run.',
        includes: ['Smart contracts', 'dApps and wallets', 'Security audits', 'Integration with your product'],
        stack: ['Solidity', 'Ethereum', 'Web3.js'],
        alt: 'Brass hexagonal tokens and a black chain on granite',
        page: {
          seoTitle: 'Blockchain and Web3 development — Favorit',
          seoDescription: 'Smart contracts, dApps, wallets and security audits — integrated with the product you already run.',
          lead: 'We build blockchain solutions where they bring real value: transparent settlements, tokenisation and digital assets. Security is designed in from the first line of the contract.',
          deliverables: [
            { title: 'Design', text: 'We choose the network and architecture and specify the tokenomics and contract logic.' },
            { title: 'Smart contracts', text: 'Solidity contracts with tests and documentation.' },
            { title: 'dApps & wallets', text: 'Web and mobile interfaces, wallet connection and transaction signing.' },
            { title: 'Security audit', text: 'Contract code reviewed for known vulnerabilities and logic errors.' },
            { title: 'Integration', text: 'Connecting the chain to your backend, payment systems and accounting.' },
            { title: 'Launch & support', text: 'Deployment, transaction monitoring and contract upgrades.' },
          ],
          faq: [
            {
              q: 'Do we actually need a blockchain?',
              a: 'Not always. We look at the problem first: if a regular database solves it more simply and cheaply, we’ll say so.',
            },
            {
              q: 'Do you audit third-party contracts?',
              a: 'Yes. We review the contract code and deliver a report with the risks we found and our recommendations.',
            },
            {
              q: 'Which networks do you work with?',
              a: 'Mostly Ethereum and EVM-compatible networks; others we discuss case by case.',
            },
          ],
        },
      },
    ],
  },

  servicePage: {
    label: 'Services',
    deliverablesTitle: 'What’s included',
    priceTitle: 'Pricing —\non request',
    priceText:
      'We estimate after a short brief: within 24 hours you get a stage-by-stage quote — what’s included, what it costs and how long it takes.',
    priceCta: 'Get an estimate',
    faqTitle: 'Frequently\nasked questions',
    faqLead: 'What people usually ask about this discipline.',
    otherTitle: 'Other\ndisciplines',
  },

  process: {
    title: 'A process\nwithout surprises',
    cta: 'Discuss a project',
    stage: 'Stage',
    outcome: 'Outcome:',
    steps: [
      {
        title: 'Discovery',
        text: 'We dig into the business context, the market and the audience, and frame the problem more precisely than the brief does.',
        out: 'a clear scope, timeline and budget',
      },
      {
        title: 'Strategy & design',
        text: 'We design the architecture and UX, then prototype and validate decisions before a single line of code.',
        out: 'a prototype and design tested with users',
      },
      {
        title: 'Development',
        text: 'Two-week sprints with weekly demos. Progress is visible all the time — not the day before the deadline.',
        out: 'a working build after every sprint',
      },
      {
        title: 'Launch & growth',
        text: 'We ship to production, watch the metrics and stay on for support. Launch is the start line, not the finish.',
        out: 'release, metrics and ongoing support',
      },
    ],
  },

  approach: {
    ghost: 'Approach',
    title: 'Why companies\nbet on us',
    lead: 'We’re accountable not for lines of code but for a product that works for the business. Four rules we keep on every project — even when it makes things harder for us.',
    tabsLabel: 'How we work',
    alt: 'A brass sphere on the tallest of three stone columns',
    items: [
      {
        tab: 'Precision',
        title: 'The right solution, not the most code',
        text: 'We start from the business problem, not the technology. If a feature isn’t worth building, we’ll say so. The best code is the code you never had to write.',
      },
      {
        tab: 'Transparency',
        title: 'Transparency over promises',
        text: 'Weekly demos, honest timelines and estimates without fine print. At any moment you can see where the time and budget go.',
      },
      {
        tab: 'Ownership',
        title: 'Accountable for outcomes, not paperwork',
        text: 'Handing over a project isn’t the end for us. A good product keeps living and evolving — and we stay alongside it.',
      },
      {
        tab: 'Freedom',
        title: 'No vendor lock-in',
        text: 'Code, access and documentation are yours from day one. Leaving us is as easy as starting.',
      },
    ],
  },

  faq: {
    title: 'Frequently\nasked questions',
    lead: 'The things people usually ask before we start working together.',
    askTitle: 'Still have questions about your project?',
    askCta: 'Message on Telegram',
    items: [
      {
        q: 'How much does development cost?',
        a: 'Pricing is on request: it depends on scope and timeline. After a short brief we send an estimate broken down by stage — what’s included, what it costs and how long it takes. No fine print, no hidden fees.',
      },
      {
        q: 'How long will the project take?',
        a: 'A small website or prototype takes weeks, an MVP a few months, and larger systems are split into stages with separate releases. We fix the schedule at the start and show progress in weekly demos.',
      },
      {
        q: 'Who owns the code and the rights?',
        a: 'You do. Source code, access and documentation are handed over from day one, and ownership of the result is set out in the contract.',
      },
      {
        q: 'Do you work with startups and smaller companies?',
        a: 'Yes. With startups we usually begin with an MVP: ship the core, test it with real users and grow what works.',
      },
      {
        q: 'Can you join a project that’s already underway?',
        a: 'Yes. We start with an audit of the code and infrastructure, then either take over development or reinforce your team.',
      },
      {
        q: 'What happens after launch?',
        a: 'We stay on support: fixing issues, keeping things up to date and developing the product further. Twelve months of post-launch support are included by default.',
      },
      {
        q: 'How do we get started?',
        a: 'Answer four questions in the form below or message us on Telegram. Within 24 hours we’ll come back with a few questions and suggest a time for a call.',
      },
    ],
  },

  contact: {
    label: 'Let’s talk',
    title: 'Tell us\nabout the task',
    lead: 'Four quick questions — and we’ll come back with an estimate within 24 hours, with no fluff and no strings attached.',
    rows: [
      { label: 'Email', value: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
      { label: 'Telegram', value: CONTACTS.telegramHandle, href: CONTACTS.telegramUrl },
      { label: 'Office', value: 'Moscow, Andropova Avenue 38' },
    ],
    brief: {
      step: 'Step',
      of: 'of',
      next: 'Next',
      back: 'Back',
      required: 'Choose an option to continue',
      questions: [
        {
          field: 'What we need',
          legend: 'What do you need?',
          hint: 'Choose as many as apply',
          multiple: true,
          options: [
            { id: 'web', label: 'A website or web service' },
            { id: 'mobile', label: 'A mobile app' },
            { id: 'ai', label: 'An AI solution' },
            { id: 'backend', label: 'Backend & DevOps' },
            { id: 'design', label: 'Product design' },
            { id: 'web3', label: 'Blockchain & Web3' },
            { id: 'unsure', label: 'Not sure yet — need advice' },
          ],
        },
        {
          field: 'Stage',
          legend: 'Where is the project now?',
          options: [
            { id: 'idea', label: 'It’s an idea' },
            { id: 'spec', label: 'We have a spec or design' },
            { id: 'live', label: 'The product is live' },
            { id: 'team', label: 'We need to grow the team' },
          ],
        },
        {
          field: 'Timeline',
          legend: 'When do you need it?',
          options: [
            { id: 'asap', label: 'As soon as possible' },
            { id: '1-3', label: '1–3 months' },
            { id: '3-6', label: '3–6 months' },
            { id: 'flex', label: 'The timeline is flexible' },
          ],
        },
        {
          field: 'Budget',
          legend: 'Approximate budget',
          options: [
            { id: 'b1', label: 'Under $10k' },
            { id: 'b2', label: '$10k – $30k' },
            { id: 'b3', label: '$30k – $100k' },
            { id: 'b4', label: 'Over $100k' },
            { id: 'b0', label: 'Not sure yet' },
          ],
        },
      ],
      contactsLegend: 'How can we reach you?',
    },
    form: {
      subject: 'New inquiry from favorit.agency',
      honeypot: 'Leave this field empty',
      name: 'Name and company',
      namePlaceholder: 'Alex, SupplyHub',
      email: 'Email',
      emailPlaceholder: 'alex@company.com',
      message: 'A few words about the task',
      messagePlaceholder: 'Optional, but it helps us prepare for the call',
      consentBefore: 'By submitting, you agree to our ',
      consentLink: 'personal data policy',
      consentAfter: '.',
      submit: 'Send request',
      sending: 'Sending…',
      sent: 'Request sent',
      error: 'Something went wrong — try again',
    },
  },

  footer: {
    talk: 'Get in touch',
    company: 'Favorit LLC',
    requisites: [
      'Favorit LLC · INN 7743578436 · KPP 772501001',
      'Andropova Avenue 38, premises III, room 1–24, Moscow 115487, Russia',
    ],
    rights: '© Favorit LLC. All rights reserved.',
    privacy: 'Privacy policy',
    offer: 'Terms of service',
  },

  notFound: {
    title: 'Page not found',
    text: 'The link may be outdated, or there’s a typo in the address.',
    back: 'Back to home',
  },
};
