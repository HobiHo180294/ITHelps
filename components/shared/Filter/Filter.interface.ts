// Описує об'єкт фільтра з ім'ям та значенням
type Filter = {
	name: string; // Назва фільтра
	value: string; // Значення фільтра
};

export interface FilterProps {
	filters: Filter[]; // Масив фільтрів, кожен елемент якого є об'єктом типу Filter
	otherClasses?: string; // Додаткові класи для декорування елементів у компоненті
	containerClasses?: string; // Класи контейнера для декорування основного блоку компоненту
}
