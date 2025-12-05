import { useState } from 'react';
import { Tutor, DayOfWeek } from '../types/tutor';
import { Plus, X } from 'lucide-react';

interface CreateAdvertisementProps {
  onCreate: (tutor: Omit<Tutor, 'id'>) => void;
  onCancel: () => void;
}

const DAYS_OF_WEEK: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const COMMON_INSTRUMENTS = [
  'Piano', 'Guitar', 'Voice', 'Violin', 'Drums', 'Bass Guitar',
  'Saxophone', 'Clarinet', 'Flute', 'Cello', 'Trumpet', 'Viola',
  'Keyboard', 'Ukulele', 'Percussion', 'Trombone', 'Music Theory'
];

export function CreateAdvertisement({ onCreate, onCancel }: CreateAdvertisementProps) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    instruments: [] as string[],
    suburb: '',
    availability: [] as string[],
    hourlyRate: '',
    experience: '',
    bio: '',
    rating: 5.0,
  });

  const [customInstrument, setCustomInstrument] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tutorData: Omit<Tutor, 'id'> = {
      name: formData.name,
      image: formData.image || 'https://images.unsplash.com/photo-1636581563713-5ead3fb53a80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      instruments: formData.instruments,
      suburb: formData.suburb,
      availability: formData.availability as DayOfWeek[],
      hourlyRate: parseFloat(formData.hourlyRate),
      experience: parseInt(formData.experience),
      bio: formData.bio,
      rating: formData.rating,
    };

    onCreate(tutorData);
  };

  const toggleInstrument = (instrument: string) => {
    if (formData.instruments.includes(instrument)) {
      setFormData({
        ...formData,
        instruments: formData.instruments.filter(i => i !== instrument)
      });
    } else {
      setFormData({
        ...formData,
        instruments: [...formData.instruments, instrument]
      });
    }
  };

  const addCustomInstrument = () => {
    if (customInstrument.trim() && !formData.instruments.includes(customInstrument.trim())) {
      setFormData({
        ...formData,
        instruments: [...formData.instruments, customInstrument.trim()]
      });
      setCustomInstrument('');
    }
  };

  const removeInstrument = (instrument: string) => {
    setFormData({
      ...formData,
      instruments: formData.instruments.filter(i => i !== instrument)
    });
  };

  const toggleDay = (day: string) => {
    if (formData.availability.includes(day)) {
      setFormData({
        ...formData,
        availability: formData.availability.filter(d => d !== day)
      });
    } else {
      setFormData({
        ...formData,
        availability: [...formData.availability, day]
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="mb-6">Create Your Advertisement</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your full name"
          />
        </div>

        {/* Profile Image URL */}
        <div>
          <label htmlFor="image" className="block text-gray-700 mb-2">
            Profile Image URL
          </label>
          <input
            type="url"
            id="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/your-photo.jpg"
          />
          <p className="text-gray-500 mt-1">Optional - leave blank for default image</p>
        </div>

        {/* Instruments */}
        <div>
          <label className="block text-gray-700 mb-2">
            Instruments Taught *
          </label>
          <div className="mb-3 flex flex-wrap gap-2">
            {formData.instruments.map(instrument => (
              <span
                key={instrument}
                className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >
                {instrument}
                <button
                  type="button"
                  onClick={() => removeInstrument(instrument)}
                  className="hover:text-blue-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-3">
            {COMMON_INSTRUMENTS.map(instrument => (
              <label key={instrument} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.instruments.includes(instrument)}
                  onChange={() => toggleInstrument(instrument)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                />
                <span className="text-gray-700">{instrument}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInstrument}
              onChange={(e) => setCustomInstrument(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomInstrument())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add other instrument"
            />
            <button
              type="button"
              onClick={addCustomInstrument}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suburb */}
        <div>
          <label htmlFor="suburb" className="block text-gray-700 mb-2">
            Suburb *
          </label>
          <input
            type="text"
            id="suburb"
            required
            value={formData.suburb}
            onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Richmond, Brunswick, Carlton"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-gray-700 mb-2">
            Availability *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DAYS_OF_WEEK.map(day => (
              <label key={day} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.availability.includes(day)}
                  onChange={() => toggleDay(day)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                />
                <span className="text-gray-700">{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hourly Rate */}
        <div>
          <label htmlFor="hourlyRate" className="block text-gray-700 mb-2">
            Hourly Rate ($) *
          </label>
          <input
            type="number"
            id="hourlyRate"
            required
            min="0"
            step="0.01"
            value={formData.hourlyRate}
            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="65"
          />
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="block text-gray-700 mb-2">
            Years of Experience *
          </label>
          <input
            type="number"
            id="experience"
            required
            min="0"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="5"
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-gray-700 mb-2">
            Bio *
          </label>
          <textarea
            id="bio"
            required
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Tell students about your teaching style, experience, and what makes you unique..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Create Advertisement
          </button>
        </div>
      </form>
    </div>
  );
}
