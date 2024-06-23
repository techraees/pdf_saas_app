import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(function Textarea(
  { className, ...props },
  ref
) {
  return (
    <TextareaAutosize
      className={cn(
        'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

// Dummy data
const dummyTextareaData = {
  placeholder: 'Enter text here',
  rows: 4,
  value: 'Dummy text content',
  onChange: () => {}, // Dummy onChange function
  disabled: false,
};

export { Textarea, dummyTextareaData };
