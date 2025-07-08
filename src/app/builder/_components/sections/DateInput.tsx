"use client";

import DatePicker from 'react-datepicker';
import { CalendarIcon } from '@heroicons/react/24/outline';
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function DateInput({ 
  label, 
  value, 
  onChange, 
  placeholder = "Select month and year",
  disabled = false,
  required = false 
}: DateInputProps) {
  // Convert string to Date for DatePicker
  const selectedDate = value ? new Date(value + '-01') : null;
  
  const handleDateChange = (date: Date | null) => {
    if (date) {
      // Format as YYYY-MM for consistent storage
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      onChange(`${year}-${month}`);
    } else {
      onChange('');
    }
  };

  return (
    <div>
      <label className="block text-white/80 text-sm font-medium mb-2">
        {label} {required && '*'}
      </label>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          disabled={disabled}
          placeholderText={placeholder}
          className={`
            w-full px-4 py-3 pr-10 rounded-lg bg-white/10 border border-white/20 text-white 
            placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 
            focus:border-yellow-400/50 transition-all duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/15'}
            [color-scheme:dark]
          `}
          calendarClassName="dark-datepicker"
          popperClassName="z-50"
          wrapperClassName="w-full"
        />
        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 pointer-events-none" />
      </div>
      
      <style jsx global>{`
        .react-datepicker-wrapper {
          width: 100%;
        }
        
        .dark-datepicker {
          background-color: #1f2937 !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
          font-family: inherit !important;
        }
        
        .dark-datepicker .react-datepicker__header {
          background-color: #374151 !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px 12px 0 0 !important;
          padding: 16px !important;
        }
        
        .dark-datepicker .react-datepicker__current-month {
          color: #f9fafb !important;
          font-weight: 600 !important;
          font-size: 16px !important;
          margin-bottom: 8px !important;
        }
        
        .dark-datepicker .react-datepicker__navigation {
          top: 20px !important;
        }
        
        .dark-datepicker .react-datepicker__navigation-icon::before {
          border-color: #d1d5db !important;
        }
        
        .dark-datepicker .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
          border-color: #fbbf24 !important;
        }
        
        .dark-datepicker .react-datepicker__month-container {
          background-color: #1f2937 !important;
        }
        
        .dark-datepicker .react-datepicker__month {
          margin: 16px !important;
          color: #f9fafb !important;
        }
        
        .dark-datepicker .react-datepicker__month-text {
          display: inline-block !important;
          width: 4rem !important;
          margin: 4px !important;
          padding: 8px !important;
          color: #d1d5db !important;
          border-radius: 8px !important;
          transition: all 0.2s ease !important;
          font-weight: 500 !important;
        }
        
        .dark-datepicker .react-datepicker__month-text:hover {
          background-color: rgba(251, 191, 36, 0.1) !important;
          color: #fbbf24 !important;
        }
        
        .dark-datepicker .react-datepicker__month-text--selected {
          background-color: #fbbf24 !important;
          color: #1f2937 !important;
          font-weight: 600 !important;
        }
        
        .dark-datepicker .react-datepicker__month-text--keyboard-selected {
          background-color: rgba(251, 191, 36, 0.2) !important;
          color: #fbbf24 !important;
        }
        
        .dark-datepicker .react-datepicker__year-read-view--down-arrow,
        .dark-datepicker .react-datepicker__month-read-view--down-arrow {
          border-color: #d1d5db transparent transparent !important;
        }
        
        .dark-datepicker .react-datepicker__year-dropdown,
        .dark-datepicker .react-datepicker__month-dropdown {
          background-color: #374151 !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        }
        
        .dark-datepicker .react-datepicker__year-option,
        .dark-datepicker .react-datepicker__month-option {
          color: #d1d5db !important;
          padding: 8px 12px !important;
          border-radius: 4px !important;
          margin: 2px !important;
        }
        
        .dark-datepicker .react-datepicker__year-option:hover,
        .dark-datepicker .react-datepicker__month-option:hover {
          background-color: rgba(251, 191, 36, 0.1) !important;
          color: #fbbf24 !important;
        }
        
        .dark-datepicker .react-datepicker__year-option--selected_year,
        .dark-datepicker .react-datepicker__month-option--selected_month {
          background-color: #fbbf24 !important;
          color: #1f2937 !important;
        }
      `}</style>
    </div>
  );
}
