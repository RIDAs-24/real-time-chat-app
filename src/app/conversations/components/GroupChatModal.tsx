"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Select from "react-select"; // Will need to install react-select

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ 
  isOpen, 
  onClose, 
  users 
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  
    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error('Something went wrong'))
    .finally(() => setIsLoading(false));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a group chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium">Group Name</label>
              <Input
                disabled={isLoading}
                {...register('name', { required: true })} 
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium">Members</label>
              <Select
                isDisabled={isLoading}
                options={users.map((user) => ({ 
                  value: user.id, 
                  label: user.name 
                }))}
                onChange={(value) => setValue('members', value, { 
                  shouldValidate: true 
                })}
                value={members}
                isMulti
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 })
                }}
                menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
              />
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default GroupChatModal;
