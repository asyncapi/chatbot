export interface NavigationItem {
    text: string;
    href: string;
    subItems: { text: string; href: string }[];
  }
  
  export interface Section {
    level: number;
    content: string;
  }
  
  export interface SVGData {
    id: string;
    content: string;
    context: string;
    description: string;
  }
  
  export interface CodeBlock {
    id: string;
    content: string;
    rawHtml: string;
    language: string;
    context: string;
  }
  
  export interface TableData {
    id: string;
    headers: string[];
    rows: Record<string, string>[];
    context: string;
  }
  
  export interface Highlight {
    id: string;
    content: string;
    context: string;
  }
  
  export interface ScrapedData {
    metadata: {
      url: string;
      timestamp: string;
      source: string;
    };
    content: {
      title: string;
      hierarchy: {
        sections: Record<string, Section>;
        navigation: NavigationItem[];
      };
      full_text: string;
      sections: { title: string; level: number; text: string }[];
      svgs: SVGData[];
      codeBlocks: CodeBlock[];
      tables: TableData[];
      highlights: Highlight[];
    };
  }