'use client';

// Імпортування необхідних модулів
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { themes } from '@/constants';
import { useTheme } from '@/context/ThemeProvider';
import Image from 'next/image';
import React from 'react';
import { themeStyled } from './Theme.styles';

const Theme = (): React.JSX.Element => {
	// Отримання поточного режиму теми та функції для її зміни
	const { mode, setMode } = useTheme();

	return (
		<Menubar className={themeStyled.menuBar}>
			<MenubarMenu>
				<MenubarTrigger className={themeStyled.menuBarTrigger}>
					{/* Умова для світлої теми, інакше буде обрана темна */}
					{mode === 'light' ? (
						<Image
							src="/assets/icons/sun.svg"
							alt="іконка світлої теми"
							width={20}
							height={20}
							className={themeStyled.triggerImage}
						/>
					) : (
						<Image
							src="/assets/icons/moon.svg"
							alt="іконка темної теми"
							width={20}
							height={20}
							className={themeStyled.triggerImage}
						/>
					)}
				</MenubarTrigger>
				{/* Вміст меню зі стилізацією */}
				<MenubarContent className={themeStyled.menuBarContent}>
					{themes.map(item => (
						<MenubarItem
							key={item.value}
							className={themeStyled.menuBarItem}
							onClick={() => {
								setMode(item.value);
								if (item.value !== 'system') localStorage.theme = item.value;
								else localStorage.removeItem('theme');
							}}
						>
							<Image
								src={item.icon}
								alt={item.value}
								width={16}
								height={16}
								className={`${mode === item.value && themeStyled.triggerImage}`}
							/>
							<p
								className={`${themeStyled.paragraph} ${
									mode === item.value
										? themeStyled.lightValue
										: themeStyled.darkValue
								}`}
							>
								{/* Мітка для елементу теми */}
								{item.label}
							</p>
						</MenubarItem>
					))}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};

export default Theme;
