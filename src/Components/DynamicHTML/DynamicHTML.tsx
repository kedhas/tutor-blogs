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
        const response = await fetch(`/htmls/${course}/${topic}.html`);
        const html = await response.text();
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
