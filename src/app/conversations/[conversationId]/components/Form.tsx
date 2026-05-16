"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Image as ImageIcon, SendHorizontal } from "lucide-react";
import useConversation from "@/hooks/useConversation";
import { useSocket } from "@/context/SocketContext";

import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();
  const { socket } = useSocket();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId
    }).then((res) => {
      if (socket) {
        socket.emit("send-message", res.data);
      }
    });
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId: conversationId
    }).then((res) => {
      if (socket) {
        socket.emit("send-message", res.data);
      }
    });
  };

  return ( 
    <div 
      className="
        p-4 
        bg-white 
        dark:bg-zinc-900 
        border-t 
        border-gray-200 
        dark:border-zinc-800
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
      <CldUploadButton 
        options={{ maxFiles: 1 }} 
        onSuccess={handleUpload} 
        uploadPreset="placeholder_preset"
      >
        <div className="text-blue-500 cursor-pointer hover:text-blue-600 transition">
          <ImageIcon size={30} />
        </div>
      </CldUploadButton>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <div className="relative w-full">
          <input
            id="message"
            autoComplete="message"
            {...register('message', { required: true })}
            placeholder="Write a message..."
            className="
              text-black
              dark:text-white
              font-light
              py-2
              px-4
              bg-neutral-100 
              dark:bg-zinc-800
              w-full 
              rounded-full
              focus:outline-none
            "
          />
        </div>
        <button 
          type="submit" 
          className="
            rounded-full 
            p-2 
            bg-blue-500 
            cursor-pointer 
            hover:bg-blue-600 
            transition
          "
        >
          <SendHorizontal size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}
 
export default Form;
