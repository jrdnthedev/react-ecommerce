
interface BadgeProps {
    quantity: number;
}
export function Badge({ quantity }: BadgeProps) {
    return (
        <span data-testid="badge-id" className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3.5 -end-3 dark:border-gray-900">{quantity}</span>
    )
}