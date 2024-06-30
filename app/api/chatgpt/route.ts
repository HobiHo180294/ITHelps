import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
	const { question } = await request.json();

	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo-0125',
				messages: [
					{
						role: 'system',
						content:
							'Ти обізнаний помічник, який надає якісну інформацію у сфері IT-технологій.',
					},
					{
						role: 'user',
						content: `Надай відповідь будь ласка на наступне запитання: ${question}`,
					},
				],
			}),
		});

		const responseData = await response.json();

		const reply = responseData.choices[0].message.content;

		return NextResponse.json({ reply });
	} catch (error: any) {
		return NextResponse.json({ error: error.message });
	}
};
