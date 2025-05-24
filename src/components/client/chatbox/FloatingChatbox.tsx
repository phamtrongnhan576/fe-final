// 'use client';

// import { useState, useRef, useEffect, FormEvent } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { MessageSquare, X, Send, Bot, User, CornerDownLeft } from 'lucide-react';

// // Định nghĩa kiểu dữ liệu cho một tin nhắn
// interface Message {
//   id: string;
//   text: string;
//   sender: 'user' | 'bot';
//   timestamp: Date;
// }

// // Danh sách các câu hỏi và câu trả lời mẫu của bot
// const botResponses: { [key: string]: string | (() => string) } = {
//   'chào': 'Chào bạn! Mình là chatbot demo. Mình có thể giúp gì cho bạn?',
//   'tên gì': 'Mình là một trợ lý ảo được lập trình để trả lời tự động.',
//   'bạn khỏe không': () => {
//     const replies = ['Mình khỏe, cảm ơn bạn!', 'Mình vẫn ổn, còn bạn thì sao?', 'Tuyệt vời! Cảm ơn đã hỏi thăm.'];
//     return replies[Math.floor(Math.random() * replies.length)];
//   },
//   'giờ': () => `Bây giờ là ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}.`,
//   'ngày': () => `Hôm nay là ${new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`,
//   'giúp gì': 'Mình có thể trả lời một số câu hỏi cơ bản. Bạn thử hỏi xem!',
//   'sản phẩm': 'Hiện tại mình chỉ là demo nên chưa có thông tin sản phẩm cụ thể. Bạn có thể xem trên website nhé!',
//   'tạm biệt': 'Tạm biệt! Chúc bạn một ngày tốt lành.',
//   'cảm ơn': 'Rất vui khi được giúp bạn!',
//   // Thêm các từ khóa và câu trả lời khác tại đây
//   'default': 'Xin lỗi, mình chưa hiểu câu hỏi của bạn. Bạn có thể diễn đạt rõ hơn được không?',
// };

// const FloatingChatbox = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState<string>('');
//   const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
//   const scrollAreaViewportRef = useRef<HTMLDivElement>(null);

//   // Tin nhắn chào mừng ban đầu từ bot
//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       setTimeout(() => {
//         setMessages([
//           {
//             id: crypto.randomUUID(),
//             text: 'Chào bạn! Mình là Chatbot Demo. Bạn cần hỗ trợ gì không?',
//             sender: 'bot',
//             timestamp: new Date(),
//           },
//         ]);
//       }, 500);
//     }
//   }, [isOpen]); // Chỉ chạy khi isOpen thay đổi và messages rỗng

//   // Hàm lấy câu trả lời từ bot
//   const getBotResponse = (userMessageText: string): string => {
//     const lowerCaseMessage = userMessageText.toLowerCase().trim();
//     for (const keyword in botResponses) {
//       if (keyword !== 'default' && lowerCaseMessage.includes(keyword)) {
//         const response = botResponses[keyword];
//         return typeof response === 'function' ? response() : response;
//       }
//     }
//     const defaultResponse = botResponses['default'];
//     return typeof defaultResponse === 'function' ? defaultResponse() : defaultResponse;
//   };

//   // Xử lý gửi tin nhắn
//   const handleSendMessage = (e?: FormEvent<HTMLFormElement>) => {
//     if (e) e.preventDefault();
//     const trimmedInput = inputValue.trim();
//     if (trimmedInput === '') return;

//     const userMessage: Message = {
//       id: crypto.randomUUID(),
//       text: trimmedInput,
//       sender: 'user',
//       timestamp: new Date(),
//     };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInputValue('');
//     setIsBotTyping(true);

//     // Mô phỏng bot đang suy nghĩ và trả lời
//     setTimeout(() => {
//       const botMessageText = getBotResponse(userMessage.text);
//       const botMessage: Message = {
//         id: crypto.randomUUID(),
//         text: botMessageText,
//         sender: 'bot',
//         timestamp: new Date(),
//       };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//       setIsBotTyping(false);
//     }, 1000 + Math.random() * 1000); // Thời gian chờ ngẫu nhiên từ 1-2 giây
//   };

//   // Tự động cuộn xuống tin nhắn mới nhất
//   useEffect(() => {
//     if (scrollAreaViewportRef.current) {
//       scrollAreaViewportRef.current.scrollTo({
//         top: scrollAreaViewportRef.current.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }, [messages]);

//   return (
//     <>
//       {/* Nút để mở/đóng chatbox */}
//       <Button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg z-[100] flex items-center justify-center"
//         size="icon"
//         aria-label={isOpen ? "Đóng chat" : "Mở chat"}
//       >
//         {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
//       </Button>

