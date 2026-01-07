'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, FileText, Paperclip, MoreVertical, Phone, Video, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
    id: string;
    sender: 'ME' | 'OTHER';
    text: string;
    time: string;
    attachments?: string[];
}

interface Thread {
    id: string;
    name: string;
    role: string;
    lastMessage: string;
    time: string;
    unread: number;
    avatar: string;
    online: boolean;
}

const INITIAL_THREADS: Thread[] = [
    { id: '1', name: 'Sarah Johnson', role: 'Procurement Manager', lastMessage: 'Please update the quotation expiry date.', time: '10:42 AM', unread: 2, avatar: 'SJ', online: true },
    { id: '2', name: 'Michael Chen', role: 'Finance Dept', lastMessage: 'Invoice INV-001 has been processed.', time: 'Yesterday', unread: 0, avatar: 'MC', online: false },
    { id: '3', name: 'System Support', role: 'Helpdesk', lastMessage: 'Ticket #4928 resolved.', time: 'Jan 4', unread: 0, avatar: 'SS', online: true },
];

const INITIAL_MESSAGES: Message[] = [
    { id: '1', sender: 'OTHER', text: 'Hi, I reviewed your proposal for the IT Hardware batch.', time: '10:30 AM' },
    { id: '2', sender: 'OTHER', text: 'Is it possible to expedite the delivery for the servers?', time: '10:31 AM' },
    { id: '3', sender: 'ME', text: 'Hello Sarah. Yes, we can prioritize the servers. I will update the lead time in the system.', time: '10:35 AM' },
    { id: '4', sender: 'ME', text: 'Just sent the updated schedule.', time: '10:35 AM', attachments: ['Schedule_v2.pdf'] },
    { id: '5', sender: 'OTHER', text: 'Please update the quotation expiry date as well.', time: '10:42 AM' },
];

export default function VendorMessagesPage() {
    const [activeThreadId, setActiveThreadId] = useState<string>('1');
    const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const activeThread = threads.find(t => t.id === activeThreadId);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, activeThreadId]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'ME',
            text: inputMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');

        // Simulate "Typing..." and Reply
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const replyMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'OTHER',
                text: "Thanks for the update. I'll review it shortly.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, replyMessage]);
            toast.info(`New message from ${activeThread?.name}`);
        }, 2000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">

            {/* Thread List Sidebar */}
            <div className="w-80 border-r border-slate-200 flex flex-col bg-white">
                <div className="p-4 border-b border-slate-200">
                    <h2 className="font-bold text-lg text-slate-900 mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input placeholder="Search messages..." className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {threads.map(thread => (
                        <div
                            key={thread.id}
                            onClick={() => setActiveThreadId(thread.id)}
                            className={cn(
                                "p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors flex gap-3",
                                activeThreadId === thread.id && "bg-blue-50/50 border-l-4 border-l-[#0052CC]"
                            )}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                    {thread.avatar}
                                </div>
                                {thread.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="text-sm font-semibold text-slate-900 truncate">{thread.name}</h4>
                                    <span className="text-[10px] text-slate-400">{thread.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate font-medium">{thread.lastMessage}</p>
                            </div>
                            {thread.unread > 0 && (
                                <div className="flex flex-col justify-center">
                                    <span className="w-5 h-5 bg-[#0052CC] rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-sm">
                                        {thread.unread}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50/50">
                {activeThread ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 px-6 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                    {activeThread.avatar}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm">{activeThread.name}</h3>
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        {activeThread.online ? <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> : null}
                                        {activeThread.role}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-[#0052CC]">
                                    <Phone className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-[#0052CC]">
                                    <Video className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-[#0052CC]">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={scrollRef}>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex",
                                        msg.sender === 'ME' ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div className={cn(
                                        "max-w-[70%] p-3 px-4 rounded-2xl shadow-sm text-sm",
                                        msg.sender === 'ME'
                                            ? "bg-[#0052CC] text-white rounded-tr-none"
                                            : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                                    )}>
                                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                                        {msg.attachments && (
                                            <div className="mt-3 space-y-2">
                                                {msg.attachments.map((file, idx) => (
                                                    <div key={idx} className={cn(
                                                        "flex items-center gap-2 p-2 rounded text-xs cursor-pointer transition-colors",
                                                        msg.sender === 'ME' ? "bg-white/10 hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200"
                                                    )}>
                                                        <FileText className="w-4 h-4 opacity-70" />
                                                        <span>{file}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className={cn(
                                            "text-[10px] mt-1 text-right opacity-70 font-medium",
                                            msg.sender === 'ME' ? "text-blue-100" : "text-slate-400"
                                        )}>
                                            {msg.time}
                                            {msg.sender === 'ME' && <CheckCircle2 className="w-3 h-3 inline ml-1 opacity-70" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 bg-white border-t border-slate-200">
                            <div className="flex items-end gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:ring-2 ring-[#0052CC]/20 ring-offset-1 transition-all">
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-[#0052CC] mb-0.5">
                                    <Paperclip className="w-5 h-5" />
                                </Button>
                                <textarea
                                    className="flex-1 bg-transparent border-0 focus:ring-0 text-sm max-h-32 resize-none py-2.5 text-slate-700 placeholder:text-slate-400"
                                    placeholder="Type your message..."
                                    rows={1}
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                <Button
                                    className="mb-0.5 bg-[#0052CC] hover:bg-blue-700 text-white rounded-lg px-4"
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim()}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center flex-col text-slate-400">
                        <div className="p-4 bg-slate-100 rounded-full mb-4">
                            <Send className="w-8 h-8 opacity-50" />
                        </div>
                        <p>Select a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}
