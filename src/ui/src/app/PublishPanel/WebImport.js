import * as React from "react";
import Button from "../../components/Button";

export default () => {
  const [url, setUrl] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  return (
    <>
      <input
        onChange={(ev) => setUrl(ev.target.value)}
        placeholder="https://..."
        className="mr-2 border border-gray-200 p-1"
        style={{ width: 400 }}
      />
      <Button
        onClick={async () => {
            setSubmitting(true);
          const res = await fetch("/api/import", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url
            }),
          });
          console.log('res', res)
          setSubmitting(false);
        }}
      >
        Import
      </Button>
    </>
  );
};
