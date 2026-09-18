
import React from 'react';
import { 
  Link, TextQuote, Mail, Phone, MessageSquare, 
  Contact, MessageCircle, Wifi, FileText, 
  Download, Image as ImageIcon, Video, Share2, Calendar,
  Smartphone, CreditCard, ShoppingCart, Info, CheckCircle2,
  Instagram, Twitter, Facebook, Youtube, Github
} from 'lucide-react';
import { QRType } from './types';

export const QR_TYPES = [
  { id: QRType.URL, label: 'Enlace (URL)', icon: <Link className="w-6 h-6" /> },
  { id: QRType.TEXT, label: 'Texto', icon: <TextQuote className="w-6 h-6" /> },
  { id: QRType.EMAIL, label: 'E-mail', icon: <Mail className="w-6 h-6" /> },
  { id: QRType.PHONE, label: 'Llamada', icon: <Phone className="w-6 h-6" /> },
  { id: QRType.SMS, label: 'SMS', icon: <MessageSquare className="w-6 h-6" /> },
  { id: QRType.VCARD, label: 'V-Card', icon: <Contact className="w-6 h-6" /> },
  { id: QRType.WHATSAPP, label: 'WhatsApp', icon: <MessageCircle className="w-6 h-6" /> },
  { id: QRType.WIFI, label: 'Wi-Fi', icon: <Wifi className="w-6 h-6" /> },
  { id: QRType.PDF, label: 'PDF', icon: <FileText className="w-6 h-6" /> },
  { id: QRType.APP, label: 'Aplicación', icon: <Download className="w-6 h-6" /> },
  { id: QRType.IMAGE, label: 'Imágenes', icon: <ImageIcon className="w-6 h-6" /> },
  { id: QRType.VIDEO, label: 'Vídeo', icon: <Video className="w-6 h-6" /> },
  { id: QRType.SOCIAL, label: 'Redes Sociales', icon: <Share2 className="w-6 h-6" /> },
  { id: QRType.EVENT, label: 'Evento', icon: <Calendar className="w-6 h-6" /> },
];

export const DOT_STYLES = [
  { id: 'square', label: 'Cuadrado' },
  { id: 'dots', label: 'Puntos' },
  { id: 'rounded', label: 'Redondeado' },
  { id: 'extra-rounded', label: 'Súper Redondeado' },
  { id: 'classy', label: 'Elegante' },
  { id: 'classy-rounded', label: 'Elegante Redondeado' },
];

export const CORNER_STYLES = [
  { id: 'square', label: 'Cuadrado' },
  { id: 'dot', label: 'Circular' },
  { id: 'extra-rounded', label: 'Redondeado' },
];

export const FRAME_STYLES = [
  { id: 'none', label: 'Sin Marco' },
  { id: 'label-bottom', label: 'Etiqueta Inferior' },
  { id: 'label-top', label: 'Etiqueta Superior' },
  { id: 'full-border', label: 'Borde Completo' },
  { id: 'bracket', label: 'Paréntesis' },
  { id: 'custom', label: 'Personalizado' },
];

export const PRESET_LOGOS = [
  { id: 'whatsapp', label: 'WhatsApp', src: 'https://cdn-icons-png.flaticon.com/512/733/733585.png' },
  { id: 'instagram', label: 'Instagram', src: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png' },
  { id: 'twitter', label: 'X (Twitter)', src: 'https://cdn-icons-png.flaticon.com/512/5968/5968958.png' },
  { id: 'facebook', label: 'Facebook', src: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png' },
  { id: 'youtube', label: 'YouTube', src: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png' },
  { id: 'linkedin', label: 'LinkedIn', src: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
  { id: 'paypal', label: 'PayPal', src: 'https://cdn-icons-png.flaticon.com/512/174/174861.png' },
  { id: 'bitcoin', label: 'Bitcoin', src: 'https://cdn-icons-png.flaticon.com/512/5968/5968260.png' },
];

export const PRESET_FRAMES = [
  {
    id: 'modern-gradient',
    label: 'Gradiente Moderno',
    src: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame1.svg',
    thumbnail: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame1.svg'
  },
  {
    id: 'elegant-border',
    label: 'Borde Elegante',
    src: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame2.svg',
    thumbnail: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame2.svg'
  },
  {
    id: 'minimal-circle',
    label: 'Círculo Minimalista',
    src: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame3.svg',
    thumbnail: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame3.svg'
  },
  {
    id: 'tech-frame',
    label: 'Marco Tecnológico',
    src: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame4.svg',
    thumbnail: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame4.svg'
  },
  {
    id: 'vintage-ornate',
    label: 'Vintage Ornamentado',
    src: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame5.svg',
    thumbnail: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame5.svg'
  },
  {
    id: 'neon-glow',
    label: 'Neón Brillante',
    src: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame6.svg',
    thumbnail: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame6.svg'
  },
  {
    id: 'nature-leaf',
    label: 'Hojas Naturales',
    src: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame7.svg',
    thumbnail: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame7.svg'
  },
  {
    id: 'geometric-pattern',
    label: 'Patrón Geométrico',
    src: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame8.svg',
    thumbnail: 'https://raw.githubusercontent.com/qr-code-styling/qr-code-styling/master/src/assets/frames/frame8.svg'
  },
];
