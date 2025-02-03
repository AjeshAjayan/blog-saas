'use server';
import createApolloClient from "@/lib/apolloClient";
import { headers } from "next/headers";
import { GET_SINGLE_BLOG } from "../../_queries/getBlogsByUser.graphql";
import React from "react";
import { Preview } from "../../_features/Preview";
import { BButton } from "@/components/BButton";
import { UnpublishOrPublish } from "./_features/UnPublishOrPublish";
import { redirect } from "next/navigation";
import Link from "next/link";

const client = createApolloClient();

export default async function ManageByBlogId({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const paramsL = await params; 
    const cookieHeader = (await headers()).get('cookie');
    let blog: any = [];
    try {
        const { data } = await client.query({
            query: GET_SINGLE_BLOG,
            variables: { blogByIdId: (paramsL as any).params[1] },
            context: {
                headers: {
                    cookie: cookieHeader || ''
                }
            },
            fetchPolicy: 'no-cache'
        });
        blog = data.blogById;
    } catch (err) {
        if((err as any).message === 'unauthorized') {
            redirect('/login');
        }
        throw new Error('Something went wrong)')
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className=" flex gap-4 justify-between mb-5">
                    <BButton className="!bg-red-500" type="button">Delete</BButton>
                    <Link className="w-full" href={`/dashboard/manage/${blog.id}`}>
                        <BButton type="button">Edit</BButton>
                    </Link>
                    <UnpublishOrPublish 
                        hasPublished={blog.published} 
                        slug={(paramsL as any).params[0]} 
                        id={(paramsL as any).params[1]}
                    />
                </div>
                <h1>{blog.title}</h1>
                <Preview>{blog.content}</Preview>
            </div>
        </div>
    );
}
