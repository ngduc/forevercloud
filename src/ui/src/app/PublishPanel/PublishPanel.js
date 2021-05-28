import * as React from "react";

export default function PublishPanel({}) {
    const [content, setContent] = React.useState('')
  
    const onPublishClick = async () => {
      const res = await fetch('http://209.182.218.3:5000/api/publish', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content
        }),
      })
      console.log('res', res)
    }
  
    // Return the App component.
    return (
      <div className="App">
        <header className="App-header">
          <h3>Publish Panel</h3>
  
          <p>
            <button onClick={onPublishClick} className="p-2 border-gray-100 border rounded text-sm bg-gray-700 hover:bg-gray-600">Publish This Content</button>
          </p>
  
          <p className="w-full ">
            <textarea defaultValue="Hello World" onChange={(ev) => setContent(ev.target.value)} className=" border-gray-300 border rounded text-sm text-gray-700 p-2" />
          </p>
          
        </header>
      </div>
    );
  }