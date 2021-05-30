import * as React from 'react';
import Button from '../../components/Button';
import { Spinner, Modal } from '../../components/Base';
import WebImport from './WebImport';
import { BASE_URL } from '../../utils/envUtil';

import { Editor } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

export default function PublishPanel({ account, transactionId, onPayClick }) {
  const [content, setContent] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  const [publishedData, setPublishedData] = React.useState(null);
  const [publishModalShowed, setPublishModalShowed] = React.useState(false);

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
      const res = await fetch(`${BASE_URL}/api/publish`, {
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
      const { key, url } = await res.json();
      if (key && url) {
        setPublishedData({ key, url });
      }
    } catch (err) {
      alert('Unable to post data. ', JSON.stringify(err));
    }
    setSubmitting(false);
  };

  console.log('publishModalShowed', publishModalShowed);
  // Return the App component.
  return (
    <div className="App">
      {account ? (
        <header className="App-header">
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
              height="calc(100vh - 200px)"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
            />
          </div>
        </header>
      ) : (
        <div className="m-4 space-y-4">
          <h3>How to publish your content to the Blockchain?</h3>
          <div>1. Connect to your MetaMask Wallet.</div>
          <div>2. Prepare the content or Import it into the Editor.</div>
          <div>3. Click Publish to make a payment and confirm it.</div>
        </div>
      )}

      {account && (
        <div className="mt-2 flex flex-row items-center justify-between">
          {transactionId ? (
            <>
              <Button disabled={submitting} onClick={onPublishClick}>{submitting ? 'Publishing...' : 'Confirm Publish'}</Button>
              {submitting && <Spinner />}

              {!publishedData && !submitting ? (
                <span className="text-blue-500">Payment sent. Please click Confirm to Publish.</span>
              ) : null}

              {publishedData && (
                <span className="text-blue-500">Published successfully to the following links:</span>
              )}              
            </>
          ) : (
            <Button onClick={() => setPublishModalShowed(true)}>✲ Publish This Content</Button>
          )}
          
          <div>
            {importing ? (
              <WebImport
                importHandler={(html) => {
                  if (editorRef && editorRef.current) {
                    const editorInstance = editorRef.current.getInstance();
                    editorInstance.setHtml(html);
                  }
                }}
              />
            ) : (
              <Button onClick={() => setImporting(true)}>Import From URL</Button>
            )}
          </div>
        </div>
      )}

      {publishedData && (
        <div>
          <input
            className="border border-gray-200 p-2 w-1/3"
            value={`${window.location.href}page/${publishedData?.key}`}
          />
          <input className="border border-gray-200 p-2 w-1/3 ml-2" value={publishedData?.url} />
        </div>
      )}

      {publishModalShowed === true ? (
        <Modal
          title="Publish"
          content={<p>Content will be published to the Distributed Network after the payment is confirmed.</p>}
          onCancel={() => setPublishModalShowed(false)}
          onConfirm={() => {
            setPublishModalShowed(false);
            onPayClick();
          }}
        />
      ) : null}
    </div>
  );
}
