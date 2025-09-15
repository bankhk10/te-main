'use client';
import { useState, type ReactNode } from 'react';
import { Button } from './button';

export function Dialog({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={() => setOpen(false)}>
          <div className="bg-white p-4" onClick={(e) => e.stopPropagation()}>
            {children}
            <div className="mt-4 text-right">
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