//       {/* Dialog Chatbox */}
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent
//           className="fixed bottom-[calc(3.5rem+1.5rem+1rem)] right-6 sm:bottom-24 sm:right-6 m-0 p-0 flex flex-col h-[70vh] max-h-[550px] w-[calc(100vw-3rem)] sm:w-[380px] rounded-lg shadow-xl z-[99] border"
//           onInteractOutside={(e) => e.preventDefault()} // Ngăn đóng khi click bên ngoài dialog
//         >
//           <DialogHeader className="p-4 border-b flex flex-row items-center justify-between sticky top-0 bg-background z-10">
//             <div className="flex items-center space-x-3">
//               <Avatar className="w-10 h-10 border-2 border-primary">
//                 <AvatarFallback><Bot size={20} /></AvatarFallback>
//                 {/* <AvatarImage src="/path-to-bot-avatar.png" alt="Bot Avatar" /> */}
//               </Avatar>
//               <div>
//                 <DialogTitle className="text-base font-semibold">Chatbot Demo</DialogTitle>
//                 <p className="text-xs text-green-500">Đang hoạt động</p>
//               </div>
//             </div>
//             <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="sm:hidden"> {/* Nút đóng cho mobile */}
//               <X size={20} />
//             </Button>
//           </DialogHeader>

//           <ScrollArea className="flex-grow" viewportRef={scrollAreaViewportRef}>
//             <div className="p-4 space-y-4">
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex items-end space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto justify-end' : 'mr-auto justify-start'
//                     }`}
//                 >
//                   {msg.sender === 'bot' && (
//                     <Avatar className="w-7 h-7 self-start">
//                       <AvatarFallback><Bot size={16} /></AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`p-2.5 rounded-lg shadow-sm text-sm ${msg.sender === 'user'
//                         ? 'bg-primary text-primary-foreground rounded-br-none'
//                         : 'bg-muted text-foreground rounded-bl-none'
//                       }`}
//                   >
//                     <p className="whitespace-pre-wrap">{msg.text}</p>
//                     <p className={`text-xs mt-1.5 opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
//                       {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </p>
//                   </div>
//                   {msg.sender === 'user' && (
//                     <Avatar className="w-7 h-7 self-start">
//                       <AvatarFallback><User size={16} /></AvatarFallback>
//                     </Avatar>
//                   )}
//                 </div>
//               ))}
//               {isBotTyping && (
//                 <div className="flex items-end space-x-2 mr-auto justify-start max-w-[85%]">
//                   <Avatar className="w-7 h-7 self-start">
//                     <AvatarFallback><Bot size={16} /></AvatarFallback>
//                   </Avatar>
//                   <div className="p-2.5 rounded-lg shadow-sm bg-muted text-foreground rounded-bl-none">
//                     <div className="flex space-x-1 items-center">
//                       <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//                       <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//                       <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </ScrollArea>

//           <DialogFooter className="p-3 border-t sticky bottom-0 bg-background z-10">
//             <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
//               <Input
//                 type="text"
//                 placeholder="Nhập tin nhắn..."
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 className="flex-1 h-10"
//                 autoComplete="off"
//                 aria-label="Nhập tin nhắn"
//               />
//               <Button type="submit" size="icon" className="h-10 w-10" aria-label="Gửi tin nhắn" disabled={inputValue.trim() === ''}>
//                 <Send size={20} />
//               </Button>
//             </form>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default FloatingChatbox;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, generateId } from '@/lib/utils';
import { Message } from '@/lib/client/types/types';
import { botResponses } from '@/lib/client/types/dataTypes';

export default function FloatingChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      content: "Xin chào! Tôi có thể giúp gì cho bạn?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus vào input khi mở chatbox
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Thêm tin nhắn của người dùng
    const userMessage: Message = {
      id: generateId(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Giả lập bot đang trả lời
    setTimeout(() => {
      // Chọn ngẫu nhiên một câu trả lời
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: generateId(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000); // Độ trễ giả lập 1 giây
  };

  // Xử lý sự kiện nhấn Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Nút hiện/ẩn chatbox */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-600 bg-blue-500 text-white"
        >
          <MessageSquare size={24} />
        </Button>
      )}

      {/* Chatbox chính */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 md:w-96 flex flex-col border border-gray-200">
          {/* Tiêu đề */}
          <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Hỗ trợ trực tuyến</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-blue-600 hover:text-white"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Khu vực chat */}
          <ScrollArea className="p-4 h-80 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "mb-4 max-w-[80%] flex",
                  message.sender === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
                )}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8 mr-2 bg-blue-100 flex items-center justify-center text-blue-500">
                    <span className="text-xs font-bold">Bot</span>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg p-3",
                    message.sender === 'user'
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center mb-4">
                <Avatar className="h-8 w-8 mr-2 bg-blue-100 flex items-center justify-center text-blue-500">
                  <span className="text-xs font-bold">Bot</span>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm">Đang trả lời...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Khu vực nhập tin nhắn */}
          <div className="p-3 border-t border-gray-200 flex">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn..."
              className="flex-1 mr-2"
            />
            <Button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === '' || isTyping}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

