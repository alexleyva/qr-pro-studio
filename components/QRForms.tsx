
import React, { useState } from 'react';
import { QRType, TextFormatting } from '../types';
import { Upload, FileText, X, CheckCircle, Type, Bold, Italic, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface QRFormProps {
  type: QRType;
  data: any;
  onChange: (data: any) => void;
}

export const QRForms: React.FC<QRFormProps> = ({ type, data, onChange }) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadStatus('uploading');
      const reader = new FileReader();
      reader.onload = () => {
        // Convertir el PDF a base64 para almacenarlo
        const base64Data = reader.result as string;
        onChange({
          ...data,
          fileName: file.name,
          fileData: base64Data,
          fileSize: (file.size / 1024).toFixed(2) + ' KB'
        });
        setUploadStatus('success');
      };
      reader.onerror = () => {
        setUploadStatus('error');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecciona un archivo PDF válido');
    }
  };

  const removePDF = () => {
    onChange({});
    setUploadStatus('idle');
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
      const formatting: TextFormatting = data.formatting || {
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#000000'
      };

      const updateFormatting = (field: keyof TextFormatting, value: any) => {
        onChange({
          ...data,
          formatting: { ...formatting, [field]: value }
        });
      };

      const textStyle = {
        fontFamily: formatting.fontFamily,
        fontSize: `${formatting.fontSize}px`,
        fontWeight: formatting.fontWeight,
        fontStyle: formatting.fontStyle,
        textAlign: formatting.textAlign,
        color: formatting.color
      };

      return (
        <div className="space-y-5">
          {/* Área de texto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tu Texto</label>
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 resize-none"
              value={data.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              style={textStyle}
            />

            {/* Vista previa del texto formateado */}
            {data.text && (
              <div className="mt-3 p-4 bg-white border-2 border-blue-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Vista Previa</span>
                </div>
                <div
                  className="p-3 bg-gray-50 rounded-lg min-h-[60px] break-words"
                  style={textStyle}
                >
                  {data.text}
                </div>
              </div>
            )}
          </div>

          {/* Opciones de formato */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Type className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold text-gray-900">Formato de Texto</h4>
            </div>

            {/* Selector de fuente */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Tipo de Fuente</label>
              <select
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                value={formatting.fontFamily}
                onChange={(e) => updateFormatting('fontFamily', e.target.value)}
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier New</option>
                <option value="Verdana">Verdana</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Impact">Impact</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Palatino">Palatino</option>
              </select>
            </div>

            {/* Tamaño de fuente */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Tamaño de Fuente</label>
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{formatting.fontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="48"
                step="1"
                value={formatting.fontSize}
                onChange={(e) => updateFormatting('fontSize', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>12px</span>
                <span>48px</span>
              </div>
            </div>

            {/* Estilo de texto (Negrita, Cursiva) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Estilo</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateFormatting('fontWeight', formatting.fontWeight === 'bold' ? 'normal' : 'bold')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 transition-all font-bold ${
                    formatting.fontWeight === 'bold'
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}
                >
                  <Bold className="w-4 h-4" />
                  <span className="text-sm">Negrita</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateFormatting('fontStyle', formatting.fontStyle === 'italic' ? 'normal' : 'italic')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 transition-all ${
                    formatting.fontStyle === 'italic'
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}
                >
                  <Italic className="w-4 h-4" />
                  <span className="text-sm italic">Cursiva</span>
                </button>
              </div>
            </div>

            {/* Alineación de texto */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Alineación</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateFormatting('textAlign', 'left')}
                  className={`flex-1 flex items-center justify-center py-2.5 px-3 rounded-lg border-2 transition-all ${
                    formatting.textAlign === 'left'
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => updateFormatting('textAlign', 'center')}
                  className={`flex-1 flex items-center justify-center py-2.5 px-3 rounded-lg border-2 transition-all ${
                    formatting.textAlign === 'center'
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => updateFormatting('textAlign', 'right')}
                  className={`flex-1 flex items-center justify-center py-2.5 px-3 rounded-lg border-2 transition-all ${
                    formatting.textAlign === 'right'
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}
                >
                  <AlignRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Color de texto */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Color de Texto</label>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                <input
                  type="color"
                  className="w-12 h-12 p-0 border-0 rounded-lg cursor-pointer overflow-hidden bg-transparent"
                  value={formatting.color}
                  onChange={(e) => updateFormatting('color', e.target.value)}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Color Seleccionado</span>
                  <span className="text-sm font-mono text-gray-600 uppercase">{formatting.color}</span>
                </div>
              </div>
            </div>
          </div>
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
    case QRType.PDF:
      return (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Subir Archivo PDF</label>

          {!data.fileName ? (
            <div className="relative">
              <input
                type="file"
                id="pdf-upload"
                className="hidden"
                accept="application/pdf"
                onChange={handlePDFUpload}
              />
              <label
                htmlFor="pdf-upload"
                className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <Upload className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mb-3 transition-colors" />
                <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-600 mb-1">
                  Haz clic para subir tu PDF
                </span>
                <span className="text-xs text-gray-400">
                  El QR contendrá el enlace a tu archivo PDF
                </span>
              </label>
            </div>
          ) : (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-green-900">Archivo cargado</span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium break-all">{data.fileName}</p>
                    <p className="text-xs text-gray-500 mt-1">Tamaño: {data.fileSize}</p>
                  </div>
                </div>
                <button
                  onClick={removePDF}
                  className="ml-2 p-1.5 hover:bg-red-100 rounded-lg transition-colors group"
                  title="Eliminar archivo"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                </button>
              </div>
            </div>
          )}

          {uploadStatus === 'uploading' && (
            <div className="text-center py-2">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600 mt-2">Cargando archivo...</p>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              Error al cargar el archivo. Por favor, intenta nuevamente.
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-xs text-blue-800">
              <strong>Nota:</strong> El archivo PDF se convertirá en un código QR que contendrá los datos del archivo.
              Para compartir el PDF, considera subirlo a un servicio en la nube y usar el tipo "Enlace (URL)" con la URL del archivo.
            </p>
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
