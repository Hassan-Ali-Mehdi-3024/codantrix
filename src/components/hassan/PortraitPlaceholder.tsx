// Portrait placeholder until real photo ships (spec 5.4 + section 6).
// Muted, intentional — reads as "coming" not "broken".

export default function PortraitPlaceholder() {
    return (
        <div
            aria-label="Portrait photo of Hassan — coming"
            className="relative w-full aspect-[4/5] border border-hairline overflow-hidden"
            style={{
                backgroundImage:
                    'repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 16px)',
            }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="meta text-fg-35 tracking-widest">PORTRAIT</span>
                <span className="meta text-fg-35">— coming</span>
            </div>
        </div>
    )
}
