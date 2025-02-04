'use client'
import { BButton } from "@/components/BButton"
import { useMutation } from "@apollo/client"
import { UNPUBLISH_BLOG } from "../../../manage/_mutations/unpublishBlog.graphql"
import createApolloClient from "@/lib/apolloClient";
import { toast } from "react-toastify";
import { PUBLISH_BLOG } from "../../../manage/_mutations/publishBlog.graphql";
import { useState } from "react";

const client = createApolloClient();

type UnpublishOrPublishProps = { 
    id: number, 
    hasPublished: boolean, 
    slug: string,
    save?: () => void;
};

export const UnpublishOrPublish = ({ id, hasPublished, save } : UnpublishOrPublishProps) => {
    const [published, setPublished] = useState(hasPublished);
    
    const [ unpublish, { loading: unpublishLoading } ] = useMutation(UNPUBLISH_BLOG, { 
        client,
        variables: { publishBlogId: id },
    })

    const [ publish, { loading: publishLoading } ] = useMutation(PUBLISH_BLOG, { 
        client,
        variables: { publishBlogId: id },
    })

    const handleUnPublishOrPublish = () => {
        save && save();
        if(published) {
            unpublish().then((res) => {
                setPublished(false);
                toast(res.data.unpublishBlog.message, { type: 'success' });
            }).catch(err => {
                toast.error(err.message, { type: 'error' })
            })
        } else {
            publish().then((res) => {
                setPublished(true);
                toast(res.data.publishBlog.message, { type: 'success' });
            }).catch(err => {
                toast.error(err.message, { type: 'error' })
            })
        }
    }

    return (
        <BButton 
            disabled={unpublishLoading || publishLoading} 
            onClick={handleUnPublishOrPublish} 
            type="button"
            className={`${ published ? '!bg-red-500' : '!bg-green-500' }`}
        >
            { 
                unpublishLoading || publishLoading ? 
                    'Loading...' : 
                        published ? 'Unpublish' : 'Publish'
            }
        </BButton>
    )
}