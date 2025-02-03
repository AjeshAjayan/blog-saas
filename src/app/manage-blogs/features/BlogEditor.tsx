"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useMutation } from "@apollo/client"
import { SAVE_BLOG } from "../mutations/saveBlog.graphql"
import { PUBLISH_BLOG } from "../mutations/publishBlog.graphql"
import createApolloClient from "@/lib/apolloClient"
import { BButton } from "@/components/BButton"
import rehypeSanitize from "rehype-sanitize";
import { BInput } from "@/components/BInput"
import { BSuccessText } from "@/components/BSuccessText"
import { toast } from "react-toastify"

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), { ssr: false })

const client = createApolloClient();

export default function BlogEditor() {
    const [content, setContent] = useState("");
    const [showAutoSaveText, setShowAutoSaveText] = useState(false);
    const [title, setTitle] = useState('');

    const [saveBlogPost] = useMutation(SAVE_BLOG, { client })
    const [publishBlogPost] = useMutation(PUBLISH_BLOG, { client })

    const handlePublish = async () => {
        try {
            await publishBlogPost({ variables: { content } })
            alert("Blog post published successfully!")
        } catch (error) {
            console.error("Error publishing blog post:", error)
            alert("Failed to publish blog post. Please try again.")
        }
    }

    /**
     * handleOnChange is debounced; auto save is have with debouncing
     */
    const debounceRef = useRef<NodeJS.Timeout>(null);
    const handleOnChange = (value: string | undefined) => {
        setContent(value || '')
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(() => {
            /**
             * auto-save need title to work
             */
            if (title) {
                setShowAutoSaveText(true)
                setTimeout(() => {
                    setShowAutoSaveText(false)
                }, 2000)
            } else {
                toast('Please provide a title for auto-save to work', { type: 'info' })
            }
        }, 1000)
    }

    const handleTitleOnChange = (e: any) => {
        setTitle(e.target.value)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className=" flex gap-4 items-center">
                <BButton
                    onClick={handlePublish}
                    type="button"
                    className="hidden max-w-40 md:block"
                >
                    Publish
                </BButton>
                <BSuccessText className={`${showAutoSaveText ? ' opacity-100' : 'opacity-0'}`}>Auto save...</BSuccessText>
            </div>
            <BInput
                type="text"
                id="blog-title"
                label="Let's see what you got...!"
                placeholder="Provide an attractive title"
                value={title}
                onChange={handleTitleOnChange}
            />
            <div className="hidden md:flex flex-col">
                <div className="w-full">
                    <MDEditor
                        value={content}
                        onChange={handleOnChange}
                        height={800}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                        textareaProps={{
                            placeholder: 'Please enter Markdown text',
                        }}
                    />
                </div>
            </div>
            <div className="md:hidden">
                <p>You need bigger screen to create post</p>
                <p>Screen width must be greater than or equal to 768px</p>
            </div>
        </div>
    )
}

