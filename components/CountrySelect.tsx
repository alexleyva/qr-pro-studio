
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COUNTRY_CODES, getFlagUrl } from '../constants';

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = COUNTRY_CODES.find((c) => c.code === value) || COUNTRY_CODES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative notranslate" translate="no">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-2 min-w-[150px] px-3 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
      >
        <span className="flex items-center gap-2">
          <img
            src={getFlagUrl(selected.code)}
            alt={selected.name}
            className="w-6 h-4 object-cover rounded-[2px] border border-gray-200"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="font-medium text-gray-800" translate="no">{selected.code}</span>
          <span className="text-gray-400 text-sm">({selected.dial})</span>
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
      </button>

      {open && (
        <ul className="absolute z-30 mt-1 left-0 min-w-[220px] max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg py-1">
          {COUNTRY_CODES.map((country) => (
            <li key={country.code}>
              <button
                type="button"
                onClick={() => {
                  onChange(country.code);
                  setOpen(false);
                }}
                className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                  country.code === value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <img
                  src={getFlagUrl(country.code)}
                  alt={country.name}
                  className="w-6 h-4 object-cover rounded-[2px] border border-gray-200"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="font-medium" translate="no">{country.code}</span>
                <span className="text-gray-400 text-sm ml-auto">({country.dial})</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
