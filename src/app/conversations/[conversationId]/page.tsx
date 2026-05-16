import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  // Fix Next 15 Dynamic Route Params Warning: params should be awaited. Wait, Next.js 15 does not strictly require `await params` in server components if used as plain object? Actually, in Next.js 15, `params` is a Promise and needs to be awaited.
  const resolvedParams = await Promise.resolve(params);
  
  const conversation = await getConversationById(resolvedParams.conversationId);
  const messages = await getMessages(resolvedParams.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return ( 
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
}

export default ChatId;
