import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  url: string;
  text: string;
}

export function EmailTemplate({ firstName, url, text }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <a href={url} >{text}</a>
    </div>
  );
}