import Image from 'next/image'
import { OBJECTS, type ObjectSlot } from '@/config/objects'
import { cn } from '@/lib/utils'

type Props = {
    slug: ObjectSlot['slug']
    /** Tailwind sizing applied to the wrapper. e.g. "w-80 max-w-full" */
    className?: string
    /** aspect-ratio override; defaults from intrinsic w/h in config */
    aspect?: string
    priority?: boolean
}

/**
 * Renders a 3D object PNG when available, or a size-correct hatched placeholder
 * matching the editorial-studio aesthetic when not. See `src/config/objects.ts`.
 */
export default function Object3D({ slug, className, aspect, priority }: Props) {
    const obj = OBJECTS[slug]
    const ratio = aspect ?? `${obj.width} / ${obj.height}`

    return (
        <div
            className={cn('relative w-full', className)}
            style={{ aspectRatio: ratio }}
            aria-hidden={!obj.available}
        >
            {obj.available ? (
                <Image
                    src={obj.src}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 480px, 90vw"
                    priority={priority}
                />
            ) : (
                <div
                    className="absolute inset-0 border border-hairline overflow-hidden"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 12px)',
                    }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="meta text-fg-35 tracking-widest">{obj.label} — coming</span>
                    </div>
                </div>
            )}
        </div>
    )
}
