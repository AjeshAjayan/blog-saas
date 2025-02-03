import ReactMarkdown from "react-markdown"

type PreviewProps = {
    content: string
}

export const Preview = ({ content }: PreviewProps) => {
    return (
        <div className="w-full border p-4 overflow-auto h-full">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    )
}