# Technical Specification & Plan: Lead Chatbox Integration

This document outlines the detailed functional and technical specifications for introducing a floating chatbox interface to the leads module. When a seller clicks the mail icon on a lead row, it opens a dynamic, highly responsive chat simulation widget enabling conversational context for CRM users.

---

## 1. User Experience & Interaction Design

### 1.1 Visual Interface Specifications
The chat widget is styled using Next.js Tailwind configuration, conforming to the existing design system (using Indigo `#6366F1` as the primary action tone and Emerald `#10B981` for active statuses/success indicators).

- **Positioning:** Floating at the bottom-right corner (`fixed bottom-6 right-6 z-50`).
- **Dimensions:** Width `w-96` (384px), Height `h-[480px]` to provide adequate reading and typing room without blocking the workspace.
- **Card Styling:** Glassmorphism overlay (`bg-white/95 backdrop-blur-sm`), bordered with high-contrast subtle grey (`border border-slate-100`), elevated by dynamic drop shadow (`shadow-2xl shadow-slate-200/50`), rounded corners (`rounded-2xl`).
- **Header:**
  - Gradient Avatar (`bg-gradient-to-tr from-indigo-500 to-purple-600 text-white`) showcasing initials.
  - Active status indicator (pulsing green dot (`bg-emerald-500 animate-pulse`)).
  - Close button (`hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors`).
- **Scrollable Area:** Scrollbars are hidden or minimized; content uses standard Next/Tailwind scrolling (`flex-1 overflow-y-auto px-4 py-4 space-y-4`).
- **Input Area:** Text area/input (`flex-1 focus-visible:ring-indigo-500`) with a right-aligned send button (Lucide React `SendHorizontal`).

```
+------------------------------------------+
|  [VM] Nguyễn Văn Minh             (X)    |  <- Header (Gradient avatar, name, close)
|       Công ty ABC ● Online               |
+------------------------------------------+
|                                          |
|  [VM] Xin chào, tôi muốn hỏi về...       |  <- Lead message (left aligned)
|                                          |
|       Chào anh Minh! Rất vui được... [V] |  <- Seller message (right aligned)
|                                          |
|  [VM] (Lead is typing...)                |  <- Bouncing dots indicator
|                                          |
+------------------------------------------+
| [ Nhập tin nhắn...               ]  [>]  |  <- Input Area (fixed bottom of widget)
+------------------------------------------+
```

### 1.2 Micro-Animations & Interactions
- **Widget Entry:** Smooth scale-up and slide-in effect (`animate-in fade-in slide-in-from-bottom-5 duration-300`).
- **Typing Status:** Micro-animation showing three bouncing dots when the lead is "typing" a response:
  ```css
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  ```
- **Bubble Inflow:** Messages fade and slide up when added to the list.
- **Scroll Anchor:** Auto-scrolls to the bottom upon receiving/sending a new message.

---

## 2. Technical Design & API Interfaces

### 2.1 Types and Interface Schema
In `types/index.ts` (or locally in the component), we define the structured message entities:

```typescript
export interface ChatMessage {
  id: string;
  sender: "seller" | "lead";
  text: string;
  timestamp: Date;
}
```

### 2.2 Simulated Conversation Logic
To make the chat widget interactive and lively, we will implement an automatic response generator matching the lead's status/score.

- **Initial Greeting Generation:**
  Each lead gets a tailored greeting depending on their profile.
  - *Example:* Nguyễn Văn Minh (Công ty ABC, status: "qualified"): *"Chào anh, tôi là đại diện từ VanhCorp. Tôi thấy anh đang quan tâm đến gói Enterprise License cho Công ty ABC. Tôi có thể hỗ trợ gì thêm không?"*
- **Auto-Reply Database:**
  A pool of interactive responses that the lead triggers sequentially:
  1. *"Cảm ơn bạn đã phản hồi. Bên mình đang cân nhắc giải pháp AI của VanhCorp."*
  2. *"Chi phí triển khai và thời gian tích hợp hệ thống mất khoảng bao lâu vậy bạn?"*
  3. *"Bạn có thể gửi tài liệu báo giá chi tiết qua email đăng ký của mình nhé."*

---

## 3. Implementation Steps & Code Modifications

### 3.1 Step 1: Create the Chatbox Component
**Path:** `components/leads/lead-chatbox.tsx`
This will be a client-side component handling internal state:
- `messages`: List of active chat messages.
- `isTyping`: Boolean state representing lead activity.
- `input`: String state for current input text.

```tsx
// Key state handlers inside LeadChatbox:
const handleSendMessage = (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return;

  // 1. Add Seller message
  const userMsg: ChatMessage = { id: Date.now().toString(), sender: "seller", text: input, timestamp: new Date() };
  setMessages(prev => [...prev, userMsg]);
  setInput("");

  // 2. Trigger Typing Indicator
  setIsTyping(true);

  // 3. Queue simulated response
  setTimeout(() => {
    setIsTyping(false);
    const replyMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: "lead",
      text: getNextMockReply(messages.length),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, replyMsg]);
  }, 1800);
};
```

### 3.2 Step 2: Update the Lead Table Component
**Path:** `components/leads/lead-table.tsx`
We will expose an action callback when the Mail icon button is clicked.

```typescript
interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onMailClick: (lead: Lead) => void; // Added callback
}
```
Update line 93 of `lead-table.tsx` to handle click events:
```tsx
<Button 
  variant="ghost" 
  size="icon" 
  className="w-8 h-8 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
  onClick={() => onMailClick(lead)}
>
  <Mail className="w-4 h-4" />
</Button>
```

### 3.3 Step 3: Update the Leads Page Container
**Path:** `app/(dashboard)/leads/page.tsx`
Incorporate the state hook and place the floating container globally inside the dashboard page structure.

```tsx
// State hook additions
const [activeChatLead, setActiveChatLead] = useState<Lead | null>(null);

// JSX integration
<LeadTable leads={filteredLeads} onEdit={handleEditLead} onMailClick={setActiveChatLead} />

{activeChatLead && (
  <LeadChatbox 
    lead={activeChatLead} 
    onClose={() => setActiveChatLead(null)} 
  />
)}
```

---

## 4. Verification & Testing Strategy

### 4.1 UI Consistency Checklist
- Ensure the floating window layout responds cleanly to responsive viewport changes (hide or shrink width to `w-full px-4` on mobile devices `< 640px`).
- Verify avatar initials render perfectly for all mock leads (e.g. "Nguyễn Văn Minh" -> "NM" or "VM").

### 4.2 Functional Verification Workflow
1. **Open:** Click the mail icon on Nguyễn Văn Minh -> Chatbox opens at bottom-right corner with 2 initial greeting messages.
2. **Send Message:** Send *"Chúng tôi có khuyến mãi đặc biệt cho Công ty ABC"*. Verify that the message instantly appends to the right, colored in Indigo.
3. **Indicator:** Verify three pulsing/bouncing dots appear at the left with label *"Minh is typing..."*.
4. **Reply:** Verify that after ~1.8 seconds, the dots disappear and a reply message is appended to the left, styled in grey.
5. **Autoscroll:** Send multiple messages to force overflow -> verify container autoscrolls to latest message on every update.
6. **Toggle:** Click "X" to close, click another lead (e.g., Trần Thị Lan) -> verify chatbox resets and shows greetings tailored to Lan.
