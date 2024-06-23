import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Expand, Loader2 } from 'lucide-react';
import SimpleBar from 'simplebar-react';
import { Document, Page } from 'react-pdf';
import { useToast } from './ui/use-toast';
import { useResizeDetector } from 'react-resize-detector';

const PdfFullscreen = ({ fileUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState(null); // State to hold number of pages

  const { toast } = useToast();
  const { width, ref } = useResizeDetector(); // Hook to detect width changes

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button variant='ghost' className='gap-1.5' aria-label='fullscreen'>
          <Expand className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-7xl w-full'>
        <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)] mt-6'>
          <div ref={ref}>
            <Document
              loading={
                <div className='flex justify-center'>
                  <Loader2 className='my-24 h-6 w-6 animate-spin' />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: 'Error loading PDF',
                  description: 'Please try again later',
                  variant: 'destructive',
                });
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={fileUrl}
              className='max-h-full'
            >
              {/* Render pages dynamically */}
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={index + 1}
                  width={width ? width : 1}
                  pageNumber={index + 1}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullscreen;
