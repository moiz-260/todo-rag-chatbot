import React, { useState } from 'react';
import { Eye, EyeOff, Calendar } from 'lucide-react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FormInputProps {
    label: string;
    type: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
    value?: string | Date;
    placeholder?: string;
    autoComplete?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    type,
    registration,
    error,
    value,
    placeholder = " ",
    autoComplete,
    onFocus,
    onBlur,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        value ? new Date(value) : null
    );

    const isPasswordType = type === 'password';
    const isDateType = type === 'date';
    const inputType = isPasswordType && showPassword ? 'text' : type;

    const handleFocus = (e?: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.();
    };

    const handleBlur = (e?: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (e) {
            registration.onBlur(e);
        }
        onBlur?.();
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            const formattedDate = date.toISOString().split('T')[0];
            const event = {
                target: {
                    name: registration.name,
                    value: formattedDate,
                },
            } as any;
            registration.onChange(event);
        }
    };

    const isLabelFloating = value || isFocused || selectedDate;

    const formatDateDisplay = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (isDateType) {
        return (
            <div className="w-full [&_.react-datepicker-wrapper]:w-full">
                <div className="relative">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        onFocus={handleFocus as any}
                        onBlur={handleBlur as any}
                        dateFormat="MMM dd, yyyy"
                        placeholderText=" "
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        maxDate={new Date()}
                        className={`w-full h-14 px-6 pt-6 pb-2 pr-12 rounded-2xl bg-white/60 border-none text-black focus:ring-2 focus:ring-black outline-none transition-all ${error ? 'ring-2 ring-red-500' : ''
                            }`}
                        calendarClassName="!bg-white/95 !backdrop-blur-xl !border !border-black/10 !rounded-2xl !shadow-2xl !p-4 !font-sans
                            [&_.react-datepicker__header]:!bg-transparent [&_.react-datepicker__header]:!border-none [&_.react-datepicker__header]:!p-0 [&_.react-datepicker__header]:!mb-3
                            [&_.react-datepicker__current-month]:!font-bold [&_.react-datepicker__current-month]:!text-base [&_.react-datepicker__current-month]:!text-gray-900 [&_.react-datepicker__current-month]:!mb-3
                            [&_.react-datepicker__day-names]:!flex [&_.react-datepicker__day-names]:!justify-between [&_.react-datepicker__day-names]:!mb-2
                            [&_.react-datepicker__day-name]:!text-gray-500 [&_.react-datepicker__day-name]:!text-xs [&_.react-datepicker__day-name]:!font-bold [&_.react-datepicker__day-name]:!w-9 [&_.react-datepicker__day-name]:!leading-9 [&_.react-datepicker__day-name]:!m-0
                            [&_.react-datepicker__month]:!m-0
                            [&_.react-datepicker__week]:!flex [&_.react-datepicker__week]:!justify-between [&_.react-datepicker__week]:!mb-1
                            [&_.react-datepicker__day]:!w-9 [&_.react-datepicker__day]:!h-9 [&_.react-datepicker__day]:!leading-9 [&_.react-datepicker__day]:!m-0 [&_.react-datepicker__day]:!rounded-lg [&_.react-datepicker__day]:!text-gray-900 [&_.react-datepicker__day]:!text-sm [&_.react-datepicker__day]:!transition-all hover:[&_.react-datepicker__day]:!bg-gray-100
                            [&_.react-datepicker__day--selected]:!bg-black [&_.react-datepicker__day--selected]:!text-white hover:[&_.react-datepicker__day--selected]:!bg-gray-800 [&_.react-datepicker__day--selected]:!font-bold
                            [&_.react-datepicker__day--today]:!font-bold [&_.react-datepicker__day--today]:!text-black
                            [&_.react-datepicker__day--outside-month]:!text-gray-300
                            [&_.react-datepicker__day--disabled]:!text-gray-300 [&_.react-datepicker__day--disabled]:!cursor-not-allowed
                            [&_.react-datepicker__navigation]:!top-4 [&_.react-datepicker__navigation]:!w-8 [&_.react-datepicker__navigation]:!h-8 [&_.react-datepicker__navigation]:!rounded-lg [&_.react-datepicker__navigation]:!transition-all hover:[&_.react-datepicker__navigation]:!bg-gray-100
                            [&_.react-datepicker__navigation-icon::before]:!border-black [&_.react-datepicker__navigation-icon::before]:!border-t-2 [&_.react-datepicker__navigation-icon::before]:!border-r-2
                            [&_.react-datepicker__year-dropdown]:!bg-white/95 [&_.react-datepicker__year-dropdown]:!backdrop-blur-lg [&_.react-datepicker__year-dropdown]:!border [&_.react-datepicker__year-dropdown]:!border-black/10 [&_.react-datepicker__year-dropdown]:!rounded-xl [&_.react-datepicker__year-dropdown]:!p-2 [&_.react-datepicker__year-dropdown]:!shadow-xl
                            [&_.react-datepicker__year-option]:!p-2 [&_.react-datepicker__year-option]:!rounded-lg [&_.react-datepicker__year-option]:!transition-all hover:[&_.react-datepicker__year-option]:!bg-gray-100
                            [&_.react-datepicker__year-option--selected]:!bg-black [&_.react-datepicker__year-option--selected]:!text-white
                            [&_.react-datepicker__year-read-view]:!border [&_.react-datepicker__year-read-view]:!border-black/10 [&_.react-datepicker__year-read-view]:!rounded-lg [&_.react-datepicker__year-read-view]:!px-2 [&_.react-datepicker__year-read-view]:!py-1"
                        wrapperClassName="w-full"
                    />
                    <label
                        className={`absolute left-6 transition-all duration-200 pointer-events-none z-10 ${isLabelFloating
                            ? 'top-2 text-xs text-gray-600'
                            : 'top-1/2 -translate-y-1/2 text-gray-400'
                            }`}
                    >
                        {label}
                    </label>
                    <Calendar
                        size={20}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                </div>
                {error && (
                    <span className="block mt-1 ml-2 text-xs text-red-500">
                        {error.message}
                    </span>
                )}
            </div>
        );
    }

    const { onChange, ...restRegistration } = registration;

    const sanitizeTelValue = (value: string) => {
        let val = value.replace(/[^\d+]/g, '');
        if (val.includes('+', 1)) {
            val = val[0] + val.substring(1).replace(/\+/g, '');
        }
        if (val.startsWith('++')) {
            val = '+' + val.replace(/^\++/, '');
        }
        return val;
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (type === 'tel') {
            target.value = sanitizeTelValue(target.value);
        }
        onChange({
            target: {
                name: registration.name,
                value: target.value
            }
        } as any);
    };

    const handleTelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (type !== 'tel') return;

        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End', 'ArrowLeft', 'ArrowRight'];
        const isControlKey = allowedKeys.includes(e.key) ||
            ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()));

        const isPlusKey = e.key === '+' && !e.currentTarget.value.includes('+');

        if (isControlKey || isPlusKey) return;

        if (e.shiftKey || e.key < '0' || e.key > '9') {
            e.preventDefault();
        }
    };

    return (
        <div className="w-full">
            <div className="relative">
                <input
                    {...restRegistration}
                    onInput={handleInput}
                    type={inputType}
                    inputMode={type === 'tel' ? 'tel' : undefined}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleTelKeyDown}
                    className={`w-full h-14 px-6 pt-6 pb-2 ${isPasswordType ? 'pr-12' : ''
                        } rounded-2xl bg-white/60 border-none text-black focus:ring-2 focus:ring-black outline-none transition-all peer ${error ? 'ring-2 ring-red-500' : ''
                        }`}
                />
                <label
                    className={`absolute left-6 transition-all duration-200 pointer-events-none ${isLabelFloating
                        ? 'top-2 text-xs text-gray-600'
                        : 'top-1/2 -translate-y-1/2 text-gray-400'
                        } peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-600`}
                >
                    {label}
                </label>

                {isPasswordType && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>

            {error && (
                <span className="block mt-1 ml-2 text-xs text-red-500">
                    {error.message}
                </span>
            )}
        </div>
    );
};

export default FormInput;
