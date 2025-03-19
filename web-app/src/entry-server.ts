/**
 * Simple server-side renderer with hardcoded routes
 * We'll make this more sophisticated later
 * AI generated code for testing
 */

export async function render(url: string) {
    console.log(`SSR rendering for ${url}`);
    
    // Simple hardcoded routes
    let pageHtml = '';
    
    if (url === '/' || url === '/index.html') {
      pageHtml = `
        <div>
          <h1>Home Page</h1>
          <p>This is server-rendered content!</p>
          <p>Current time: ${new Date().toLocaleTimeString()}</p>
        </div>
      `;
    } 
    else if (url.startsWith('/about')) {
      pageHtml = `
        <div>
          <h1>About Page</h1>
          <p>This is the about page, rendered on the server.</p>
        </div>
      `;
    }
    else {
      pageHtml = `
        <div>
          <h1>404 - Page Not Found</h1>
          <p>The requested page "${url}" could not be found.</p>
        </div>
      `;
    }
    
    return pageHtml;
  }