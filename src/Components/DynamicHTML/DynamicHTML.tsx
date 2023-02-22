import React, { useState, useEffect } from "react";

interface DynamicHTMLProps {
  course: string
  topic: string
}

function DynamicHTML(props: DynamicHTMLProps) {
  const [html, setHTML] = useState("");
  const { course, topic } = props;

  useEffect(() => {
    const fetchHTML = async () => {
      try {
        const path = `/htmls/${course}/${topic}.html`
        const response = await fetch(path);
        let html = await response.text();
        if (html.includes('<title>Kedhas</title>')) {
          console.log(`comming-soon`)
          const response2 = await fetch(`/htmls/coming-soon.html`);
          html = await response2.text();
        }
        console.log(`html ${html}`)
        setHTML(html);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHTML();
  }, [course, topic]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}

export default DynamicHTML;
