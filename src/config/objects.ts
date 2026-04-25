/**
 * 3D object asset registry — single source of truth.
 *
 * Each entry maps a logical slot to its file in /public/objects/ and intended
 * dimensions. `available: false` means the slot renders a hatched placeholder
 * (size-correct, labeled). Flip to `true` once a real PNG ships at the path.
 *
 * Locked placements per visual-redesign-spec v3.0 Section "The 5 objects":
 *   1. Laptop      — homepage hero, upper-right
 *   2. Paper plane — Tier B header (home + /services)
 *   3. Stack       — Tier A header (home + /services)
 *   4. Ribbon      — process section (home + /services)
 *   5. Mug         — /hassan Background section
 */

export type ObjectSlot = {
    slug: 'laptop' | 'plane' | 'stack' | 'ribbon' | 'mug'
    src: string
    label: string
    /** intrinsic image dimensions (px) for next/image */
    width: number
    height: number
    available: boolean
}

export const OBJECTS: Record<ObjectSlot['slug'], ObjectSlot> = {
    laptop: {
        slug: 'laptop',
        src: '/objects/laptop.png',
        label: 'LAPTOP',
        width: 1024,
        height: 1024,
        available: true,
    },
    plane: {
        slug: 'plane',
        src: '/objects/plane.png',
        label: 'PAPER PLANE',
        width: 1024,
        height: 1024,
        available: true,
    },
    stack: {
        slug: 'stack',
        src: '/objects/stack.png',
        label: 'STACK',
        width: 1024,
        height: 1024,
        available: true,
    },
    ribbon: {
        slug: 'ribbon',
        src: '/objects/ribbon.png',
        label: 'RIBBON',
        width: 1376,
        height: 768,
        available: true,
    },
    mug: {
        slug: 'mug',
        src: '/objects/mug.png',
        label: 'MUG',
        width: 1024,
        height: 1024,
        available: true,
    },
}
