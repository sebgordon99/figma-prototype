import { DayOfWeek } from '../types/tutor';

interface FilterPanelProps {
  selectedInstruments: string[];
  selectedSuburbs: string[];
  selectedDays: string[];
  onInstrumentChange: (instruments: string[]) => void;
  onSuburbChange: (suburbs: string[]) => void;
  onDayChange: (days: string[]) => void;
  availableInstruments: string[];
  availableSuburbs: string[];
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function FilterPanel({
  selectedInstruments,
  selectedSuburbs,
  selectedDays,
  onInstrumentChange,
  onSuburbChange,
  onDayChange,
  availableInstruments,
  availableSuburbs,
}) {
  const toggleInstrument = (instrument) => {
    if (selectedInstruments.includes(instrument)) {
      onInstrumentChange(selectedInstruments.filter(i => i !== instrument));
    } else {
      onInstrumentChange([...selectedInstruments, instrument]);
    }
  };

  const toggleSuburb = (suburb) => {
    if (selectedSuburbs.includes(suburb)) {
      onSuburbChange(selectedSuburbs.filter(s => s !== suburb));
    } else {
      onSuburbChange([...selectedSuburbs, suburb]);
    }
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      onDayChange(selectedDays.filter(d => d !== day));
    } else {
      onDayChange([...selectedDays, day]);
    }
  };

  const clearAll = () => {
    onInstrumentChange([]);
    onSuburbChange([]);
    onDayChange([]);
  };

  const hasFilters = selectedInstruments.length > 0 || selectedSuburbs.length > 0 || selectedDays.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>Filters</h2>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Instruments */}
      <div className="mb-6">
        <h3 className="mb-3">Instrument</h3>
        <div className="space-y-2">
          {availableInstruments.map(instrument => (
            <label key={instrument} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedInstruments.includes(instrument)}
                onChange={() => toggleInstrument(instrument)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 group-hover:text-gray-900">{instrument}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Suburbs */}
      <div className="mb-6">
        <h3 className="mb-3">Location</h3>
        <div className="space-y-2">
          {availableSuburbs.map(suburb => (
            <label key={suburb} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedSuburbs.includes(suburb)}
                onChange={() => toggleSuburb(suburb)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 group-hover:text-gray-900">{suburb}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="mb-3">Availability</h3>
        <div className="space-y-2">
          {daysOfWeek.map(day => (
            <label key={day} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => toggleDay(day)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 group-hover:text-gray-900">{day}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}