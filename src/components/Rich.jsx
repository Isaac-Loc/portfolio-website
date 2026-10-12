// Renders text where **double asterisks** mean bold and [label](https://url) is a link (opens in a new tab).
function withLinks(part, keyBase) {
  const out = []
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g
  let last = 0, m, n = 0
  while ((m = re.exec(part))) {
    if (m.index > last) out.push(part.slice(last, m.index))
    out.push(<a key={`${keyBase}-${n++}`} className="rich-link" href={m[2]} target="_blank" rel="noopener noreferrer">{m[1]}</a>)
    last = re.lastIndex
  }
  if (last < part.length) out.push(part.slice(last))
  return out
}

export default function Rich({ text }) {
  return text.split('**').map((part, i) => (i % 2 ? <strong key={i}>{withLinks(part, i)}</strong> : <span key={i}>{withLinks(part, i)}</span>))
}
