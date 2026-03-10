"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/db/supabase";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { Mail, User, Clock, Inbox, Search, Phone } from "lucide-react";
import { format } from "date-fns";
import { AdminNavBar } from "@/components/admin/AdminNavBar";

interface Message {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    language: string;
    status: "new" | "read";
    created_at: string;
}

const PAGE_SIZE = 10;

export default function AdminContactPage() {
    const router = useRouter();
    const { locale } = useParams<{ locale: string }>();

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showList, setShowList] = useState(true);

    const [search, setSearch] = useState("");

    const touchStartX = useRef<number | null>(null);

    const fetchMessages = async (pageNumber: number) => {
        setLoading(true);
        try {
            const from = (pageNumber - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            let query = supabase
                .from("contact_messages")
                .select("*", { count: "exact" })
                .order("created_at", { ascending: false })
                .range(from, to);

            if (search.trim()) {
                query = query.ilike("subject", `%${search}%`);
            }

            const { data, count, error } = await query;

            if (error) throw error;

            setMessages(data as Message[]);
            setTotalPages(Math.ceil((count || 0) / PAGE_SIZE));
            if (data && data.length > 0 && !selectedMessage) {
                setSelectedMessage(data[0]);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages(page);
    }, [page, search]);

    useEffect(() => {
        const channel = supabase
            .channel("contact_messages_realtime")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "contact_messages" },
                () => fetchMessages(page)
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [page, search]);

    useEffect(() => {
        if (selectedMessage?.status === "new") {
            markAsRead(selectedMessage.id);
        }
    }, [selectedMessage]);

    const markAsRead = async (id: number) => {
        await supabase.from("contact_messages").update({ status: "read" }).eq("id", id);
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, status: "read" } : m))
        );
    };

    const markAsUnread = async (id: number) => {
        await supabase.from("contact_messages").update({ status: "new" }).eq("id", id);
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, status: "new" } : m))
        );
    };

    const deleteMessage = async (id: number) => {
        await supabase.from("contact_messages").delete().eq("id", id);
        setMessages((prev) => prev.filter((m) => m.id !== id));
        setSelectedMessage(null);
        setShowList(true);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartX.current) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        if (deltaX > 80) setShowList(true);
    };

    return (
        <AdminAuthGuard>
            <div className="min-h-screen bg-background text-foreground">
                <AdminNavBar />

                <div className="max-w-7xl mx-auto px-4 md:px-12 py-6">
                    <div className="flex flex-col md:flex-row h-[calc(100vh-120px)] md:h-[70vh] overflow-hidden rounded-2xl shadow-xl border bg-card transition-all">

                        {/* LIST */}
                        <div
                            className={`w-full md:w-1/3 border-r overflow-y-auto bg-white dark:bg-neutral-900 transition-all
              ${showList ? "block" : "hidden"} md:block`}
                        >
                            <div className="p-3 flex gap-2 border-b">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2 top-2.5 w-4 h-4 text-neutral-400" />
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search subject..."
                                        className="w-full pl-8 pr-3 py-2 border rounded text-sm"
                                    />
                                </div>

                            </div>

                            {loading ? (
                                <div className="p-4 space-y-3 animate-pulse">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded" />
                                    ))}
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-neutral-500">
                                    <Inbox size={48} />
                                    <p>No messages</p>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        onClick={() => {
                                            setSelectedMessage(msg);
                                            setShowList(false);
                                        }}
                                        className={`p-4 cursor-pointer border-b hover:bg-neutral-100 dark:hover:bg-neutral-800 transition
                    ${selectedMessage?.id === msg.id ? "bg-neutral-200 dark:bg-neutral-800 ring-2 ring-primary/40" : ""}`}
                                    >
                                        <div className="flex justify-between">
                                            <span className="font-semibold">{msg.name}</span>
                                            {msg.status === "new" && (
                                                <span className="text-xs text-green-600 bg-green-100 px-2 rounded-full">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm truncate">{msg.subject}</div>
                                        <div className="text-xs text-neutral-500">
                                            {format(new Date(msg.created_at), "dd/MM/yyyy HH:mm")}
                                        </div>
                                    </div>
                                ))
                            )}

                            {showList && messages.length > 0 && (
                                <div className="flex justify-between p-3 border-t text-sm">
                                    <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                                        Previous
                                    </button>
                                    <span>{page} / {totalPages}</span>
                                    <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* DETAIL */}
                        <div
                            onTouchStart={onTouchStart}
                            onTouchEnd={onTouchEnd}
                            className={`flex-1 p-4 md:p-6 overflow-y-auto transition-all
              ${showList ? "hidden" : "block"} md:block`}
                        >
                            {!selectedMessage ? (
                                <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                                    <Inbox size={64} />
                                    <p>Select a message</p>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setShowList(true)}
                                        className="md:hidden mb-3 text-blue-600 text-sm"
                                    >
                                        ← Back to Inbox
                                    </button>

                                    <div className="flex flex-col sm:flex-row justify-end gap-2 mb-4">
                                        {selectedMessage.status === "read" ? (
                                            <button onClick={() => markAsUnread(selectedMessage.id)} className="btn-warning">
                                                Mark Unread
                                            </button>
                                        ) : null}
                                        <button onClick={() => deleteMessage(selectedMessage.id)} className="btn-danger cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                            Delete
                                        </button>
                                    </div>

                                    <h2 className="text-xl font-bold mb-2">{selectedMessage.subject}</h2>

                                    <div className="flex flex-col sm:flex-row gap-2 text-sm mb-4 text-neutral-600">
                                        <span className="flex items-center gap-1"><User className="w-4 h-4" /> {selectedMessage.name}</span>
                                        <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {selectedMessage.email}</span>
                                        <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {selectedMessage.phone}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {format(new Date(selectedMessage.created_at), "dd/MM/yyyy HH:mm")}</span>
                                    </div>

                                    <div className="whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">
                                        {selectedMessage.message}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthGuard>
    );
}