import { h, FunctionalComponent } from 'preact';
import { Category } from 'types';
import Button from '~components/elements/Button';
import ContentEditable from '~components/elements/ContentEditable';
import Divider from '~components/elements/Divider';
import PageContainer from '~components/layouts/PageComtainet';
import useCategory from '~hooks/useCategory';
import { useSelector } from '~utils/redux/hooks';



const CategoryPage: FunctionalComponent = ({  }) => {

	const categories = useSelector(state=> state.category.categories);

	const { handleUpdateCategory } = useCategory();

	return (
		<PageContainer>
			<div class='wrap gap-large'>
				<div style={{ height: '1rem' }} />
				<h1>카테고리 관리</h1>
				<div class='flex flex-end flex-gap-small'>
					<Button size='small' color='gray' children='+ 그룹 추가' />
					<Button size='small' children='+ 카테고리 추가' />
				</div>
				<div class='gap-regular'>
					{ categories.map(group => (
						<div key={group.id}>
							{ group.title
								? <ContentEditable
										value={group.title }
										color='gray'
										weight='bold'
										styleType='transparent'
										onChange={() => {}}
										placeholder='제목 없음'
									/>
								: <p class='c-gray f-bold' >{group.title || '그룹 없음'}</p>
							}
							<Divider />
							<div class='gap-tiny'>
								{ group.categories.map(category=> (
									<div class='list-item pos-relative'>
										<ContentEditable
											onChange={(value) => handleUpdateCategory({ id: category.id, title: value } as Category)}
											// onChange={(value) => console.log(value)}
											placeholder='비어있음'
											value={category.title}
										/>
										<div class='list-item-icon pos-center-y pointer never-drag svg-wrap'>
											<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="8" cy="8.00196" r="8" fill="var(--color-gray_strong)" />
												<path d="M5 11L11 5M5 5L11 11" stroke="var(--color-paper)" stroke-linecap="round"/>
											</svg>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</PageContainer>
	)
}

export default CategoryPage;
