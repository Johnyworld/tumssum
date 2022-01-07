declare module 'types' {

  type Size = 'tiny' | 'small' | 'regular' | 'medium' | 'large' | 'big' | 'huge';

	interface DefaultProps {
    className?: string;
    style?: React.CSSProperties;
  }

  interface CommonInputProps {
    label?: string;
    placeholder?: string;
    fluid?: boolean;
    readOnly?: boolean;
    required?: boolean;
    disabled?: boolean;
    forwardRef?: React.Ref<HTMLInputElement>;
  }
}
