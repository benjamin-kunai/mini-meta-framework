/**
 * Client entry point - responsible for hydrating the server-rendered HTML
 * with client-side interactivity
 * AI generated code for testing
 */

// In a framework like React/Vue, you would do something like:
// ReactDOM.hydrate(<App />, document.getElementById('app'))

// For our vanilla TS application, we'll do a simple hydration
function hydrateApp() {
  console.log('Hydrating application on client...');
  
  const app = document.getElementById('app');
  
  if (!app) {
    console.error('Could not find app element');
    return;
  }
  
  // Add client-side event handlers and interactivity
  
  // Example: Add a button with interactivity
  const button = document.createElement('button');
  button.textContent = 'Client-side Button';
  button.addEventListener('click', () => {
    alert('This button was hydrated on the client!');
  });
  
  app.appendChild(button);
  
  // Example: Add client-side time update
  const timeEl = document.createElement('div');
  app.appendChild(timeEl);
  
  setInterval(() => {
    timeEl.textContent = `Client time: ${new Date().toLocaleTimeString()}`;
  }, 1000);
}

// Hydrate the app when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hydrateApp);
} else {
  hydrateApp();
}
