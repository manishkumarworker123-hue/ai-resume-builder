import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Palette, Type, Sliders, Layout } from 'lucide-react';
import type { ThemeConfig } from '../../types/resume';

const PRESET_COLORS = [
  { name: 'Electric Blue', primary: '#0c70f2', accent: '#3691fc' },
  { name: 'Emerald', primary: '#059669', accent: '#34d399' },
  { name: 'Violet', primary: '#7c3aed', accent: '#a78bfa' },
  { name: 'Crimson', primary: '#dc2626', accent: '#f87171' },
  { name: 'Slate Dark', primary: '#1e293b', accent: '#64748b' },
  { name: 'Teal', primary: '#0d9488', accent: '#2dd4bf' },
  { name: 'Amber', primary: '#d97706', accent: '#fbbf24' },
];

export const ThemeCustomizerBar: React.FC = () => {
  const { themeConfig, updateThemeConfig } = useResumeStore();

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5 text-xs">
      
      {/* 1. Color Palette */}
      <div>
        <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2.5">
          <Palette className="w-4 h-4 text-brand-500" />
          Accent Color Theme
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => updateThemeConfig({ primaryColor: c.primary, accentColor: c.accent })}
              className={`w-7 h-7 rounded-full transition-all border-2 flex items-center justify-center ${
                themeConfig.primaryColor === c.primary ? 'ring-2 ring-brand-500 scale-110 border-white' : 'border-transparent'
              }`}
              style={{ backgroundColor: c.primary }}
              title={c.name}
            />
          ))}

          {/* Custom Hex Picker */}
          <div className="flex items-center gap-1 ml-2">
            <input
              type="color"
              value={themeConfig.primaryColor}
              onChange={(e) => updateThemeConfig({ primaryColor: e.target.value })}
              className="w-7 h-7 rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer bg-transparent"
              title="Custom Hex Color"
            />
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">{themeConfig.primaryColor}</span>
          </div>
        </div>
      </div>

      {/* 2. Typography & Fonts */}
      <div>
        <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
          <Type className="w-4 h-4 text-brand-500" />
          Font Family
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {(['inter', 'jakarta', 'roboto', 'merriweather'] as ThemeConfig['fontFamily'][]).map((font) => (
            <button
              key={font}
              onClick={() => updateThemeConfig({ fontFamily: font })}
              className={`px-3 py-1.5 rounded-lg border font-medium capitalize transition-colors ${
                themeConfig.fontFamily === font
                  ? 'bg-brand-50 border-brand-500 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              {font}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Font Size & Spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
            <Sliders className="w-4 h-4 text-brand-500" />
            Font Size
          </label>
          <div className="flex gap-1">
            {(['sm', 'md', 'lg'] as ThemeConfig['fontSize'][]).map((size) => (
              <button
                key={size}
                onClick={() => updateThemeConfig({ fontSize: size })}
                className={`flex-1 py-1 rounded border font-semibold uppercase ${
                  themeConfig.fontSize === size
                    ? 'bg-brand-500 text-white border-brand-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
            <Layout className="w-4 h-4 text-brand-500" />
            Line Spacing
          </label>
          <div className="flex gap-1">
            {(['tight', 'normal', 'relaxed'] as ThemeConfig['lineSpacing'][]).map((spacing) => (
              <button
                key={spacing}
                onClick={() => updateThemeConfig({ lineSpacing: spacing })}
                className={`flex-1 py-1 rounded border font-semibold capitalize ${
                  themeConfig.lineSpacing === spacing
                    ? 'bg-brand-500 text-white border-brand-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {spacing}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
