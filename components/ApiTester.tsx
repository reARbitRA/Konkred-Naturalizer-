'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, Copy, Check, Code, Play } from 'lucide-react';

export const ApiTester: React.FC = () => {
  const [endpoint, setEndpoint] = useState('/api/rewrite');
  const [method, setMethod] = useState('POST');
  const [requestBody, setRequestBody] = useState(
    JSON.stringify(
      {
        text: 'Artificial intelligence transforms modern computing systems significantly.',
      },
      null,
      2
    )
  );
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [responseBody, setResponseBody] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleSendRequest = async () => {
    setLoading(true);
    setResponseStatus(null);
    setResponseBody('');
    setResponseHeaders({});

    try {
      let parsedBody = {};
      if (method === 'POST') {
        parsedBody = JSON.parse(requestBody);
      }

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...(method === 'POST' ? { body: JSON.stringify(parsedBody) } : {}),
      });

      setResponseStatus(res.status);
      const headersObj: Record<string, string> = {};
      res.headers.forEach((val, key) => {
        headersObj[key] = val;
      });
      setResponseHeaders(headersObj);

      const json = await res.json();
      setResponseBody(JSON.stringify(json, null, 2));
    } catch (err: any) {
      setResponseStatus(500);
      setResponseBody(JSON.stringify({ error: err.message || 'Request failed' }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const curlCommand = `curl -X ${method} "${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}${endpoint}" \\
  -H "Content-Type: application/json" ${
    method === 'POST' ? `\\\n  -d '${requestBody.replace(/\n/g, '')}'` : ''
  }`;

  const copyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Title */}
      <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-mono text-[var(--text-primary)]">
              Interactive API Tester
            </h1>
            <p className="text-sm font-mono text-[var(--text-secondary)] mt-0.5">
              Execute live REST API requests against ARBITRA QA CORE endpoints, inspect JSON payloads, headers, and HTTP status codes.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Pane */}
        <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-4">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
            <Code className="w-4 h-4 text-[var(--accent-primary)]" /> HTTP Request Builder
          </h3>

          <div className="flex items-center gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[var(--card-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-xs font-bold"
            >
              <option value="POST">POST</option>
              <option value="GET">GET</option>
            </select>

            <select
              value={endpoint}
              onChange={(e) => {
                setEndpoint(e.target.value);
                if (e.target.value !== '/api/rewrite') {
                  setMethod('GET');
                } else {
                  setMethod('POST');
                }
              }}
              className="w-full px-3 py-2 rounded-lg bg-[var(--card-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-xs font-bold"
            >
              <option value="/api/rewrite">/api/rewrite (Rewrite Engine)</option>
              <option value="/api/health">/api/health (Liveness Probe)</option>
              <option value="/api/ready">/api/ready (Readiness Probe)</option>
            </select>
          </div>

          {method === 'POST' && (
            <div className="space-y-1">
              <label className="text-xs font-mono text-[var(--text-muted)]">Request Body (JSON):</label>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="w-full h-44 p-3 rounded-lg bg-[var(--code-bg)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-xs focus:outline-none focus:border-[var(--accent-primary)]"
                id="api-request-body-input"
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={copyCurl}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied cURL!' : 'Copy cURL'}</span>
            </button>

            <button
              onClick={handleSendRequest}
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-[var(--accent-primary)] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:opacity-90 disabled:opacity-50"
              id="send-api-request-button"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{loading ? 'Sending...' : 'Send Request'}</span>
            </button>
          </div>
        </div>

        {/* Response Pane */}
        <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
              HTTP Response Inspector
            </h3>
            {responseStatus && (
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                  responseStatus >= 200 && responseStatus < 300
                    ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                    : 'bg-red-500/15 text-red-400 border border-red-500/30'
                }`}
              >
                HTTP {responseStatus} {responseStatus === 200 ? 'OK' : 'ERROR'}
              </span>
            )}
          </div>

          <div className="space-y-2 font-mono text-xs">
            <label className="text-[var(--text-muted)] text-[11px] block">Response JSON Payload:</label>
            <pre className="p-4 rounded-lg bg-[var(--code-bg)] border border-[var(--border-color)] text-[var(--text-primary)] overflow-x-auto h-56 leading-relaxed">
              {responseBody || '// Response payload will appear here after execution...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
