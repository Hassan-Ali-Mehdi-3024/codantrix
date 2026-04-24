// 16:9 placeholder for architecture diagrams (spec Section 5.3).
// Real SVG diagrams ship later; this holds the visual rhythm meanwhile.

export default function DiagramPlaceholder({ label = 'ARCHITECTURE DIAGRAM — COMING' }: { label?: string }) {
    return (
        <div
            aria-hidden="true"
            className="relative w-full aspect-[16/9] border border-hairline overflow-hidden"
            style={{
                backgroundImage:
                    'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 12px)',
            }}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="meta text-fg-35 tracking-widest">{label}</span>
            </div>
        </div>
    )
}
