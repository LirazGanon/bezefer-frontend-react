import { useEffect, useState } from "react";

export const useForm = (initialState: any, cb?: any) => {
  const [fields, setFields] = useState(initialState);

  useEffect(() => {
    cb?.(fields);
  }, [fields]);

  const handleChange = ({
    target,
  }: {
    target: {
      name: string;
      value: string | number | boolean;
      type: string;
      checked?: boolean;
    };
  }) => {
    const field = target.name;
    let value = target.value;
    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;
      case "checkbox":
        value = target.checked || false;
        break;
      default:
        break;
    }
    setFields((prevFields: any) => ({ ...prevFields, [field]: value }));
  };

  return [fields, handleChange, setFields];
};
