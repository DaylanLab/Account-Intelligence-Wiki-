type Props = { title: string; body: string }

export default function PlaceholderPage({ title, body }: Props) {
  return (
    <div className="placeholder">
      <p className="placeholder-eyebrow">Forthcoming · Spring 2026 Edition</p>
      <h1 className="placeholder-title">{title}</h1>
      <hr className="placeholder-rule" />
      <p className="placeholder-body">{body}</p>
    </div>
  )
}
