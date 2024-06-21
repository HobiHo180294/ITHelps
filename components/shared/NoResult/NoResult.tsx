import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { NoResultProps } from './NoResult.interface';
import { noResultComponentStyled } from './NoResult.styles';

const NoResult = ({
	title,
	description,
	link,
	linkTitle,
}: NoResultProps): React.JSX.Element => (
	<div className={noResultComponentStyled.body}>
		<Image
			className={noResultComponentStyled.darkThemeImage}
			width={270}
			height={200}
			src="/assets/images/light-illustration.png"
			alt="ілюстрація відсутності результатів"
		/>
		<Image
			className={noResultComponentStyled.lightThemeImage}
			width={270}
			height={200}
			src="/assets/images/dark-illustration.png"
			alt="ілюстрація відсутності результатів"
		/>
		<h2 className={noResultComponentStyled.title}>{title}</h2>
		<p className={noResultComponentStyled.description}>{description}</p>
		<Link href={link}>
			<Button className={noResultComponentStyled.link}>{linkTitle}</Button>
		</Link>
	</div>
);

export default NoResult;
