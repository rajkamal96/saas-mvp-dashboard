"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/useLanguage";
import {
  Check,
  Camera,
  Mic,
  Paperclip,
  Send,
  LogOut,
  Clock,
  Sparkles,
  MapPin,
  MessageSquare
} from "lucide-react";

interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  time?: string;
}

interface ChatMessage {
  id: string;
  sender: "worker" | "office";
  text: string;
  time: string;
  voiceUrl?: boolean;
}

export default function WorkerDashboard() {
  const { t } = useLanguage();
  const router = useRouter();

  // Mobile layout state: "tasks" | "attachments" | "chat"
  const [activeTab, setActiveTab] = useState<"tasks" | "attachments" | "chat">("tasks");

  // Checklist tasks
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: "t1", text: t("workActiveLocationSub").split(" · ")[1] || "Mowing lawns", completed: true, time: "08:15" },
    { id: "t2", text: t("dashRegNamePlaceholder") === "npr. Luka Dončič" ? "Ureditev robov zelenice" : "Trim lawn edges", completed: false },
    { id: "t3", text: t("dashRegNamePlaceholder") === "npr. Luka Dončič" ? "Fotografiranje končanega stanja" : "Take final photos", completed: false },
    { id: "t4", text: t("dashRegNamePlaceholder") === "npr. Luka Dončič" ? "Čiščenje delovnega območja" : "Clean work area", completed: false }
  ]);

  // Attachments
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Chat message feed
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "c1", sender: "office", text: t("dashRegNamePlaceholder") === "npr. Luka Dončič" ? "Luka, ne pozabi fotografirati končanega stanja pred odhodom." : "Luka, don't forget to take photos of the finished status before leaving.", time: "08:30" },
    { id: "c2", sender: "worker", text: t("dashRegNamePlaceholder") === "npr. Luka Dončič" ? "Razumem, bom uredil." : "Understood, will do.", time: "08:32" }
  ]);

  const [chatInput, setChatInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll chat to bottom
  const chatBottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, activeTab]);

  // Audio Recording timer simulator
  useEffect(() => {
    if (isRecording) {
      recordingTimer.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
      setRecordingSeconds(0);
    }
    return () => {
      if (recordingTimer.current) clearInterval(recordingTimer.current);
    };
  }, [isRecording]);

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              time: !task.completed
                ? new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" })
                : undefined
            }
          : task
      )
    );
  };

  const handleAddPhoto = () => {
    setUploading(true);
    setTimeout(() => {
      // Add fake base64 or placeholder
      const dummyPhotos = [
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ];
      const selectedUrl = dummyPhotos[photos.length % dummyPhotos.length];
      setPhotos([...photos, selectedUrl]);
      setUploading(false);

      // Add task auto-complete if "Fotografiranje končanega stanja" is not done
      setTasks(tasks.map(t => t.id === "t3" ? { ...t, completed: true, time: new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }) } : t));
    }, 800);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `c_${Date.now()}`,
      sender: "worker",
      text: chatInput,
      time: new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages([...chatMessages, newMsg]);
    setChatInput("");
  };

  const handleStartRecord = () => {
    setIsRecording(true);
  };

  const handleStopRecord = () => {
    setIsRecording(false);
    
    // Add a simulated voice message transcript
    setTimeout(() => {
      const voiceMsgText = t("dashRegNamePlaceholder") === "npr. Luka Dončič" 
        ? "Zaključil sem z delom na območju A. Vse je pokošeno in pospravljeno. Nalagam slike."
        : "I have finished working on Area A. Everything is mowed and cleaned up. Uploading pictures.";

      const voiceMsg: ChatMessage = {
        id: `c_voice_${Date.now()}`,
        sender: "worker",
        text: voiceMsgText,
        time: new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }),
        voiceUrl: true
      };

      setChatMessages((prev) => [...prev, voiceMsg]);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0b0f19] flex justify-center p-0 sm:p-6 font-sans antialiased text-slate-800 dark:text-slate-200">
      
      {/* Mobile Shell Mock Container */}
      <div className="w-full sm:max-w-[430px] sm:h-[860px] sm:rounded-[40px] bg-white dark:bg-[#0c111d] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 flex flex-col overflow-hidden relative">
        
        {/* Mobile Header status bar */}
        <div className="bg-[#1B3A6B] text-white px-5 pt-4 pb-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-auto brightness-0 invert" />
            <span className="text-[10px] font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded-full uppercase">
              {t("authRoleWorker")}
            </span>
          </div>

          <button 
            onClick={() => router.push("/login")}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <LogOut className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Info card (Active Location / Assignment) */}
        <div className="bg-slate-50 dark:bg-[#151c2c] p-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1B3A6B]/15 flex items-center justify-center text-[#1B3A6B] dark:text-[#38bdf8] flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{t("workActiveLocation")}</span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{t("workActiveLocationSub")}</h3>
              <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                {t("workActiveLocationDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* Tab view controller */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0c111d]">
          <button 
            onClick={() => setActiveTab("tasks")}
            className={`flex-1 py-3 text-center text-xs font-bold transition-colors ${
              activeTab === "tasks" 
                ? "text-[#1B3A6B] dark:text-[#38bdf8] border-b-2 border-[#1B3A6B] dark:border-[#38bdf8]" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {t("workTasksLabel")}
          </button>
          <button 
            onClick={() => setActiveTab("attachments")}
            className={`flex-1 py-3 text-center text-xs font-bold transition-colors ${
              activeTab === "attachments" 
                ? "text-[#1B3A6B] dark:text-[#38bdf8] border-b-2 border-[#1B3A6B] dark:border-[#38bdf8]" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {t("workAttachmentsLabel")}
          </button>
          <button 
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-3 text-center text-xs font-bold transition-colors relative ${
              activeTab === "chat" 
                ? "text-[#1B3A6B] dark:text-[#38bdf8] border-b-2 border-[#1B3A6B] dark:border-[#38bdf8]" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {t("workChatLabel").split(" ")[0]}
            <span className="absolute right-6 top-3.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Tab content area */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-[#0c111d]/50 p-4">
          
          {/* TAB 1: Tasks Checklist */}
          {activeTab === "tasks" && (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    task.completed 
                      ? "bg-slate-50 dark:bg-[#151c2c]/40 border-slate-200/50 dark:border-slate-800/80 opacity-70" 
                      : "bg-white dark:bg-[#151c2c] border-slate-200 dark:border-slate-800 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      task.completed 
                        ? "bg-green-500 border-green-500 text-white" 
                        : "border-slate-300 dark:border-slate-600"
                    }`}>
                      {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs font-semibold ${
                      task.completed ? "line-through text-slate-400" : "text-slate-800 dark:text-slate-100"
                    }`}>
                      {task.text}
                    </span>
                  </div>
                  
                  {task.time && (
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {task.time}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Attachments / Photo Upload */}
          {activeTab === "attachments" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative group shadow-sm"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={photo} 
                      alt="Uploaded card item" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">foto_{index+1}.jpg</span>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={handleAddPhoto}
                  disabled={uploading}
                  className="aspect-video bg-white dark:bg-[#151c2c] rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:border-[#1B3A6B] transition-colors"
                >
                  <Camera className="w-6 h-6 mb-1 text-slate-300" />
                  <span className="text-[10px] font-bold">
                    {uploading ? "Nalaganje..." : t("workAddPhotoBtn")}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Office Chat Feed */}
          {activeTab === "chat" && (
            <div className="flex flex-col h-full min-h-[350px]">
              <div className="flex-1 space-y-3 pb-4">
                {chatMessages.map((m) => (
                  <div 
                    key={m.id}
                    className={`flex flex-col max-w-[80%] ${
                      m.sender === "worker" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <div className={`p-3 rounded-2xl text-xs leading-normal shadow-sm ${
                      m.sender === "worker"
                        ? "bg-[#1B3A6B] text-white rounded-tr-none"
                        : "bg-white dark:bg-[#151c2c] border border-slate-100 dark:border-slate-800 rounded-tl-none text-slate-800 dark:text-slate-100"
                    }`}>
                      {m.voiceUrl && (
                        <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-white/10">
                          <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                          <span className="text-[8px] font-bold tracking-wider text-emerald-300 uppercase">{t("dashColKomunikacijaVoice")} (AI PREPIS)</span>
                        </div>
                      )}
                      <p className={m.voiceUrl ? "italic" : ""}>{m.text}</p>
                    </div>
                    <span className="text-[8px] text-slate-400 font-semibold mt-1 px-1">{m.time}</span>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>
            </div>
          )}

        </div>

        {/* Voice recording Overlay */}
        {isRecording && (
          <div className="absolute inset-0 bg-[#0c111d]/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-white px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-6 animate-pulse shadow-lg">
              <Mic className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="font-bold text-base tracking-wide">{t("workVoiceRecording")}</h3>
            <span className="text-sm font-semibold text-slate-400 mt-1">
              00:{recordingSeconds.toString().padStart(2, "0")}
            </span>
            
            <p className="text-xs text-slate-500 max-w-[250px] mt-3 leading-normal">
              {t("dashRegRole") === "Vloga delavca" ? "Prepis se samodejno sinhronizira z delovnim nalogom v pisarni." : "The transcript will automatically sync to the work order in the office."}
            </p>

            <Button 
              onClick={handleStopRecord}
              className="mt-10 rounded-full h-11 px-6 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs"
            >
              {t("workVoiceStopBtn")}
            </Button>
          </div>
        )}

        {/* Input panel at bottom (Only for chat tab) */}
        {activeTab === "chat" && (
          <div className="p-3 bg-white dark:bg-[#0c111d] border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <button 
              onClick={handleStartRecord}
              className="w-10 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-colors"
            >
              <Mic className="w-4.5 h-4.5" />
            </button>
            
            <Input 
              placeholder={t("workChatPlaceholder")} 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              className="flex-1 h-10 text-xs px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#151c2c]"
            />

            <button 
              onClick={handleSendMessage}
              className="w-10 h-10 rounded-xl bg-[#1B3A6B] hover:bg-[#142c52] text-white flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
