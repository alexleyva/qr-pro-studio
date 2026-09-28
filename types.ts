
export enum QRType {
  URL = 'url',
  TEXT = 'text',
  EMAIL = 'email',
  PHONE = 'phone',
  SMS = 'sms',
  VCARD = 'vcard',
  WHATSAPP = 'whatsapp',
  WIFI = 'wifi',
  PDF = 'pdf',
  APP = 'app',
  IMAGE = 'image',
  VIDEO = 'video',
  SOCIAL = 'social',
  EVENT = 'event'
}

export type DotType = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type CornerType = 'square' | 'dot' | 'extra-rounded';

export interface QRConfig {
  type: QRType;
  content: any;
  styling: {
    dots: {
      color: string;
      type: DotType;
      gradient?: {
        type: 'linear' | 'radial';
        color1: string;
        color2: string;
        rotation?: number;
      };
    };
    background: {
      color: string;
      transparent: boolean;
    };
    corners: {
      color: string;
      type: CornerType;
    };
    cornersDot: {
      color: string;
      type: CornerType;
    };
    logo?: {
      src: string;
      size: number;
      margin: number;
    };
    frame?: {
      type: 'none' | 'label-bottom' | 'label-top' | 'full-border' | 'bracket' | 'custom';
      text: string;
      color: string;
      textColor: string;
      customSrc?: string;
      rotation?: number;
      scale?: number;
      layer?: 'front' | 'back';
    };
  };
}
