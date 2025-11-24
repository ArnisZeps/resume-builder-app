import { templates } from '@/app/builder/_components/templates';
import { ResumeData } from '@/app/builder/_components/ResumeContext';

interface PageProps {
  searchParams: {
    data?: string;
    template?: string;
  };
}

export default function ResumeHtmlPage({ searchParams }: PageProps) {
  if (!searchParams.data || !searchParams.template) {
    return (
      <html>
        <body>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Missing resume data or template</h2>
          </div>
        </body>
      </html>
    );
  }

  try {
    const resumeData: ResumeData = JSON.parse(decodeURIComponent(searchParams.data));
    const templateName = searchParams.template as keyof typeof templates;
    
    const TemplateComponent = templates[templateName];
    
    if (!TemplateComponent) {
      return (
        <html>
          <body>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h2>Template not found: {templateName}</h2>
            </div>
          </body>
        </html>
      );
    }

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style dangerouslySetInnerHTML={{
            __html: `
              * { 
                box-sizing: border-box; 
                margin: 0;
                padding: 0;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-user-drag: none;
                -khtml-user-drag: none;
                -moz-user-drag: none;
                -o-user-drag: none;
                user-drag: none;
              }
              body { 
                margin: 0; 
                padding: 40px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                line-height: 1.4;
                color: #333;
                background: white;
                width: 794px;
                min-height: 1123px;
                -webkit-touch-callout: none;
                -webkit-tap-highlight-color: transparent;
              }
              
              /* Disable text selection */
              ::selection {
                background: transparent;
              }
              
              ::-moz-selection {
                background: transparent;
              }
              
              /* Invisible overlay to prevent element inspection */
              body::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                pointer-events: none;
                background: transparent;
              }
              
              @media print {
                body { margin: 0; padding: 20px; }
                body::after { display: none; }
              }
            `
          }} />
          <script dangerouslySetInnerHTML={{
            __html: `
              // Disable right-click context menu
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
              });
              
              // Disable common keyboard shortcuts for dev tools and view source
              document.addEventListener('keydown', function(e) {
                // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+J, Ctrl+Shift+K, Ctrl+Shift+C
                if (e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'K' || e.key === 'C')) ||
                    (e.ctrlKey && e.key === 'u') ||
                    (e.ctrlKey && e.key === 'U')) {
                  e.preventDefault();
                  return false;
                }
              });
              
              // Disable text selection
              document.addEventListener('selectstart', function(e) {
                e.preventDefault();
                return false;
              });
              
              // Disable drag
              document.addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
              });
              
              // Override console methods to prevent inspection
              const noop = function() {};
              window.console = {
                log: noop, info: noop, warn: noop, error: noop,
                debug: noop, trace: noop, dir: noop, dirxml: noop,
                group: noop, groupEnd: noop, time: noop, timeEnd: noop,
                profile: noop, profileEnd: noop, assert: noop, clear: noop
              };
              
              // Disable common inspection methods
              Object.defineProperty(window, 'devtools', {
                get: function() { return undefined; },
                set: function() { }
              });
              
              // Clear any potential inspection attempts
              setInterval(function() {
                if (window.console && typeof window.console.clear === 'function') {
                  try { window.console.clear(); } catch(e) {}
                }
              }, 1000);
            `
          }} />
        </head>
        <body>
          <TemplateComponent resumeData={resumeData} />
        </body>
      </html>
    );
  } catch (error) {
    return (
      <html>
        <body>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Error parsing resume data</h2>
            <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
        </body>
      </html>
    );
  }
}