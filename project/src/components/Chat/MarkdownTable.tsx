import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdown = `
### Team Members

| Name     | Age | Role      |
|----------|-----|-----------|
| Alice    | 24  | Developer |
| Bob      | 30  | Designer  |
| Charlie  | 28  | Manager   |
`;

const MarkdownTable = () => {
  return (
    <div className="prose prose-invert max-w-none"> {/* Optional Tailwind style */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownTable;
