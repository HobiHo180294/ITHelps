export interface RenderTagProps {
	_id: number | string; // ідентифікатор тегу
	name: string; // назва тегу
	totalQuestions?: number; // загальна кількість питань, пов'язаних із тегом,
	showCount?: boolean; // прапорець, що визначає, чи відображати кількість питань
}
