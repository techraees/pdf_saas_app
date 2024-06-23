'use client'

import { useEffect, useRef, useState } from 'react';
import { Loader2, MessageSquare } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import Message from './Message';
import { useIntersection } from '@mantine/hooks';
import axios from 'axios';

const Messages = ({ fileId }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAiThinking, setIsAiThinking] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchMessages = async (page) => {
    try {
      const response = await axios.get(`/api/messages?fileId=${fileId}&page=${page}&limit=10`);
      const newMessages = response.data.messages;
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      setIsAiThinking(false);
      setIsLoading(false);
      setHasMore(response.data.hasMore);
    } catch (error) {
      setError('Error fetching messages.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(page);
  }, [fileId]);

  const lastMessageRef = useRef(null);

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && !isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [entry, isLoading, hasMore]);

  return (
    <div className='flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
      {messages.length > 0 ? (
        messages.map((message, index) => {
          const isNextMessageSamePerson =
            index > 0 && messages[index - 1]?.isUserMessage === message.isUserMessage;

          return (
            <Message
              ref={index === messages.length - 1 ? ref : null}
              message={message}
              isNextMessageSamePerson={isNextMessageSamePerson}
              key={message.id}
            />
          );
        })
      ) : isLoading ? (
        <div className='w-full flex flex-col gap-2'>
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
        </div>
      ) : error ? (
        <div className='flex-1 flex flex-col items-center justify-center gap-2'>
          <MessageSquare className='h-8 w-8 text-blue-500' />
          <h3 className='font-semibold text-xl'>{error}</h3>
        </div>
      ) : (
        <div className='flex-1 flex flex-col items-center justify-center gap-2'>
          <MessageSquare className='h-8 w-8 text-blue-500' />
          <h3 className='font-semibold text-xl'>No messages found</h3>
        </div>
      )}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-opacity-50 bg-zinc-50'>
          <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
        </div>
      )}
    </div>
  );
};

export default Messages;
