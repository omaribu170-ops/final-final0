'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash, Save } from 'lucide-react';

export default function NotesPage() {
    const [notes, setNotes] = useState<{ id: number, content: string, date: string }[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('hub-notes');
        if (saved) setNotes(JSON.parse(saved));
    }, []);

    const addNote = () => {
        if (!input.trim()) return;
        const newNote = { id: Date.now(), content: input, date: new Date().toLocaleDateString('ar-EG') };
        const updated = [newNote, ...notes];
        setNotes(updated);
        localStorage.setItem('hub-notes', JSON.stringify(updated));
        setInput('');
    };

    const deleteNote = (id: number) => {
        const updated = notes.filter(n => n.id !== id);
        setNotes(updated);
        localStorage.setItem('hub-notes', JSON.stringify(updated));
    };

    return (
        <div className="p-6 space-y-6 pb-24">
            <h1 className="text-2xl font-bold">ملاحظاتي 📝</h1>

            {/* Input */}
            <div className="bg-glass-white border border-glass-border p-4 rounded-2xl relative">
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="اكتب فكرة جديدة..."
                    className="w-full bg-transparent outline-none resize-none h-24 text-lg"
                />
                <div className="flex justify-end mt-2">
                    <button
                        onClick={addNote}
                        className="bg-hub-gradient px-4 py-2 rounded-xl text-white font-bold flex items-center gap-2 shadow-glow"
                    >
                        <Save size={16} /> حفظ
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {notes.length === 0 && (
                    <p className="text-center text-gray-500 py-10">مفيش ملاحظات لسه.</p>
                )}
                {notes.map(note => (
                    <div key={note.id} className="bg-white/5 border border-white/5 p-4 rounded-2xl animate-fade-in group hover:bg-white/10 transition">
                        <p className="whitespace-pre-wrap mb-3">{note.content}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500 border-t border-white/5 pt-3">
                            <span>{note.date}</span>
                            <button onClick={() => deleteNote(note.id)} className="text-red-400 hover:text-red-300 p-1">
                                <Trash size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
