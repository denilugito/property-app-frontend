export default function getPaginationPages(
    current: number,
    total: number,
    maxVisible: number
) {
    const pages: (number | "...")[] = [];

    if (total <= maxVisible) {
        return Array.from({ length: total }, (_, i) => i);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(0, current - half);
    let end = Math.min(total - 1, current + half);

    // Adjust if near start
    if (start === 0) {
        end = maxVisible - 1;
    }

    // Adjust if near end
    if (end === total - 1) {
        start = total - maxVisible;
    }

    // First page
    if (start > 0) {
        pages.push(0, "...");
    }

    // Middle Pages
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    // Last page
    if (end < total - 1) {
        pages.push("...", total - 1);
    }

    return pages;
}