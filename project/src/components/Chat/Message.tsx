import React from 'react';
import { Message as MessageType } from '../../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageProps {
  message: MessageType;
  isFirstMessage?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isFirstMessage }) => {
  const isUser = message.role === 'user';
  const userComponents = {
    h1: ({ node, ...props }) => <h1 className="text-2xl font-semibold text-blue-300 my-3" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-blue-300 my-2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-blue-300 my-2" {...props} />,
    h4: ({ node, ...props }) => <h4 className="text-base font-semibold text-blue-300 my-2" {...props} />,
    p: ({ node, ...props }) => <p className="my-2" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-8 my-2 space-y-2" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-8 my-2 space-y-2" {...props} />,
    li: ({ node, ...props }) => <li className="pl-1" {...props} />,
    a: ({ node, ...props }) => <a className="text-blue-300 underline" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
    em: ({ node, ...props }) => <em className="italic" {...props} />,
    blockquote: ({ node, ...props }) => (
      <div className="my-2 bg-blue-800 border-l-4 border-blue-300 p-4 rounded">
        <p className="m-0" {...props} />
      </div>
    ),
    code: ({ node, inline, ...props }) => (
      inline 
        ? <code className="bg-blue-900 px-1 rounded font-mono text-sm" {...props} />
        : <pre className="bg-blue-900 p-3 rounded my-2 overflow-auto font-mono text-sm"><code {...props} /></pre>
    ),
    hr: ({ node, ...props }) => <hr className="my-6 border-t border-blue-700" {...props} />,
    table: ({ node, ...props }) => (
      <div className="my-4 overflow-x-auto">
        <table className="min-w-full border border-blue-700 rounded" {...props} />
      </div>
    ),
    thead: ({ node, ...props }) => <thead className="bg-blue-800" {...props} />,
    tbody: ({ node, ...props }) => <tbody className="bg-blue-900" {...props} />,
    tr: ({ node, ...props }) => <tr className="border-b border-blue-700" {...props} />,
    th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 border-r border-blue-700 last:border-r-0" {...props} />,
    td: ({ node, ...props }) => <td className="px-4 py-3 text-sm border-r border-blue-700 last:border-r-0" {...props} />,
  };

  // Custom styling for assistant messages
  const assistantComponents = {
    h1: ({ node, ...props }) => <h1 className="text-2xl font-semibold text-blue-600 my-0" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-blue-600 my-0" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-blue-600 my-0" {...props} />,
    h4: ({ node, ...props }) => <h4 className="text-base font-semibold text-blue-600 my-0" {...props} />,
    p: ({ node, ...props }) => <p className="my-0 text-gray-800" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-8 my-0 space-y-0" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-8 my-0 space-y-0" {...props} />,
    li: ({ node, ...props }) => <li className="pl-1" {...props} />,
    a: ({ node, ...props }) => <a className="text-blue-600 underline" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
    em: ({ node, ...props }) => <em className="italic" {...props} />,
    blockquote: ({ node, ...props }) => (
      <div className="my-0 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="my-0" {...props} />
      </div>
    ),
    code: ({ node, inline, ...props }) => (
      inline 
        ? <code className="bg-gray-100 px-1 rounded font-mono text-sm" {...props} />
        : <pre className="bg-gray-100 p-3 rounded my-0 overflow-auto font-mono text-sm"><code {...props} /></pre>
    ),
    hr: ({ node, ...props }) => <hr className="my-0 border-t border-gray-300" {...props} />,
    table: ({ node, ...props }) => (
      <div className="my-0 overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded" {...props} />
      </div>
    ),
    thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
    tbody: ({ node, ...props }) => <tbody className="bg-white" {...props} />,
    tr: ({ node, ...props }) => <tr className="border-b border-gray-200" {...props} />,
    th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300 last:border-r-0" {...props} />,
    td: ({ node, ...props }) => <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-300 last:border-r-0" {...props} />,
  };

  return (
    <div 
      className={`
        animate-fadeIn
        ${isFirstMessage ? '' : 'mt-6'}
      `}
    >
      <div className="flex items-start gap-3">
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-[#0A192F] text-white flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold">AI</span>
          </div>
        )}
        
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-1">
            {isUser ? 'You' : 'Assistant'}
          </div>
          <div 
            className={`
              p-4 rounded-lg
              ${isUser 
                ? 'bg-[#172A46] text-white rounded-tr-none' 
                : 'bg-gray-100 text-gray-800 rounded-tl-none'}
            `}
          >
            <div className={`whitespace-pre-wrap break-words ${isUser ? 'text-white' : 'text-gray-800'}`}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                components={isUser ? userComponents : assistantComponents}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            <div 
              className={`
                text-xs mt-2
                ${isUser ? 'text-gray-300' : 'text-gray-500'}
              `}
            >
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold">U</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Message;

// Add this to your globals.css or appropriate style file
/*

*/