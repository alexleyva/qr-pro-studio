
import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRConfig, QRType } from '../types';
import { COUNTRY_CODES } from '../constants';
import * as LucideIcons from 'lucide-react';

const { Download: DownloadIcon, Share2: Share2Icon, Copy: CopyIcon } = LucideIcons;

interface QRPreviewProps {
  config: QRConfig;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ config }) => {
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  const getQRContent = () => {
    const { type, content } = config;
    switch (type) {
      case QRType.URL: return content.url || 'https://qrprostudio.app';
      case QRType.TEXT: return content.text || 'Hola de QR Pro Studio';
      case QRType.EMAIL: return `mailto:${content.email || ''}?subject=${content.subject || ''}`;
      case QRType.WIFI: return `WIFI:S:${content.ssid || ''};T:${content.encryption || 'WPA'};P:${content.password || ''};;`;
      case QRType.PHONE: return `tel:${content.phone || ''}`;
      case QRType.WHATSAPP: {
        const dial = COUNTRY_CODES.find((c) => c.code === content.countryCode)?.dial || '';
        const phone = `${dial}${content.phone || ''}`.replace(/[^\d]/g, '');
        const message = content.message ? `?text=${encodeURIComponent(content.message)}` : '';
        return `https://wa.me/${phone}${message}`;
      }
      default: return 'https://qrprostudio.app';
    }
  };

  useEffect(() => {
    // Reducimos el tamaño del QR interno a 180px para dar mucho más aire al marco
    const qrSize = config.styling.frame?.type !== 'none' ? 180 : 260;

    const qrCode = new QRCodeStyling({
      width: qrSize,
      height: qrSize,
      type: 'svg',
      data: getQRContent(),
      dotsOptions: {
        color: config.styling.dots.color,
        type: config.styling.dots.type,
        gradient: config.styling.dots.gradient ? {
          type: config.styling.dots.gradient.type,
          rotation: (config.styling.dots.gradient.rotation || 0) * (Math.PI / 180),
          colorStops: [
            { offset: 0, color: config.styling.dots.gradient.color1 },
            { offset: 1, color: config.styling.dots.gradient.color2 }
          ]
        } : undefined
      },
      backgroundOptions: {
        color: config.styling.background.transparent ? 'transparent' : config.styling.background.color,
      },
      cornersSquareOptions: {
        color: config.styling.corners.color,
        type: config.styling.corners.type,
      },
      cornersDotOptions: {
        color: config.styling.cornersDot.color,
        type: config.styling.cornersDot.type,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: config.styling.logo?.margin || 5,
        imageSize: config.styling.logo?.size ? config.styling.logo.size / 100 : 0.4
      },
      image: config.styling.logo?.src || undefined
    });

    if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = '';
      qrCode.append(qrContainerRef.current);
    }
    qrCodeRef.current = qrCode;
  }, [config]);

  const handleDownload = async (format: 'png' | 'svg' | 'pdf') => {
    if (!qrCodeRef.current) return;

    if (!config.styling.frame || config.styling.frame.type === 'none') {
      const ext = format === 'pdf' ? 'png' : format;
      qrCodeRef.current.download({ name: 'qr-pro-studio', extension: ext });
      return;
    }

    const exportSize = 1024; 
    const canvas = document.createElement('canvas');
    canvas.width = exportSize;
    canvas.height = exportSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Fondo
    if (!config.styling.background.transparent) {
      ctx.fillStyle = config.styling.background.color;
      ctx.fillRect(0, 0, exportSize, exportSize);
    }

    const frame = config.styling.frame;

    // 2. Dibujar Marco Personalizado (si está atrás)
    if (frame.type === 'custom' && frame.customSrc && frame.layer === 'back') {
      await drawCustomFrame(ctx, frame, exportSize);
    }

    // 3. Dibujar Estilos de Marcos Predeterminados
    if (frame.type === 'full-border') {
      ctx.fillStyle = frame.color;
      ctx.fillRect(0, 0, exportSize, exportSize);
    } else if (frame.type === 'bracket') {
      ctx.fillStyle = frame.color;
      const bracketWidth = exportSize * 0.04;
      ctx.fillRect(0, 0, bracketWidth, exportSize);
      ctx.fillRect(exportSize - bracketWidth, 0, bracketWidth, exportSize);
    }

    // 4. Dibujar el Código QR (Reducido al 55% para seguridad)
    const qrBlob = await qrCodeRef.current.getRawData('png');
    if (qrBlob) {
      const qrImg = await blobToImage(qrBlob as Blob);
      const qrDrawSize = exportSize * 0.55; // Mucho más pequeño para no solapar marcos rotados
      const qrPos = (exportSize - qrDrawSize) / 2;
      ctx.drawImage(qrImg, qrPos, qrPos, qrDrawSize, qrDrawSize);
    }

    // 5. Dibujar Marco Personalizado (si está al frente)
    if (frame.type === 'custom' && frame.customSrc && frame.layer === 'front') {
      await drawCustomFrame(ctx, frame, exportSize);
    }

    // 6. Dibujar Etiquetas de Texto
    if (frame.text && frame.type !== 'custom') {
      drawFrameText(ctx, frame, exportSize);
    }

    const link = document.createElement('a');
    link.download = `qr-pro-studio-design.${format === 'pdf' ? 'png' : format}`;
    link.href = canvas.toDataURL(`image/${format === 'svg' ? 'png' : format}`);
    link.click();
  };

  const drawCustomFrame = (ctx: CanvasRenderingContext2D, frame: any, size: number) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = frame.customSrc;
      img.onload = () => {
        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.rotate((frame.rotation || 0) * Math.PI / 180);
        const scale = frame.scale || 1;
        // Dibujamos la imagen centrada
        ctx.drawImage(img, (-size / 2) * scale, (-size / 2) * scale, size * scale, size * scale);
        ctx.restore();
        resolve();
      };
      img.onerror = () => resolve();
    });
  };

  const drawFrameText = (ctx: CanvasRenderingContext2D, frame: any, size: number) => {
    ctx.save();
    const fontSize = Math.floor(size * 0.045);
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textWidth = ctx.measureText(frame.text).width + (size * 0.08);
    const rectHeight = size * 0.07;
    const rectWidth = Math.max(textWidth, size * 0.35);
    const x = size / 2;
    let y = 0;

    if (frame.type === 'label-bottom' || frame.type === 'bracket') {
      y = size * 0.88;
    } else if (frame.type === 'label-top') {
      y = size * 0.12;
    } else if (frame.type === 'full-border') {
      y = size * 0.93;
    }

    if (frame.type === 'label-bottom' || frame.type === 'label-top') {
      ctx.fillStyle = frame.color;
      roundRect(ctx, x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight, 15);
      ctx.fill();
    }

    ctx.fillStyle = frame.textColor;
    ctx.fillText(frame.text, x, y);
    ctx.restore();
  };

  const blobToImage = (blob: Blob): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.src = url;
    });
  };

  const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const getFrameStyles = (): React.CSSProperties => {
    const frame = config.styling.frame;
    const containerSize = '320px';

    if (!frame || frame.type === 'none') {
      return { 
        width: containerSize, 
        height: containerSize, 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      };
    }

    const base: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: frame.type === 'full-border' ? frame.color : 'transparent',
      borderRadius: '24px',
      position: 'relative',
      width: containerSize,
      height: containerSize
    };

    if (frame.type === 'bracket') {
      return {
        ...base,
        borderLeft: `12px solid ${frame.color}`,
        borderRight: `12px solid ${frame.color}`,
        borderRadius: '0px'
      };
    }

    return base;
  };

  const getCustomFrameImgStyles = (): React.CSSProperties => {
    const frame = config.styling.frame;
    if (!frame || frame.type !== 'custom') return {};
    
    return {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'contain', 
      pointerEvents: 'none',
      transform: `rotate(${frame.rotation || 0}deg) scale(${frame.scale || 1})`,
      zIndex: frame.layer === 'front' ? 20 : 0,
      transition: 'transform 0.3s ease-out'
    };
  };

  const renderFrameOverlay = () => {
    const frame = config.styling.frame;
    if (!frame || frame.type === 'none' || frame.type === 'custom') return null;

    const labelStyle: React.CSSProperties = {
      backgroundColor: frame.color,
      color: frame.textColor,
      padding: '6px 14px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '13px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
      zIndex: 10,
      textAlign: 'center'
    };

    if (frame.type === 'label-bottom') return <div style={labelStyle} className="mt-6">{frame.text}</div>;
    if (frame.type === 'label-top') return <div style={{ ...labelStyle, marginBottom: '24px' }}>{frame.text}</div>;
    if (frame.type === 'full-border') return <div className="mt-4 text-center font-bold text-xs" style={{ color: frame.textColor }}>{frame.text}</div>;
    if (frame.type === 'bracket') return <div className="mt-6 text-center font-bold text-xs px-4 py-1.5 rounded-lg" style={{ backgroundColor: frame.color, color: frame.textColor }}>{frame.text}</div>;
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Vista Previa</h3>
      
      <div className="w-full bg-gray-50 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 md:p-8 mb-6 shadow-inner min-h-[420px]">
        <div style={getFrameStyles()}>
          {config.styling.frame?.type === 'custom' && config.styling.frame.customSrc && (
            <img 
              src={config.styling.frame.customSrc} 
              alt="Custom Frame" 
              style={getCustomFrameImgStyles()}
            />
          )}
          {config.styling.frame?.type === 'label-top' && renderFrameOverlay()}
          <div ref={qrContainerRef} className="qr-container flex justify-center items-center relative z-10" />
          {config.styling.frame?.type !== 'label-top' && renderFrameOverlay()}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => handleDownload('png')}
            className="flex flex-col items-center justify-center py-3 px-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span className="font-bold text-lg leading-none mb-1">PNG</span>
            <span className="text-[10px] uppercase font-bold opacity-70">HD</span>
          </button>
          <button 
            onClick={() => handleDownload('png')}
            className="flex flex-col items-center justify-center py-3 px-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <span className="font-bold text-lg leading-none mb-1">SVG</span>
            <span className="text-[10px] uppercase font-bold opacity-70">Vector</span>
          </button>
          <button 
            onClick={() => handleDownload('png')}
            className="flex flex-col items-center justify-center py-3 px-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            <span className="font-bold text-lg leading-none mb-1">PDF</span>
            <span className="text-[10px] uppercase font-bold opacity-70">Imprimir</span>
          </button>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => handleDownload('png')}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors shadow-lg font-bold"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Descargar Diseño Completo</span>
          </button>
          <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
            <Share2Icon className="w-5 h-5" />
          </button>
        </div>

        <button 
          onClick={() => {
            const content = getQRContent();
            navigator.clipboard.writeText(content);
            alert('Contenido copiado al portapapeles');
          }}
          className="w-full flex items-center justify-center gap-2 py-2 text-gray-400 hover:text-gray-600 transition-colors text-xs font-medium"
        >
          <CopyIcon className="w-3 h-3" />
          <span>Copiar contenido del QR</span>
        </button>
      </div>
    </div>
  );
};
