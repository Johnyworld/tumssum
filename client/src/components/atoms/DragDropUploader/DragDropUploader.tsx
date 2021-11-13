import { h, FunctionalComponent } from 'preact';
import { useRef } from 'preact/hooks';
import useToggle from '~hooks/useToggle';
import { c } from '~utils/classNames';
import Button from '../Button';
import './DragDropUploader.scss';

export interface DragDropUploaderProps {
	onUpload: (files: FileList) => void;
}

const DragDropUploader: FunctionalComponent<DragDropUploaderProps> = ({ onUpload }) => {

	const inputRef = useRef<HTMLInputElement>(null);
	const toggleDragging = useToggle();

	const handleDrop = (e: DragEvent) => {
		e.preventDefault();
		toggleDragging.handleOff();
		const files = e.dataTransfer?.files;
		if (files) onUpload(files);
	}

	const handleChangeFile: h.JSX.GenericEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		const files = e.currentTarget.files;
		if (files) onUpload(files);
	}

	const handleDragEnter = (e: DragEvent) => {
		e.preventDefault();
		toggleDragging.handleOn();
	}

	const handleDragLeave = (e: DragEvent) => {
		e.preventDefault();
		toggleDragging.handleOff();
	}

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
	}

	const handleClickUpload: h.JSX.MouseEventHandler<HTMLButtonElement> = (e) => {
		if (inputRef.current) inputRef.current.click();
	}

	return (
		<div class='drag-drop-uploader' >
			<input
				type='file'
				id='fileUpload'
				accept='.csv'
				style={{ display: 'none' }}
				ref={inputRef}
				onChange={handleChangeFile}
			/>
			<label
				class={c('drag-drop-uploader__field', [toggleDragging.checked, '&--drag'])}
				onDrop={handleDrop}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
			/>
			<div class='drag-drop-uploader__content'>
				<p class={c('drag-drop-uploader__text', [toggleDragging.checked, '&--drag'])}>
					파일을 여기로 드래그하세요.
				</p>
				<Button border='rounded' size='small' onClick={handleClickUpload} children='직접 업로드 하기' />
			</div>
		</div>
	)
}

export default DragDropUploader;
