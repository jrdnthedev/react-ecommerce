export default function AuthLayout({ children }: {
    readonly children: React.ReactNode;
}) {
    return (
        <div className="items-center justify-center h-screen flex">
            {children}
        </div>
    );
}