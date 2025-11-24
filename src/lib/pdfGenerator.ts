import puppeteer from 'puppeteer';

export interface PDFGenerationOptions {
  format?: 'A4' | 'Letter';
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  printBackground?: boolean;
  scale?: number;
}

export async function generatePDFFromHTML(
  html: string,
  options: PDFGenerationOptions = {}
): Promise<Uint8Array> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set content with proper HTML structure
    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            * { 
              box-sizing: border-box; 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            body { 
              margin: 0; 
              padding: 20px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.4;
              color: #333;
            }
            @media print {
              body { margin: 0; padding: 0; }
              * { -webkit-print-color-adjust: exact !important; }
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    await page.setContent(fullHTML, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: options.format || 'A4',
      margin: options.margin || {
        top: '0.5in',
        right: '0.5in', 
        bottom: '0.5in',
        left: '0.5in'
      },
      printBackground: options.printBackground !== false,
      scale: options.scale || 1,
      preferCSSPageSize: false
    });

    return pdf;
  } finally {
    await browser.close();
  }
}

export async function generatePDFFromURL(
  url: string,
  options: PDFGenerationOptions = {}
): Promise<Uint8Array> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Navigate to the page
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: options.format || 'A4',
      margin: options.margin || {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in', 
        left: '0.5in'
      },
      printBackground: options.printBackground !== false,
      scale: options.scale || 1,
      preferCSSPageSize: false
    });

    return pdf;
  } finally {
    await browser.close();
  }
}