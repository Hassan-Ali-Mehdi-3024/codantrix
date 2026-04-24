// Static pseudo-Python multi-agent loop — signature detail per spec 5.1 + 11.10.
// No typewriter animation; subtle caret blink only, respects prefers-reduced-motion.

const LINES: Array<{ text: string; muted?: boolean }> = [
    { text: 'from claude import Agent, tool', muted: true },
    { text: 'from langgraph import StateGraph' },
    { text: '' },
    { text: '@tool', muted: true },
    { text: 'def lookup_tenant(id: str) -> Tenant: ...' },
    { text: '' },
    { text: 'agent = Agent(' },
    { text: '    model="claude-opus-4-6",' },
    { text: '    tools=[lookup_tenant, create_ticket, notify],' },
    { text: '    evals=load_eval_set("regression.jsonl"),' },
    { text: ')' },
    { text: '' },
    { text: 'await graph.run(task, checkpoint=True)' },
]

export default function HeroTerminal() {
    return (
        <figure
            aria-label="Example agentic workflow code"
            className="relative w-full border border-hairline rounded-md overflow-hidden bg-bg"
        >
            {/* Header strip — quiet mono label, not mac window controls */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-hairline">
                <span className="meta text-fg-35">agent_loop.py</span>
                <span className="meta text-fg-35">— running</span>
            </div>

            <pre className="px-4 py-5 text-[13px] leading-[1.7] font-mono overflow-x-auto">
                <code>
                    {LINES.map((line, i) => (
                        <span
                            key={i}
                            className={line.muted ? 'text-fg-35 block' : 'text-fg-70 block'}
                        >
                            {line.text || '\u00a0'}
                        </span>
                    ))}
                    <span className="inline-flex items-center gap-0 text-fg-70">
                        <span className="text-accent">›</span>
                        <CursorBlink />
                    </span>
                </code>
            </pre>
        </figure>
    )
}

function CursorBlink() {
    return (
        <span
            aria-hidden="true"
            className="inline-block w-[7px] h-[14px] ml-1 bg-fg-70 align-middle animate-[blink_1.1s_steps(2)_infinite]"
            style={{ animationName: 'blink' }}
        />
    )
}

// keyframes declared inline — tiny, global via next/style to avoid css file thrash
// Put them in globals if this becomes reused elsewhere.
