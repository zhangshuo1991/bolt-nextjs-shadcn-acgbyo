export interface Vulnerability {
  id: number;
  source: string;
  language: string;
  aiSummary: string;
}

export const mockVulnerabilities: Vulnerability[] = [
  {
    id: 1,
    source: 'CVE-2021-44228',
    language: 'Java',
    aiSummary: 'Log4j vulnerability allowing remote code execution.'
  },
  {
    id: 2,
    source: 'CVE-2022-22965',
    language: 'Java',
    aiSummary: 'Spring Framework RCE vulnerability.'
  },
  {
    id: 3,
    source: 'CVE-2021-42574',
    language: 'Multiple',
    aiSummary: 'Trojan Source vulnerability affecting source code display.'
  },
  {
    id: 4,
    source: 'CVE-2021-3777',
    language: 'JavaScript',
    aiSummary: 'Prototype pollution in lodash library.'
  },
  {
    id: 5,
    source: 'CVE-2022-0847',
    language: 'C',
    aiSummary: 'Dirty Pipe vulnerability in Linux kernel.'
  },
  // Add more mock vulnerabilities as needed
];