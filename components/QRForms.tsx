
import React from 'react';
import { QRType } from '../types';
import { CountrySelect } from './CountrySelect';

interface QRFormProps {
  type: QRType;
  data: any;
  onChange: (data: any) => void;
}

export const QRForms: React.FC<QRFormProps> = ({ type, data, onChange }) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  switch (type) {
    case QRType.URL:
      return (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Sitio Web (URL)</label>
          <input
            type="url"
            placeholder="https://tu-sitio.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            value={data.url || ''}
            onChange={(e) => handleChange('url', e.target.value)}
          />
        </div>
      );
    case QRType.TEXT:
      return (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Tu Texto</label>
          <textarea
            placeholder="Escribe tu mensaje aquí..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32"
            value={data.text || ''}
            onChange={(e) => handleChange('text', e.target.value)}
          />
        </div>
      );
    case QRType.EMAIL:
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Asunto</label>
            <input
              type="text"
              placeholder="Asunto del mensaje"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              value={data.subject || ''}
              onChange={(e) => handleChange('subject', e.target.value)}
            />
          </div>
        </div>
      );
    case QRType.WHATSAPP:
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de WhatsApp</label>
            <div className="flex gap-2 mt-1">
              <CountrySelect
                value={data.countryCode || 'ES'}
                onChange={(code) => handleChange('countryCode', code)}
              />
              <input
                type="tel"
                placeholder="600 123 456"
                className="flex-1 min-w-0 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={data.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Selecciona tu país e ingresa el número sin el prefijo.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mensaje predeterminado (opcional)</label>
            <textarea
              placeholder="Hola, me gustaría más información..."
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-24"
              value={data.message || ''}
              onChange={(e) => handleChange('message', e.target.value)}
            />
          </div>
        </div>
      );
    case QRType.WIFI:
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de Red (SSID)</label>
            <input
              type="text"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              value={data.ssid || ''}
              onChange={(e) => handleChange('ssid', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              value={data.password || ''}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Encriptación</label>
            <select
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              value={data.encryption || 'WPA'}
              onChange={(e) => handleChange('encryption', e.target.value)}
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Abierta</option>
            </select>
          </div>
        </div>
      );
    default:
      return (
        <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          Formulario para {type.toUpperCase()} próximamente disponible.
          <p className="mt-2 text-sm italic">Esta funcionalidad está siendo optimizada para ofrecerte la mejor experiencia.</p>
        </div>
      );
  }
};
