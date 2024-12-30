import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRDisplayProps {
  value: string;
  size?: number;
  title?: string;
}

export default function QRDisplay({ value, size = 200, title }: QRDisplayProps) {
  return (
    <div className="text-center">
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      <div className="flex justify-center">
        <QRCodeSVG value={value} size={size} />
      </div>
    </div>
  );
}