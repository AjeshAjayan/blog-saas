"use client"

import { useState, useEffect } from "react"
import { BButton } from "./BButton"
import { toast } from "react-toastify";
import createApolloClient from "@/lib/apolloClient";
import { useMutation } from "@apollo/client";
import { DELETE } from "@/app/dashboard/view/[...params]/_mutations/delete.graphql";
import { useRouter } from "next/navigation";

interface BConfirmDialogProps {
    itemName: string;
    id: number;
}

const client = createApolloClient();

export default function BConfirmDialog({
    itemName,
    id
}: BConfirmDialogProps) {
    const [countdown, setCountdown] = useState(10)
    const [isOpen, setIsOpen] = useState(false)
    const [deleteBlog, { loading: deleteLoading }] = useMutation(DELETE, { client });
    const router = useRouter();

    const onConfirm = () => {
        setIsOpen(false);
        setCountdown(10);
        deleteBlog({ variables: {deleteBlogId: id} }).then(() => {
            toast('Deleted successfully', { type: 'success' });
            router.push('/dashboard')
        }).catch(() => {
            toast('Something went wrong', { type: 'error' });
        })
    }

    const onClose = () => {
        setIsOpen(false);
        setCountdown(10);
    }

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (isOpen && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCount) => prevCount - 1)
            }, 1000)
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        }
    }, [isOpen, countdown])

    return (
        <>
            <BButton
                disabled={deleteLoading}
                className={`${deleteLoading ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : '!bg-red-500'}`} 
                type="button"
                onClick={() => void setIsOpen(true)}
            >
                {deleteLoading ? 'Loading...' : 'Delete'}
            </BButton>
            {
                isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                            <p className="mb-6">"{itemName}" This action cannot be undone.</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={onClose}
                                    className="
                                        px-4 
                                        py-2 
                                        bg-gray-200 
                                        text-white 
                                        rounded 
                                        hover:bg-gray-300 
                                        transition-colors 
                                        bg-secondary
                                    "
                                >
                                    No
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={countdown > 0}
                                    className={`px-4 py-2 rounded transition-colors bg-red-500 text-white hover:bg-red-600"
                                        }`}
                                >
                                    Yes {countdown > 0 && `(${countdown}s)`}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

