export default function PageContainer({ title, description, children }: any) {
    return (
        <div>
            <div className="mb-4 text-black">
                <h2 className="text-base">{title}</h2>
                <p className="text-sm">{description}</p>
            </div>
            {children}
        </div>
    )
}