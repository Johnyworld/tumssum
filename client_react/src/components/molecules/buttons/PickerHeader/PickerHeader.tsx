import Icon from '~/components/atoms/Icon';
import './PickerHeader.scss';

export interface PickerHeaderProps {
  title: string | number;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const PickerHeader: React.FC<PickerHeaderProps> = ({ title, onClickPrev, onClickNext }) => {
  return (
    <div className='picker-header'>
      <p className='f-large'>
        <span className='f-bold'>{title}</span>
      </p>
      <div className='picker-header__arrows'>
        <div className='picker-header__arrow' onClick={onClickPrev}>
          <Icon as='arrowLeft' />
        </div>
        <div className='picker-header__arrow' onClick={onClickNext}>
          <Icon as='arrowRight' />
        </div>
      </div>
    </div>
  );
};

export default PickerHeader;
