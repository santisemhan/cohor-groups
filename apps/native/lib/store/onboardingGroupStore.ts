import { create } from "zustand"
import * as ImagePicker from "expo-image-picker"

interface OnboardingForm {
  name: string
  description: string
  location: string
  interests: string[]
  image: ImagePicker.ImagePickerAsset | null
}

type State = {
  form: OnboardingForm
}

type Action = {
  setFormValues: (form: OnboardingForm) => void
}

const useOnboardingGroupStore = create<State & Action>((set) => ({
  form: {
    name: "",
    description: "",
    location: "",
    interests: [],
    image: null
  },
  setFormValues: (form: OnboardingForm) => set({ form })
}))

export default useOnboardingGroupStore
