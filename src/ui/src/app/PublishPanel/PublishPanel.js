import * as React from "react";
import Button from '../../components/Button'

export default function PublishPanel({}) {
    const [content, setContent] = React.useState('')
  
    const onPublishClick = async () => {
      try {
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
        alert('Response: ', JSON.stringify(res))
      } catch (err) {
        alert('Unable to post data. ', JSON.stringify(err))
      }
    }
  
    // Return the App component.
    return (
      <div className="App">
        <header className="App-header">
          <h3>Publish Panel</h3>
  
          <p>
            <Button onClick={onPublishClick}>Publish This Content</Button>
          </p>
  
          <p className="w-full">
            <textarea defaultValue="Hello World" onChange={(ev) => setContent(ev.target.value)} className="w-full border-gray-300 border rounded text-sm text-gray-700 p-2" />
          </p>
          
        </header>
      </div>
    );
  }