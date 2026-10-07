export const domainMeta = {
  Tax: {
    icon: '₹',
    accent: 'from-amber-500 to-orange-600',
    description: 'Income tax, deductions & filing'
  },
  RTI: {
    icon: 'RTI',
    accent: 'from-sky-600 to-blue-700',
    description: 'Right to Information guidance'
  },
  'Labour Law': {
    icon: 'LL',
    accent: 'from-emerald-600 to-green-700',
    description: 'Employment & worker protections'
  }
}

export const starterQuestions = {
  Tax: [
    'What deductions can I claim under Section 80C?',
    'What is the difference between old and new tax regimes?',
    'How do I download my Form 16?'
  ],
  RTI: [
    'How do I file an RTI application?',
    'What information can be requested under RTI?',
    'How long does a public authority have to reply?'
  ],
  'Labour Law': [
    'What is the statutory minimum wage?',
    'How is gratuity calculated?',
    'What protections apply to working hours?'
  ]
}

export const mockResponses = [
  {
    match: ['80c', 'deduction'],
    domain: 'Tax',
    confidence: 'High',
    retrieved: 3,
    answer: 'Under Section 80C of the Income-tax Act, 1961, an individual or HUF can claim a deduction for specified investments and payments up to a combined limit of ₹1.5 lakh in a financial year. Common qualifying items include eligible life-insurance premiums, employee provident fund contributions, public provident fund deposits, tuition fees for eligible children, and principal repayment of a qualifying home loan.',
    eli5: 'Think of Section 80C as a tax-saving bucket. You can put certain approved expenses or investments into that bucket, and up to ₹1.5 lakh may be deducted from your taxable income each year.',
    sources: [
      { title: 'Income-tax Act, 1961 — Section 80C', section: 'Deduction in respect of investments and payments', snippet: '“In computing the total income of an assessee, there shall be allowed a deduction in accordance with, and subject to, the provisions of this section…”' },
      { title: 'Income Tax Department — Deductions', section: 'Chapter VI-A overview', snippet: 'Official guidance describing deductions available under Chapter VI-A of the Income-tax Act.' },
      { title: 'Income Tax Department — Taxpayer Services', section: 'Individual taxpayers', snippet: 'Departmental guidance on common deductions and supporting documents.' }
    ]
  },
  {
    match: ['old', 'new', 'regime'],
    domain: 'Tax',
    confidence: 'Medium',
    retrieved: 2,
    answer: 'The old and new tax regimes differ mainly in their slab structure and the deductions/exemptions available. The old regime generally permits a wider range of deductions and exemptions, while the new regime uses revised rates with fewer deductions. Your choice depends on your income, eligible deductions, and the rules applicable to the relevant assessment year.',
    eli5: 'There are two tax-setting options. One usually gives you more deduction choices, while the other usually has simpler rates but fewer deductions. The better fit depends on your numbers.',
    sources: [
      { title: 'Income-tax Act, 1961 — Section 115BAC', section: 'Tax on income of individuals and HUFs', snippet: 'The section specifies conditions for the alternative tax regime and its associated rates.' },
      { title: 'Income Tax Department — Tax Rates', section: 'Individual & HUF', snippet: 'Official tax-rate tables and regime-related guidance.' }
    ]
  },
  {
    match: ['rti', 'file', 'application'],
    domain: 'RTI',
    confidence: 'High',
    retrieved: 3,
    answer: 'To file an RTI application, identify the public authority that holds the information, frame the request as specific records or information, include the prescribed application fee where applicable, and submit it to the Central or State Public Information Officer (PIO), depending on the authority. The RTI Act also provides an appeal process if information is denied or a response is not received within the statutory period.',
    eli5: 'Ask the government office for a specific piece of information, send the request to the right information officer, and keep the proof of submission. There is also an appeal route if you do not get a proper response.',
    sources: [
      { title: 'Right to Information Act, 2005 — Section 6', section: 'Request for information', snippet: 'A person who desires information shall make a request in writing or through electronic means to the concerned public information officer.' },
      { title: 'Right to Information Act, 2005 — Section 7', section: 'Disposal of request', snippet: 'The Act sets out the procedure and time limits for disposal of requests for information.' },
      { title: 'RTI Online — Government of India', section: 'Online RTI filing', snippet: 'Official portal for filing RTI applications with participating public authorities.' }
    ]
  },
  {
    match: ['minimum wage', 'wage'],
    domain: 'Labour Law',
    confidence: 'Medium',
    retrieved: 2,
    answer: 'Minimum wage rules depend on the worker category, employment, skill level, and the applicable central or state rules. The Code on Wages, 2019 provides the national legal framework, while detailed wage rates may be notified by the competent government authority for the relevant employment and jurisdiction.',
    eli5: 'There is not always one single minimum wage for everyone. The amount can depend on the kind of work and where the work is covered.',
    sources: [
      { title: 'Code on Wages, 2019', section: 'Minimum wages', snippet: 'The Code establishes a framework for fixing and regulating minimum wages for employees.' },
      { title: 'Ministry of Labour & Employment', section: 'Wage notifications', snippet: 'Government notifications and labour-law information published for applicable categories and jurisdictions.' }
    ]
  },
  {
    match: ['gratuity'],
    domain: 'Labour Law',
    confidence: 'High',
    retrieved: 3,
    answer: 'For employees covered by the Payment of Gratuity Act, gratuity is generally linked to the employee’s last drawn wages and completed years of service, subject to the Act’s eligibility and calculation rules. The standard formula for a monthly-rated employee is 15 days’ wages for each completed year of service, with the prescribed rounding treatment for qualifying service periods.',
    eli5: 'Gratuity is a one-time employment benefit. For many covered monthly-paid employees, it is calculated using about half a month of eligible wages for each completed year of service, subject to the law’s rules.',
    sources: [
      { title: 'Payment of Gratuity Act, 1972 — Section 4', section: 'Payment of gratuity', snippet: 'Section 4 sets out the entitlement and calculation provisions for gratuity.' },
      { title: 'Payment of Gratuity Act, 1972 — Section 2A', section: 'Continuous service', snippet: 'The Act defines continuous service for the purpose of gratuity eligibility.' },
      { title: 'Ministry of Labour & Employment', section: 'Labour legislation', snippet: 'Official labour-law resources and legislation references.' }
    ]
  }
]

export function findMockResponse(query, domain) {
  const lower = query.toLowerCase()
  const match = mockResponses.find(item => item.domain === domain && item.match.some(term => lower.includes(term)))
  return match || {
    domain,
    confidence: 'Low',
    retrieved: 0,
    answer: '',
    eli5: '',
    sources: []
  }
}
