"use client"

import { useState, useRef } from "react"
import dynamic from "next/dynamic"
import { useMutation } from "@apollo/client"
import { SAVE_BLOG } from "../manage/_mutations/saveBlog.graphql"
import { PUBLISH_BLOG } from "../manage/_mutations/publishBlog.graphql"
import createApolloClient from "@/lib/apolloClient"
import { BButton } from "@/components/BButton"
import rehypeSanitize from "rehype-sanitize";
import { BInput } from "@/components/BInput"
import { BSuccessText } from "@/components/BSuccessText"
import { toast } from "react-toastify"
import { Preview } from "./Preview"
import { UnpublishOrPublish } from "../view/[...params]/_features/UnPublishOrPublish"

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), { ssr: false })

const client = createApolloClient();

type BlogEditorProps = {
    title: string
    content: string
    id: number
    published: boolean
}

export default function BlogEditor({
    title: initialTitle,
    content: initialContent,
    id,
    published,
}: BlogEditorProps) {
    const [content, setContent] = useState(initialContent);
    const [showAutoSaveText, setShowAutoSaveText] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [blogId, setBlogId] = useState(id);
    const [publishedStatus] = useState(published);
    const [showPreview, setShowPreview] = useState(false);

    const [saveBlogPost] = useMutation(SAVE_BLOG, { client })
    const [publishBlogPost] = useMutation(PUBLISH_BLOG, { client })

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
                saveBlogPost({ variables: { title, contents: value || '', id: blogId } }).then((res) => {
                    setBlogId(parseInt(res.data.addBlog.id))
                    setShowAutoSaveText(true)
                }).catch((err) => {
                    toast.error(err.message, { type: 'error' })
                })

                setTimeout(() => {
                    setShowAutoSaveText(false);
                }, 2000)
            } else {
                toast('Please provide a title for auto-save to work', { type: 'info' })
            }
        }, 1000)
    }

    const handleTitleOnChange = (e: any) => {
        setTitle(e.target.value);
        /**
         * handleOnChange is debounced
         */
        handleOnChange(content)
    }

    const handlePreview = () => void setShowPreview(p => !p);

    return (
        <div className="flex flex-col gap-4">
            <div className=" flex gap-4 items-center w-full justify-between">
                <div className="flex gap-4 items-center w-60">
                    <UnpublishOrPublish 
                        hasPublished={publishedStatus} 
                        slug={''} 
                        id={blogId}
                    />
                    <BSuccessText className={`${showAutoSaveText ? ' opacity-100' : 'opacity-0'}`}>Auto save...</BSuccessText>
                </div>
                <BButton 
                    onClick={handlePreview}
                    type="button"
                    className="hidden max-w-40 md:block"
                    disabled={!Boolean(content)}>
                        { showPreview ? 'Edit' : 'Preview'}
                </BButton>
            </div>
            {
                showPreview
                ? <Preview>{ content }</Preview>
                : <>
                    <BInput
                        type="text"
                        id="blog-title"
                        label="Let's see what you got...!"
                        placeholder="Provide an attractive title"
                        value={title}
                        onChange={handleTitleOnChange}
                        className="hidden md:flex"
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
                </>
            }
        </div>
    )
}

