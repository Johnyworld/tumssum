declare module 'types' {

  import {icons} from '~/components/atoms/Icon'

  type ThreeSize = 'small' | 'regular' | 'large';

  type Size = ThreeSize | 'tiny' | 'medium' |'big' | 'huge';

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
    errorMessage?: string;
    forwardRef?: React.Ref<HTMLInputElement>;
  }
}
