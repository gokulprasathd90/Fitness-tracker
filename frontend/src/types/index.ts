export interface FitnessData {
    date: string;
    steps: number;
    caloriesBurned: number;
    distance: number; // in kilometers
    activeMinutes: number;
}

export interface UserProfile {
    id: string;
    name: string;
    age: number;
    weight: number; // in kilograms
    height: number; // in centimeters
}

export interface TrackerProps {
    fitnessData: FitnessData[];
    onUpdateData: (data: FitnessData) => void;
}

export interface HomeProps {
    userProfile: UserProfile;
}