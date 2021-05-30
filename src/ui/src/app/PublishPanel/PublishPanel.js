import * as React from 'react';
import Button from '../../components/Button';
import { Spinner, Modal } from '../../components/Base';
import WebImport from './WebImport';
import { BASE_URL } from '../../utils/envUtil';
import { TwitterShareButton, TwitterIcon } from 'react-share';

import { Editor } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

export function slugifyTitle(title = '') {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return title
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export default function PublishPanel({ account, transactionId, onPayClick }) {
  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');
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

  let publishedUrl = '';
  if (publishedData) {
    publishedUrl = `${window.location.href}page/${publishedData?.key}${title ? '/' + slugifyTitle(title) : ''}`;
  }
  return (
    <div className="App">
      {account ? (
        <header className="App-header">
          <div className="w-full mt-2">
            <input
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Title"
              className="w-full border border-b-0 border-gray-300 p-1 px-2 text-sm"
            />
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
              height="calc(100vh - 210px)"
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
              <Button disabled={submitting} onClick={onPublishClick}>
                {submitting ? 'Publishing...' : 'Confirm Publish'}
              </Button>
              {submitting && <Spinner />}

              {!publishedData && !submitting ? (
                <span className="text-blue-500">Payment sent. Please click Confirm to Publish.</span>
              ) : null}

              {publishedData && <span className="text-blue-500">Published successfully to the following links:</span>}
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
        <div className="flex flex-row items-center">
          <input
            className="text-sm border border-gray-200 p-2 w-1/3"
            value={publishedUrl}
          />
          <input className="text-sm border border-gray-200 p-2 w-1/3 ml-2" value={publishedData?.url} />

          <TwitterShareButton className="ml-2" url={publishedUrl} title={`${title ? title : 'Article published at' } ${publishedUrl}`}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
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
