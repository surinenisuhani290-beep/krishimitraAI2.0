import React from 'react';

export default function Loading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div role="status" className="p-4 text-center text-gray-600">
      <div className="animate-pulse">{message}</div>
    </div>
  );
}
