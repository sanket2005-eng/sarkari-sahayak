# Sarkari Sahayak

A production-oriented single-page React/Vite frontend for a retrieval-augmented government and public-policy chatbot.

## Stack
- React + Vite
- Tailwind CSS
- lucide-react
- Mocked retrieval layer (`findMockResponse`) with simulated latency

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Plug in the RAG backend
Replace the `findMockResponse()` call in `src/App.jsx` with your API client. Keep the response shape aligned to:

```js
{
  confidence: 'High' | 'Medium' | 'Low',
  retrieved: number,
  answer: string,
  eli5: string,
  sources: [{ title, section, snippet }]
}
```

The low-confidence state intentionally renders a no-answer UI instead of generating unsupported text.
