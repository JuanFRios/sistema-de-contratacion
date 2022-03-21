import { useRef, useState } from 'react';

const useFormData = (initial: any) => {
  const form = useRef(initial);
  const [formData, setFormData] = useState({} as any);
  const getFormData: any = () => {
    const fd = new FormData(form.current);
    const obj = {};
    fd.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };
  const updateFormData = () => {
    setFormData(getFormData());
  };
  return { form, formData, updateFormData } as const;
};

export default useFormData;
