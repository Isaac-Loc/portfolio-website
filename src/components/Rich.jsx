// Renders text where **double asterisks** mean bold.
export default function Rich({ text }) {
  return text.split('**').map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}
