import React from 'react';

export default function ErrorBox({ message }: { message: string }) {
  return (
    <div role="alert" className="border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-800">
      {message}
    </div>
  );
}
