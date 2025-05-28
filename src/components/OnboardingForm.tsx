import { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import { useToast } from './Toast';

interface OnboardingData {
  parentEmail: string;
  childName: string;
  childBirthDate: string;
  childGender: 'male' | 'female' | 'other';
  selectedTheme: string;
  mailingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

interface OnboardingFormProps {
  onComplete: (data: OnboardingData) => void;
}

const steps = [
  {
    id: 1,
    title: 'Deine Kontaktdaten',
    subtitle: 'Wie können wir dich erreichen?',
    icon: '✉️',
  },
  {
    id: 2,
    title: 'Über dein Kind',
    subtitle: 'Erzähl uns von deinem kleinen Schatz',
    icon: '👶',
  },
  {
    id: 3,
    title: 'Thema auswählen',
    subtitle: 'Was gefällt deinem Kind am besten?',
    icon: '🎨',
  },
  {
    id: 4,
    title: 'Lieferadresse',
    subtitle: 'Wohin sollen die Postkarten?',
    icon: '📮',
  },
];

export default function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    parentEmail: '',
    childName: '',
    childBirthDate: '',
    childGender: 'male',
    selectedTheme: '',
    mailingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Deutschland',
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const updateAddressData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      mailingAddress: {
        ...prev.mailingAddress,
        [field]: value,
      },
    }));
    if (errors[`mailingAddress.${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`mailingAddress.${field}`]: '',
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.parentEmail.trim()) {
          newErrors.parentEmail = 'E-Mail ist erforderlich';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
          newErrors.parentEmail = 'Ungültige E-Mail-Adresse';
        }
        break;

      case 2:
        if (!formData.childName.trim()) {
          newErrors.childName = 'Name ist erforderlich';
        }
        if (!formData.childBirthDate) {
          newErrors.childBirthDate = 'Geburtsdatum ist erforderlich';
        }
        break;

      case 3:
        if (!formData.selectedTheme) {
          newErrors.selectedTheme = 'Bitte wähle ein Thema aus';
        }
        break;

      case 4:
        if (!formData.mailingAddress.street.trim()) {
          newErrors['mailingAddress.street'] = 'Straße ist erforderlich';
        }
        if (!formData.mailingAddress.city.trim()) {
          newErrors['mailingAddress.city'] = 'Stadt ist erforderlich';
        }
        if (!formData.mailingAddress.postalCode.trim()) {
          newErrors['mailingAddress.postalCode'] = 'PLZ ist erforderlich';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      success(
        'Registrierung erfolgreich!',
        'Willkommen bei Lulus Briefkasten! Du erhältst eine Bestätigungs-E-Mail.'
      );
      onComplete(formData);
    } catch (err) {
      error(
        'Fehler bei der Registrierung',
        'Bitte versuche es erneut oder kontaktiere den Support.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">
          Schritt {currentStep} von {steps.length}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((currentStep / steps.length) * 100)}% abgeschlossen
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStepHeader = () => {
    const step = steps[currentStep - 1];
    return (
      <div className="text-center mb-8 animate-slide-up">
        <div className="text-4xl mb-3 animate-float">
          {step.icon}
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {step.title}
        </h2>
        <p className="text-base text-gray-600 leading-relaxed">
          {step.subtitle}
        </p>
      </div>
    );
  };

  const renderFormField = (
    label: string,
    name: string,
    type: string = 'text',
    placeholder?: string,
    required: boolean = true
  ) => {
    // Helper function to get nested value safely
    const getValue = (fieldName: string): string => {
      if (fieldName.includes('.')) {
        const [parent, child] = fieldName.split('.');
        if (parent === 'mailingAddress') {
          return formData.mailingAddress[child as keyof typeof formData.mailingAddress] || '';
        }
        return '';
      }
      return (formData[fieldName as keyof OnboardingData] as string) || '';
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          value={getValue(name)}
          onChange={(e) => {
            if (name.includes('.')) {
              const [parent, child] = name.split('.');
              updateAddressData(child, e.target.value);
            } else {
              updateFormData(name, e.target.value);
            }
          }}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 border border-gray-300 rounded-xl shadow-inner-soft
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            transition-all duration-200 ease-out
            ${errors[name] ? 'border-red-400 bg-red-50' : 'hover:border-gray-400'}
          `}
        />
        {errors[name] && (
          <p className="text-sm text-red-600 animate-slide-in">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-up">
            {renderFormField(
              'Deine E-Mail-Adresse',
              'parentEmail',
              'email',
              'deine@email.de'
            )}
            <div className="bg-soft-blue p-4 rounded-xl">
              <p className="text-sm text-gray-600 leading-relaxed">
                📧 Wir nutzen deine E-Mail für Versandbenachrichtigungen und wichtige Updates.
                Keine Werbung, versprochen!
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-slide-up">
            {renderFormField(
              'Name deines Kindes',
              'childName',
              'text',
              'z.B. Emma oder Max'
            )}
            {renderFormField(
              'Geburtsdatum',
              'childBirthDate',
              'date'
            )}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Geschlecht <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'male', label: 'Junge', emoji: '👦' },
                  { value: 'female', label: 'Mädchen', emoji: '👧' },
                  { value: 'other', label: 'Andere', emoji: '🧒' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData('childGender', option.value)}
                    className={`
                      p-3 rounded-xl border-2 transition-all duration-200
                      ${formData.childGender === option.value
                        ? 'border-primary-400 bg-primary-50 shadow-soft'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-slide-up">
            <ThemeSelector
              selectedTheme={formData.selectedTheme}
              onThemeSelect={(theme) => updateFormData('selectedTheme', theme)}
            />
            {errors.selectedTheme && (
              <p className="text-sm text-red-600 mt-4 animate-slide-in">
                {errors.selectedTheme}
              </p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-slide-up">
            {renderFormField(
              'Straße und Hausnummer',
              'mailingAddress.street',
              'text',
              'Musterstraße 123'
            )}
            <div className="grid grid-cols-2 gap-4">
              {renderFormField(
                'PLZ',
                'mailingAddress.postalCode',
                'text',
                '12345'
              )}
              {renderFormField(
                'Stadt',
                'mailingAddress.city',
                'text',
                'Berlin'
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Land
              </label>
              <select
                value={formData.mailingAddress.country}
                onChange={(e) => updateAddressData('country', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-inner-soft focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Deutschland">Deutschland</option>
                <option value="Österreich">Österreich</option>
                <option value="Schweiz">Schweiz</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink via-soft-purple to-soft-blue py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Step Content */}
        <div className="bg-white rounded-3xl shadow-soft-lg p-8">
          {renderStepHeader()}
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 space-x-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`
              px-6 py-3 rounded-xl font-medium transition-all duration-200
              ${currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-soft'
              }
            `}
          >
            Zurück
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isLoading}
            className={`
              px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white 
              rounded-xl font-medium shadow-soft-lg hover:shadow-glow
              transform transition-all duration-200 ease-out
              hover:scale-105 focus:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              flex items-center space-x-2
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Wird gespeichert...</span>
              </>
            ) : (
              <span>
                {currentStep === steps.length ? 'Registrierung abschließen' : 'Weiter'}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 