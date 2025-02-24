
import { format, parse } from "date-fns";

interface MonthNavigatorProps {
  currentMonth: string;
  availableMonths: string[];
  onNavigate: (direction: 'prev' | 'next') => void;
}

const MonthNavigator = ({ currentMonth, availableMonths, onNavigate }: MonthNavigatorProps) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onNavigate('prev')}
        disabled={currentMonth === availableMonths[0]}
        className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous Month
      </button>
      <span className="text-xl font-medium min-w-[200px] text-center">
        {format(parse(currentMonth, 'yyyy-MM', new Date()), 'MMMM yyyy')}
      </span>
      <button
        onClick={() => onNavigate('next')}
        disabled={currentMonth === availableMonths[availableMonths.length - 1]}
        className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next Month
      </button>
    </div>
  );
};

export default MonthNavigator;
