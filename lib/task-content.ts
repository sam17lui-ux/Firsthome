export interface TaskContent {
  explainer: string;
  whyItMatters: string;
  actionableSteps: string[];
  partnerLinks?: {
    name: string;
    url: string;
    description: string;
  }[];
  notePlaceholder: string;
}

export const taskContent: Record<string, TaskContent> = {
  // Stage 0: Get Ready
  "check-affordability": {
    explainer: "Before you start house hunting, you need to know exactly how much you can borrow. Lenders look at your income, outgoings, credit score, and existing debts.",
    whyItMatters: "Without knowing your budget, you could waste time viewing homes you can't afford - or worse, miss out on properties within your range because you didn't realise you could stretch further.",
    actionableSteps: [
      "Calculate your total household income (after tax)",
      "List all monthly outgoings including subscriptions",
      "Check your credit score with a free service",
      "Use an affordability calculator to get a rough figure"
    ],
    partnerLinks: [
      { name: "Trussle", url: "https://trussle.com", description: "Free mortgage broker" },
      { name: "MSE Calculator", url: "https://www.moneysavingexpert.com/mortgages/mortgage-affordability-calculator/", description: "Affordability tool" }
    ],
    notePlaceholder: "Budget: £X. Monthly payment comfortable at £X. Credit score: X."
  },
  "mortgage-in-principle": {
    explainer: "A Mortgage in Principle (MIP) is a statement from a lender saying they'd likely lend you a certain amount, based on a soft credit check. It's not a guarantee, but it shows sellers you're serious.",
    whyItMatters: "Estate agents and sellers take you more seriously with an MIP. Some won't even book viewings without one. It also helps you avoid disappointment by confirming your budget upfront.",
    actionableSteps: [
      "Gather proof of income (payslips or accounts)",
      "Have your bank statements ready (last 3 months)",
      "Know your deposit amount",
      "Apply online - most take 15-30 minutes"
    ],
    partnerLinks: [
      { name: "Habito", url: "https://www.habito.com", description: "Digital mortgage broker" },
      { name: "Trussle", url: "https://trussle.com", description: "Free online broker" }
    ],
    notePlaceholder: "Applied with Halifax. Approved for £220k. Broker: Liam @ L&C."
  },
  "understand-deposit": {
    explainer: "Your deposit is the chunk of cash you pay upfront. Most first-time buyers need at least 5-10%, but 15-20% gets you better rates. Don't forget buying costs on top!",
    whyItMatters: "The bigger your deposit, the lower your monthly payments and the better interest rates you'll get. But you also need to budget for stamp duty, solicitor fees, surveys, and moving costs.",
    actionableSteps: [
      "Calculate 5%, 10%, 15% of your target property price",
      "Add £3,000-£5,000 for buying costs",
      "Check if you qualify for any schemes (Help to Buy ISA, Lifetime ISA)",
      "Start a dedicated savings account if you haven't already"
    ],
    notePlaceholder: "Deposit saved: £X. Using LISA bonus: £X. Total costs budget: £X."
  },
  "register-portals": {
    explainer: "Property portals like Rightmove and Zoopla are where most homes are listed. Setting up alerts means you'll know the moment something matching your criteria hits the market.",
    whyItMatters: "Good properties go fast - sometimes within days. Being first to see a listing gives you the best chance of booking early viewings before it's snapped up.",
    actionableSteps: [
      "Create accounts on Rightmove, Zoopla, and OnTheMarket",
      "Set up email alerts for your target areas and budget",
      "Download the mobile apps for instant notifications",
      "Register with local estate agents directly too"
    ],
    partnerLinks: [
      { name: "Rightmove", url: "https://www.rightmove.co.uk", description: "UK's biggest property site" },
      { name: "Zoopla", url: "https://www.zoopla.co.uk", description: "Property search" }
    ],
    notePlaceholder: "Alerts set for: [areas]. Budget: £X-£X. Must-haves: [list]."
  },

  // Stage 1: Make an Offer
  "viewing-questions": {
    explainer: "Viewings are your chance to spot issues and get a feel for the property. Don't just look - ask questions! The seller or agent must answer honestly.",
    whyItMatters: "Rushing viewings means missing problems that could cost thousands later. A few smart questions now can save you from a money pit.",
    actionableSteps: [
      "Ask how long it's been on the market and why they're selling",
      "Check for damp, cracks, and signs of leaks",
      "Ask about the boiler age, roof condition, and recent work",
      "Visit at different times of day if possible"
    ],
    notePlaceholder: "Property: [address]. Pros: [list]. Concerns: [list]. Agent: [name]."
  },
  "how-to-negotiate": {
    explainer: "Most asking prices have room for negotiation. Research comparable sales, consider how long it's been listed, and factor in any work needed.",
    whyItMatters: "Even a 5% reduction on a £250k home saves you £12,500. That's money for renovations, furniture, or just peace of mind.",
    actionableSteps: [
      "Research what similar properties sold for (use Rightmove sold prices)",
      "Note any issues that justify a lower offer",
      "Start below your maximum but not insultingly low",
      "Be prepared to negotiate - rarely is the first offer accepted"
    ],
    notePlaceholder: "Asking: £X. My offer: £X. Final max: £X. Reasoning: [notes]."
  },
  "after-offer-accepted": {
    explainer: "Congratulations! But the hard work starts now. Nothing is legally binding until exchange, so things can still fall through. Move quickly but carefully.",
    whyItMatters: "The period between offer acceptance and exchange is when most sales collapse. Staying organised and proactive reduces your risk.",
    actionableSteps: [
      "Instruct a solicitor immediately",
      "Start your full mortgage application",
      "Book a survey",
      "Stay in regular contact with your solicitor and agent"
    ],
    notePlaceholder: "Offer accepted: [date]. Price: £X. Target exchange: [date]."
  },

  // Stage 2: Prepare for Legal & Financial
  "find-solicitor": {
    explainer: "A conveyancing solicitor handles all the legal work - contracts, searches, money transfers. You can use a local firm or an online conveyancer. Get quotes from 3-4.",
    whyItMatters: "A slow or unresponsive solicitor is the #1 cause of delays. Finding someone communicative and efficient can shave weeks off your timeline.",
    actionableSteps: [
      "Get recommendations from friends or your mortgage broker",
      "Compare quotes (expect £800-£1,500 for a straightforward purchase)",
      "Check reviews on Trustpilot and Google",
      "Ask about their average completion time"
    ],
    partnerLinks: [
      { name: "Which? Trusted", url: "https://www.which.co.uk/money/mortgages-and-property/conveyancing", description: "Vetted solicitors" },
      { name: "reallymoving", url: "https://www.reallymoving.com", description: "Compare quotes" }
    ],
    notePlaceholder: "Using Smith & Partners. Quote: £1,200. Contact: sarah@smithpartners.co.uk"
  },
  "mortgage-application": {
    explainer: "Now you submit the full mortgage application with all supporting documents. The lender will verify everything and arrange a valuation of the property.",
    whyItMatters: "Until the mortgage is approved, your purchase isn't secure. Any issues with your application or the property valuation could derail things.",
    actionableSteps: [
      "Gather 3 months of payslips and bank statements",
      "Provide ID and proof of address",
      "Don't change jobs or take new credit during this time",
      "Respond to any lender queries immediately"
    ],
    partnerLinks: [
      { name: "Habito", url: "https://www.habito.com", description: "Digital mortgage broker" }
    ],
    notePlaceholder: "Lender: [name]. Amount: £X. Rate: X%. Application submitted: [date]."
  },
  "book-survey": {
    explainer: "A survey is a professional inspection of the property's condition. The basic valuation your lender does isn't enough - you need your own survey to spot problems.",
    whyItMatters: "Surveys catch issues like subsidence, damp, or roof problems that could cost tens of thousands to fix. Better to know before you buy!",
    actionableSteps: [
      "Choose survey level: Condition Report, Homebuyer's, or Full Building Survey",
      "For older or unusual properties, go for the more detailed option",
      "Book a RICS-qualified surveyor",
      "Read the report carefully and ask questions"
    ],
    partnerLinks: [
      { name: "RICS", url: "https://www.rics.org/find-a-surveyor", description: "Find a surveyor" }
    ],
    notePlaceholder: "RICS Level 2 booked for 15th March. Surveyor: John from ABC Surveys."
  },
  "id-documents": {
    explainer: "Anti-money laundering rules mean you'll need to prove your identity multiple times. Have your passport, driving licence, and proof of address ready.",
    whyItMatters: "Missing documents = delays. Having everything organised from the start keeps things moving smoothly.",
    actionableSteps: [
      "Passport or driving licence (photo ID)",
      "Utility bill or bank statement from last 3 months (proof of address)",
      "Proof of deposit source (bank statements showing savings or gift letter)",
      "Keep certified copies handy"
    ],
    notePlaceholder: "ID sent to: [solicitor, lender]. Gift letter obtained: yes/no."
  },

  // Stage 3: Legal & Searches
  "what-are-searches": {
    explainer: "Searches are investigations your solicitor runs with local authorities. They check for planned developments, flood risks, contaminated land, and rights of way.",
    whyItMatters: "Imagine buying a house only to discover a motorway is being built next door, or it floods every winter. Searches protect you from nasty surprises.",
    actionableSteps: [
      "Your solicitor orders these automatically",
      "Local authority search (2-4 weeks typically)",
      "Environmental search (flooding, contamination)",
      "Water and drainage search"
    ],
    notePlaceholder: "Searches ordered: [date]. Expected back: [date]. Any issues: [notes]."
  },
  "review-contract": {
    explainer: "The contract pack from the seller's solicitor includes the title deeds, property forms, and draft contract. Your solicitor will review and raise 'enquiries' (questions).",
    whyItMatters: "This is where issues get spotted - boundary disputes, missing guarantees, planning permission problems. Better to negotiate fixes now than discover them later.",
    actionableSteps: [
      "Ask your solicitor to explain anything you don't understand",
      "Check what's included (fixtures, fittings, appliances)",
      "Review any lease terms if it's a leasehold property",
      "Understand any restrictions or covenants on the property"
    ],
    notePlaceholder: "Contract received: [date]. Key points: [list]. Questions raised: [list]."
  },
  "chase-solicitor": {
    explainer: "Conveyancing is slow, but silence isn't golden. If you haven't heard from your solicitor in a week, chase them. Politely but firmly.",
    whyItMatters: "Sales fall through when momentum is lost. Regular check-ins keep your purchase moving and show everyone you're serious.",
    actionableSteps: [
      "Set a calendar reminder to check in weekly",
      "Email is fine but call if urgent",
      "Ask specific questions: 'What are we waiting for?'",
      "Keep a log of all communications"
    ],
    notePlaceholder: "Last update: [date]. Waiting on: [item]. Next chase: [date]."
  },
  "mortgage-offer": {
    explainer: "Once the lender approves your application and valuation, you'll get a formal mortgage offer. This confirms they'll lend you the money on the agreed terms.",
    whyItMatters: "No mortgage offer = no purchase. The offer has an expiry date (usually 3-6 months), so you need to exchange before it runs out.",
    actionableSteps: [
      "Read the offer document carefully",
      "Check the interest rate and terms match what you expected",
      "Note the expiry date",
      "Send to your solicitor immediately"
    ],
    notePlaceholder: "Offer received: [date]. Expires: [date]. Amount: £X. Rate: X%."
  },

  // Stage 4: Exchange Contracts
  "what-is-exchange": {
    explainer: "Exchange is when you and the seller swap signed contracts. From this moment, the sale is legally binding. You pay your deposit (usually 10%) and set a completion date.",
    whyItMatters: "Before exchange, either party can walk away. After exchange, backing out means losing your deposit and potentially being sued. This is the point of no return.",
    actionableSteps: [
      "Ensure your deposit funds are ready to transfer",
      "Confirm buildings insurance is in place (required from exchange)",
      "Agree on completion date with the seller",
      "Review final contract before signing"
    ],
    notePlaceholder: "Exchange date: [date]. Deposit paid: £X. Completion date: [date]."
  },
  "buildings-insurance": {
    explainer: "Buildings insurance covers the structure of your home. Most mortgage lenders require it from exchange - not completion - because you're legally responsible for the property from that point.",
    whyItMatters: "If the house burns down between exchange and completion, you'd still have to complete the purchase. Insurance protects you from catastrophic loss.",
    actionableSteps: [
      "Get quotes before exchange day",
      "Coverage should start from exchange date",
      "Check rebuild cost, not market value",
      "Add contents insurance once you move in"
    ],
    partnerLinks: [
      { name: "MoneySuperMarket", url: "https://www.moneysupermarket.com/home-insurance/", description: "Compare quotes" },
      { name: "Compare the Market", url: "https://www.comparethemarket.com/home-insurance/", description: "Insurance comparison" }
    ],
    notePlaceholder: "Insurer: [name]. Policy number: [X]. Premium: £X/year. Start date: [date]."
  },
  "completion-date": {
    explainer: "Completion is moving day - when money transfers, keys are handed over, and the property becomes yours. You need to agree this date with the seller, usually 1-4 weeks after exchange.",
    whyItMatters: "Planning completion carefully avoids stress. You'll need to arrange removals, time off work, and ensure funds are ready to transfer.",
    actionableSteps: [
      "Avoid Fridays if possible (if something goes wrong, you lose the weekend)",
      "Allow time for mortgage funds to transfer",
      "Book removals well in advance",
      "Arrange meter readings for the handover day"
    ],
    notePlaceholder: "Completion: [date]. Removal company: [name]. Time off booked: yes/no."
  },

  // Stage 5: Completion Day
  "completion-checklist": {
    explainer: "On completion day, your solicitor transfers the money, the seller's solicitor confirms receipt, and you get the keys. Usually mid-afternoon.",
    whyItMatters: "Having a checklist means nothing gets forgotten on what's likely to be an emotional and chaotic day.",
    actionableSteps: [
      "Confirm funds transferred with your solicitor",
      "Collect keys from the estate agent",
      "Take meter readings immediately",
      "Check the property matches what you agreed"
    ],
    notePlaceholder: "Keys collected: [time]. Meter readings: Gas [X], Electric [X]. Issues: [none/list]."
  },
  "when-keys": {
    explainer: "Keys are usually released mid-afternoon once all solicitors confirm money has arrived. The estate agent will call you to collect them.",
    whyItMatters: "Knowing the timing helps you plan. Don't book removals for 9am - you might be waiting until 3pm for keys!",
    actionableSteps: [
      "Keep your phone on and charged",
      "Stay in touch with your solicitor",
      "Have the estate agent's number handy",
      "Bring ID when collecting keys"
    ],
    notePlaceholder: "Key collection from: [estate agent]. Contact: [number]. Collected at: [time]."
  },
  "moving-tips": {
    explainer: "Moving is stressful but preparation helps. Pack an essentials box, label everything clearly, and don't leave packing until the last minute.",
    whyItMatters: "A well-organised move means you can actually enjoy your first night in your new home instead of hunting for the kettle.",
    actionableSteps: [
      "Pack a 'first night' box: kettle, tea, toilet roll, phone chargers, basic tools",
      "Label boxes by room",
      "Take photos of electronics before unplugging",
      "Inform everyone of your address change"
    ],
    notePlaceholder: "Removal company: [name]. Quote: £X. Date confirmed: [date]. Essentials packed: yes/no."
  },

  // Stage 6: You're a Homeowner!
  "setup-utilities": {
    explainer: "You'll need to set up gas, electricity, water, broadband, and council tax in your name. Use comparison sites to get the best deals.",
    whyItMatters: "Switching suppliers rather than sticking with whoever the seller used can save hundreds of pounds a year.",
    actionableSteps: [
      "Take meter readings on moving day",
      "Contact existing suppliers to close old accounts",
      "Compare deals on energy and broadband",
      "Set up direct debits for regular payments"
    ],
    partnerLinks: [
      { name: "Uswitch", url: "https://www.uswitch.com/gas-electricity/", description: "Compare energy" },
      { name: "Broadband Choices", url: "https://www.broadbandchoices.co.uk", description: "Compare broadband" }
    ],
    notePlaceholder: "Electric: [supplier]. Gas: [supplier]. Broadband: [supplier]. Council tax set up: yes/no."
  },
  "council-tax": {
    explainer: "Council tax pays for local services. You need to register with your local council within a few weeks of moving in. Rates depend on your property's band.",
    whyItMatters: "Failing to register means you might miss payments and face penalties. First-time buyers sometimes qualify for discounts.",
    actionableSteps: [
      "Find your local council's website",
      "Register as the new occupant",
      "Check if you qualify for any discounts (single person, etc.)",
      "Set up a direct debit"
    ],
    partnerLinks: [
      { name: "GOV.UK", url: "https://www.gov.uk/council-tax", description: "Official info" }
    ],
    notePlaceholder: "Council: [name]. Band: [X]. Monthly payment: £X. Registered: yes/no."
  },
  "maintenance-tips": {
    explainer: "Now you're a homeowner, maintenance is your responsibility. Regular checks prevent small problems becoming expensive disasters.",
    whyItMatters: "A £50 service now can prevent a £500 repair later. Build good habits from day one.",
    actionableSteps: [
      "Locate your stopcock, fuse box, and boiler manual",
      "Bleed radiators before winter",
      "Service the boiler annually",
      "Check gutters and drains regularly"
    ],
    notePlaceholder: "Stopcock location: [where]. Boiler service due: [date]. Emergency plumber: [number]."
  }
};

// Stage info tooltips
export const stageInfoTooltips: Record<number, string> = {
  0: "This is where you prepare financially - understanding what you can afford and getting mortgage-ready before you start viewing.",
  1: "Now you're actively viewing properties, asking the right questions, and making offers. Nothing is binding yet.",
  2: "Your offer's accepted! Time to instruct solicitors, apply for the mortgage properly, and book your survey.",
  3: "The longest stage - your solicitor does searches, reviews contracts, and raises enquiries. This can take 6-12 weeks.",
  4: "Exchange is when it becomes legally binding. You pay your deposit and agree on completion date. No going back after this!",
  5: "The big day! Money transfers, you get the keys, and the property is finally yours.",
  6: "Congratulations! Now it's about setting up your new home and getting into good maintenance habits."
};
