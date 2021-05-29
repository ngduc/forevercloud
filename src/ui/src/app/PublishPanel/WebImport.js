import * as React from 'react';
import Button from '../../components/Button';
import { Spinner } from '../../components/Base';
import { BASE_URL } from '../../utils/envUtil'

export default ({ importHandler }) => {
  const [url, setUrl] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  return (
    <div className="flex flex-row items-center">
      {submitting && <Spinner />}
      <input
        disabled={submitting}
        onChange={(ev) => setUrl(ev.target.value)}
        placeholder="https://..."
        className="mr-2 border border-gray-200 p-1"
        style={{ width: 400 }}
        autoFocus={true}
      />
      <Button
        disabled={submitting}
        onClick={async () => {
          if (!url.trim()) {
            return;
          }
          setSubmitting(true);
          const res = await fetch(`${BASE_URL}/api/import`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url
            })
          });
          const { html } = await res.json();
          console.log('res', res);
          setSubmitting(false);

          if (importHandler && html) {
            importHandler(html);
          }
        }}
      >
        Import
      </Button>
    </div>
  );
};
