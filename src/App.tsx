import React from 'react';
import './App.css';
import Gallery from './components/gallery';

function App() {
  return (
    <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name="viewport" content='width=device-width, initial-scale=1' />
    </head>
    <body>
      <main>
        <div className="App">
          <Gallery/>
        </div>
      </main>
    </body>
  </html>
  );
}

export default App;
