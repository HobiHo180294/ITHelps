// Імпортування модулів
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { NoResultProps } from './NoResult.interface';
import { noResultComponentStyled } from './NoResult.styles';

export const NoResult = (props: NoResultProps): React.JSX.Element => (
	<div className={noResultComponentStyled.body}>
		{/* Зображення для темної теми */}
		<Image
			className={noResultComponentStyled.darkThemeImage}
			width={270}
			height={200}
			src="/assets/images/light-illustration.png"
			alt="ілюстрація відсутності результатів"
		/>
		{/* Зображення для світлої теми */}
		<Image
			className={noResultComponentStyled.lightThemeImage}
			width={270}
			height={200}
			src="/assets/images/dark-illustration.png"
			alt="ілюстрація відсутності результатів"
		/>
		{/* Заголовок з повідомленням про відсутність результатів */}
		<h2 className={noResultComponentStyled.title}>{props.title}</h2>
		{/* Опис з повідомленням про відсутність результатів */}
		<p className={noResultComponentStyled.description}>{props.description}</p>
		{/* Посилання на іншу сторінку з кнопкою */}
		<Link href={props.link}>
			<Button className={noResultComponentStyled.link}>
				{props.linkTitle}
			</Button>
		</Link>
	</div>
);
