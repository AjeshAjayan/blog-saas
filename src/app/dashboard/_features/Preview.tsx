import ReactMarkdown from "react-markdown"

type PreviewProps = {
    children: string
}

export const Preview = ({ children }: PreviewProps) => {
    return (
        <div className="w-full border p-4 overflow-auto h-full">
            <ReactMarkdown>{children}</ReactMarkdown>
        </div>
    )
}