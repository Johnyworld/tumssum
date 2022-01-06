declare module 'types' {

  type Size = 'tiny' | 'small' | 'regular' | 'medium' | 'large' | 'big' | 'huge';

	interface DefaultProps {
    className?: string;
    style?: React.CSSProperties;
  }
}
