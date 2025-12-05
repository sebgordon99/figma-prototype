import { useState } from 'react';
import { Music, LogOut, Plus } from 'lucide-react';
import { Tutor } from '../types/tutor';
import { CreateAdvertisement } from './CreateAdvertisement';

interface TutorDashboardProps {
  onLogout: () => void;
  onCreateAdvertisement: (tutor: Omit<Tutor, 'id'>) => void;
}

export function TutorDashboard({ onLogout, onCreateAdvertisement }: TutorDashboardProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreate = (tutor: Omit<Tutor, 'id'>) => {
    onCreateAdvertisement(tutor);
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Music className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-blue-600">Tutor Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your tutor profile</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showCreateForm ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-gray-900 mb-2">Create Your Advertisement</h2>
            <p className="text-gray-600 mb-6">
              Get started by creating your tutor profile to attract students
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Advertisement
            </button>
          </div>
        ) : (
          <CreateAdvertisement
            onCreate={handleCreate}
            onCancel={() => setShowCreateForm(false)}
          />
        )}
      </main>
    </div>
  );
}
