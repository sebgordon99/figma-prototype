import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Star, Clock } from 'lucide-react';

export function TutorCard({ tutor, onContact }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={tutor.image}
          alt={tutor.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3>{tutor.name}</h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-yellow-700">{tutor.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{tutor.suburb}</span>
        </div>

        <div className="mb-3">
          <div className="flex flex-wrap gap-1.5">
            {tutor.instruments.map(instrument => (
              <span
                key={instrument}
                className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
              >
                {instrument}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{tutor.bio}</p>

        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <Clock className="w-4 h-4" />
          <span>{tutor.experience} years experience</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-gray-600">From</span>
            <div>
              <span className="text-blue-600 mr-1">${tutor.hourlyRate}</span>
              <span className="text-gray-500">/ hour</span>
            </div>
          </div>
          <button 
            onClick={() => onContact(tutor)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}