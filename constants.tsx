
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

export const COUNTRY_CODES = [
  { code: 'ES', name: 'España', dial: '+34', flag: '🇪🇸' },
  { code: 'MX', name: 'México', dial: '+52', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷' },
  { code: 'CO', name: 'Colombia', dial: '+57', flag: '🇨🇴' },
  { code: 'CL', name: 'Chile', dial: '+56', flag: '🇨🇱' },
  { code: 'PE', name: 'Perú', dial: '+51', flag: '🇵🇪' },
  { code: 'VE', name: 'Venezuela', dial: '+58', flag: '🇻🇪' },
  { code: 'EC', name: 'Ecuador', dial: '+593', flag: '🇪🇨' },
  { code: 'GT', name: 'Guatemala', dial: '+502', flag: '🇬🇹' },
  { code: 'CU', name: 'Cuba', dial: '+53', flag: '🇨🇺' },
  { code: 'BO', name: 'Bolivia', dial: '+591', flag: '🇧🇴' },
  { code: 'DO', name: 'República Dominicana', dial: '+1', flag: '🇩🇴' },
  { code: 'HN', name: 'Honduras', dial: '+504', flag: '🇭🇳' },
  { code: 'PY', name: 'Paraguay', dial: '+595', flag: '🇵🇾' },
  { code: 'SV', name: 'El Salvador', dial: '+503', flag: '🇸🇻' },
  { code: 'NI', name: 'Nicaragua', dial: '+505', flag: '🇳🇮' },
  { code: 'CR', name: 'Costa Rica', dial: '+506', flag: '🇨🇷' },
  { code: 'PA', name: 'Panamá', dial: '+507', flag: '🇵🇦' },
  { code: 'UY', name: 'Uruguay', dial: '+598', flag: '🇺🇾' },
  { code: 'PR', name: 'Puerto Rico', dial: '+1', flag: '🇵🇷' },
  { code: 'US', name: 'Estados Unidos', dial: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canadá', dial: '+1', flag: '🇨🇦' },
  { code: 'BR', name: 'Brasil', dial: '+55', flag: '🇧🇷' },
  { code: 'DE', name: 'Alemania', dial: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'Francia', dial: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italia', dial: '+39', flag: '🇮🇹' },
  { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
  { code: 'GB', name: 'Reino Unido', dial: '+44', flag: '🇬🇧' },
  { code: 'NL', name: 'Países Bajos', dial: '+31', flag: '🇳🇱' },
  { code: 'BE', name: 'Bélgica', dial: '+32', flag: '🇧🇪' },
  { code: 'CH', name: 'Suiza', dial: '+41', flag: '🇨🇭' },
  { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
  { code: 'JP', name: 'Japón', dial: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'Corea del Sur', dial: '+82', flag: '🇰🇷' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
];

export const getFlagUrl = (code: string) =>
  `/flags/${code.toLowerCase()}.png`;

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
