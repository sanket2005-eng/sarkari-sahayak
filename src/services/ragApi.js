import { findMockResponse } from '../data/mockData.js'

// Replace this function with your real RAG API call.
export function queryRag({ query, domain }) {
  return new Promise(resolve => {
    window.setTimeout(() => resolve(findMockResponse(query, domain)), 850)
  })
}
