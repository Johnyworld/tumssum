declare module 'types' {

  type Size = 'tiny' | 'small' | 'regular' | 'medium' | 'large' | 'big' | 'huge';

	interface DefaultProps {
    className?: string;
    style?: React.CSSProperties;
  }

  interface CommonInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    fluid?: boolean;
    readOnly?: boolean;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    forwardRef?: React.Ref<HTMLInputElement>;
  }
}
