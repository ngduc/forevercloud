import * as React from 'react';
import Button from '../../components/Button';
import { Spinner } from '../../components/Base';
import WebImport from './WebImport';

import { Editor } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

export default function PublishPanel({ account, transactionId }) {
  const [content, setContent] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  const editorRef = React.createRef();

  // React.useEffect(() => {
  //   if (!editorRef || !editorRef.current) {
  //     return;
  //   }
  //   const editorInstance = editorRef.current.getInstance();
  // })

  const onPublishClick = async () => {
    try {
      const html = editorRef?.current?.getInstance().getHtml();

      setSubmitting(true);
      const res = await fetch('http://209.182.218.3:5000/api/publish', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          account,
          transactionId,
          content: html
        })
      });
      console.log('res', res);
      alert('Response: ', JSON.stringify(res));
    } catch (err) {
      alert('Unable to post data. ', JSON.stringify(err));
    }
    setSubmitting(false);
  };

  // Return the App component.
  return (
    <div className="App">
      {account ? (
        <header className="App-header">
          <div className="flex flex-row items-center justify-between">
            <Button disabled={!transactionId} onClick={onPublishClick}>
              ✲ Publish This Content
            </Button>
            {submitting && <Spinner />}

            <div>
              {importing ? (
                <WebImport
                  importHandler={(html) => {
                    const editorInstance = editorRef.current.getInstance();
                    editorInstance.setHtml(html);
                  }}
                />
              ) : (
                <Button onClick={() => setImporting(true)}>Import From URL</Button>
              )}
            </div>
          </div>

          <div className="w-full mt-2">
            {/* <textarea
              disabled={!transactionId}
              defaultValue=""
              placeholder={transactionId ? 'Your content...' : 'Please send payment first.'}
              onChange={(ev) => setContent(ev.target.value)}
              className="w-full border-gray-300 border rounded text-sm text-gray-700 p-2 disabled:opacity-50"
            /> */}
            <Editor
              ref={editorRef}
              disabled={!transactionId}
              initialValue={''}
              placeholder={'Your content...'}
              previewStyle="vertical"
              height="700px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
            />
          </div>
        </header>
      ) : (
        <div>
          <h3>How to Publish your content to Blockchain?</h3>
          <div>1. Connect to your MetaMask Wallet.</div>
          <div>2. Click Send Payment button.</div>
          <div>3. Paste your content and click Publish.</div>
        </div>
      )}
    </div>
  );
}
