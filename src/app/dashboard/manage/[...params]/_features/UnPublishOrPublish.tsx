'use client'
import { BButton } from "@/components/BButton"
import { useMutation } from "@apollo/client"
import { UNPUBLISH_BLOG } from "../../_mutations/unpublishBlog.graphql"
import createApolloClient from "@/lib/apolloClient";
import { toast } from "react-toastify";

const client = createApolloClient();

export const UnpublishOrPublish = ({ id, hasPublished} : { id: number, hasPublished: boolean }) => {
    const [ unpublish, { loading } ] = useMutation(UNPUBLISH_BLOG, { 
        client,
        variables: { publishBlogId: id }
    })

    const handleUnPublishOrPublish = () => {
        unpublish().then((res) => {
            toast(res.data.unpublishBlog.message, { type: 'success' })
        }).catch(err => {
            toast.error(err.message, { type: 'error' })
        })
    }

    return (
        <BButton 
            disabled={loading} 
            onClick={handleUnPublishOrPublish} 
            type="button"
            className={`${ hasPublished ? 'bg-red-500' : 'bg-green-500' }`}
        >
            { 
                loading ? 
                    'Loading...' : 
                        hasPublished ? 'Unpublish' : 'Publish'
            }
        </BButton>
    )
}