import * as React from "react";
import Button from "../../components/Button";
import { Spinner } from "../Base";

export default function PublishPanel({ account, transactionId }) {
  const [content, setContent] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const onPublishClick = async () => {
    try {
      setSubmitting(true);
      const res = await fetch("http://209.182.218.3:5000/api/publish", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account,
          transactionId,
          content: content,
        }),
      });
      console.log("res", res);
      alert("Response: ", JSON.stringify(res));
    } catch (err) {
      alert("Unable to post data. ", JSON.stringify(err));
    }
    setSubmitting(false);
  };

  // Return the App component.
  return (
    <div className="App">
      {account ? (
        <header className="App-header">
          <p className="flex flex-row items-center">
            <Button disabled={!transactionId} onClick={onPublishClick}>✲ Publish This Content</Button>
            {submitting && <Spinner />}
          </p>

          <p className="w-full mt-2">
            <textarea
              disabled={!transactionId}
              defaultValue=""
              placeholder={transactionId ? 'Your content...' : 'Please send payment first.'}
              onChange={(ev) => setContent(ev.target.value)}
              className="w-full border-gray-300 border rounded text-sm text-gray-700 p-2 disabled:opacity-50"
            />
          </p>
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
